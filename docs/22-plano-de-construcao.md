# 22 — Plano de Construção para Subagentes (build-ready)

> Para quando chegares a casa: **não precisas de pesquisar nada.** Cada tarefa abaixo é uma unidade que podes entregar a um subagente, com os documentos que ele deve ler e as dependências. Faz os workstreams pela ordem; dentro de cada um, o que está marcado **∥** pode correr em paralelo.
>
> **Stack fixada** (ver `16`): Expo + React Native + TypeScript + expo-router · NativeWind (tema = tokens do `12`) · Supabase (Postgres + Auth + Realtime + Storage, RLS por família) · PowerSync ou WatermelonDB (offline) · FlashList, Reanimated, Skia/Victory Native/wagmi-charts (gráficos) · Claude API (bot). **Tudo em tiers grátis** (decisão do chefe, `09`/`11`). Dev build via EAS (não Expo Go).

## Como usar isto
- Cada **Tarefa** = um prompt de subagente: "Lê os docs X; constrói Y; critérios de aceitação Z."
- **Não criar contas pagas.** Contas/registos (Supabase, aggregador, Apple/Google dev) só nesta fase e só tiers grátis.
- Ordem global: **0 → 1 → 2 → 3 → 4** são fundação (sequencial). De **5** em diante, muitos correm em paralelo.

---

## WS0 — Setup do projeto (fundação, primeiro)
- **T0.1** Configurar Expo + expo-router + TypeScript na base limpa; EAS (dev build); estrutura de pastas (`app/`, `components/`, `features/`, `lib/`, `theme/`). Ler: `16`, `07`.
- **T0.2** Instalar e configurar **NativeWind**; mapear os **tokens do `12`** (cores, espaçamento, raios, tipografia, modo escuro) para o tema. Saída: `theme/tokens.ts` + config. Ler: `12`.
- **T0.3** Configurar i18n (pt-PT) e `Intl.NumberFormat`/formatadores EUR (`formatEUR`, `formatCompactEUR`, tabular nums). Ler: `13` §6.
- **T0.4 ∥** ESLint/Prettier, scripts, CI básico (lint+typecheck).

## WS1 — Design system / biblioteca de componentes
Ler: `12`, `13`, `17`. Saída: componentes reutilizáveis com os tokens.
- **T1.1** Primitivos: `AppText` (com `maxFontSizeMultiplier`, tabular nums), `Card`, `Button`, `Input`, `Sheet` (bottom sheet), `Chip`, `ProgressBar`, `Skeleton` (shimmer), `EmptyState`, `Avatar`, ícones (Lucide + SF Symbols).
- **T1.2 ∥** `Money` (componente de valor: símbolo/cêntimos de-enfatizados, sinal `−` U+2212, cor semântica + sinal/ícone), `CategoryChip` (ícone+cor, doc 20).
- **T1.3 ∥** Micro-interações/hápticos (Reanimated, Moti, expo-haptics; respeitar Reduce Motion). Ler `12` §7.
- **T1.4 ∥** Modo escuro completo + alternância.

## WS2 — Camada de dados
Ler: `21`, `20`, `15`, `16`.
- **T2.1** Migrations Supabase: todas as tabelas do `21`. 
- **T2.2** **RLS por `household_id`** + privacidade por conta/transação + papel `supervised`. Testes de RLS.
- **T2.3** **Seed das categorias+ícones PT** (doc 20) como dados de sistema.
- **T2.4** Vistas/funções de agregação (saldo, seguro-para-gastar, gasto por categoria, orçamento vs real, património, runway, comparativo). Ler `14`.
- **T2.5** Offline-first: PowerSync/WatermelonDB → SQLite local; regras de sync por família; transações append-only + `dedup_key`. Ler `16`/`21`.

## WS3 — Auth + Família + Onboarding
Ler: `15`, `17` §1, `16` §4.
- **T3.1** Supabase Auth (magic link / email+password + Apple + Google via expo-auth-session); `LargeSecureStore` para tokens.
- **T3.2** Modelo família: criar família, convidar membros (link), papéis (admin/member/supervised), privacidade por conta.
- **T3.3** Fluxo de onboarding (boas-vindas → conta → intenção → ligar/“mais tarde” → aha). Estados vazios. Ler `17` §1, §10.

## WS4 — Navegação + esqueleto de ecrãs
Ler: `17`, `16`.
- **T4.1** Navegação: tabs no telemóvel, sidebar+master-detail no navegador (responsivo). 
- **T4.2** Esqueleto de todos os ecrãs do `17` (rotas + placeholders) para ligar a seguir.

## WS5 — Transações (∥ a partir daqui)
Ler: `17` §2-3, `21`, `05`, `20`.
- **T5.1** Lista (FlashList, agrupada por data, logótipos/fallback ícone, cor semântica) + pesquisa/filtros.
- **T5.2** Detalhe (categoria editável, dono meu/dele/nosso, dividir, nota, anexar recibo, excluir do orçamento, recorrente, comentários).
- **T5.3** **Captura — entrada rápida** (atalho/partilha/voz/widget; auto-preenchimento por GPS "Local Payee"). Ler `05`/`14`.
- **T5.4** **Captura — notificações Android** (módulo nativo + config plugin + Headless JS; parsers dos bancos; reconciliação; só Android). Ler `05`.
- **T5.5** **Categorização automática** (regras + IA Haiku em lote; níveis de confiança; auto-aplicar alta, confirmar baixa; correção vira regra partilhada). Ler `14`/`06`.
- **T5.6** **Deduplicação/reconciliação** multi-fonte (push/SMS/openbanking). Ler `05`.
- **T5.7 ∥** OCR de recibo → casar com transação (não duplicar). Ler `14`.

