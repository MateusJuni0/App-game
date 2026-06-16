# 09 — Custos de Operação (app privado, sem mensalidades)

> **Mudança de rumo:** o app **não é para vender**. É nosso e da família, **sem mensalidades, sem anúncios, sem receita**. Por isso o objetivo aqui não é ganhar dinheiro — é **gastar o mínimo possível** para manter o app a funcionar para uma família.

> **Regra do chefe (decidida):** **NADA de serviços pagos.** Só usamos o que for **grátis**. Não criamos contas/registos no planeamento — só na fase de construção, e mesmo aí, só tiers grátis. Se uma funcionalidade só existir paga, **fica de fora** (ou espera por alternativa grátis). O objetivo é **0 €/mês**.

A boa notícia: para uma família (2 a 8 pessoas), dá mesmo para correr a **~0 €/mês** usando só tiers grátis. Aqui está a conta, item a item.

## 1. Open Banking (ligar os bancos) — o maior custo potencial, mas grátis à nossa escala

- O **GoCardless Bank Account Data (ex-Nordigen)** tinha um tier de leitura grátis (~50 contas/30 dias) — perfeito para uma família. **⚠️ MAS está confirmado que fechou a novos registos em jul. 2025** (ver `18`). Ou seja: **mesmo a leitura grátis deixou de estar disponível para projetos novos.**
- Consequência prática (caminhos, do mais barato ao mais caro):
  - **Plano A (sem custo):** começar **sem Open Banking** — **leitura de notificações (Android) + entrada rápida + handoff de pagamentos assistido**. O app é genuinamente útil assim (lembretes, "seguro para gastar" com entrada manual, preparar contas para pagar). **Zero euros.**
  - **Plano B (custo a confirmar):** um aggregador AIS pago (Tink / Salt Edge) para leitura automática das contas — preços são "sales-led" (sem números públicos), mas o volume de uma família é minúsculo; a negociar. Iniciar pagamentos (PIS) **não entra** (ver `18`).
  - **Plano C:** ver se a GoCardless reabre registos, ou se há outro tier grátis de leitura na UE.
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
| Open Banking (leitura) | **0 € (Plano A) ou a orçamentar** | GoCardless grátis fechou a novos registos; Plano A é sem Open Banking; Plano B é aggregador pago (volume família é mínimo) |
| Claude API (bot + categorização) | **< 5 €** | Com caching + routing + batch |
| Backend/hosting (Supabase free / VPS) | **0–5 €** | Tier grátis chega para família |
| Domínio (opcional) | **~1 €** | ~10 €/ano se quisermos URL bonito |
| Apple Developer (opcional) | **~8 €** | 99 USD/ano só se publicarmos na App Store; TestFlight é grátis |
| **Total realista** | **~0 €/mês** | Tudo em tiers grátis |

> **O único item que não é estritamente grátis** é a **API da Claude** (pagamento por uso — cêntimos/mês para uma família). Como o chefe quer "só grátis", há 3 saídas a decidir na construção: (a) aceitar os **cêntimos** da API da Claude (é uso próprio, mínimo); (b) usar um **tier/crédito grátis** de um modelo; ou (c) um **modelo local/on-device** para a categorização e o bot mais simples. **A estudar na fase de construção** — não muda o desenho.

## 6. Implicações de design (porque não há receita)

Não vender muda decisões para melhor:
- **Sem tier grátis vs pago** — toda a gente tem tudo. Sem paywalls, sem upsell, sem "Premium".
- **Sem anúncios, sem vender dados** — a privacidade é total e por defeito.
- **Sem pressão de crescimento** — otimizamos para a **nossa família** gostar e usar, não para métricas de mercado.
- **Foco em custos baixos** — preferir tiers grátis, processar no device quando der, ser eficiente com a IA.
- As funcionalidades de "receita" do plano antigo (negociação de contas por comissão) **saem**; o que fica é o **valor puro** (poupar, controlar, automatizar) sem motivo comercial escondido.
