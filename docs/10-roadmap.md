# 10 — Roadmap

> Faseado por valor e por risco. Datas deliberadamente omitidas (dependem de equipa/recursos); a ordem é o que importa. Pré-requisito de tudo: **decidir o mercado** (`11`).

## Fase 0 — Fundações (antes de código de produto)
- ✅ Limpar o projeto antigo (jogo do impostor) — **feito**.
- ✅ Especificação completa, incluindo design (docs 00–17) — **feito**.
- ✅ Decisões grandes: app privado da família, sem venda, Portugal, iOS+Android+web (`11`).
- ⬜ Confirmar aggregador Open Banking (GoCardless → senão Tink/Salt Edge) e abrir sandbox.
- ⬜ Montar esqueleto Expo + Supabase (RLS por família) + NativeWind (ver `16`).
- ⬜ Decisões pequenas pendentes (nome do app, etc. — `11`).

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
- Modo escuro e design system aplicados (ver `12`).

## Fase 3 — "Resolver" + família + polimento
Objetivo: o bot age, a família partilha, e tudo fica bonito.
- Sinalizar subscrições e duplicados da família (1 toque).
- Bot com mais ações (com aprovação + auditoria); tom ajustável.
- **Família:** convites, privacidade granular por conta, objetivos partilhados (ver `15`).
- **Runway** (calendário de fluxo de caixa com aviso de saldo negativo, ver `14`).
- Resumos semanais/mensais e relatório familiar; insights avançados.
- E-mail via alias de reencaminhamento (recibos).
- Aplicar o design system e gráficos a todos os ecrãs (ver `12`/`13`/`17`).

## Fase 4 — Expansão (para a família)
- Variante **jovens** (mesada, tarefas, objetivos, lições — ver `15`).
- Widgets, ecrã de bloqueio, atalhos/Botão de Ação, "Trip Mode" (ver `14`).
- Multi-moeda (se a família viajar/tiver contas noutras moedas).
- Relatório anual "Ano em Dinheiro" da família.
- (Avaliar) Gmail API com CASA, só se o e-mail provar valor que justifique o custo.
- (Avaliar) Managed Agents para o bot, se a complexidade justificar.

## Princípios de execução
- **Cada fase entrega valor sozinha** (não construir tudo antes de lançar).
- **Fiabilidade antes de features** (a queixa universal do mercado é a sync).
- **Honestidade e cancelamento fácil desde o dia 1** (evitar o destino da Cleo na FTC).
- **iOS + Android juntos** (não repetir o erro iOS-only do Copilot).
