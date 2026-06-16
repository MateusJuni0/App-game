# 23 — Motor Financeiro (o núcleo do dinheiro)

> **Este é o coração do app.** A regra do chefe: *tudo o que toca em dinheiro passa por aqui e encaixa numa categoria.* Um erro neste documento entra em cascata por todo o lado — por isso está escrito com rigor de engenharia financeira. Tudo o resto (orçamentos, seguro-para-gastar, runway, património, gráficos, bot) **deriva** deste motor. Uma só fonte de verdade.

## Princípio nº1 — A transação é o átomo. Nada mexe em dinheiro sem ser uma transação.

Não existe movimento de dinheiro no app que não seja uma `transaction`. Compra, ordenado, transferência entre contas, reembolso, pagamento de cartão, levantamento, juro — **tudo** é uma transação. Isto garante o que o chefe pediu: há um único sítio por onde o dinheiro passa.

Cada transação tem **obrigatoriamente**:
- um **montante** (regras de representação abaixo),
- um **tipo** (`kind`): exatamente um de **`expense` | `income` | `transfer`**,
- uma **categoria** (`category_id` **NOT NULL** — nem que seja "Por classificar"),
- uma **conta**, uma **data**, uma **fonte** (de onde foi capturada) e um **estado** (ciclo de vida).

## Princípio nº2 — O dinheiro NUNCA é vírgula flutuante (o erro clássico que cascata)

