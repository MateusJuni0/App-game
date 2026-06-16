# 00 — Sumário Executivo

> **Atualizado:** app **privado da família**, sem venda e sem mensalidades. Portugal. Android + iPhone + navegador. Foco em UI/UX bonita e bem desenhada.

## O que estamos a construir

O **app de finanças da nossa família** — para deixarmos de precisar de apps de fora. Liga-se uma vez e passa a captar gastos, contas e dívidas **sozinho**; mostra tudo de forma **bonita** (gráficos elegantes, modo escuro, animações suaves) em **telemóvel, tablet e navegador**; e tem um **bot/assistente de IA** (Claude) que responde, organiza e resolve tarefas.

Como **não vendemos** e não há mensalidades, podemos fazer o que os apps comerciais não fazem: **sem paywalls, sem anúncios, sem vender dados, privacidade total** — e otimizar 100% para a família gostar.

## As fontes de captura automática

- **Notificações do telemóvel** (alertas de compra dos bancos) — Android.
- **Open Banking** (ligação regulada às contas, via aggregador) — Android, iPhone e web.
- **E-mail** (recibos) e **entrada rápida** (atalho/voz/partilha/widget) como rede de segurança.
- Tudo unido por **deduplicação**; correção manual sempre possível.

## O bot (Claude)

Responde ("quanto gastámos em comida este mês?"), categoriza, deteta subscrições e contas a vencer, cria lembretes e avisa de forma proativa. Regra de ouro: **os números vêm sempre de código/SQL, nunca inventados pelo modelo**. Modelos por custo: Haiku (categorizar), Sonnet (conversar), Opus (raciocínio difícil). Custo à escala família: cêntimos/mês.

## Custos (porque não há receita, o objetivo é gastar pouco)

Para uma família, **~0–15 €/mês** (provavelmente perto de 0): Open Banking no tier grátis da GoCardless, IA em cêntimos, hosting em tier grátis. Detalhe em `09-custos-operacao.md`.

## A realidade da automação (ler `05`)

- **iPhone:** não dá para ler notificações/SMS (limite da Apple) → automação por **Open Banking + e-mail + entrada rápida**.
- **Android:** dá para ler notificações (frágil, fabricantes matam serviços; manutenção de parsers) → ótimo **extra** sobre o Open Banking, não a única fonte.
- **Conclusão:** captura **multi-fonte e tolerante a falhas**, nunca prometer "100% automático".

## Multi-plataforma (ler `16`)

Uma só base de código **Expo / React Native** para Android, iPhone e **navegador** (web/PWA), cada um a sentir-se nativo (tabs no telemóvel, barra lateral na web). Detalhe e escolha de bibliotecas no doc de multi-plataforma.

## Bonito e bem desenhado (o teu pedido principal)

Há agora um bloco de documentos só de design, para veres o produto inteiro desenhado antes de codar:
- `12` Design system (cores, tipografia, espaçamento, modo escuro, micro-interações)
- `13` Visualização de dados (que gráfico para cada coisa + bibliotecas)
- `14` Funcionalidades inovadoras (e "como melhoro isto")
- `15` Família e multi-utilizador (partilha, privacidade, jovens/mesadas)
- `16` Multi-plataforma e UX mobile (Expo web, responsivo, bibliotecas)
- `17` Ecrãs e fluxos (tudo desenhado, ecrã a ecrã)

## Mapa dos documentos

Ver `README.md` para o índice completo e a ordem de leitura.

## Estado

Fase de **estudo e desenho**. Sem código de produto ainda. A seguir: terminar os documentos de design (`12`–`17`) e depois começar a construir, ecrã a ecrã.
