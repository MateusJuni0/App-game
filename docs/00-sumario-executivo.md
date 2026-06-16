# 00 — Sumário Executivo

## O problema

Gerir dinheiro à mão é chato e por isso quase ninguém faz. Os apps de finanças mais populares ainda obrigam o utilizador a ligar contas, categorizar gastos e manter tudo atualizado — e a maior parte das pessoas desiste nas primeiras semanas. A própria Mint (20M+ utilizadores registados, mas só ~3,6M ativos antes de fechar em 2024) mostrou que um registo enorme não vale nada se as pessoas não usam.

## A nossa proposta

Um app de finanças pessoais **"automático primeiro"**: o utilizador liga uma vez e o app passa a captar gastos, contas e dívidas **sozinho**, a partir de:

- **Notificações do telemóvel** (alertas de compra/pagamento dos bancos) — Android.
- **Open Banking / Open Finance** (ligação direta e regulada às contas) — Android e iOS.
- **E-mail** (recibos e faturas) e **entrada rápida** assistida (atalho/partilha/voz) como rede de segurança.

E um **bot/assistente de IA** (Claude) que:

- Responde a perguntas em linguagem natural ("quanto gastei em comida este mês?").
- Categoriza, deteta assinaturas duplicadas e contas a vencer, cria lembretes.
- Avisa de forma proativa e "resolve coisas" dentro do app, com a personalidade certa.

## Para quem

Pessoas que querem controlar o dinheiro **sem trabalho manual**. Dois eixos de persona (ver `03-visao-e-proposta.md`):
- O **"não tenho paciência"** — quer ver o saldo real e quanto pode gastar, sem configurar nada.
- O **"endividado/aperto"** — precisa de saber o que deve, quando vence, e como não falhar pagamentos.

## Como ganhamos dinheiro (resumo)

Assinatura é a base, mas **a margem real vem de receita extra** (lição dos que mais faturam):
- Assinatura premium (tiers tipo Cleo/Rocket Money: ~5,99–14,99 USD/mês).
- Funcionalidades de valor: deteção+cancelamento de assinaturas, negociação de contas, alertas de subida de preço.
- (Mais tarde, conforme mercado e licenças) produtos financeiros: poupança, cartão, adiantamento — onde a regulação e o risco compensam.

Detalhe em `09-monetizacao.md`.

## O que aprendemos com o mercado (as 5 lições)

1. **Diversificar receita além da assinatura** é o que separa quem fatura muito (Rocket Money fica com 35–60% da poupança de negociação; Cleo soma assinatura + taxa de transferência expresso + cartão; Nubank/Revolut vivem de intercâmbio, juros e tiers).
2. **A Mint morreu** porque o modelo só-de-anúncios/lead-gen é fraco e desligado do valor para o utilizador; a Intuit consolidou no Credit Karma. → Não construir o negócio em cima de anúncios.
3. **A fiabilidade da sincronização bancária é a queixa nº1 de quase todos** (Spendee 2,7★, YNAB, PocketGuard, Emma, Wallet). → Fiabilidade da captura é uma vantagem competitiva, não um detalhe.
4. **A Cleo provou que um bot com personalidade vende** (~300M USD ARR), mas **levou multa de 17M USD da FTC** por exagerar valores/velocidade de adiantamentos e dificultar cancelamento. → Personalidade sim; honestidade e cancelamento fácil obrigatórios.
5. **Confiança e privacidade são o produto.** Ler notificações/SMS e dados bancários exige consentimento claro, dados no dispositivo sempre que possível, e conformidade (RGPD/LGPD/PSD2). É também um filtro das lojas de apps.

## A realidade incómoda da "automação total" (ler com atenção)

- **iOS:** ler notificações ou SMS de outras apps é **impossível** por design da Apple. No iOS, a automação só pode vir de **Open Banking + e-mail + entrada rápida**.
- **Android:** dá para ler notificações (`NotificationListenerService`) e, com exceção aprovada, SMS — mas:
  - É **frágil** (fabricantes matam serviços em segundo plano; formatos mudam; duplicados).
  - É **arriscado nas políticas da Google Play** (a leitura de SMS é fortemente restrita; a Google muitas vezes recusa dizendo que "introdução manual é a alternativa").
- **Conclusão:** A automação tem de ser **multi-fonte e tolerante a falhas**, com correção manual sempre possível. Nunca prometer "100% automático". Detalhe em `05-automacao-captura-de-dados.md`.

## Stack proposta (resumo)

- **App:** Expo / React Native (TypeScript) — já é a base limpa neste repositório. Build com EAS; módulo nativo + config plugin para o leitor de notificações no Android; dev build (não Expo Go).
- **Backend:** API + base de dados estruturada (Postgres) para transações; o bot usa **text-to-SQL / ferramentas** para somar com exatidão (LLMs não fazem contas fiáveis).
- **IA:** API da Claude. Routing de modelos por custo (Haiku para categorizar, Sonnet para conversa, Opus/Fable para raciocínio difícil), **prompt caching** para baixar custo, **tool use** para o bot ler dados e agir.

Detalhe em `07-arquitetura-tecnica.md` e `06-bot-assistente-ia.md`.

## Decisões que dependem de ti, chefe

A principal: **mercado primário (Brasil vs Portugal/Europa)** — muda integrações, idioma e até a viabilidade da automação por notificações. Lista completa em `11-riscos-e-decisoes.md`.
