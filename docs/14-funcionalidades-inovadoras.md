# 14 — Funcionalidades Inovadoras ("como é que eu melhoro isto")

> O pedido do chefe: para cada funcionalidade, perguntar **"como é que eu melhoro isto?"** e desenhar a versão melhor. Para cada item: **(P)** versão padrão que os apps fazem, **(★)** a nossa versão elevada, **(Auto)** como a automação a torna mágica.

Como não vendemos nem temos paywalls, podemos dar **tudo a todos** e combinar as melhores ideias de vários apps numa só — coisa que os comerciais não fazem porque cada feature é um tier pago.

---

## 1. "Quanto posso gastar" (Safe-to-Spend) — o número-herói

- **(P)** Um número: `saldo − contas a vencer − objetivos = seguro para gastar` (Simple, PocketGuard). Monarch chama-lhe "flex number"; Copilot "free to spend".
- **(★) "Seguro por dia até ao próximo ordenado":** recalcular `seguro-para-gastar ÷ dias até ao próximo ordenado detetado` **todos os dias**, ajustando-se sozinho conforme gastas. Reservar dinheiro de objetivos/contas **sem o mover** (truque do Simple: fica na conta, só é escondido do número) → segurança psicológica de envelopes sem fricção, e o saldo total continua acessível numa emergência.
- **(★) Pacing visual:** linha pontilhada = ritmo ideal, linha sólida = ritmo real (Copilot), com cor verde/âmbar/vermelho conforme gastas mais depressa do que os dias que faltam (Monarch).
- **(Auto)** O ordenado é **detetado automaticamente** (entrada recorrente), por isso o "por dia" auto-ajusta-se sem o utilizador configurar nada.

## 2. Calendário de fluxo de caixa / "Runway" — a lacuna que ninguém preenche bem

- **(P)** Calendário mensal com contas/receitas nos dias (Monarch); ou previsão de longo prazo (anos) sem projetar o saldo diário.
- **(★) Linha de saldo projetado dia-a-dia com "zona de perigo":** ligar cada conta recorrente a uma conta bancária específica e **avisar a data e o valor exatos** em que o saldo projetado cruza abaixo do zero ou do buffer ("A 3 de julho ficas em −142 €; o ordenado só entra a 5"). É a feature mais pedida (Copilot) e que nenhum app entrega.
- **(★)** Incluir parcelas de **"compra agora, paga depois"** (Klarna/etc.) no mesmo calendário — são exatamente as obrigações que causam saldos negativos e que os outros ignoram.
- **(★)** Loop de confirmação (Monarch: ✓ pago / azul = futuro) para a previsão se auto-corrigir; slider "e se for pago mais cedo / adiar isto?" à resolução de **semanas** (não anos).
- **(Auto)** Tudo alimentado pela deteção automática de recorrentes; o utilizador só vê o aviso a tempo.

## 3. Radar de subscrições — apanhar fugas de dinheiro

- **(P)** Lista de cobranças recorrentes com datas e totais; deteção por "stream" (≥3 ocorrências = madura; `early_detection` <3). Sinaliza duplicados e subidas de preço (Emma); cancela por ti (Rocket Money, concierge).
- **(★) Intercetar antes da cobrança:** usar o sinal de **deteção precoce** para identificar uma primeira cobrança / trial, inferir a data de fim do período grátis e disparar **"Vais ser cobrado 9,99 € daqui a 3 dias"** com opções inline "lembra-me / mantém / ajuda-me a cancelar". Converte o momento "poupámos-te dinheiro" de *relatório* para *interceção*.
- **(★)** Detetar **subscrições duplicadas na família** (dois serviços de streaming entre membros) — algo que só um app familiar consegue ver.
- **(Auto)** O radar corre sozinho sobre as transações capturadas; o bot avisa de forma proativa (com limites de frequência, ver `04`).

## 4. O assistente com personalidade ajustável

- **(P)** Chatbot com tom fixo (Cleo: roast/hype, escrito por comediantes; ~300M USD ARR). Ou assistente neutro consultivo (Monarch).
- **(★) Tom como um botão (dial):** o utilizador escolhe **neutro / treinador / divertido** para a **mesma verdade financeira** — o gozo é consentido, não chocante. A matemática (SQL) é igual; só muda a voz.
- **(★) "Tipo de gastador" persistente derivado dos dados reais** (não de um quiz): o bot, com memória, refere-o ao longo do tempo ("clássico gastador por impulso — terceiro pedido de comida esta semana"). Ninguém funde o tipo-de-personalidade com um coach de IA com memória ancorado nos dados — é uma lacuna.
- **(★) Regra de empatia (Cleo): "nunca bater em quem está em baixo"** — sem gozo com membros em aperto financeiro (especialmente jovens). Crítico para um app de família.
- **(Auto)** O bot lê os dados todos da família e responde com números exatos (via SQL, ver `06`); pode agir (criar lembrete, sinalizar subscrição) com aprovação.

## 5. Nudges comparativos "vs mês passado" — honestos e acionáveis

