# App de Finanças Automático — Especificação Completa

> Documento vivo. Fase atual: **estudo e especificação** (sem código de produto ainda).
> Autor: sessão de pesquisa com Claude. Data: 2026-06-16.
> Mercado-alvo a confirmar pelo chefe (ver `11-riscos-e-decisoes.md`).

Este repositório deixou de ser o jogo do impostor (já limpo) e passa a ser a base do **novo app de finanças / gestão de dinheiro**. O objetivo desta pasta é registar TODA a cascata de pensamento, pesquisa e decisões antes de escrever uma linha de código de produto.

## A grande ideia (resumo de uma linha)

Um app de finanças **automático ao máximo** — que captura os gastos e dívidas sozinho (lendo notificações do banco, ligações Open Banking, etc.) para o utilizador quase nunca ter de adicionar nada à mão — com um **bot/assistente de IA** (Claude) que responde, organiza e resolve tarefas dentro do app.

## Como ler estes documentos

Lê por esta ordem. Cada um é independente, mas constroem uns sobre os outros.

| # | Documento | O que responde |
|---|-----------|----------------|
| 00 | [Sumário executivo](./00-sumario-executivo.md) | O quê, porquê, para quem, e o resumo de tudo |
| 01 | [Pesquisa de mercado](./01-pesquisa-de-mercado.md) | Como é o mercado, a lição da Mint, como os apps que mais faturam ganham dinheiro |
| 02 | [Análise de concorrentes](./02-analise-de-concorrentes.md) | Perfil detalhado de 14 apps (Rocket Money, Cleo, Monarch, Nubank, Revolut, etc.) |
| 03 | [Visão e proposta](./03-visao-e-proposta.md) | Missão, posicionamento, persona, princípios, proposta única de valor (visão 360°) |
| 04 | [Funcionalidades](./04-funcionalidades.md) | Catálogo de features priorizado (MVP vs futuro) |
| 05 | [Automação e captura de dados](./05-automacao-captura-de-dados.md) | O coração do app: notificações, SMS, Open Banking, e-mail, Pix. A realidade das políticas |
| 06 | [Bot assistente de IA](./06-bot-assistente-ia.md) | O bot: o que faz, personalidade, arquitetura Claude, tool use, guardrails, custos |
| 07 | [Arquitetura técnica](./07-arquitetura-tecnica.md) | Stack (Expo/RN), backend, modelo de dados, sincronização, offline |
| 08 | [Segurança, privacidade e conformidade](./08-seguranca-privacidade-conformidade.md) | LGPD/RGPD, PSD2, políticas da Google Play, criptografia, CASA |
| 09 | [Monetização e negócio](./09-monetizacao.md) | Como ganhamos dinheiro, preços, unit economics |
| 10 | [Roadmap](./10-roadmap.md) | Fases, MVP, marcos |
| 11 | [Riscos e decisões pendentes](./11-riscos-e-decisoes.md) | O que pode correr mal + decisões que preciso de ti, chefe |

## Conclusões que saltam à vista (TL;DR para leres primeiro)

1. **A "captura automática lendo notificações" é viável no Android, mas frágil e politicamente arriscada.** No iOS é **impossível** por design. A Google permite hoje uma exceção ("SMS-based money management") mas aprova caso-a-caso e muitas vezes recusa dizendo que "introdução manual é a alternativa". → A automação tem de assentar em **várias fontes** (notificações + Open Banking + e-mail + entrada rápida manual), não numa só.
2. **Quem mais fatura não ganha (só) com assinaturas.** Ganha com receita extra: negociação de contas (Rocket Money fica com 35–60% da poupança do 1.º ano), adiantamento de dinheiro (Cleo), juros/intercâmbio (Nubank, Revolut). A Mint morreu porque o modelo só-de-anúncios é fraco.
3. **O bot é um diferenciador real e barato de operar.** A Cleo construiu um negócio de ~300M USD/ano de ARR à volta de um chatbot com personalidade. Com a API da Claude (tool use + prompt caching) dá para fazer um assistente que lê os dados do utilizador e age — com custo controlado.
4. **Decisão #1 que preciso de ti:** mercado primário — **Brasil** (Pix, Open Finance, cultura de ler SMS/notificações do banco) ou **Portugal/Europa** (PSD2, MB Way, Open Banking)? Isto muda integrações, idioma e até a viabilidade da automação. Ver `11-riscos-e-decisoes.md`.
