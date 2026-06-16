# 17 — Ecrãs e Fluxos (tudo desenhado)

> O pedido do chefe: "desenha tudo como vai ser pra eu não precisar indo área em área." Aqui está o produto inteiro, ecrã a ecrã, com wireframes em texto, anatomia, estados e fluxos. Usa os tokens do `12`, os gráficos do `13` e a inovação do `14`.

## Mapa de navegação

```
Telemóvel — tabs em baixo:
[ Início ] [ Transações ] [ Orçamento ] [ Família ] [ Bot ]
                                                      ▲ botão flutuante "+" (registo rápido) sobreposto

Navegador / desktop — sidebar à esquerda + master-detail:
┌─────────────┬───────────────────────────────────────┐
│ ▸ Início    │                                       │
│ ▸ Transações│   (conteúdo, largura máx ~1200px,     │
│ ▸ Orçamento │    listas com detalhe lado a lado)     │
│ ▸ Runway    │                                       │
│ ▸ Família   │                                       │
│ ▸ Bot       │                                       │
│ ▸ Definições│                                       │
└─────────────┴───────────────────────────────────────┘
```

Princípio transversal (das melhores apps): **número-herói primeiro, detalhe revisável depois, tudo personalizável.**

---

## 1. Onboarding (sequência valor → confiança → fricção → recompensa)

Regra de ouro: **mostrar valor antes de pedir coisas difíceis.** Tempo-até-valor curtíssimo.

```
1. Boas-vindas (sem dados)        2. Conta leve             3. Pergunta de intenção
┌──────────────────────┐         ┌──────────────────┐      ┌────────────────────────┐
│   [ilustração]       │         │  Email           │      │ O que queres primeiro? │
│  "Todo o dinheiro    │         │  [____________]  │      │ ( ) Ver tudo num sítio │
│   da família,        │  ─────▶ │  Face ID / PIN   │ ───▶ │ ( ) Saber o que devo   │
│   atualizado sozinho"│         │  [Continuar]     │      │ ( ) Poupar para algo   │
│   • • ○  [Saltar]    │         └──────────────────┘      │ (personaliza o resto)  │
└──────────────────────┘                                   └────────────────────────┘
        │
        ▼
4. Ligar banco (o ecrã decisivo)            5. AHA — dashboard preenchido
┌────────────────────────────────┐         ┌──────────────────────────────┐
│  "Vê os teus gastos sozinho"   │         │  (o nº1 e os cartões já com   │
│  • Acesso só de LEITURA        │         │   os dados reais da pessoa —  │
│  • NUNCA vemos a tua password  │  ─────▶ │   este momento é a recompensa)│
│  [Ligar o meu banco]           │         │                              │
│  [Adicionar conta manual] [+tarde]       │  + checklist dispensável:     │
└────────────────────────────────┘         │  ☐ Criar orçamento            │
   (Open Banking; SCA no banco)             │  ☐ Convidar família           │
                                            └──────────────────────────────┘
```

- **Pedir permissões em contexto, no momento** (notificações enquadradas como "alertas de dinheiro/segurança", nunca marketing; "Agora não" com o mesmo peso que "Ativar").
- **Sinais de confiança junto da ação de risco:** cadeado, "encriptado", "só leitura", "podes desligar quando quiseres".
- **Nunca becos sem saída:** em falha de ligação, oferecer "tentar de novo / outra conta / ligar mais tarde".
- **Convidar a família só depois** de o convidante ter ligado uma conta e visto valor (ver `15`).

---

## 2. Início (Dashboard)

Feed vertical de cartões. Topo = **número-herói "Seguro para gastar"** (gancho da Persona A / `14`).

