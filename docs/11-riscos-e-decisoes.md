# 11 — Riscos e Decisões Pendentes

> Lê isto, chefe. Aqui está o que pode correr mal e, sobretudo, **as decisões que preciso de ti** para avançar.

## PARTE A — Decisões que dependem de ti

### Decisão #1 (a mais importante): Mercado primário
Muda integrações, idioma, custos, regras e **até a viabilidade da automação por notificações**.

| Opção | A favor | Contra |
|-------|---------|--------|
| **Brasil** | Cultura de ler SMS/notificações do banco (a automação encaixa); Pix; Open Finance profundo (mandatado). Mercado enorme. | Aggregador tem **custo-base (~R$2.500/mês, Pluggy)**; sem produção grátis; reformas 2026 apertam dados. |
| **Portugal/Europa** | PSD2 maduro; **GoCardless ~grátis** (se reabrir registos); RGPD claro. | Re-consentimento a cada 180 dias (fricção); ler notificações é menos cultural (cá usa-se mais Open Banking); MB Way sem feed dedicado. |
| **EUA** | Plaid self-serve sem mínimo; mercado rico. | Regra CFPB suspensa → bancos podem cobrar pelo acesso; muito concorrido. |

> O teu vocabulário ("telemóvel", "câmara") sugere **Portugal/Europa**. Mas o pedido de "ler notificações quando for dívida" encaixa **muito melhor no Brasil** (lá os bancos mandam alerta por cada transação; na Europa a norma é Open Banking). **Preciso que confirmes.** A minha recomendação: escolher **um** mercado primário para o MVP e desenhar a captura à volta dele — Brasil se a leitura de notificações é mesmo central; Portugal/Europa se preferes assentar em Open Banking.

### Decisão #2: Plataformas no MVP
- Recomendação: **iOS + Android juntos** (erro do Copilot foi iOS-only). Mas a **leitura de notificações só existe no Android** — no iOS a automação é Open Banking + e-mail + entrada rápida. Confirmas iOS+Android, ou Android-first (para maximizar a automação por notificações)?

### Decisão #3: Quão central é a leitura de notificações?
- É o teu pedido explícito, mas é a parte **mais frágil e arriscada** (ver `05`). É um **extra** sobre o Open Banking, ou queres que seja o **destaque** do produto? (Recomendo extra; o destaque deve ser "automático e fiável", não uma técnica específica.)

### Decisão #4: Modo de receita inicial
- Só assinatura no início (mais simples), ou já planear negociação de contas / receita de valor cedo? (Recomendo assinatura no MVP, receita de valor na fase 3.)

### Decisão #5: Nome, marca e personalidade do bot
- Nome do app? Tom do bot (prático? divertido tipo Cleo? ambos com opção)?

## PARTE B — Riscos e mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|:---:|:---:|-----------|
| Google recusa leitura de SMS / remove app | Alta | Médio | Não depender de SMS; build sem SMS pronto; usar notificações + Open Banking |
| Notificações pouco fiáveis (OEMs matam serviço) | Alta | Médio | Multi-fonte + reconciliação; comunicar honestamente; correção fácil |
| iOS não permite captura por notificação/SMS | Certa | Médio | Open Banking + e-mail + entrada rápida no iOS |
| Custo do aggregador come a margem | Média | Alto | Limitar contas no grátis; converter para Premium; escolher aggregador certo |
| Re-consentimento (180 dias/12 meses) causa drop-off | Alta | Médio | UX de relink dedicada; lembretes antes de expirar |
| Bot diz algo errado/vinculativo (Air Canada) | Média | Alto | Números só por SQL; citar origem; disclaimers; logging; lado informativo |
| Multa por exagerar/cancelamento difícil (Cleo/FTC) | Média | Alto | Honestidade radical; cancelamento em 1 toque |
| GoCardless não reabre registos grátis (UE) | Média | Médio | Plano B: Tink/Salt Edge/Plaid (custo) |
| Custo/atraso da verificação CASA (Gmail) | Média | Médio | Começar por alias de reencaminhamento; Gmail só se justificar |
| Biblioteca de notificações desatualizada (2022) | Alta | Baixo | Fork/patch para Android atual; orçamentar manutenção |
| Concorrência (Cleo, Rocket Money, locais como Nubank) | Alta | Médio | Diferenciar por automação multi-fonte fiável + bot honesto |

## PARTE C — O que está validado vs por validar

**Validado pela pesquisa:**
- Viabilidade técnica da leitura de notificações no Android (com ressalvas).
- Impossibilidade no iOS.
- Realidade das políticas Google Play (SMS restrito; exceção existe mas é incerta).
- Custos e cobertura dos aggregadores por região.
- Padrões de monetização e guardrails legais do bot.
- Arquitetura do bot (números via SQL, prompt caching, routing).

**Por validar (próximos passos depois das tuas decisões):**
- Aggregador concreto + custos reais (precisam de contacto comercial/sandbox).
- Se GoCardless reabriu registos grátis (UE).
- Templates de parsing dos bancos específicos do mercado escolhido.
- Preço final ajustado ao poder de compra do mercado.
- Estado exato da exceção de SMS no momento da submissão à Play.

## Próximo passo concreto
Responde às **5 decisões da Parte A** (sobretudo o **mercado**) e eu avanço para:
1. Escolher e configurar o aggregador (sandbox).
2. Montar o esqueleto do backend + modelo de dados.
3. Construir o MVP da Fase 1 (captura Open Banking + entrada rápida + ver gastos).
