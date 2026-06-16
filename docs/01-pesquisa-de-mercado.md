# 01 — Pesquisa de Mercado

> Toda a pesquisa abaixo foi feita com fontes de 2025–2026. Números de empresas privadas são auto-reportados salvo indicação; tratá-los como ordens de grandeza.

## 1. O estado do mercado de apps de finanças (2025–2026)

O mercado dividiu-se em três grandes famílias:

1. **PFM puro (gestão de finanças pessoais):** orçamento, património líquido, categorização. Ex.: Monarch, Copilot, YNAB, PocketGuard, Spendee, Wallet, Emma, Snoop.
2. **Apps "com personalidade" / IA:** o chatbot é o produto. Ex.: Cleo.
3. **Neobancos / super-apps:** a conta é o produto, o PFM é um acessório. Ex.: Nubank, Revolut, Plum.

A grande sacudidela foi o **fecho da Mint** (Intuit, março de 2024), que libertou milhões de utilizadores e validou o mercado de assinaturas pagas (o Monarch cresceu ~20× em assinantes no ano seguinte).

## 2. A lição da Mint (porque é que o "grátis com anúncios" morre)

- A Mint tinha **20M+ registos** mas só **~3,6M ativos** (2021) — registo alto, engagement baixo.
- Ganhava como o Credit Karma: **anúncios + comissões de indicação** de cartões/empréstimos. Receita por utilizador fina e **desligada do valor** (orçamentar).
- A Intuit tinha o Credit Karma (comprado por ~8,1 mil milhões USD), com mais utilizadores e melhores dados de crédito → a Mint tornou-se redundante e foi fechada.
- O Credit Karma **não** é substituto real (não tem orçamento por categoria nem gestão de subscrições). Os utilizadores migraram para Monarch (importador de CSV da Mint + campanhas "refugiados da Mint"), Copilot, Rocket Money, YNAB.

**Implicação para nós:** não construir o negócio sobre anúncios/lead-gen. A receita tem de estar ligada ao valor entregue (poupança, controlo, automação).

## 3. Como os que mais faturam ganham dinheiro (o padrão)

A conclusão mais importante de toda a pesquisa: **quem fatura muito tem receita ALÉM da assinatura.**

| App | Motor de receita principal | Número concreto |
|-----|----------------------------|-----------------|
| **Rocket Money** | Assinatura "paga o que quiseres" (~6–12 USD/mês) **+ negociação de contas** | Fica com **35–60% da poupança do 1.º ano** |
| **Cleo** | Assinatura (3 tiers 5,99–14,99 USD) **+ taxa de transferência expresso + cartão** | Taxa expresso **3,99–9,99 USD**/adiantamento; ~300M USD ARR |
| **Nubank** | **Intercâmbio + juros de crédito + empréstimos** | ~16,3 mil M USD receita 2025; custo de servir **~0,80 USD/cliente/mês** |
| **Revolut** | **Tiers de assinatura + FX + juros + cripto + negócio** | Assinaturas ~541M USD (2024); receita ~6 mil M USD (2025) |
| **Empower** | **Taxa de gestão de ativos (AUM)** sobre o dashboard grátis | 0,49–0,89% AUM, mínimo 100k USD |
| **YNAB / Monarch / Copilot / PocketGuard** | **Só assinatura** | 95–199 USD/ano; negócios sólidos mas menores |

Padrões de preço de referência (EUA): assinatura PFM ~**5–15 USD/mês** ou **75–199 USD/ano**; muitos têm **trial** (7–34 dias) e quase nenhum tem tier grátis permanente forte (exceto os de aggregação grátis como Empower/Snoop).

## 4. O que é "table stakes" vs diferenciador (2026)

**Obrigatório (toda a gente tem):**
- Sincronização bancária automática (via aggregador).
- Categorização automática de transações.
- Orçamento por categoria, património líquido, deteção de subscrições.
- Alertas de saldo/gastos.

**Diferenciadores em 2025–2026:**
- **Assistente de IA conversacional** ancorado nos dados do utilizador (Monarch, Cleo, Origin, Plum Plan).
- **Voz + memória de longo prazo** (Cleo 3.0).
- **Conselho de IA regulado** (Origin, primeiro "AI advisor" registado na SEC, set. 2025).
- **Ações agênticas** (Albert "Genius" paga contas e move dinheiro; Wally adiciona transações; Rocket Money cancela subscrições).
- **Motor de poupança automático** (Plum, Bright) — poupa/investe sozinho.

## 5. A queixa universal: fiabilidade da sincronização

Em **todos** os apps de PFM, a queixa nº1 nas reviews é a **sincronização bancária que falha**: Spendee caiu para 2,7★ no Trustpilot por isto; YNAB, PocketGuard (lista oficial de "bancos problemáticos"), Emma ("muito bugado"), Wallet (sincronização que pára após compra vitalícia). A causa raiz é a fragilidade do *screen-scraping* e de tokens que expiram.

**Implicação:** se a nossa captura for **mais fiável** (multi-fonte: Open Banking regulado + notificações + correção fácil), isso é uma vantagem competitiva real, não um detalhe técnico.

## 6. Tendências e janela de oportunidade

- **Pós-Mint:** ainda há utilizadores à procura de casa; o mercado premiou quem facilitou a migração.
- **IA:** passou de "categorização silenciosa" (Copilot) para "assistente que conversa e age" (Cleo, Albert, Plum Plan). É aqui que está a diferenciação de 2026.
- **Open Banking a amadurecer:** PSD3/PSR na Europa (~2027) e regras do Open Finance no Brasil reduzem a fricção de re-consentimento — mas só daqui a uns anos.
- **Risco regulatório:** a multa de 17M USD da FTC à Cleo (mar. 2025) mostra que exagerar capacidades e dificultar cancelamentos custa caro. A regra CFPB 1033 nos EUA está suspensa — bancos podem começar a cobrar pelo acesso aos dados.

## 7. Conclusões acionáveis

1. Construir a receita à volta de **valor entregue** (poupança/automação), com assinatura + pelo menos uma fonte de receita extra planeada.
2. **Fiabilidade da captura** é o nosso campo de batalha — ganhar onde quase todos falham.
3. O **bot de IA** é o diferenciador de 2026 — mas honesto, com ações controladas e cancelamento fácil.
4. Escolher mercado com cuidado: as integrações, custos e regras mudam radicalmente entre Brasil, Portugal/Europa e EUA (ver `05` e `08`).
