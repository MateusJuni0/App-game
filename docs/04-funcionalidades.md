# 04 — Funcionalidades

> Priorização MoSCoW: **Must** (MVP) / **Should** (v1.x) / **Could** (futuro) / **Won't** (fora de âmbito por agora).
> O roadmap temporal está em `10-roadmap.md`.

## A. Captura de dados (o coração)

| Funcionalidade | Prioridade | Notas |
|----------------|-----------|-------|
| Entrada rápida assistida (atalho/partilha/voz/widget) | **Must** | Rede de segurança universal; funciona em iOS e Android |
| Leitura de notificações do banco (Android) | **Must** | Diferenciador; frágil — ver `05`. Só Android |
| Ligação Open Banking / Open Finance (via aggregador) | **Must** | Caminho fiável e cross-platform; custo por utilizador |
| Parsing de e-mail (recibos/faturas) | **Should** | Alto custo de conformidade (CASA) — ver `05`/`08` |
| Leitura de SMS do banco (Android) | **Could** | Alto risco de política Google Play; só se exceção aprovada |
| OCR de recibos (foto) | **Could** | Útil para gastos em dinheiro |

## B. Organização

| Funcionalidade | Prioridade | Notas |
|----------------|-----------|-------|
| Categorização automática | **Must** | Auto-aplicar alta confiança; pedir confirmação na baixa |
| Deduplicação (SMS + push + open banking da mesma transação) | **Must** | Crítico — a captura multi-fonte gera duplicados |
| Deteção de subscrições/cobranças recorrentes | **Must** | Modelo "stream" (≥3 ocorrências = maduro; early_detection <3) |
| Deteção de nova conta/dívida a vencer → lembrete automático | **Must** | Serve a Persona B; usa early_detection |
| Contas consolidadas + património líquido | **Should** | Depende de Open Banking |
| Regras/divisões/notas manuais | **Should** | Para os utilizadores que querem controlo |
| Multi-moeda | **Could** | Importante se mercado for internacional |

## C. Entender (insights + bot)

| Funcionalidade | Prioridade | Notas |
|----------------|-----------|-------|
| Número "quanto posso gastar" (safe-to-spend) | **Must** | Gancho da Persona A (estilo PocketGuard) |
| Bot conversacional ("quanto gastei em X?") | **Must** | Diferenciador; números via SQL/ferramenta — ver `06` |
| Insights/nudges proativos | **Should** | Com limites de frequência e relevância — ver abaixo |
| Resumo semanal/mensal automático | **Should** | Estilo Monarch Weekly Recap |
| "Explica esta transação" | **Could** | Enriquecimento de comerciante |

## D. Agir

| Funcionalidade | Prioridade | Notas |
|----------------|-----------|-------|
| Lembretes de contas a vencer | **Must** | Notificação local/push |
| Pagar conta — **assistido** (mostrar entidade/referência/valor + copiar + abrir banco/MB Way) | **Should** | Sem licença; o utilizador confirma no banco dele (ver `18`) |
| Reconciliação ("paga ✓" ao detetar o movimento) | **Could** | Só com leitura Open Banking (ver `18`/`09`) |
| Sinalizar subscrição / duplicados da família (1 toque) | **Should** | Sinalizar, não cancelar automaticamente |
| Pagar conta — **automático** (a app paga sozinha) | **Won't** | Exige empresa + licença PISP + eIDAS; não viável para app de família (ver `18`) |

## E. Conta & família (sem monetização — app privado)

| Funcionalidade | Prioridade | Notas |
|----------------|-----------|-------|
| Onboarding sem fricção + importação | **Must** | Importador de CSV ajuda migração |
| Login por membro (separados, nunca partilhados) | **Must** | Ver `15` |
| Partilha familiar com privacidade granular | **Must** | 3 níveis por conta + esconder transação (ver `15`) |
| Modo escuro + multi-plataforma (iOS/Android/web) | **Must** | Ver `16` |
| Jovens: mesada / tarefas / objetivos | **Could** | Variante supervisionada (ver `15`) |

> Sem tiers pagos, sem assinaturas, sem anúncios — todos os membros têm tudo. Custos de operação em `09-custos-operacao.md`.

---

## Notas de design para os nudges proativos (baseado em dados)

A pesquisa de comportamento é clara: **nudges mal calibrados são a maior causa de churn por notificações.** Regras a seguir:

- **Limitar frequência.** 46% desativam push com 2–5 mensagens/semana; 32% com 6–10. Até 1/semana faz ~10% desativar.
- **Relevância acima de tudo.** 78% acham as notificações irrelevantes; é a razão nº1 de opt-out. Cada nudge tem de ser demonstravelmente útil (baseado num padrão real do utilizador).
- **Timing por utilizador.** Alerta de transação **logo após a compra**; insights na hora em que o utilizador costuma abrir o app. Horas de silêncio (22h–7h) cortam queixas 30–40%.
- **Canais de opt-in independentes:** fraude/segurança, atividade da conta, e promoções têm de ser separados — quem silencia promoções continua a receber alertas de fraude.
- **Enquadrar como oportunidade**, não marketing: "podes poupar X", "a tua conta vence em 2 dias", "poupaste 200 este mês".

## Notas sobre automação agêntica (o que "automático" significa de verdade)

Tier de ações por risco/reversibilidade (ver detalhe em `06`):

1. **Auto silencioso** (reversível, baixo risco): categorizar, criar lembrete, detetar subscrição. → Sem pedir nada.
2. **Confirmar em 1 toque** (difícil de reverter): cancelar serviço, enviar mensagem de negociação. → Pedir OK.
3. **Aprovação forte + limites + registo de auditoria** (mover dinheiro): qualquer movimento de fundos. → Fora do v1; quando existir, com human-in-the-loop obrigatório (norma FINRA).

A categorização automática usa **níveis de confiança** (ex.: Plaid Enrich dá VERY_HIGH 98%+ → LOW): auto-aplicar alta confiança, pedir confirmação na baixa. É o portão natural do loop humano.