```
┌─────────────────────────────────────────────┐
│  Olá, Mateus            [família ▾]   [🌙]   │  ← troca de perspetiva: eu / partilhado / família
│                                               │
│   SEGURO PARA GASTAR                          │
│   1 380,00 €            ┌───── ritmo ─────┐  │  ← linha pontilhada=ideal, sólida=real
│   ~74 €/dia até 5 jul   │ ╱╲___╱  (verde) │  │     cor verde/âmbar/vermelho
│                         └─────────────────┘  │
├───────────────────────────────────────────────┤
│  A REVISAR (3)                          [ver] │  ← transações novas por rever (engagement diário)
│  🛒 Continente   −42,13 €   Mercearia  [✓]   │
│  ⚡ EDP          −61,00 €   Casa       [✓]   │
├───────────────────────────────────────────────┤
│  ORÇAMENTO                              [ver] │
│  Restauração  ███████░░  74%   148/200 €     │  ← barras de progresso (verde→âmbar→vermelho)
│  Mercearia    █████░░░░  52%   208/400 €     │
├───────────────────────────────────────────────┤
│  A VENCER (próximos 7 dias)             [ver] │
│  → Renda        850 €    1 jul   (coberto ✓) │
│  → Netflix       13,99 € 3 jul               │
├───────────────────────────────────────────────┤
│  ESTE MÊS                                     │
│  Entrou 2 100 €  •  Saiu 1 240 €  •  +860 €  │
│  (vs mês passado até hoje: +12%)              │
└─────────────────────────────────────────────┘
        [ + ]  ← botão flutuante: registo rápido
```

- **Cartões reordenáveis e ocultáveis** (default sensato, mas personalizável).
- **Seletor de período** segmentado (Semana/Mês/Ano) global — muda os números abaixo.
- **Toque-e-segura no gráfico** revela o valor na data (scrub, ver `13`).
- **Estado vazio:** "Liga uma conta para veres tudo num sítio." + CTA.

---

## 3. Transações

### Lista
```
┌─────────────────────────────────────────────┐
│  Transações            [🔍]  [filtros ▾]     │
│  ── Hoje ──────────────────────────────────  │  ← cabeçalhos de data fixos (sticky)
│  🛒 Continente      Mercearia · 14:32  −42,13│  ← logótipo do comerciante (fallback: ícone de categoria)
│  ☕ Starbucks       Café · 09:10      −3,80 │
│  ── Ontem ─────────────────────────────────  │
│  💼 Ordenado        Receita           +2 100 │  ← entradas a verde, com sinal +
│  🎁 (privado)       •••                 −60  │  ← transação marcada privada
└─────────────────────────────────────────────┘
```
- **Anatomia da linha:** logótipo → nome (peso médio) → categoria/conta/hora (tom esmaecido) → montante à direita, alinhado, com cor funcional (saída neutra/escura, entrada verde, pendente cinza). Avatar do membro em contas partilhadas.
- **Filtros:** categoria, conta, comerciante, intervalo de valor, datas e (família) **membro/dono**.
- **FlashList** (milhares de linhas), scroll infinito, novas marcadas com ponto até revistas.

### Detalhe (bottom sheet ou ecrã)
```
┌─────────────────────────────────────────────┐
│        🛒  Continente                         │
│            −42,13 €                           │
│        14 jun, 14:32 · Cartão CGD ··4796      │
│        [mapa do local]                        │
│  Categoria:  [ Mercearia ▾ ]                  │  ← chip tocável; ao mudar: "recategorizar tudo deste comerciante?"
│  Dono:       ( meu )( dele )(• nosso )        │  ← propriedade família
│  [ Dividir ]  [ Nota ]  [ Anexar recibo ]     │  ← recibo casa-se com a transação (OCR)
│  [ ] Excluir do orçamento   [ ] É recorrente  │
│  💬 2 comentários da família                  │  ← chat/comentários (ver 15)
└─────────────────────────────────────────────┘
```

---

## 4. Orçamento

```
┌─────────────────────────────────────────────┐
│  Orçamento — Junho            [Mês ▾]        │
│  Gastaste 1 240 € de 2 000 €   ████████░ 62% │  ← resumo topo
├───────────────────────────────────────────────┤
│  🍽 Restauração   ███████░░  148/200 €  âmbar │
│  🛒 Mercearia     █████░░░░  208/400 €  verde │
│  🚗 Transporte    ██████████ 95/90 €   vermelho (+5 acima)
│  ...                                          │
│  [ + categoria ]   [ modelo: Flex ▾ ]         │  ← modelos: Flex / Categoria / Grupo; rollover por categoria
└─────────────────────────────────────────────┘
```
- **Modelos suportados:** **Flex** (default, baixo esforço — Fixas/Flexíveis/Não-mensais, um só número), Categoria, Grupo, com **rollover** (envelope) por categoria.
- Sugestões de orçamento a partir do histórico. Alertas em ~85% e ao ultrapassar.

