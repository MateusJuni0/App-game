# 21 — Modelo de Dados Completo (build-ready)

> Esquema pronto a construir (Postgres / Supabase). Tudo isolado por família com **Row-Level Security (RLS)** por `household_id`. Transações são **append-only** (imutáveis; UUID gerado no dispositivo) → sem conflitos offline; saldos/orçamentos são **agregados derivados**. Convenção: `snake_case`, `id uuid pk default gen_random_uuid()`, `created_at/updated_at timestamptz`, soft-delete com `archived_at` onde fizer sentido.

## Diagrama (resumo das relações)

```
household ──< household_member >── app_user
household ──< account ──< transaction >── category
household ──< category (árvore: parent_id)
household ──< budget ──< budget_line >── category
household ──< goal ──< goal_contribution
household ──< bill (recurring_stream) ──< bill_payment
household ──< rule        (auto-categorização)
account/transaction ──< attachment   (recibos/OCR)
household ──< notification
household ──< bot_message / bot_audit_log
household ──< consent     (ligação Open Banking, validade/re-consent)
transaction ──< transaction_split
transaction ──< transaction_comment   (chat família)
```

## Tabelas

### Identidade e família
**`app_user`** — pessoa com login (Supabase Auth `auth.users` 1:1).
- `id` (= auth uid), `display_name`, `avatar_url`, `email`, `locale` default `pt-PT`, `theme` (`system|light|dark`), `created_at`.

**`household`** — a família.
- `id`, `name`, `owner_user_id → app_user`, `base_currency` default `EUR`, `created_at`.

**`household_member`** — adesão de um utilizador a uma família + papel.
- `id`, `household_id`, `user_id`, `role` (`admin|member|supervised`), `child_birthdate` (null p/ adultos; para a variante jovens), `joined_at`, `archived_at`.
- *RLS:* um utilizador vê linhas das famílias onde é membro.

### Contas
**`account`** — conta bancária/cartão/dinheiro/investimento.
- `id`, `household_id`, `owner_user_id` (dono), `name`, `type` (`checking|savings|credit_card|cash|investment|loan|other`), `institution`, `currency` default `EUR`, `iban_last4`, `current_balance` (cache), `is_manual` (bool), `source` (`openbanking|manual`), `external_account_id` (do aggregador), `visibility` (`shared_full|balance_only|private`) ← **privacidade família (doc 15)**, `include_in_net_worth` (bool), `icon`, `color`, `archived_at`.

### Categorias (árvore) — ver doc 20 para a taxonomia/ícones
**`category`**
- `id`, `household_id` (null = categoria de sistema/seed global), `parent_id` (null = categoria-mãe), `name`, `kind` (`expense|income|transfer`), `icon` (nome Lucide), `color` (token), `is_system` (bool), `sort_order`, `archived_at`.
- *Seed:* taxonomia PT completa (doc 20) inserida como `is_system=true`; a família pode adicionar/renomear as suas.

### Transações (append-only)
**`transaction`** — ver o motor financeiro (`23`) para as invariantes obrigatórias.
- `id` (UUID gerado no dispositivo p/ idempotência), `household_id`, `account_id`, `posted_at` (timestamptz),
- **`amount_cents` (bigint, cêntimos inteiros — NUNCA float; negativo = saída, positivo = entrada)**, `currency` (ISO 4217),
- **`kind` (`expense|income|transfer`, NOT NULL)**, **`transfer_group_id`** (uuid, liga as duas pernas de uma transferência; null se não for transferência),
- `merchant_raw`, `merchant_name`, `merchant_logo_url`,
- **`category_id` NOT NULL** (inclui a categoria de sistema "Por classificar"), `category_confidence` (`very_high|high|medium|low`),
- FX (gasto em moeda estrangeira): `original_amount_cents`, `original_currency`, `fx_rate`, `fx_date`,
- `source` (`openbanking|notification|sms|email|manual|receipt`), `status` (`pending|posted|reconciled`), `dedup_key` (conta+montante+janela-data+comerciante),
- `is_private` (bool), `excluded_from_budget` (bool), `note`, `created_by_user_id`, `created_at`.
- **Regras (do `23`):** transferências (`kind=transfer`) e pagamentos de cartão **não** contam como gasto/receita; `soma(splits)==montante`; append-only (edições geram evento); saldos são derivados.
- Índices: `(household_id, posted_at desc)`, `(account_id, posted_at)`, `(category_id)`, `dedup_key unique` por conta.

**`transaction_split`** — dividir uma transação em várias categorias/membros.
- `id`, `transaction_id`, `category_id`, `amount`, `owner_user_id` (p/ "quem pagou o quê"), `note`.

**`transaction_comment`** — chat/comentários da família numa transação (doc 15).
- `id`, `transaction_id`, `author_user_id`, `body`, `emoji`, `created_at`.

