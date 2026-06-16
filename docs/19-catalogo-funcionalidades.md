# 19 — Catálogo Completo de Funcionalidades (a união de tudo)

> O pedido do chefe: "se um app tem uma funcionalidade e outro não, a gente vai ter todas." Este é o **superconjunto** — tudo o que os melhores apps fazem, junto num só. Cada linha marca o(s) app(s) que a faz(em) bem. Como **não vendemos e não há paywalls**, podemos dar tudo a toda a gente (os comerciais separam isto em tiers pagos).
>
> Cruza com: `04` (prioridades MoSCoW), `14` (versão melhorada de cada uma), `20` (categorias), `21` (dados), `22` (construção).

## Respostas diretas às tuas perguntas

- **Qual tem o design mais amado?** **Copilot Money** (finalista de Apple Design Award; consensualmente "o melhor design da categoria") — é a nossa referência de polimento. Para *marca/personalidade*: **Monzo** (coral) e **Nubank** (roxo). Para *luxo*: **Mercury** (dark cinematográfico). → O nosso visual: polimento do Copilot + tema próprio (doc `12`).
- **Qual tem mais funcionalidades?** **Revolut** (super-app), **Emma** (orçamento + neobanco + cripto + cashback + investir + rent reporting), **Monarch** (all-in-one) e **Wallet/BudgetBakers**. → Nós juntamos **a união de todos**, abaixo.

---

## 1. Contas e agregação
- Tipos de conta: corrente, poupança, cartão de crédito (com **utilização %**), dinheiro, investimento, empréstimo, ativos manuais (casa, carro) — *YNAB, Monarch, Emma*
- **Contas manuais** (sem ligação bancária) + **transações recorrentes offline** para fechar lacunas — *Emma, Wallet*
- **Património líquido** ao longo do tempo (ativos − dívidas), com marcos/milestones — *Monarch, Copilot, Empower*
- **Multi-moeda** com taxa histórica por transação — *Spendee, Lunch Money, Revolut* (YNAB **não** tem → nós temos)
- **Cripto** (exchanges + carteiras) ao lado dos bancos — *Emma, Spendee*
- **Investimentos**: posições/holdings, performance, alocação, analisador de comissões — *Empower, Revolut* (YNAB só saldo → nós com holdings)
- Organização por grupos; **estado de ligação** ("contas que precisam de atenção" / re-ligar) — *Copilot*