`0.1 + 0.2 !== 0.3` em vírgula flutuante (IEEE 754). Num app de finanças, isto produz cêntimos errados que se acumulam → saldos errados → orçamentos errados → o bot a dizer números errados. **Regra absoluta:**
- **Guardar os montantes como inteiros em cêntimos** (`bigint`, minor units). Ex.: 12,34 € → `1234`. (Na base de dados, `bigint` de cêntimos; `numeric(14,2)` exato também é aceitável, mas no código JS/TS **nunca** usar `number` para aritmética de dinheiro.)
- **No app (React Native/TS):** aritmética em inteiros de cêntimos, ou uma biblioteca decimal exata (**dinero.js v2 / big.js / decimal.js**). Nunca `0.1 + 0.2` em floats.
- **Cada montante anda sempre com a sua moeda** (ISO 4217, ex.: `EUR`).
- **Arredondamento:** definir uma regra única — *round half to even* (banker's rounding) — e usá-la em todo o lado (divisões, conversões de câmbio, splits). Documentada, nunca ad-hoc.

## Princípio nº3 — Convenção de sinal (uma só, em todo o lado)

`amount` é **inteiro de cêntimos com sinal**, na perspetiva da conta:
- **negativo = saída** de dinheiro da conta (despesa, transferência a sair),
- **positivo = entrada** (receita, transferência a entrar, reembolso).

Uma só convenção evita confusão e bugs. Os relatórios decidem o que mostrar (gasto = soma dos negativos de `kind=expense`, etc.).

## Princípio nº4 — Transferências NÃO são gasto nem receita (netting)

O erro mais comum e mais grave: contar uma **transferência entre contas próprias** como gasto (ou o **pagamento do cartão de crédito** como despesa). Isso inflaciona os gastos e estraga tudo a jusante.

Modelo:
- Uma transferência entre duas contas da família = **par de transações ligadas** por um `transfer_group_id`: uma a sair da conta A (negativa) e uma a entrar na conta B (positiva), ambas com `kind=transfer`.
- **`kind=transfer` é SEMPRE excluído** dos relatórios de gasto, de receita e dos orçamentos. Afeta os **saldos** das contas, mas **não** o "quanto gastei".
- **Pagamento de cartão de crédito = transferência** (conta corrente → cartão), **não** despesa. A despesa foi a compra original no cartão; pagar a fatura é só mover dinheiro. (Contar os dois = duplicar.)
- Deteção: o utilizador marca, ou uma regra/heurística emparelha montantes opostos entre contas próprias numa janela de tempo.

## Princípio nº5 — Reembolsos compensam a categoria, não são receita

Um reembolso (devolução de uma compra) é um **montante positivo numa categoria de despesa** (despesa negativa), **ligado à transação original**. Reduz o gasto líquido daquela categoria; **não** conta como receita. Reembolsos parciais são permitidos. Reembolsos entre pessoas (ex.: dividir o jantar) tratam-se por **split/acerto**, não como receita.

## Princípio nº6 — Splits somam exatamente ao pai

Uma transação pode ser dividida em N partes (categorias/membros diferentes). **Invariante:** `soma(partes) == montante do pai`, ao cêntimo. O resto do arredondamento atribui-se a uma das partes (método do maior resto) para fechar a conta. Cada parte tem a sua categoria e o seu dono.

## Princípio nº7 — Ciclo de vida e reconciliação (sem duplicar)

Estados: **`pending` → `posted` → `reconciled`**.
- **pending:** captura imediata (notificação, autorização do cartão) — pode mudar de valor ou desaparecer; é **provisória**.
- **posted:** confirmada.
- **reconciled:** casada com a fonte autoritativa (feed Open Banking) ou conciliada com o saldo real.
- A captura provisória (notificação/SMS) **funde-se** com a transação do Open Banking quando esta chega (via dedup) — **nunca conta duas vezes**. O Open Banking é a **fonte de verdade**; as notificações são velocidade (vês logo), o banco é a verdade (reconcilia depois).

## Princípio nº8 — Deduplicação / idempotência (captura multi-fonte)

A mesma compra real pode chegar por push **+** SMS **+** Open Banking **+** manual. Tem de colapsar numa só:
- `transaction.id` = UUID **gerado no dispositivo** (manual/notificação) → reenvios offline não duplicam.
- `dedup_key` = normalização de `conta + montante + janela-de-data + comerciante normalizado (+ últimos 4 dígitos)`.
- Política de fusão: provisórias fundem-se na do Open Banking quando coincidem; em conflito de montante, vence o do banco (posted/reconciled).

## Princípio nº9 — Saldos são DERIVADOS, não a fonte de verdade

`saldo(conta) = saldo_inicial + soma(transações da conta)`. O saldo guardado é **cache** (para velocidade); a verdade é o livro-razão (ou o saldo reportado pelo banco, para contas ligadas). Reconciliar periodicamente: se o saldo derivado ≠ saldo do banco, há uma transação em falta/errada → sinalizar para o utilizador.

## Princípio nº10 — Multi-moeda com taxa histórica

- Cada conta tem uma **moeda**. A transação guarda-se na moeda da conta.
- Gasto em moeda estrangeira: guardar **`original_amount` + `original_currency`** E **`amount` (na moeda da conta) + `fx_rate` + `fx_date`**.
- Totais entre contas (património, relatórios) convertem para a **moeda base (EUR)** usando as **taxas históricas guardadas** (a taxa do dia da transação), **nunca** a de hoje — senão o histórico "muda" sozinho.

## Princípio nº11 — Categorização garantida a 100% (nada escapa)

Pipeline por cada transação:
1. **Regras da família** (match → categoria/dono).
2. **ML/IA (Haiku, em lote)** com **nível de confiança** (very_high/high → auto-aplica; medium/low → não).
3. Se nada com confiança suficiente → categoria de sistema **"Por classificar"** + marcada em **"A rever"**.

**Invariante:** não há transação sem categoria. Uma correção da família vira **regra** e aplica-se a todas as semelhantes (colaborativo). "Por classificar" é uma categoria real (não um vazio) — assim o chefe tem a garantia de que *tudo encaixa numa categoria*.

## Princípio nº12 — Imutável e auditável

- Transações **append-only**; uma edição gera um **evento/versão** (não se reescreve o passado em silêncio).
- **Audit log** de tudo (incluindo o que o bot faz). Importante para confiança, reconciliação e para nunca haver "dinheiro que desapareceu sem rasto".

## Princípio nº13 — O bot e os relatórios NUNCA calculam dinheiro

Todo o valor mostrado (saldo, gasto, seguro-para-gastar, runway, reembolso estimado de IRS) vem de **funções/SQL do motor**. O LLM só **interpreta a pergunta e narra** o resultado e **cita** as transações de origem (ver `06`). Isto fecha a porta a "o bot inventou um número".

---

## Como funciona, ponta a ponta (o ciclo do dinheiro)

```
1. ACONTECE   → uma compra / ordenado / transferência / reembolso no mundo real
2. CAPTURA    → notificação (Android) / Open Banking / e-mail / entrada manual
                normaliza + DEDUP (uma só transação, mesmo vinda de 3 fontes)
3. CLASSIFICA → kind (expense/income/transfer)  +  categoria (auto por confiança,
                senão "Por classificar" + a rever)  +  dono (meu/dele/nosso)
4. LIVRO-RAZÃO→ entra append-only (cêntimos inteiros, com moeda), com privacidade
5. RECONCILIA → provisória (notificação) funde-se com a verdade (banco); pending→posted→reconciled
6. DERIVA     → recalcula tudo a partir do razão:
                saldos · seguro-para-gastar · orçamento vs real · runway · património · IRS
7. MOSTRA     → dashboard, gráficos, alertas; o BOT responde usando as funções do motor
8. AGE        → o utilizador categoriza/divide/marca transferência/prepara pagamento (handoff, doc 18)
                — cada ação fica no audit log
```

**Tudo o que toca em dinheiro passa pelos passos 2–4 e sai categorizado.** Os passos 6–8 são consequências derivadas de um único razão correto.

## O grafo de dependência (uma fonte → tudo o resto)

```
                      ┌──────────────┐
                      │  LIVRO-RAZÃO │  (transações: cêntimos, kind, categoria, conta, fonte, estado)
                      └──────┬───────┘
        ┌──────────────┬─────┼───────────────┬────────────────┐
        ▼              ▼      ▼               ▼                ▼
     Saldos      Gasto p/   Orçamento    Recorrentes      Património
   por conta    categoria   vs real      (streams)        (multi-moeda)
        │            │          │             │                │
        └─────► Seguro-para-gastar ◄──────────┘                │
                     │                                          │
                     ▼                                          ▼
                  Runway (saldo projetado dia-a-dia)        Net worth
                     │
                     ▼
              Bot + gráficos + alertas + modo IRS (doc 20)
```

Se o razão estiver certo (cêntimos inteiros, transferências netadas, dedup, categoria sempre presente, taxa histórica), **tudo a jusante está certo**. É por isso que este motor é o documento que não podemos errar.

## Checklist de invariantes (o que tem de ser sempre verdade)
- [ ] Nenhum montante é float; tudo cêntimos inteiros + moeda.
- [ ] Toda a transação tem `kind` e `category_id` (nunca nulo).
- [ ] `kind=transfer` nunca conta como gasto/receita; pagamento de cartão = transferência.
- [ ] Reembolso compensa a categoria, não é receita.
- [ ] `soma(splits) == pai`.
- [ ] Mesma compra de várias fontes = uma só transação (dedup).
- [ ] Saldo derivado reconcilia com o banco; divergência → sinalizar.
- [ ] Conversões usam taxa histórica guardada.
- [ ] Transações append-only + audit log.
- [ ] Todo o valor mostrado vem do motor (SQL/funções), nunca do LLM.

> Implicação para o `21` (modelo de dados): `transaction.amount` é **cêntimos inteiros (bigint)**; `category_id NOT NULL`; transferências por `transfer_group_id`; estados `pending/posted/reconciled`; campos de FX (`original_amount`, `original_currency`, `fx_rate`, `fx_date`). Atualizado lá em conformidade.
