# 07 — Arquitetura Técnica

> Proposta de arquitetura. Decisões finais dependem do mercado escolhido (`11`). Base já existente neste repo: Expo / React Native / TypeScript (limpo).

## 1. Visão geral

```
┌─────────────────────────────┐        ┌──────────────────────────────────────┐
│  App (Expo / React Native)  │        │  Backend (API + serviços)            │
│  - UI (iOS + Android)       │  HTTPS │  - API REST/GraphQL                   │
│  - Módulo nativo Android:   │◀──────▶│  - Auth                               │
│    NotificationListener     │        │  - Serviço de captura/dedup           │
│  - Entrada rápida/atalhos   │        │  - Serviço de categorização (Haiku)   │
│  - Cache local (SQLite)     │        │  - Serviço do bot (Claude tool use)   │
└─────────────────────────────┘        │  - Integração aggregador Open Banking │
                                        │  - Notificações push                  │
                                        └───────────────┬──────────────────────┘
                                                        │
                            ┌───────────────────────────┼───────────────────────────┐
                            ▼                           ▼                            ▼
                   ┌─────────────────┐        ┌──────────────────┐        ┌──────────────────┐
                   │ Postgres        │        │ Aggregador OB     │        │ Claude API       │
                   │ (transações,    │        │ (Plaid/Pluggy/    │        │ (bot, categoriz, │
                   │  contas, users) │        │  GoCardless…)     │        │  batch)          │
                   └─────────────────┘        └──────────────────┘        └──────────────────┘
```

## 2. App (cliente)

- **Expo / React Native (TypeScript)** — já é a base limpa.
- **Dev build / EAS** obrigatório (não Expo Go) por causa do módulo nativo de notificações no Android.
- **Módulo nativo Android + config plugin** para `NotificationListenerService` (injeta `<service>` + `BIND_NOTIFICATION_LISTENER_SERVICE` no manifest no prebuild). Entrega via Headless JS. Ver `05`.
- **Entrada rápida:** Share Sheet extension, App Intents/Siri Shortcuts, widget.
- **Cache local:** SQLite (ex.: expo-sqlite) para funcionamento offline e leitura rápida; sincroniza com o backend.
- **Estado:** algo simples (Zustand já estava no projeto antigo; reavaliar). Navegação: expo-router (já presente).

## 3. Backend

- **API:** Node/TypeScript (partilha tipos com o app) ou outra stack à escolha. REST ou GraphQL.
- **Base de dados: Postgres** — transações em tabela **estruturada** (essencial para o bot fazer SQL determinístico; ver `06`). Índices por utilizador, data, categoria, comerciante.
- **Serviço de captura:** recebe eventos de notificações (do device), webhooks/pulls do aggregador, e e-mail; normaliza, deduplica, reconcilia.
- **Serviço de categorização:** regras + ML/LLM (Haiku em batch). Níveis de confiança; auto-aplica alta, pede confirmação baixa.
- **Serviço do bot:** orquestra a Messages API da Claude com tool use; expõe ferramentas (`query_transactions`, etc.); aplica guardrails e logging.
- **Notificações push:** serviço dedicado, com canais de opt-in separados (fraude/atividade/promo) e limites de frequência (ver `04`).

## 4. Modelo de dados (esboço)

Entidades principais:
- `user` — conta, preferências, consentimentos.
- `account` — conta bancária/cartão ligado (via aggregador) ou manual.
- `transaction` — id, user_id, account_id, montante, moeda, data, comerciante_normalizado, categoria, confiança, **fonte** (notificação/SMS/openbanking/email/manual), **estado** (provisória/reconciliada), dedup_key.
- `subscription` / `recurring_stream` — comerciante, cadência, último montante, ativo, early_detection.
- `bill` / `reminder` — conta a vencer, data, montante previsto, estado.
- `consent` — ligação ao aggregador, validade, próxima re-autenticação (180 dias UE / ~12 meses BR).
- `bot_audit_log` — tudo o que o bot disse/fez (obrigatório, ver `06`/`08`).

## 5. Sincronização e offline

- App funciona offline com cache local; fila de alterações que sincroniza quando online.
- Transações capturadas no device (notificações) sobem ao backend, que deduplica contra o feed do aggregador (fonte de verdade do saldo).
- Gestão de re-consentimento: o backend sabe quando o consentimento de cada conta expira e dispara o fluxo de relink (UX dedicada).

## 6. Segurança técnica (resumo; detalhe em `08`)

- Dados sensíveis cifrados em repouso e em trânsito; segredos fora do device.
- Dados de notificações: processar/manter o mínimo, idealmente no device; nunca partilhar com terceiros.
- Credenciais de aggregador nunca tocam o nosso device/servidor (o aggregador é a parte regulada).
- Registo de auditoria do bot.

## 7. Decisões técnicas em aberto (ver `11`)

- Mercado → qual aggregador (Plaid / Pluggy / Belvo / GoCardless / Tink…).
- Stack de backend concreta e hosting.
- Quanto processar no device vs servidor (privacidade vs capacidade).
- Self-hosted vs serviços geridos para a IA (Messages API vs Managed Agents).