---

## 5. Runway / Calendário de fluxo de caixa (a inovação, ver `14`)

```
┌─────────────────────────────────────────────┐
│  Runway — saldo projetado                     │
│   ┌─────────────────────────────────────┐    │
│   │  saldo ╲                             │    │
│   │        ╲___        ╱‾‾               │    │
│   │ ───────────╲──────╱──── 0 € ────────│    │  ← zona de perigo a vermelho abaixo do buffer
│   │  ⚠ 3 jul: −142 €  (renda antes do ordenado)│
│   └─────────────────────────────────────┘    │
│  ⚠ Primeiro dia no vermelho: 3 julho          │
│     "Cobrir 150 € do mealheiro Férias?" [Sim] │  ← correção em 1 toque
│  Inclui parcelas Klarna/etc.                  │
└─────────────────────────────────────────────┘
```
Marca a **data e o valor exatos** do saldo negativo; inclui BNPL; slider "e se for pago mais cedo".

---

## 6. Família

```
┌─────────────────────────────────────────────┐
│  Família                       [+ convidar]   │
│  Membros                                      │
│  👤 Mateus (Admin)                            │
│  👤 Ana (Membro)                              │
│  🧒 João (Supervisionado)                     │
├───────────────────────────────────────────────┤
│  Objetivos partilhados                        │
│  ✈️ Férias    ███████░░  1 400/2 000 €  [+]  │  ← qualquer um contribui; celebração ao atingir
│  🏫 Escola    ██░░░░░░░    300/1 500 €        │
├───────────────────────────────────────────────┤
│  Privacidade das minhas contas                │
│  CGD ··4796   [ Saldo + transações ▾ ]        │  ← 3 níveis (ver 15): tudo / só saldo / nada
│  Revolut      [ Nada (privada) ▾ ]            │
└─────────────────────────────────────────────┘
```
- **Convite** mostra claramente o que será partilhado. Logins separados.
- **Jovens:** vista simplificada — mesada, tarefas com recompensa, objetivos, tom educativo (ver `15`).

---

## 7. Bot (assistente)

```
┌─────────────────────────────────────────────┐
│  Assistente                  [tom: simpático ▾]│  ← neutro / treinador / divertido
│                                               │
│  Tu: quanto gastámos em comida este mês?      │
│  🤖 Em junho a família gastou 356 € em        │
│     comida (148 € restaurantes + 208 €        │
│     mercearia). É 12% acima de maio.          │
│     [ver as 23 transações]                    │  ← números via SQL; cita a origem
│                                               │
│  🤖 💡 A Netflix sobe para 15,99 € a 3 jul    │  ← nudge proativo
│     e ninguém a usou há 60 dias. Sinalizar?   │
│     [Sinalizar p/ família]  [Manter]          │
│  ──────────────────────────────────────────  │
│  [ Escreve ou fala... 🎤 ]                    │
└─────────────────────────────────────────────┘
```
- **Números sempre por SQL** (nunca inventados); cita transações de origem (ver `06`).
- **Ações com aprovação** (sinalizar, criar lembrete) via botões; nunca mover dinheiro sem confirmação.
- Voz + memória; disclaimers leves ("informação, não aconselhamento").

---

## 8. Registo rápido (botão "+")

```
┌─────────────────────────────────────────────┐
│  Registo rápido                               │
│  [ 12,00 ]  €                                 │  ← teclado numérico grande, tabular
│  Em: [ Café ▾ ]   (auto-preenchido por GPS)   │  ← "Local Payee": deteta o comerciante onde já registaste ali
│  Conta: [ Dinheiro ▾ ]                        │
│  [ 🎤 Falar ]   [ 📷 Recibo ]   [ Guardar ]   │  ← voz → parse → cartão de confirmação; recibo OCR
└─────────────────────────────────────────────┘
```
Também acessível por atalho Siri / Botão de Ação / widget (ver `14`).