### Orçamentos
**`budget`** — um orçamento (modelo Flex/Categoria/Grupo).
- `id`, `household_id`, `owner_user_id` (null = familiar partilhado; senão pessoal), `name`, `model` (`flex|category|group`), `period` (`monthly|weekly`), `period_start_day` (int, ex.: dia do ordenado), `rollover_default` (bool), `created_at`.

**`budget_line`** — limite por categoria.
- `id`, `budget_id`, `category_id`, `amount`, `rollover` (bool), `bucket` (`fixed|flexible|non_monthly` p/ modelo Flex).

### Objetivos / poupança
**`goal`**
- `id`, `household_id`, `name`, `target_amount`, `target_date`, `current_amount` (cache), `image_url`, `icon`, `color`, `is_shared` (bool), `locked_until` (date, p/ "pot bloqueado"), `auto_rule` (jsonb: round-ups, % do ordenado), `archived_at`.

**`goal_contribution`**
- `id`, `goal_id`, `user_id`, `amount`, `source` (`manual|roundup|payday|match`), `created_at`.

### Contas a pagar / recorrentes
**`bill`** (stream recorrente: subscrição/conta/dívida)
- `id`, `household_id`, `merchant_name`, `category_id`, `kind` (`subscription|utility|loan|other`), `cadence` (`weekly|biweekly|semimonthly|monthly|yearly`), `avg_amount`, `last_amount`, `next_due_date`, `account_id` (de onde sai), `owner_user_id` (responsável pelo pagamento), `entity` (entidade Multibanco 5 díg., null), `reference` (referência 9 díg., null), `iban` (null), `maturity` (`early_detection|mature`), `status` (`active|paused|cancelled|flagged`), `price_increase` (bool, calculado), `last_used_at`, `created_at`.

**`bill_payment`** — instância paga de uma conta.
- `id`, `bill_id`, `transaction_id` (quando reconciliada), `due_date`, `amount`, `status` (`upcoming|paid|overdue|skipped`), `paid_at`.

### Regras de auto-categorização
**`rule`**
- `id`, `household_id`, `match` (jsonb: `merchant contains`, `amount range`, etc.), `set_category_id`, `set_owner_user_id`, `set_excluded` (bool), `priority`, `created_by_user_id`.

### Anexos (recibos/OCR)
**`attachment`**
- `id`, `household_id`, `transaction_id` (null se ainda não casado), `storage_path` (Supabase Storage), `kind` (`receipt|document`), `ocr_json` (jsonb: comerciante/data/total/linhas), `created_at`.

### Notificações / nudges (ver doc 04 para regras)
**`notification`**
- `id`, `household_id`, `user_id`, `channel` (`fraud|account|budget|bill|nudge|family`), `title`, `body`, `payload` (jsonb), `read_at`, `created_at`.
- `notification_pref` (`user_id`, `channel`, `enabled`, `quiet_hours_start/end`).

### Bot (Claude) — ver doc 06
**`bot_message`** — histórico do chat por família/membro.
- `id`, `household_id`, `user_id`, `role` (`user|assistant`), `content`, `tool_calls` (jsonb), `cited_transaction_ids` (uuid[]), `created_at`.

**`bot_audit_log`** — tudo o que o bot disse/fez (obrigatório, doc 06/08).
- `id`, `household_id`, `action`, `input` (jsonb), `output` (jsonb), `model`, `created_at`.

### Open Banking / consentimentos (quando existir, ver 18/09)
**`consent`**
- `id`, `household_id`, `user_id`, `aggregator`, `institution`, `status`, `granted_at`, `expires_at` (180 dias UE), `external_ref`.

## Vistas / agregados derivados (não guardar, calcular)
- **Saldo de conta** = soma das transações reconciliadas.
- **Seguro para gastar** = saldo − contas a vencer − reservado em objetivos (doc 14).
- **Gasto por categoria/período**, **orçamento vs real**, **património líquido**, **runway** (saldo projetado dia-a-dia), **comparativo vs mês passado até hoje**.
- Implementar como **views SQL** + funções; o bot usa estas funções/SQL (nunca calcula à mão, doc 06).

## RLS (padrão)
- Toda a tabela com `household_id`: `USING (household_id IN (SELECT household_id FROM household_member WHERE user_id = auth.uid() AND archived_at IS NULL))`.
- Por cima, **privacidade por conta/transação**: filtrar `account.visibility`/`transaction.is_private` conforme o membro (exceto o dono). Membro `supervised` (jovem) com políticas próprias (doc 15).

## Notas de implementação
- **Idempotência:** `transaction.id` gerado no dispositivo + `dedup_key` único → reenvios offline não duplicam.
- **Sincronização:** PowerSync (ou WatermelonDB) espelha estas tabelas em SQLite local; regras de sync por `household_id` (doc 16).
- **Seed:** doc 20 (categorias+ícones PT) entra como dados de sistema na 1.ª migração.
