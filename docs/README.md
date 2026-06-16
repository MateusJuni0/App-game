# CM eTech Finanças — Especificação Completa

> **App de finanças da família.** Nome: **CM eTech Finanças**.

> Documento vivo. Fase atual: **estudo e desenho** (sem código de produto ainda).
> **App privado da família — sem venda, sem mensalidades, sem anúncios.** Portugal. Android + iPhone + navegador.
> Autor: sessão de pesquisa com Claude. Atualizado: 2026-06-16.

Este repositório deixou de ser o jogo do impostor (já limpo) e passa a ser a base do **app de finanças da nossa família**. O objetivo desta pasta é registar TODA a pesquisa, o desenho e as decisões antes de escrever uma linha de código de produto — para o chefe ver o produto inteiro desenhado e não andar a corrigir área a área.

## A grande ideia (uma linha)

O **app de finanças da família**: capta os gastos e dívidas quase sozinho (notificações + Open Banking + e-mail + entrada rápida), é **bonito em qualquer ecrã** (gráficos elegantes, modo escuro, animações com bom gosto), tem um **bot de IA** (Claude) que responde e resolve coisas, e é **da família** (partilha com privacidade) — para deixarmos de precisar de apps de fora.

## Como ler (ordem sugerida)

### Bloco 1 — Estratégia e o quê
| # | Documento | O que responde |
|---|-----------|----------------|
| 00 | [Sumário executivo](./00-sumario-executivo.md) | O quê, porquê, resumo de tudo |
| 01 | [Pesquisa de mercado](./01-pesquisa-de-mercado.md) | Como é o mercado, a lição da Mint (contexto) |
| 02 | [Análise de concorrentes](./02-analise-de-concorrentes.md) | 14 apps em detalhe (o que copiar / evitar) |
| 03 | [Visão e proposta](./03-visao-e-proposta.md) | Missão, família, princípios, visão 360° |
| 04 | [Funcionalidades](./04-funcionalidades.md) | Catálogo priorizado (MoSCoW) |

### Bloco 2 — Como funciona
| # | Documento | O que responde |
|---|-----------|----------------|
| 05 | [Automação e captura de dados](./05-automacao-captura-de-dados.md) | Notificações, Open Banking, e-mail, entrada rápida; realidade das políticas |
| 06 | [Bot assistente de IA](./06-bot-assistente-ia.md) | Claude: tool use, números via SQL, custos, guardrails |
| 07 | [Arquitetura técnica](./07-arquitetura-tecnica.md) | Stack, modelo de dados (ver também 16) |
| 08 | [Segurança e privacidade](./08-seguranca-privacidade-conformidade.md) | RGPD, PSD2, políticas das lojas, cifra |
| 09 | [Custos de operação](./09-custos-operacao.md) | Sem mensalidades: como manter ~0 €/mês |
| 18 | [Pagar contas (MB Way / Multibanco)](./18-pagamentos-mbway-multibanco.md) | Estudo a fundo: o que dá, o que precisa de licença, plano realista |

### Bloco 3 — Design (o "tudo bonito e desenhado")
| # | Documento | O que responde |
|---|-----------|----------------|
| 12 | [Design system](./12-design-system.md) | Cores, tipografia, espaçamento, modo escuro, movimento |
| 13 | [Visualização de dados](./13-visualizacao-de-dados.md) | Que gráfico para cada coisa + bibliotecas |
| 14 | [Funcionalidades inovadoras](./14-funcionalidades-inovadoras.md) | "Como é que eu melhoro isto" — padrão vs nossa versão |
| 15 | [Família e multi-utilizador](./15-familia-multiutilizador.md) | Partilha, privacidade granular, jovens/mesadas |
| 16 | [Multi-plataforma e UX](./16-multiplataforma-e-ux.md) | Expo iOS+Android+web, bibliotecas, backend, UX mobile |
| 17 | [Ecrãs e fluxos](./17-ecras-e-fluxos.md) | **Tudo desenhado, ecrã a ecrã** |

### Bloco 4 — Plano
| # | Documento | O que responde |
|---|-----------|----------------|
| 10 | [Roadmap](./10-roadmap.md) | Fases, MVP, ordem de construção |
| 11 | [Decisões e riscos](./11-riscos-e-decisoes.md) | O que já decidiste + o que pode correr mal |

## Conclusões que saltam à vista (TL;DR)

1. **Sem vender = melhor produto.** Sem paywalls, sem anúncios, sem vender dados, privacidade total. Podemos combinar o melhor de 3–4 apps numa só feature (ver `14`), coisa que os comerciais não fazem porque separam tudo em tiers pagos.
2. **Custo quase-zero para uma família** (~0–15 €/mês): Open Banking no tier grátis, IA em cêntimos, backend grátis (ver `09`).
3. **Automação multi-fonte e tolerante a falhas.** iPhone não lê notificações (limite Apple) → Open Banking + e-mail + entrada rápida; Android lê notificações como extra. Nunca prometer "100% automático" (ver `05`).
4. **Bonito é requisito, não luxo.** Design system completo (`12`), gráficos elegantes e interativos (`13`), e tudo desenhado ecrã a ecrã (`17`). Stack: Expo (iOS+Android+web) + NativeWind + Supabase + PowerSync (`16`).
5. **Família com privacidade granular** (3 níveis por conta + esconder transação + propriedade meu/dele/nosso) — resolve a lacuna do Monarch/YNAB (`15`).
6. **A nossa stack de inovação** (`14`): "seguro por dia até ao ordenado", "runway" com aviso de saldo negativo, radar de subscrições com interceção pré-cobrança, bot com tom ajustável, objetivos que se enchem sozinhos no payday.

## Estado e próximo passo

Fase de **estudo e desenho** — concluída a especificação completa (00–17). A seguir, quando o chefe der luz verde: confirmar o aggregador Open Banking (GoCardless/Tink), montar o esqueleto Expo + Supabase com RLS por família, e construir o MVP da Fase 1 (ver `10`). Decisões pequenas pendentes (nome do app, etc.) em `11`.
