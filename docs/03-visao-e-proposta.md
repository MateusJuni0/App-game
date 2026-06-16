# 03 — Visão e Proposta (Visão 360°)

## Missão

Tirar o trabalho manual da gestão de dinheiro. Que qualquer pessoa saiba, sem esforço, **quanto tem, quanto deve e quanto pode gastar** — e tenha um assistente que a ajuda a decidir e a agir.

## Proposta única de valor (UVP)

> **"O app de finanças que se atualiza sozinho e tem um assistente que resolve as coisas por ti."**

Dois pilares que, juntos, ninguém combina bem hoje:

1. **Automático primeiro:** captura multi-fonte (notificações + Open Banking + e-mail + entrada rápida) com correção fácil. Menos digitar, menos desistir.
2. **Bot que age:** assistente Claude que lê os teus dados, responde, organiza e executa tarefas (com aprovação para o que é irreversível).

A Cleo tem o bot mas obriga a ligar o banco e não é "automático multi-fonte". O Copilot automatiza a categorização mas não tem bot. O Rocket Money tem receita extra mas a captura é só Plaid. **Nós combinamos automação multi-fonte fiável + bot agêntico honesto.**

## Princípios de produto (as regras que nos guiam)

1. **Zero-fricção por defeito.** Cada ecrã deve responder "o que faço a seguir?" sem o utilizador pensar. Defaults inteligentes; configurar é opcional.
2. **Honestidade radical.** Nunca exagerar o que o app/bot faz. Cancelamento em 1 toque. (A multa da Cleo é o nosso aviso permanente.)
3. **O utilizador manda no dinheiro.** Ações reversíveis e de baixo risco podem ser automáticas; mover dinheiro ou cancelar serviços exige aprovação explícita.
4. **Privacidade como produto.** Dados sensíveis no dispositivo sempre que possível; consentimento claro; nada de vender dados.
5. **Fiabilidade > magia.** Melhor capturar 90% bem e deixar corrigir do que prometer 100% e falhar em silêncio. Nunca apresentar dados capturados como completos/autoritativos.
6. **Multi-plataforma.** Android e iOS desde cedo (erro do Copilot foi ser iOS-only).
7. **Os números vêm de código, não do LLM.** Todo o valor monetário mostrado é calculado por SQL/ferramenta; o bot só narra (ver `06`).

## Personas

### Persona A — "A Maria sem paciência"
- Tem rendimento, mas nunca configurou um app de finanças porque "dá trabalho".
- Quer: ver o saldo real consolidado e **quanto pode gastar este mês** sem ficar apertada.
- Dor: odeia categorizar e adicionar gastos.
- Para ela: captura automática + número "podes gastar X" (estilo PocketGuard) + zero setup.

### Persona B — "O João no aperto"
- Tem dívidas (cartão, prestações), perde a conta às contas a vencer, falha pagamentos por esquecimento.
- Quer: saber **o que deve, quando vence, e não falhar**.
- Dor: ansiedade, contas espalhadas, juros por atraso.
- Para ele: deteção automática de contas/dívidas a partir das notificações + lembretes proativos + plano simples de pagamento. **Esta é a persona que mais beneficia da leitura de notificações** ("quando for dívida, anota").

> Nota: a leitura de notificações para detetar dívidas/contas (pedido explícito do chefe) serve sobretudo a Persona B. É também a parte tecnicamente mais frágil e arriscada — ver `05`.

## Visão 360° — o ciclo completo do utilizador

```
   CAPTAR  ──▶  ORGANIZAR  ──▶  ENTENDER  ──▶  AGIR  ──▶  POUPAR/CONTROLAR
     │             │              │            │              │
 notificações   categorização   bot responde  bot/utilizador  menos gastos,
 open banking   automática      "quanto…?"    cancela sub,    contas pagas,
 e-mail         deteção de      insights      cria lembrete,  dívida sob
 entrada rápida subscrições     proativos     negoceia conta  controlo
```

Cada seta tem de funcionar **sem trabalho manual** sempre que possível, e o bot está presente em todas as fases.

## O que NÃO somos (anti-visão)

- Não somos um banco (pelo menos no início) — não guardamos dinheiro nem damos crédito até termos licenças e razão para isso.
- Não somos um conselheiro de investimentos regulado — ficamos do lado **informativo**, com disclaimers (ver `08`).
- Não somos "grátis com anúncios" — isso matou a Mint.

## Métrica-norte (North Star)

**Transações capturadas automaticamente por utilizador ativo por semana** — mede diretamente se a promessa "automático" está a cumprir-se. Métricas de apoio: % de transações que precisaram de correção manual, retenção D30, contas pagas a tempo (Persona B).
