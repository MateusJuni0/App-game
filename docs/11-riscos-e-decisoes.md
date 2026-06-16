# 11 — Decisões e Riscos

> Atualizado depois das tuas instruções, chefe. As grandes decisões já estão tomadas; ficam riscos a gerir e umas escolhas pequenas.

## PARTE A — Decisões já tomadas (registo)

| # | Decisão | Resposta |
|---|---------|----------|
| 1 | Vender o app? | **Não.** É privado, da família. Sem mensalidades, sem anúncios, sem receita. |
| 2 | Mercado | **Portugal** (só relevante para escolher o banco/Open Banking). |
| 3 | Plataformas | **Android + iPhone + navegador**, a partir de uma só base de código. |
| 4 | Modelo de receita | **Nenhum.** Foco em custos baixos (ver `09`). |
| 5 | Prioridade | **Tudo bonito e bem desenhado**, ecrã a ecrã, antes de codar. UI/UX de topo, gráficos elegantes, inovação. |

Consequências (já refletidas nos docs): saiu a monetização (`09` virou custos); visão e personas viraram **família** (`03`); entram novos docs de **design, gráficos, inovação, família, multi-plataforma e ecrãs** (`12`–`17`).

## PARTE B — Escolhas (já decididas / com default)

| Escolha | Decisão |
|---------|---------|
| **Serviços pagos** | **NÃO. Só grátis.** Nada de pagar GoCardless/aggregadores/licenças. Se uma integração só existir paga, **não a fazemos** (ou esperamos por uma alternativa grátis). | ✅ decidido |
| **Criar contas/registos** | **Só na fase de construção**, não agora. No planeamento não se cria nada. | ✅ decidido |
| **Nome do app** | **CM eTech Finanças** ✅ |
| **Tom do bot** | **Esperto que dá dicas de finanças, simpático e um bocadinho atrevido** (estilo "amigo que percebe de dinheiro"), com a regra de empatia: nunca gozar com quem está em aperto ✅ |
| **Pagar contas (MB Way / Multibanco)** | **A estudar a fundo** (doc `18`) — feature desejada, mas regulada; ver verdict honesto antes de prometer ✅ pedido |
| Modo escuro | Claro **e** escuro (segue o sistema) |
| Quem instala onde | iPhone via TestFlight; Android sideload; web por URL (publicar nas lojas é opcional) |
| Membros da família no v1 | Suporte a vários membros desde cedo |

Defaults são reversíveis; diz se quiseres mudar algum.

## PARTE C — Riscos e mitigações

| Risco | Probab. | Impacto | Mitigação |
|-------|:---:|:---:|-----------|
| GoCardless não aceitar novos registos (Open Banking grátis PT) | Média | Médio | Plano B: Tink/Salt Edge/Plaid (custo mínimo à escala família); Plano C: começar sem Open Banking |
| Re-consentimento Open Banking a cada 180 dias | Alta | Baixo (família pequena) | Fluxo de relink simples + lembrete antes de expirar |
| Notificações pouco fiáveis no Android (OEMs matam serviço) | Alta | Médio | Multi-fonte + reconciliação + correção fácil; comunicar honestamente |
| iOS não permite captura por notificação | Certa | Baixo | iPhone usa Open Banking + e-mail + entrada rápida |
| "Write once run everywhere" da Expo ter arestas (web) | Média | Médio | Ficheiros `.web.tsx` específicos onde preciso; testar cedo (ver `16`) |
| Manter o app sozinho dá trabalho (parsers, libs desatualizadas) | Média | Médio | Escolher libs vivas; arquitetura simples; sem features que não usamos |
| Bot dizer um número errado | Média | Médio | Números só por SQL; citar origem; é uso familiar (risco legal baixo, mas confiança importa) |
| Custo da IA crescer | Baixa | Baixo | Caching + routing + batch; à escala família é cêntimos |

## PARTE D — O que está validado vs por validar

**Validado pela pesquisa:** viabilidade da captura (notificações Android, limites iOS), Open Banking PT (GoCardless/Tink/etc.), arquitetura do bot, e — na ronda atual — design/UI-UX, gráficos, multi-plataforma e funcionalidades inovadoras (docs `12`–`17`).

**Por validar (tarefas práticas quando começarmos a codar):**
- Conseguir registo no aggregador Open Banking (GoCardless ou alternativa).
- Templates de parsing dos bancos da família (CGD, BCP, etc.).
- Testar a build web da Expo cedo, para apanhar arestas.

## Próximo passo

Estou agora a **desenhar tudo** (design system, gráficos, inovação, família, multi-plataforma e o documento ecrã-a-ecrã `17`) para tu veres o produto inteiro desenhado antes de uma linha de código. Quando estiver, lês e dizes o que mudar. Decisões pequenas da Parte B podem vir nessa altura.