## WS6 — Orçamentos + Seguro-para-gastar
Ler: `17` §4, `14`, `21`.
- **T6.1** Orçamento (Flex/Categoria/Grupo, rollover, sugestões do histórico, alertas 85%/over).
- **T6.2** Número-herói "Seguro para gastar" + pacing (ideal vs real, cor) + "por dia até ao ordenado" (deteção do ordenado).

## WS7 — Contas a pagar + Runway + Lembretes
Ler: `14`, `17` §5/§8b, `18`.
- **T7.1** Deteção de recorrentes/subscrições (stream; early detection; subida de preço; duplicados família).
- **T7.2** Calendário/Runway (saldo projetado dia-a-dia + aviso de dia negativo + BNPL).
- **T7.3** Lembretes de contas a vencer (notificação local/push).
- **T7.4** **Pagar conta (handoff assistido)**: ecrã com copiar campos + abrir banco/MB Way + QR opcional + degrau PIS atrás de feature-flag (`PaymentHandoff`). Ler `18`.

## WS8 — Objetivos / poupança
Ler: `14`, `15`, `21`.
- **T8.1** Objetivos (meta+prazo, imagem, partilhados, contribuições, celebração).
- **T8.2 ∥** Regras automáticas: round-ups, % do ordenado no payday, pots bloqueados; "idade do dinheiro".

## WS9 — Gráficos / visualização
Ler: `13`. Saída: componentes de gráfico reutilizáveis.
- **T9.1** Linha/área (gradiente, curveMonotoneX, scrub+háptico estilo Robinhood), barras (cantos arredondados), donut/bullet, sparkline, heatmap de calendário, waterfall. Modo escuro + acessibilidade ("ver como tabela").

## WS10 — Bot assistente (Claude)
Ler: `06`, `14`, `21`.
- **T10.1** Backend do bot: Messages API + **tool use** (`query_transactions`, `list_subscriptions`, `get_upcoming_bills`, `create_reminder`, `flag_subscription`, `prepare_payment`); **números via SQL/funções** (nunca o LLM). Routing de modelos + prompt caching + batch.
- **T10.2** Guardrails (disclaimers, citar transações, audit log, refusal handling). 
- **T10.3** UI de chat (texto+voz, dial de tom esperto/simpático/atrevido, nudges proativos com 1-toque). Ler `17` §7.

## WS11 — Família: partilha, privacidade, jovens
Ler: `15`.
- **T11.1** Perspetivas (eu/partilhado/família), atribuição, divisões, "quem pagou o quê", comentários.
- **T11.2 ∥** Variante jovens (mesada, tarefas, objetivos, tom educativo, supervisão).

## WS12 — Notificações / nudges
Ler: `04` (regras), `21`.
- **T12.1** Motor de nudges (relevância, limites de frequência, horas de silêncio, canais separados fraude/atividade/orçamento/conta/família). Comparativo "vs mês passado até hoje" anómalo.

## WS13 — Extras / delight
Ler: `14`.
- **T13.1 ∥** Widgets (seguro-para-gastar, contas a vencer), ecrã de bloqueio/Live Activity, atalhos Siri/Botão de Ação.
- **T13.2 ∥** "Trip Mode" (viagem auto-detetada, mesada diária, FX honesto), relatório mensal/anual "Ano em Dinheiro".

## WS14 — Definições, segurança, acessibilidade, i18n
Ler: `12` (acessibilidade), `08`, `17` §9.
- **T14.1** Definições (perfil, segurança/biometria/2FA/bloqueio, contas ligadas, categorias/regras, notificações, família, dados/exportar/apagar, aparência).
- **T14.2 ∥** Passagem de acessibilidade (WCAG 2.2 AA: contraste, dynamic type, leitores de ecrã com labels de montante, alvos 44/48). Ler `12`.

## WS15 — QA, build, distribuição
- **T15.1** Testes (unidade nas funções de agregação/dedup/categorização; e2e dos fluxos-chave).
- **T15.2** Build EAS; distribuição: iPhone via TestFlight, Android sideload, web (PWA) por URL. Ler `09`.

---

## Sugestão de execução com subagentes
1. Tu (ou um agente coordenador) corre **WS0–WS4** em sequência (fundação).
2. Depois, abre subagentes em paralelo por workstream (WS5, WS6, WS7, WS8, WS9 podem andar ao mesmo tempo; WS10 depende de WS2+WS5; WS11 depende de WS3+WS5).
3. Cada subagente recebe: "Lê `docs/<n>` ... constrói `WS_.T_` ... critérios de aceitação ...". Os documentos `00–21` são a fonte única — **não é preciso pesquisar mais nada**.
4. Integra, testa (WS15), distribui.

> Tudo desenhado. Quando chegares a casa, é abrir os subagentes e construir do início ao fim.
