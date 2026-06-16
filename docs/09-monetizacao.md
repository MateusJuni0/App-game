# 09 — Monetização e Negócio

> Princípio central (lição do mercado): **assinatura é a base, mas a margem real vem de receita ALÉM da assinatura.** E nunca construir sobre anúncios (matou a Mint).

## 1. Modelo recomendado: freemium + assinatura + receita de valor

### Tier grátis (funil)
- Captura básica (entrada rápida + 1 conta Open Banking + notificações no Android).
- Bot com limite de mensagens/mês.
- Categorização e visão geral.
- Objetivo: provar valor rápido, criar hábito (modelo Nubank: entra grátis, monetiza depois).

### Assinatura Premium
Referências de preço do mercado (escolher conforme país/poder de compra):
- EUA/UE: **~5,99–14,99 USD/€/mês** ou **~75–199/ano**.
- Brasil: ajustar ao poder de compra local (ex.: R$ mais baixos; ver concorrência local).
- Premium desbloqueia: contas ilimitadas, bot ilimitado, deteção+gestão de subscrições, insights avançados, resumos, partilha familiar.
- **Trial** 7–34 dias. **Cancelamento em 1 toque** (obrigatório — lição FTC/Cleo).

### Receita de valor (a margem real — faseada)
1. **Deteção + cancelamento de subscrições** (incluído no Premium; gancho de retenção como Rocket Money).
2. **Negociação de contas** (futuro): modelo Rocket Money — ficamos com **% da poupança do 1.º ano** (eles cobram 35–60%; o utilizador escolhe a %). Só ganhamos se o utilizador poupar → incentivos alinhados. **Ser ultra-transparente** (é a maior queixa deles).
3. **Produtos financeiros** (futuro distante, com licenças): poupança remunerada, cartão (intercâmbio), adiantamento — onde a regulação e o risco compensem. É como Nubank/Cleo/Revolut fazem margem.

## 2. O que NÃO fazer
- **Anúncios / venda de dados** como motor (Mint morreu disto; mata a confiança que é o nosso produto).
- **Exagerar capacidades** para vender (SEC multou "AI-washing"; FTC multou a Cleo).
- **Adiantamentos enganosos** (a multa de 17M USD da Cleo foi exatamente por valores/velocidade exagerados).

## 3. Unit economics — as variáveis que decidem o lucro

O custo por utilizador é dominado por:

1. **Custo do aggregador Open Banking (recorrente, por conta ligada):**
   - UE: GoCardless ~grátis (se reabrir registos) ou Plaid/Tink por orçamento.
   - Brasil: **Pluggy ~R$2.500/mês base** (não há produção grátis).
   - EUA: Plaid pay-as-you-go (Transações ~0,30–0,60 USD por Item/mês, valores de revenda).
   - → No tier grátis, cada conta ligada tem **custo contínuo**. Limitar contas no grátis.
2. **Custo da IA (Claude):** controlável com prompt caching (~90% off no repetido) + routing de modelos (Haiku/Sonnet/Opus) + batch (50%). Ver `06`. Pode chegar a ~95% de poupança no conteúdo repetido.
3. **Custo de conformidade:** CASA (se Gmail), licenças, legal. Ver `08`.

**Implicação:** o tier grátis tem de ter limites (nº de contas Open Banking, nº de mensagens do bot) para o custo não explodir. A conversão para Premium tem de cobrir o custo do aggregador + IA com folga.

## 4. Referências de escala (para calibrar expectativas)
- Cleo: ~300M USD ARR (chatbot + adiantamentos + cartão).
- Monarch: 75M USD levantados a 850M USD de avaliação (só assinatura, pós-Mint).
- Nubank: custo de servir **~0,80 USD/cliente/mês** — a barra de eficiência a perseguir.
- Rocket Money: >700 USD/ano de poupança média anunciada por utilizador (a história que vende).

## 5. Estratégia de preços inicial (proposta a validar)
- **Grátis:** 1 conta Open Banking + notificações (Android) + entrada rápida + bot limitado.
- **Premium (~mensal/anual ajustado ao país):** tudo ilimitado + gestão de subscrições + insights + resumos.
- **Receita de valor:** ativar negociação de contas na fase 2-3, com transparência total.
- Decisão de preço final depende do **mercado** (ver `11`).
