# 06 — Bot Assistente de IA

> O bot é construído com a **API da Claude (Anthropic)**. Este documento define o que faz, como é construído, os guardrails (críticos em finanças) e os custos.

## 1. O que o bot faz (âmbito)

Três papéis, do mais simples ao mais ambicioso:

1. **Responder** (read-only): "quanto gastei em comida este mês?", "qual é a minha maior subscrição?", "porque é que o meu saldo desceu?".
2. **Organizar** (ações reversíveis automáticas): categorizar, detetar subscrição duplicada, criar lembrete de conta a vencer, marcar transação.
3. **Resolver** (ações com aprovação): rascunhar mensagem de negociação de conta, sinalizar/cancelar subscrição, criar plano de pagamento. **Mover dinheiro fica fora do v1.**

E **proativo:** nudges úteis (ver regras de frequência/relevância em `04`).

## 2. Personalidade

A Cleo provou que personalidade vende (~300M USD ARR à volta de um chatbot), com modos **Hype** (encoraja) e **Roast** (gozo), escritos por ~15 copywriters. Mas há uma regra de empatia: **"nunca bater em quem está em baixo"**.

Recomendação para nós:
- **Tom por defeito:** prático, claro, amigável e direto (PT natural). Sem jargão.
- **Modo opcional divertido** (estilo "hype") para quem quiser — mas nunca humilhante, nunca com utilizadores em aperto financeiro (Persona B).
- Honestidade sempre: o bot diz o que sabe e o que não sabe; cita a origem dos números.

## 3. Arquitetura (o ponto mais importante: os números vêm de código, não do LLM)

> **Regra de ouro:** LLMs são maus a aritmética. **Todo o valor monetário mostrado ao utilizador vem de uma ferramenta/SQL determinística; o LLM só interpreta a pergunta e narra o resultado.** Nunca deixar o modelo somar saldos, totais, juros ou projeções à mão.

### Fluxo

```
Pergunta do utilizador
      │
      ▼
[Claude] classifica intenção  ──▶  é pergunta numérica?  ──┬─ SIM ─▶ [tool: query_transactions]  ──▶  SQL determinístico no Postgres
      │                                                     │                                              (SUM/COUNT/GROUP BY/datas)
      │                                                     └─ NÃO ─▶ resposta narrativa/explicativa            │
      ▼                                                                                                         ▼
[Claude] recebe o resultado da ferramenta  ◀───────────────────────────────────────────────  números exatos
      │
      ▼
Resposta ao utilizador (narra os números, cita as transações de origem)
```

### Padrões técnicos (da pesquisa)

- **RAG ingénuo (embeddings de transações → top-k) FALHA** para perguntas numéricas: só traz uma amostra, não todas as linhas, e o modelo teria de somar. Usar **text-to-SQL / ferramentas tipadas** para agregação. Embeddings só para resolver intenção difusa ("cafés", nome de comerciante) e para explicações narrativas.
- **Roteamento da pergunta à cabeça:** numérica → SQL; narrativa → explicação. É a decisão arquitetural-chave.
- **Validar SQL gerado** antes de executar (camada de validação, nunca correr cego contra a BD).

### Tool use (function calling) — a base da ação

Definir ferramentas que o bot pode chamar (a API da Claude suporta tool use nativo, com tool runner que faz o loop):

- `query_transactions(filtros)` — agregações sobre as transações (read-only).
- `list_subscriptions()` / `get_upcoming_bills()`.
- `create_reminder(conta, data)` — ação reversível.
- `flag_subscription(id)` / `draft_negotiation(merchant)` — ações com aprovação (a UI mostra confirmação).
- Ações irreversíveis/de dinheiro: **gated** com confirmação obrigatória e registo de auditoria.

Promover a **ferramenta dedicada** (em vez de um "bash" genérico) é o padrão certo: dá ao backend um gancho tipado para validar, pedir confirmação e auditar cada ação.

## 4. Modelos da Claude e routing por custo

Modelos disponíveis e preços (por 1M tokens, input/output):

