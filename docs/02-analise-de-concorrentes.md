# 02 — Análise de Concorrentes

> Perfis detalhados. Preços e ratings variam por região/promoção/data — re-verificar antes de publicar qualquer comparação.

## Tabela-resumo

| App | Gancho principal | Preço pago | Receita extra | IA | Maior queixa |
|-----|------------------|-----------|---------------|----|--------------|
| **Rocket Money** | Cancelar subscrições + negociar contas | "paga o que quiseres" ~6–12 USD/mês | **35–60% da poupança** + cartão (descontinuado 8/2025) | Auto-deteção; agente de suporte "Fin" (68% resolução) | Choque com a taxa de negociação; difícil cancelar |
| **Cleo** | Chatbot com personalidade + adiantamento | Plus 5,99 / Pro 8,99 / Builder 14,99 USD/mês | Taxa expresso 3,99–9,99 USD + cartão | Chatbot "roast/hype", voz + memória (3.0) | Adiantamentos abaixo do anunciado; **multa FTC 17M USD** |
| **Monarch** | Substituto premium da Mint | 99,99 USD/ano (Core) / 199 (Plus) | Só assinatura | Assistente conversacional (advisory) | Sem tier grátis; preço |
| **Copilot** | Design + categorização IA (Apple) | 95 USD/ano | Só assinatura | "Intelligence" (categorização silenciosa) | Sem Android (até web 12/2025) |
| **YNAB** | Método de orçamento (mudança de hábito) | 109 USD/ano | Só assinatura | Mínima | Subidas de preço (50→109); sync |
| **Empower** | Dashboard grátis de património | Grátis | **AUM 0,49–0,89%** (min 100k USD) | Superficial | Vendas agressivas; app delistado iOS 10/2025 |
| **PocketGuard** | "In My Pocket" (quanto posso gastar) | 12,99/mês, 74,99/ano, ~149,99 vitalício | Só assinatura | Utilitária | Fiabilidade da sync |
| **Nubank** | Cartão sem anuidade → cross-sell | Grátis (conta) | **Intercâmbio + juros + empréstimos** | GPT no suporte/crédito | — |
| **Revolut** | Super-app financeiro | Tiers 3,99–55 €/mês | **FX + juros + cripto + negócio** | Insights/fraude | — |
| **Plum** | Poupança automática por IA | Tiers 3,99–14,99 £/mês | Spread de investimento/juros | "Plum Plan" (guidance) | — |
| **Snoop** | "Snoops" de poupança (open banking) | 5,99 £/mês (Plus) | B2B de dados | Motor de alertas | — |
| **Emma** | Assistente IA + quasi-neobanco | 4,99–14,99 £/mês | Cashback + poupança + investimento + rent reporting | "AI assistant" | Bugs; anúncios/upsell |
| **Spendee** | Tracker visual global + partilha | 1,99–5,99 USD/mês | Só assinatura | Categorização "smart" | **Sync (2,7★ Trustpilot)** |
| **Wallet (BudgetBakers)** | Gestor família multi-moeda | ~3,79/mês + vitalício | Só assinatura | Categorização + **MCP/IA query** | Sync pára; perda de dados |

---

## Perfis aprofundados (os mais relevantes para nós)

### Rocket Money (ex-Truebill) — o mestre da receita extra
- Detém da Rocket Companies; **10M+ utilizadores**, poupança média anunciada >700 USD/ano, >2,5 mil M USD poupados.
- **Modelo de negócio a copiar (parcialmente):** assinatura flexível + **negociação de contas com sucesso (~85%), ficando com 35–60% da poupança do 1.º ano** (o utilizador escolhe a %, só paga se houver poupança). Deteta e cancela subscrições por ti (concierge humano).
- Agente de IA de suporte "Fin" toca em >metade dos chats, resolve ~68%.
- **Lição:** a receita por negociação alinha o incentivo (só ganhamos se poupares). Mas é a maior fonte de queixas (choque com a taxa). → Se fizermos isto, ser ultra-transparente.

