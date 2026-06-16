# 15 — Família e Multi-Utilizador

> O coração da diferença: não é um app de uma pessoa, é da **família**. Tem de equilibrar **partilha** (ver o conjunto, objetivos comuns) com **respeito pela privacidade** de cada membro. Como não vendemos, não há limite de "lugares" pagos — todos os membros, de graça.

## 1. Modelo de membros (aprendido com Monarch e YNAB)

- **Monarch:** membros ilimitados e grátis, cada um com **o seu login**, partilhando o mesmo espaço. Mas o modelo é **plano** — todos os membros editam tudo (só o Admin controla faturação/membros) e **não dá para esconder contas** de outros membros (só marcar transações como privadas).
- **YNAB Together:** até **6** pessoas, cada uma com login próprio; o "Gestor de Grupo" **vê e edita todos os orçamentos** dos membros (mesmo os que o membro escondeu de outros). Membros podem ter planos próprios privados — mas nunca do Gestor.

**A nossa escolha:** logins separados por membro (nunca credenciais partilhadas — falha de segurança garantida), e um modelo de **privacidade granular de verdade** (a seguir), que resolve a lacuna que tanto o Monarch como o YNAB têm.

## 2. Privacidade granular (o melhor de Honeydue, melhorado)

O **Honeydue** tem o melhor modelo de privacidade: por cada conta ligada, o dono escolhe um de **3 níveis** do que o resto vê:
1. **Saldo + transações** (detalhe total).
2. **Só saldo** (vê o saldo, não as transações).
3. **Nada** (conta escondida).
Mais: pode **esconder uma transação específica** (ex.: um presente) numa conta partilhada.

**A nossa versão (★):**
- Mesmos 3 níveis por conta, **controlados pelo dono da conta**.
- **Rótulos de propriedade "meu / dele(a) / nosso"** (estilo Monarch Shared Views) ao nível da conta, herdados pelas transações, com override por transação.
- **Comutador de perspetiva** persistente: cada membro alterna entre ver **só o meu / só o partilhado / a família toda**.
- **Esconder transação individual** numa conta partilhada (presentes/surpresas).
- **Papéis claros:** **Admin** (cria a família, gere membros) e **Membro**. Para os jovens, um papel **Supervisionado** (ver secção 5).

> Isto resolve a lacuna real do mercado: Monarch não esconde contas; YNAB esconde de outros membros mas nunca do Gestor. Nós deixamos cada adulto decidir genuinamente o que partilha.

## 3. Espaço partilhado vs pessoal

- **Contas pessoais:** cada membro liga as suas; por defeito privadas, partilha à escolha.
- **Espaço partilhado ("Família"):** contas/objetivos/contas-a-vencer marcados como "nosso" entram numa visão familiar comum.
- **Orçamento:** aqui melhoramos o Monarch (que só tem **um** orçamento partilhado). Suportar **orçamento familiar partilhado E orçamentos pessoais** em simultâneo (como o YNAB permite planos múltiplos), para cada adulto poder gerir o seu sem poluir o comum.

## 4. Funcionalidades de colaboração (de Honeydue/Zeta)

- **Chat / comentários por transação:** comentar uma transação ("o que foi isto?"), reações com emoji. Conversa sobre dinheiro dentro do app, sem sair para o WhatsApp.
- **Atribuição visível:** avatar do membro na linha da transação; "marcar um membro para rever esta despesa".
- **Quem pagou o quê / divisões:** dividir uma despesa entre membros ou entre "meu/partilhado".
- **Contas e objetivos partilhados:** contas a vencer comuns com lembretes para os membros certos; objetivos de poupança da família (férias, escola) com contribuições de vários.
- **Relatório familiar mensal automático:** o bot gera um resumo do mês da família (ver `06`/`14`).

## 5. Jovens / filhos (variante, estilo Greenlight — opcional)

Padrão diferente do casal-de-adultos. Para filhos/adolescentes:
- **Conta supervisionada por membro jovem**, com visão simplificada e gamificada.
- **Mesada automática** (transferência recorrente) e **tarefas com recompensa** (chores → poupança).
- **Objetivos de poupança** visuais e celebrações ao atingir (com bom gosto, ver `12`).
- **Supervisão do Admin:** ver saldos, aprovar/limitar, sem ser intrusivo.
- **Regra de empatia do bot:** nunca envergonhar; tom educativo e encorajador. Ensinar a gerir dinheiro, não criar ansiedade.

> Decisão pendente (ver `11`): incluir já a variante jovens no MVP ou só adultos primeiro. Recomendo começar pelo modelo adulto e adicionar jovens cedo (a família tem idades mistas).

## 6. Onboarding da família (aprendido com YNAB Together / Monzo)

- **Convidar o membro DEPOIS de o convidante já ter ligado uma conta e visto valor** (não antes) — pode mostrar, não só prometer.
- **Logins separados, nunca partilhados.** Convite por email/link com onboarding guiado próprio para o convidado.
- **Mostrar claramente o âmbito da partilha no convite** ("vais partilhar X; o convidante verá/não verá Y") — nenhum membro é surpreendido.
- **O Admin controla** convidar/remover membros e a configuração da família; nunca pode ver o que um membro marcou como privado (ao contrário do YNAB).

## 7. Implicações técnicas (ver `16`)

- **Isolamento por família:** todas as tabelas com **Row-Level Security (RLS) por `household_id`** no Postgres/Supabase — um membro só lê linhas da sua família, e a privacidade por conta/transação aplica-se por cima.
- **Sincronização entre dispositivos** da família em tempo real (Supabase Realtime) + offline-first (PowerSync).
- **Modelo de dados de transações append-only** (imutáveis, UUID gerado no dispositivo) → dois membros a adicionar offline geram duas linhas, sem conflitos.

## 8. Resumo das decisões de família

- Logins separados; membros grátis e (praticamente) ilimitados.
- **Privacidade granular real** (3 níveis por conta + esconder transação + propriedade meu/dele/nosso) — o nosso diferenciador vs Monarch/YNAB.
- Orçamento partilhado **E** pessoal em simultâneo.
- Chat/comentários, atribuição, divisões, objetivos e relatório familiar.
- Variante jovens (mesada/tarefas/objetivos) opcional, com tom educativo.
- Tudo isolado por família com RLS.
