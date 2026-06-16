# 10 — Roadmap

> Faseado por valor e por risco. Datas deliberadamente omitidas (dependem de equipa/recursos); a ordem é o que importa. Pré-requisito de tudo: **decidir o mercado** (`11`).

## Fase 0 — Fundações (antes de código de produto)
- ✅ Limpar o projeto antigo (jogo do impostor) — **feito**.
- ✅ Especificação completa (estes documentos) — **feito**.
- ⬜ Decisões do chefe: mercado, plataformas, modo de receita inicial (`11`).
- ⬜ Escolher aggregador Open Banking do mercado e abrir conta/sandbox.
- ⬜ Definir stack de backend e hosting.

## Fase 1 — MVP "captura + ver" (provar a promessa central)
Objetivo: o utilizador liga uma conta e **vê os gastos sem digitar**.
- App Expo (iOS+Android) com onboarding sem fricção.
- **Open Banking** via aggregador (espinha dorsal, cross-platform).
- **Entrada rápida** (atalho/partilha/widget) — rede de segurança.
- Categorização automática (regras + Haiku) com confirmação na baixa confiança.
- Visão geral + número **"quanto posso gastar"** (gancho Persona A).
- Deduplicação básica.
- Backend + Postgres + auth.
- **Métrica:** transações capturadas automaticamente / utilizador / semana.

## Fase 2 — "Automático no Android" + bot v1
Objetivo: aprofundar a automação e lançar o assistente.
- **Leitura de notificações (Android)** via módulo nativo + config plugin (dev build/EAS); parsers dos bancos-alvo; reconciliação com Open Banking.
- **Bot v1 (Claude):** responder a perguntas (números via SQL), categorizar, criar lembretes. Tool use + prompt caching + routing.
- **Deteção de subscrições** e **contas a vencer → lembretes** (serve Persona B; pedido do chefe).
- Nudges proativos (com limites de frequência/relevância).
- **Premium** + cancelamento em 1 toque.

## Fase 3 — "Resolver" + receita de valor
Objetivo: o bot age e a app gera margem.
- Sinalizar/cancelar subscrições (1 toque).
- **Negociação de contas** (concierge/IA draft) — receita extra transparente.
- Bot com mais ações (com aprovação + auditoria).
- Resumos semanais/mensais, insights avançados.
- E-mail via alias de reencaminhamento (recibos).

## Fase 4 — Expansão
- Partilha familiar/casal.
- Multi-moeda / segundo mercado.
- (Avaliar) produtos financeiros com licenças (poupança/cartão/adiantamento) — só se a regulação e o risco compensarem.
- (Avaliar) Gmail API com CASA, se o e-mail provar valor que justifique o custo.
- (Avaliar) Managed Agents para o bot, se a complexidade justificar.

## Princípios de execução
- **Cada fase entrega valor sozinha** (não construir tudo antes de lançar).
- **Fiabilidade antes de features** (a queixa universal do mercado é a sync).
- **Honestidade e cancelamento fácil desde o dia 1** (evitar o destino da Cleo na FTC).
- **iOS + Android juntos** (não repetir o erro iOS-only do Copilot).