---

## 8b. Pagar conta (handoff assistido — ver `18`)

Abre a partir de uma conta a vencer (dashboard "A VENCER" ou Runway). Integração levada ao máximo: prepara tudo e leva o utilizador ao sítio certo; ele confirma no banco dele.

```
┌─────────────────────────────────────────────┐
│  Pagar — EDP                                  │
│  Entidade   12345        [copiar]             │  ← copiar campo a campo (mecanismo mais fiável)
│  Referência 987 654 321  [copiar]             │
│  Valor      61,00 €      [copiar]             │
│  ───────────────────────────────────────────  │
│  [ Abrir MB Way ]   [ Abrir o meu banco ]     │  ← só ABRE a app (traz à frente); dados já copiados
│  [ Mostrar QR ]  (se o teu banco suportar)    │  ← QR EPC; pouco suportado em PT (bónus)
│  ───────────────────────────────────────────  │
│  🔓 Pagar com autorização (PIS)               │  ← degrau 4: tap → redireciona ao banco → autorizas → paga
│     (disponível se ligarmos um aggregador)    │     fica pronto no código atrás de feature-flag
│  ───────────────────────────────────────────  │
│  Depois de pagares, marco como paga ✓         │  ← reconciliação automática se houver leitura Open Banking
└─────────────────────────────────────────────┘
```
O bot pode preparar este ecrã ("a conta da EDP vence amanhã — está tudo pronto, é só confirmares") e **nunca diz que pagou** se não pagou. Detalhe e escada completa de integração em `18`.

## 9. Definições

Organizadas por objetivo: **Perfil & conta · Segurança (biometria/2FA/bloqueio) · Contas ligadas (estado de sync, re-ligar) · Categorias & regras · Orçamento & preferências · Notificações (canais separados: fraude/atividade/promo) · Família & partilha · Dados & privacidade (exportar/apagar) · Aparência (modo escuro, reordenar dashboard).**

---

## 10. Estados vazios (cada um é onboarding)

| Ecrã | Texto | CTA principal | Secundário |
|------|-------|---------------|------------|
| Dashboard sem contas | "Liga uma conta para veres tudo num sítio." | Ligar banco | Conta manual |
| Sem transações | "As tuas transações aparecem aqui assim que o banco sincronizar (uns minutos)." | Atualizar | Registar à mão |
| Sem orçamento | "Define um orçamento para saberes quanto podes gastar." | Criar orçamento | Modelo pronto |
| Sem objetivos | "A poupar para algo? Cria um objetivo e segue-o sozinho." | Adicionar objetivo | Exemplos |
| Sem resultados (filtro) | "Nenhuma transação corresponde." | — | Limpar filtros |

Sempre com ilustração on-brand + CTA; nunca um ecrã em branco que pareça avariado. Skeleton com shimmer enquanto carrega (ver `12`/`13`).

---

## 11. Versão navegador (responsivo)

- **Sidebar** à esquerda (em vez de tabs).
- **Master-detail:** lista de Transações à esquerda, detalhe à direita no mesmo ecrã.
- Dashboard em **grelha de cartões** (em vez de pilha única), largura máx ~1200px centrada.
- Gráficos maiores e interativos (hover para scrub).
- Mesma base de código (`expo-router` + React Native Web), ficheiros `.web.tsx` onde o layout difere (ver `16`).

---

## 12. Resumo dos fluxos principais

1. **Primeiro uso:** boas-vindas → conta → intenção → ligar banco → **aha (dashboard preenchido)** → checklist.
2. **Uso diário:** abrir → ver "Seguro para gastar" + "A revisar" → confirmar/categorizar (1 toque) → pronto.
3. **Registo manual (exceção):** "+" → valor → (auto GPS) → guardar; ou voz; ou recibo.
4. **Família:** convidar → membro liga as suas contas → escolhe privacidade por conta → objetivos partilhados.
5. **Bot:** perguntar/ouvir nudge → agir com 1 toque (com aprovação).
6. **Runway:** ver previsão → aviso de dia negativo → cobrir do mealheiro em 1 toque.

Tudo isto, bonito e coerente, em telemóvel, tablet e navegador.