- **(P)** "Gastaste 412 € em restaurantes" (inerte) ou "38% mais que o mês passado" (com referência).
- **(★) Base honesta:** comparar sempre **mês-até-hoje vs mês-anterior-até-ao-mesmo-dia** (regra do Copilot) — nunca meio mês contra mês inteiro (desonesto, quebra a confiança).
- **(★) Veredicto de ritmo, não autópsia (Monzo):** "Dia 16, estás 38% acima do ritmo do mês passado em restaurantes — a este ritmo chegas a 640 € vs 465 €." Acionável a meio do mês.
- **(★) Só disparar se for anómalo (Emma):** gate em ">25% acima do mesmo período E >X € absoluto" — mata a fadiga de notificações (o assassino nº1 destas features).
- **(Auto)** Engine única de comparação serve qualquer tom (neutro/coach/divertido).

## 6. Envelopes / objetivos automáticos

- **(P)** Envelopes/buckets (YNAB base-zero; Monzo Pots; Goodbudget). "Dá um trabalho a cada euro."
- **(★) Objetivo com meta + prazo que se enche sozinho:** a app **calcula a contribuição por ordenado** (`custo ÷ ordenados que faltam`) e **separa esse valor no instante em que o ordenado entra** (estilo "Salary Sorter" do Monzo), opcionalmente **bloqueando** o envelope até ao prazo, com **round-ups multiplicados** a encher passivamente. Junta a disciplina do YNAB, a ausência de fricção do Monzo e a fricção comportamental dos pots bloqueados — nenhum app faz tudo.
- **(★) "Idade do dinheiro"** (métrica que os fãs do YNAB adoram) como número gamificado: sinaliza "saíste do viver-de-ordenado-a-ordenado".
- **(Auto)** Reservas e round-ups acontecem sozinhos no payday detetado.

## 7. Entrada relâmpago (quando a automação falha)

- **(P)** Adicionar à mão por formulário; voz; foto de recibo (OCR).
- **(★) Auto-preenchimento por localização (estilo "Local Payee" do Debit & Credit):** ao registar, ler GPS, encontrar o comerciante onde já registaste ali antes e pré-preencher conta+categoria+comerciante. Com etiqueta NFC na carteira ou o **Botão de Ação** do iPhone → registo de uma compra recorrente em <2 segundos, zero teclado.
- **(★) Recibo casa-se com a transação (Expensify):** não criar uma transação nova do scan — **casar com a transação já importada do banco** e anexar o detalhe OCR. Elimina duplicados.
- **(★) Loop de validação:** antes de confirmar, verificar `subtotal + IVA + gorjeta = total` e sinalizar decimais mal lidos. Barato, e dispara a perceção de precisão.
- **(Auto)** A entrada manual é a **rede de segurança** — a maioria das transações entra sozinha via Open Banking/notificações.

## 8. Orçamentos de viagem / férias — auto-detetados

- **(P)** Apps de viagem (TravelSpend) com orçamento por viagem e mesada diária; bancos (Revolut) com "gastos por país".
- **(★) Deteção automática da viagem:** ≥2 transações num país estrangeiro em dias consecutivos → **"Parece que estás em Lisboa — criar viagem?"** Transforma o passivo "gastos por país" num objeto de viagem com zero setup.
- **(★) Mesada diária auto-corretiva:** "ainda podes gastar 74 € hoje", recalculada pelos dias que faltam da viagem.
- **(★) FX honesto por transação:** guardar a taxa histórica de cada transação (truque do Lunch Money) para o total da viagem não derivar, e mostrar o **custo de câmbio** como linha — o custo real das férias, não a taxa de marketing.

## 9. Gamificação e hábitos (com bom gosto, e para a família)

- **(P)** Streaks, objetivos, celebrações, desafios (ex.: desafio do 1 cêntimo do Monzo, ~667 €/ano).
- **(★) Celebração só em conquistas reais** (objetivo atingido, primeira semana sem gastos supérfluos, conta paga a tempo): um **único** confetti + um háptico de sucesso. Confetti é recurso escasso (ver `12`).
- **(★) Para os jovens:** objetivos de poupança, mesada e tarefas com recompensa, de forma simples e visual — motivar sem manipular nem envergonhar (ver `15`).
- **(Auto)** As conquistas detetam-se sozinhas dos dados (não é preciso o utilizador marcar nada).

## 10. Widgets, ecrã de bloqueio e atalhos

- **(★)** Widget de ecrã inicial com o "seguro para gastar" e contas a vencer; atividade ao vivo / ecrã de bloqueio (iOS) para o saldo do dia; atalho de voz/Botão de Ação para registar.
- **(Auto)** Tudo lê do mesmo motor; nada que o utilizador tenha de atualizar.

---

## Resumo: a nossa "stack de inovação" (o que nos torna diferentes)

1. **"Seguro por dia até ao ordenado"** auto-ajustável (Simple+Monarch+Copilot+Cleo, fundidos).
2. **"Runway" com aviso da data exata de saldo negativo** + parcelas BNPL (lacuna real do mercado).
3. **Radar de subscrições com interceção pré-cobrança** + duplicados na família.
4. **Bot com tom ajustável + tipo-de-gastador persistente** ancorado nos dados.
5. **Nudges comparativos honestos, acionáveis e anómalos** (sem spam).
6. **Objetivos que se enchem sozinhos no payday** + idade do dinheiro.
7. **Entrada relâmpago por localização/NFC/Botão de Ação** + recibo casado com a transação.
8. **Viagens auto-detetadas** com mesada auto-corretiva e FX honesto.

Cada uma combina o melhor de 3–4 apps numa só — possível porque é da família, sem paywalls a separar features.
