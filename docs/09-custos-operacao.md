# 09 — Custos de Operação (app privado, sem mensalidades)

> **Mudança de rumo:** o app **não é para vender**. É nosso e da família, **sem mensalidades, sem anúncios, sem receita**. Por isso o objetivo aqui não é ganhar dinheiro — é **gastar o mínimo possível** para manter o app a funcionar para uma família.

A boa notícia: para uma família (digamos 2 a 8 pessoas), o custo pode ser **quase zero** ou uns poucos euros por mês. Aqui está a conta, item a item.

## 1. Open Banking (ligar os bancos) — o maior custo potencial, mas grátis à nossa escala

- Em Portugal, ligar contas via **GoCardless Bank Account Data (ex-Nordigen)** tem um **tier de produção GRÁTIS de ~50 contas ligadas por período de 30 dias**. Uma família inteira cabe folgadamente nisto (cada pessoa tem 1–3 contas → mesmo 8 pessoas ≈ 24 contas << 50).
- ⚠️ **Risco a verificar:** a GoCardless parou de aceitar **novos registos** ~jul. 2025. **Primeira tarefa prática:** confirmar se conseguimos abrir conta. Se não:
  - **Plano B:** Tink / TrueLayer / Salt Edge / Plaid (Europa) — têm custo por orçamento, mas para uma família o volume é minúsculo (negociável, ou tier de avaliação).
  - **Plano C:** começar só com **leitura de notificações (Android) + entrada rápida**, sem Open Banking, e adicionar quando resolvermos o aggregador. O app é útil mesmo assim.
- Cobertura PT: CGD, Millennium BCP, Santander Totta, Novo Banco, etc. (via SIBS/Berlin Group).

## 2. IA do bot (Claude API) — cêntimos por mês para uma família

- O custo da IA escala com o uso. Uma família faz, no máximo, dezenas a centenas de mensagens/mês ao bot — ínfimo.
- Alavancas que já estão no plano (`docs/06`): **prompt caching** (~90% off no conteúdo repetido), **routing** (categorização no Haiku barato, conversa no Sonnet), **batch** (50% off no trabalho noturno).
- Estimativa de ordem de grandeza: **bem abaixo de 5 €/mês** para uma família com uso normal. A categorização automática de transações (a maior fatia) corre no modelo mais barato e em lote.

## 3. Backend / hosting — grátis a baixo

- Para uma família, um backend pequeno chega: **Supabase** (tier grátis generoso: Postgres + auth + realtime + storage) ou um VPS minúsculo (~5 €/mês). O doc `16-multiplataforma-e-ux.md` aprofunda a escolha.
- Sincronização entre dispositivos da família cabe no tier grátis.

## 4. Lojas de apps — opcional

- **iPhone:** para instalar nos telemóveis da família sem publicar na App Store, há **TestFlight** (até 100 testers internos, grátis) ou distribuição ad-hoc. Publicar na App Store exige **Apple Developer Program (99 USD/ano)** — só se quisermos a experiência "normal". Para família, TestFlight chega.
- **Android:** instalar o APK/AAB diretamente (sideload) ou via canal interno é grátis. **Google Play Developer** é uma taxa única de 25 USD se quisermos publicar — opcional.
- **Navegador:** a versão web (PWA) não precisa de loja nenhuma — acede-se por URL e pode "instalar-se" no ecrã inicial. Custo: só o domínio (~10 €/ano, opcional) e o hosting (acima).

## 5. Resumo de custos (cenário família realista)

| Item | Custo mensal | Notas |
|------|-------------|-------|
| Open Banking (GoCardless) | **0 €** | Tier grátis 50 contas/30 dias (se conseguirmos registo) |
| Claude API (bot + categorização) | **< 5 €** | Com caching + routing + batch |
| Backend/hosting (Supabase free / VPS) | **0–5 €** | Tier grátis chega para família |
| Domínio (opcional) | **~1 €** | ~10 €/ano se quisermos URL bonito |
| Apple Developer (opcional) | **~8 €** | 99 USD/ano só se publicarmos na App Store; TestFlight é grátis |
| **Total realista** | **~0–15 €/mês** | Provavelmente perto de 0 no início |

## 6. Implicações de design (porque não há receita)

Não vender muda decisões para melhor:
- **Sem tier grátis vs pago** — toda a gente tem tudo. Sem paywalls, sem upsell, sem "Premium".
- **Sem anúncios, sem vender dados** — a privacidade é total e por defeito.
- **Sem pressão de crescimento** — otimizamos para a **nossa família** gostar e usar, não para métricas de mercado.
- **Foco em custos baixos** — preferir tiers grátis, processar no device quando der, ser eficiente com a IA.
- As funcionalidades de "receita" do plano antigo (negociação de contas por comissão) **saem**; o que fica é o **valor puro** (poupar, controlar, automatizar) sem motivo comercial escondido.