## 2. Transações
- **Categorização automática** que aprende com correções (~modelo privado por utilizador) — *Copilot ("Intelligence"), Emma, Monarch*
- **Regras** (match por comerciante/valor → categoria/dono/excluir) — *Monarch, Copilot, Emma*
- **Dividir** transação (várias categorias / membros) — *Monarch, Emma, YNAB*
- **Tags** independentes das categorias (#viagem, #trabalho) — *Emma, Lunch Money*
- **Notas, anexos/recibos** (pesquisáveis), **OCR** que casa com a transação — *YNAB, Emma, Mercury (OCR)*
- **Pesquisa + filtros** (comerciante, data, valor, categoria, conta, tag, membro) — *todos*
- **Edição em massa** (categoria/data/nome/tags) — *Emma, YNAB*
- **Logótipos de comerciante** + nome limpo (enriquecimento) — *Monzo, Copilot, Emma*
- **Deteção de recorrentes** e **de transferências internas** (não contar como gasto) — *Plaid model, Emma*
- **Estornos/reembolsos**, **pendentes**, **excluir do orçamento**, **marcar privada** — *Monarch, Emma*
- **Fluxo "a rever"** (aprovar transações novas) — *Copilot ("To Review"), YNAB ("Approve")*
- **Reconciliar** conta contra o saldo do banco; estados limpo/não-limpo/reconciliado — *YNAB*
- **Comentários/chat por transação** + reações emoji (família) — *Honeydue*

## 3. Orçamentos
- **Categoria**, **Flex** (um número), **Grupo**, **base-zero/envelopes** ("dá um trabalho a cada euro") — *Monarch (Flex), YNAB (zero-based)*
- **Rollover** (carregar sobra/excesso) por categoria — *YNAB, Monarch, Emma*
- **Por período de ordenado** (não mês de calendário), dia de início configurável — *Monzo, Emma*
- **Orçamentos por comerciante** (limitar gasto na Amazon, etc.) — *Emma*
- **Sugestões** a partir do histórico; **limite diário** auto-calculado — *Emma, Monzo, Copilot*
- **"Ready to Assign" / idade do dinheiro** (métricas YNAB) — *YNAB*

## 4. Fluxo de caixa e previsão
- **Seguro para gastar** (safe-to-spend) — um número — *Simple, Monarch (Flex), Copilot (Free to Spend), Emma*
- **Seguro por dia até ao ordenado** (recalcula) — *Simple, Cleo* (a nossa versão melhorada, `14`)
- **Calendário / Runway**: saldo projetado dia-a-dia + **aviso da data exata de saldo negativo** + parcelas BNPL — lacuna do mercado (`14`); *parcial: Quicken Simplifi, PocketSmith*
- **Pacing** (ritmo ideal vs real, cor) — *Copilot, Monzo*
- **Gasto comprometido** previsto (rendas, subscrições) antes de bater — *Emma*
- **"E se...?"** (cenários: cortar X, subida de ordenado) — *Monarch (Plus), Projection Lab*

## 5. Objetivos e poupança
- **Objetivos** com meta + prazo (cálculo do esforço por período), imagem, celebração — *YNAB (Targets), Monarch*
- **Partilhados** (família contribui, lista de contribuidores) — *Monarch, Greenlight*
- **Round-ups** + **regras de poupança** ("guarda X quando faço Y") — *Acorns, Qapital, Monzo, Emma*
- **Pots bloqueados** até uma data; **% do ordenado no payday** (Salary Sorter) — *Monzo, Plum*
- **Poupança automática por IA** (afetação inteligente) — *Plum*

## 6. Contas a pagar e subscrições
- **Calendário de contas** + lembretes; **dono por conta** — *Honeydue, Simplifi*
- **Deteção de subscrições/recorrentes** (stream; deteção precoce) — *Rocket Money, Emma, Copilot*
- **Alertas de subida de preço**; **subscrições esquecidas/duplicadas** (incl. duplicados na família) — *Emma, Snoop*
- **Interceção pré-cobrança de período grátis** ("vais ser cobrado em 3 dias") — *Rocket Money + niche* (a nossa versão, `14`)
- **Sinalizar/cancelar** (assistido; nós sinalizamos, ver `18` para pagamentos) — *Rocket Money*

## 7. Dívida
- **Plano de pagamento** (snowball/avalanche) + simulador de juros poupados — *YNAB (Loan Planner), Undebt.it*
- **Monitorização de crédito** (score/relatório) — *Cleo, Rocket Money, Emma*
- **Rent reporting** (construir crédito com a renda) — *Emma* (PT: relevância a confirmar)

## 8. Insights e relatórios
- **Gasto por categoria / comerciante / tempo**; tendências — *todos*
- **Receita vs despesa**; **Sankey** de fluxo — *Monarch*
- **Comparativo "vs mês passado até hoje"** (base honesta, anómalo) — *Copilot* (a nossa versão, `14`)
- **Resumo semanal + mensal + "Ano em Dinheiro"** (recap partilhável) — *Monarch (Weekly Recap), Monzo (Year in Monzo)*
- **Personalidade de gastos** (tom ajustável) — *Cleo* (a nossa versão, `14`)
- **Exportar** CSV/Excel/PDF; **importar** CSV/OFX/QFX — *YNAB, Emma, Tiller*
- **Modo IRS / e-Fatura** (rubricas dedutíveis, progresso por limite) — **específico PT** (`20`)

## 9. Família / partilhado
- **Membros** com login próprio; **papéis** (admin/membro/supervisionado) — *Monarch, YNAB Together*
- **Privacidade granular** (3 níveis por conta + esconder transação + meu/dele/nosso) — *Honeydue* (a nossa versão melhorada, `15`)
- **Quem pagou o quê / dividir / acertar** (Splitwise-style) — *Honeydue, Zeta, Emma (Spaces)*
- **"Recent Money Moves"** (quem mexeu no quê) — *YNAB, Monarch*
- **Jovens:** cartão/mesada, **tarefas → recompensa**, objetivos, **investir com aprovação**, **lições gamificadas (Level Up/Money Missions)**, controlos parentais (limites por loja/categoria), **juros pagos pelos pais** (ensinar juro composto) — *Greenlight, FamZoo, GoHenry*

## 10. Assistente de IA (Claude — ver `06`)
- **Chat** que responde sobre os teus dados (números via SQL) — *Monarch, Cleo, Emma*
- **Voz + memória de longo prazo** — *Cleo 3.0*
- **Tom ajustável** (esperto/simpático/atrevido) + regra de empatia — *Cleo* (decisão do chefe)
- **Explica esta transação**; **nudges proativos** com 1-toque — *Monarch, Emma*
- **Score de saúde financeira** — (lacuna; nós adicionamos)

## 11. Automação e entrada
- **Sync bancário** (Open Banking; quando grátis, ver `18`/`09`) — *todos*
- **Captura por notificações (Android)** — *apps indianas; nós (`05`)*
- **Entrada por voz** + **OCR de recibo** + **parsing de e-mail** (alias de reencaminhamento) — *Cleo (voz), Expensify (OCR/email), Finny (voz)*
- **Auto-preenchimento por localização** ("Local Payee") — *Debit & Credit*
- **Widgets** (ecrã inicial), **ecrã de bloqueio / Live Activity**, **atalhos Siri / Botão de Ação**, **NFC** — *Monarch, YNAB, Copilot*
- **Importar CSV/OFX/QFX**, **partilha (share sheet)**, **email-in** — *YNAB, Tiller, Expensify*

## 12. Segurança e definições
- **Biometria, bloqueio da app, 2FA**, sessões/dispositivos — *todos*
- **Exportar/apagar dados** (RGPD) — *YNAB, Emma*
- **Modo escuro / temas**, **reordenar dashboard** — *Monarch, Copilot*
- **Scramble mode** (esconder saldos em público) — *Emma*
- **Bloqueios de gasto como guardrail** (ex.: marcar um comerciante como "perigoso"/limitar) — versão *budget* do "gambling block" do *Monzo/Plum* (nós não emitimos cartão, mas podemos alertar/limitar no orçamento)

## 12b. Mais funcionalidades a juntar (apareceram nos perfis)
- **Watchlists** — vigiar o gasto numa categoria/comerciante/tag **sem** criar um orçamento completo, com alerta de limite — *Quicken Simplifi*
- **API aberta / MCP** — consultar os nossos dados financeiros pelo Claude/ferramentas (já encaixa no nosso bot) — *Lunch Money, Wallet (MCP)*
- **Auto-exportação para Google Sheets / CSV** em tempo real — *Monzo, Tiller*
- **Segurança anti-fraude / por localização** (alertas de transação fora do padrão; "modo rua") — *Nubank (Modo Rua), Revolut, Monzo (Call Status)* — fazemos a versão de **alerta** (não bloqueio bancário)
- **Histórico de alterações / audit log** por transação — *Lunch Money, Tiller*
- **Coach financeiro / diretório** + **planeamento sucessório/testamento** + **declaração fiscal** — *Origin* → para nós, o equivalente PT é o **"modo IRS/e-Fatura"** (`20`)

## 12c. O que fica FORA de âmbito (precisa de ser banco/corretora) — para a "união" ser honesta
Estas são funcionalidades dos neobancos/corretoras que **não** podemos fazer porque o nosso app é **agregador read-only da família, não um banco** (e decisão "só grátis", `11`):
- **Emitir cartões** (físicos/virtuais/descartáveis), **conta própria**, **levantamentos**, **IBAN próprio** — *Revolut, Nubank, Monzo*
- **Negociar/comprar ações, ETFs, cripto** dentro da app (corretora) — *Revolut, Nubank, Plum* → nós **acompanhamos/track** (read-only), não transacionamos
- **Crédito/empréstimos/BNPL, juros, cashback próprio, lounges, eSIM, get-paid-early** — *Revolut, Nubank, Monzo*
- **Pagar diretamente** (iniciação de pagamento) sem o handoff assistido — ver `18`
> Tudo o resto (tracking, orçamento, objetivos, insights, bot, família) **fazemos**. O que precisa de licença bancária, **acompanhamos** em vez de executar.

## 13. Delight / nicho (vale roubar)
- **Cashback** (se houver via grátis) — *Emma*
- **Trip Mode** (viagem auto-detetada, mesada diária, FX honesto) — *TravelSpend, Revolut* (a nossa versão, `14`)
- **Streaks** de hábitos bons (com freeze, sem vergonha) — *Duolingo-style; Monzo (1p challenge)*
- **Confetti** só em conquistas reais — *Greenlight, Acorns*
- **Garantias/warranty vault** (guardar recibos+garantias) — (nicho; nós podemos)
- **Calculadoras** (juro composto, "quanto preciso poupar") — *vários*

---

## 13b. Refinamentos do checklist mestre (alto valor, a juntar)
- **Diagrama Sankey receita→despesa** (partilhável, com valores ocultáveis) — *Monarch*: a visualização **mais amada** da categoria, barata de fazer, grande "wow" (já em `13`; entra como destaque).
- **Alerta preditivo de "ritmo"** ("ao teu ritmo, o dinheiro acaba a 22") — *PocketGuard "Pace"*: usa fundos restantes + dias + histórico; complementa o Runway (`14`).
- **Enriquecimento colaborativo de comerciantes** (uma correção da família serve todos; logótipo por domínio) — *Monzo*: fosso de qualidade de dados que compõe com o tempo.
- **Linha de "Home Equity" auto** (valor do imóvel − hipoteca) tratada como ativo — *Copilot*. Em PT sem Zillow → valor do imóvel **manual** (ou referência idealista), atualizável.
- **Garantias (warranty vault)** — *Wallet*: guardar recibo + data de fim de garantia, com lembrete. Raro e útil.
- **Lista de compras com preços** → trava a compra por impulso; converte itens em transações — *Wallet*.
- **Analisador de comissões** (fundos/PPR) — *Empower*: mostrar o peso das comissões na poupança (PT: PPR/fundos).
- **Família "banco":** IOU sem cartão, **juros pagos pelos pais**, e cobrar aos filhos custos partilhados — *FamZoo* (já em `15`).

> Guardrails de notificações (confirmados): limitar frequência (≥6 push/semana → 32% desinstalam), horas de silêncio 22h–7h (−30–40% queixas), canais fraude/atividade/promo **independentes**, e horário de envio personalizado por utilizador (até +88% de engagement). **Relevância é a alavanca nº1 de retenção** (já em `04`).

## As "armas secretas" (alto valor, muitas vezes em falta)
1. **Runway com a data exata de saldo negativo** (+ BNPL) — quase ninguém faz bem.
2. **Seguro por dia até ao ordenado** (auto-ajustável).
3. **Privacidade granular da família** (3 níveis por conta) — diferencial real.
4. **Interceção pré-cobrança** de períodos grátis.
5. **Categorização colaborativa** (uma correção da família serve todos).
6. **Modo IRS/e-Fatura** (específico PT) — ninguém de fora faz.
7. **Bot que age com números corretos** (SQL) e tom ajustável.
8. **Comparativo honesto "vs mês passado até hoje"** (anómalo, sem spam).
9. **Objetivos que se enchem sozinhos no payday** + idade do dinheiro.
10. **Jovens com autonomia graduada** (lições + juros pagos pelos pais).

> Tudo isto está priorizado em `04`, melhorado em `14`, modelado em `21` e partido em tarefas em `22`. **Temos a lista completa — construímos a partir daqui.**