### Cleo — a prova de que o bot vende (e o aviso da FTC)
- Chatbot-first: o utilizador "fala como com um amigo"; insights surgem no chat, não em dashboards.
- **Arquitetura:** classifica primeiro se é uma pergunta que sabe responder, empacota os dados relevantes da conta e gera a resposta; usa uma grande biblioteca de respostas escritas por **~15 copywriters (alguns comediantes)** que ensinam a "voz" ao LLM. Cleo 3.0 (jul. 2025) adicionou **voz e memória de longo prazo**.
- **Modos:** "Hype" (encoraja) e "Roast/Savage" (gozo sarcástico). Regra de empatia: "nunca bate em quem está em baixo".
- **Monetização:** assinatura + taxa expresso (3,99–9,99 USD) + cartão. ~300M USD ARR.
- **⚠️ Multa FTC 17M USD (mar. 2025):** por exagerar **valores** e **velocidade** dos adiantamentos e **dificultar cancelamento**. → Lições obrigatórias para nós: nunca exagerar capacidades; cancelamento em 1 toque; consentimento informado claro.

### Monarch / Copilot / YNAB — os puristas de assinatura
- **Monarch:** all-in-one premium; assistente de IA conversacional **só consultivo (não age)**, Weekly Recap, categorização ML. Levantou 75M USD a 850M USD de avaliação no rescaldo da Mint.
- **Copilot:** melhor design (Apple); "Intelligence" categoriza em silêncio, aprende com correções (~30 transações para ativar). Sem Android até 2025 — lição: **não fazer iOS-only**.
- **YNAB:** método (orçamento base-zero), comunidade fiel, mas backlash de preço e sync fraca. Diferencia-se por **coaching/método**, não por IA.

### Neobancos (Nubank, Revolut, Plum) — o modelo de fundo
- **Nubank:** "entra com um produto grátis, monetiza com crédito à medida que o engagement cresce". Custo de servir **~0,80 USD/cliente/mês** — a referência de eficiência. Não somos um banco, mas o princípio do funil grátis→monetização aplica-se.
- **Revolut:** bundling de super-app + **tiers de assinatura** de alta margem. Assinaturas diversificam a receita para além do intercâmbio.
- **Plum:** **automação como produto** — poupa/investe sozinho com algoritmo de "affordability"; "Plum Plan" (jun. 2026) adicionou guidance conversacional. Roadmap: licença para passar de guidance a conselho regulado.

### Assistentes de IA — o mapa do espetro (chatbot → agente)
- **Só conversa / recomenda:** Origin (1.º AI advisor regulado SEC), Monarch, Cleo, Fina, Quicken Assist.
- **Agem (mais agênticos):** **Albert "Genius"** (paga contas, transfere dinheiro), **Wally** (adiciona transações/contas/orçamentos), **Rocket Money** (cancela subscrições).
- **Automação em segundo plano:** Bright (paga dívidas), Plum (poupa).
- **Alertas por evento:** Snoop ("Snoops"), Charlie (fraude/"SpeedBump" para seniores).
- **Categorização silenciosa:** Copilot ("Intelligence", sem chat).
- **Outlier de escala:** **Erica (Bank of America)** — 3,2 mil M+ interações, mas **sem IA generativa** (NLP+ML), escolha cautelosa de banco regulado.

**Padrão de guardrails dos mais credíveis:** mantêm humano no loop. Monarch/Origin são consultivos/não-discricionários; Quicken "nenhuma ação sem aprovação"; Charlie pausa transações de risco.

---

## O que copiar, o que evitar

**Copiar:**
- Receita extra alinhada ao valor (Rocket Money).
- Bot com personalidade e utilidade real (Cleo) — mas honesto.
- Automação em segundo plano (Plum/Copilot/Bright).
- Importação fácil + onboarding sem fricção (Monarch pós-Mint).
- Multi-plataforma desde o início (erro do Copilot).

**Evitar:**
- Modelo só-anúncios (Mint).
- Exagerar capacidades / dificultar cancelamento (Cleo/FTC).
- IA que "age" sem aprovação em coisas irreversíveis (risco legal — ver `06` e `08`).
- Depender de uma única fonte de sincronização frágil (queixa universal).