| Modelo | ID | Preço in/out | Uso no app |
|--------|----|--------------|-----------|
| Claude Haiku 4.5 | `claude-haiku-4-5` | $1 / $5 | Categorização, classificação de intenção, tarefas em lote |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | $3 / $15 | **Conversa do bot (default)** — bom equilíbrio custo/qualidade |
| Claude Opus 4.8 | `claude-opus-4-8` | $5 / $25 | Raciocínio difícil (planos de pagamento complexos) |
| Claude Fable 5 | `claude-fable-5` | $10 / $50 | Só para o trabalho mais exigente; caro |

**Estratégia de routing:** classificar a dificuldade e mandar o routineiro (lookup, categorização) para o modelo barato; reservar o caro para o raciocínio genuíno. ~60–80% dos pedidos são rotineiros → poupança de 40–70%.

## 5. Controlo de custo por utilizador (três alavancas que empilham)

1. **Prompt caching** (~90% off nos tokens em cache): o prompt de sistema, o schema das ferramentas, a taxonomia de categorias e os disclaimers são **idênticos em cada pedido** → meter em cache. Manter o conteúdo estável no início do prompt (qualquer byte que mude invalida o cache).
2. **Routing de modelos** (acima).
3. **Batch (50% off)** para trabalho offline: re-categorização noturna de transações, resumos mensais.

Stack: batch 50% + cache 90% ≈ **~95% de poupança** no conteúdo repetido. Empurrar a agregação para SQL também corta tokens (o modelo não ingere centenas de linhas).

Nota: "o modelo mais barato por token não é o mais barato por tarefa" — retries e qualidade contam.

## 6. Guardrails (CRÍTICO em finanças — risco legal real)

> A pesquisa jurídica é inequívoca. Tratar **cada afirmação do bot como legalmente vinculativa**.

- **Air Canada (2024):** a empresa foi responsabilizada pelo que o chatbot disse (informação errada sobre reembolso). Disclaimers nos Termos **não** ilibam. → Fundamentar todos os factos, citar as transações de origem, registar tudo o que o bot diz.
- **NYC "MyCity" (2024):** bot oficial deu conselhos ilegais. → Não dar orientação regulada sem fundamentação/verificação.
- **SEC "AI-washing" (2024):** multas a advisers por **exagerar capacidades de IA**. → Nunca dizer que o app "otimiza"/"prevê" finanças se não o faz.
- **Não cruzar para conselho de investimento regulado** (Investment Advisers Act de 1940): ficar do lado **informativo/educativo**, evitar recomendações de compra/venda de valores mobiliários. Caso contrário, viramos "investment adviser" regulado com deveres fiduciários.
- **FINRA 2026:** regras são tecnologia-neutras; para ações agênticas exigem **least-privilege, registo de auditoria das ações, e checkpoints humanos antes de transacionar**.

### Guardrails concretos a implementar
1. **Números só por ferramenta/SQL**; o LLM nunca inventa um valor.
2. **Citar a(s) transação(ões) de origem** de qualquer número.
3. **Disclaimers claros**: "informação, não aconselhamento financeiro/investimento/fiscal; consulta um profissional para decisões."
4. **Registo de auditoria** de tudo o que o bot diz e faz.
5. **Human-in-the-loop** antes de qualquer ação irreversível (norma FINRA).
6. **Refusal handling:** a Claude pode devolver `stop_reason: "refusal"` — tratar antes de ler o conteúdo.

## 7. Onde correr o agente

- **Opção A (recomendada para começar):** chamadas à **Messages API** da Claude com tool use, orquestradas pelo nosso backend. Máximo controlo (gating de ações, logging, aprovação humana).
- **Opção B (futuro):** **Managed Agents** da Anthropic (agente stateful, com sessões e ferramentas server-side) se quisermos delegar o loop e ter workspace por sessão. Avaliar quando a complexidade justificar.

## 8. Resumo de decisões do bot

- **Default conversa:** Sonnet 4.6; categorização: Haiku 4.5; raciocínio difícil: Opus 4.8.
- **Números:** sempre via SQL/ferramenta. Nunca o LLM a calcular.
- **Ações:** tiered por risco; irreversíveis com aprovação + auditoria.
- **Custo:** prompt caching + routing + batch.
- **Legal:** disclaimers, fundamentação, logging, lado informativo (não conselho regulado).
