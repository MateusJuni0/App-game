# 12 — Design System (cores, tipografia, espaçamento, modo escuro, movimento)

> Tokens prontos a usar. Filosofia (Refactoring UI + grandes design systems): **desenhar primeiro em tons de cinza, criar hierarquia com espaçamento e tipografia, e a cor entra por último como camada semântica — nunca como único portador de significado.** O app tem de ser bonito **e** acessível (a cor verde/vermelho típica de finanças falha para daltónicos e a lei europeia EAA, em vigor desde jun. 2025, exige acessibilidade em apps de banca).

## 1. Cor

### 1.1 Neutros (o cavalo de batalha — ~90% do ecrã)

Modo claro. Texto nunca a preto puro (`#000`), que parece de baixa qualidade.

| Token | HEX | Uso |
|-------|-----|-----|
| `neutral-0` | `#FFFFFF` | Fundo de página, superfície de cartão de topo |
| `neutral-50` | `#F7F8FA` | Fundo da app atrás dos cartões |
| `neutral-100` | `#EEF0F3` | Preenchimentos subtis, hover |
| `neutral-200` | `#E2E5EA` | **Bordas, divisórias** |
| `neutral-300` | `#CBD0D9` | Bordas desativadas, contornos de input |
| `neutral-400` | `#9AA2AF` | Placeholder, ícones de-enfatizados |
| `neutral-500` | `#6B7280` | Texto secundário, legendas |
| `neutral-600` | `#4B5563` | Texto de corpo (secundário) |
| `neutral-700` | `#374151` | **Texto de corpo (primário)** |
| `neutral-800` | `#1F2733` | Títulos |
| `neutral-900` | `#121826` | Números/títulos de máxima ênfase |

### 1.2 Marca / primária

Índigo calmo e fiável (deixa verde/vermelho livres para uso semântico).

`primary-50 #EEF2FF` · `primary-100 #E0E7FF` · `primary-300 #A5B4FC` · `primary-500 #6366F1` (base) · `primary-600 #4F46E5` (ação por defeito) · `primary-700 #4338CA` (premido).

### 1.3 Semânticas (receita / despesa / estado) — acessíveis

> **Regra de ouro (WCAG 1.4.1, nível A): a cor nunca é o único sinal.** Cada valor leva sempre sinal (`+`/`−`), ícone (▲/▼) ou rótulo. Assim o app funciona em tons de cinza e para daltónicos (~8% dos homens).

As cores verde/vermelho típicas **falham** o contraste 4.5:1 em branco (verde `#4CAF50` ≈ 2,8:1; vermelho `#F44336` ≈ 3,7:1). Usamos tons escurecidos que passam:

| Significado | Token | Texto em claro (≥4.5:1) | Fundo tinta |
|-------------|-------|------------------------|-------------|
| **Positivo / receita** | `success` | `#0F7B6C` (teal-verde escuro, ~5:1) | `#ECFDF3` |
| **Negativo / despesa** | `danger` | `#C2410C` (vermelhão escuro, ~4.9:1) | `#FEF2F2` |
| **Aviso / orçamento perto** | `warning` | `#B45309` | `#FFFBEB` |
| **Info / pendente** | `info` | `#0369A1` | `#EFF6FF` |

**Tema acessível alternativo (opcional, selecionável):** eixo **azul (positivo `#0072B2`) / laranja (negativo `#E69F00`)** da paleta Okabe-Ito — o par mais seguro para todos os tipos de daltonismo. Bom default para uma família com membros variados.

### 1.4 Paleta de categorias (gráficos e etiquetas)

Paleta Okabe-Ito (segura para daltónicos), mapeada **uma vez** num token central por categoria (nunca por índice de array, que muda com filtros):

```
#0072B2 azul     #E69F00 laranja
#009E73 verde-teal #CC79A7 malva
#56B4E9 céu      #D55E00 vermelhão
#F0E442 amarelo  #999999 cinza
```

Máximo ~8 categorias distinguíveis; acima disso, agrupar em "Outros". Cada categoria identifica-se por **forma (ícone) + cor**, num chip circular (`cor da categoria @ 12% de fundo`, ícone a cor cheia).

## 2. Tipografia

### 2.1 O que torna os números de dinheiro legíveis (as regras duras)

1. **Algarismos tabulares + lining:** `font-variant-numeric: lining-nums tabular-nums` (RN: `fontVariant: ['tabular-nums']`). Todos os dígitos com a mesma largura → colunas alinham e o número não "salta" ao animar. **A regra mais importante.**
   - ⚠️ Bug iOS: `fontVariant: ['tabular-nums']` **não se aplica a fontes custom carregadas via `expo-font`**. Escolher uma fonte cujos algarismos já sejam tabulares, ou usar a do sistema.
2. **Alinhar montantes à direita** em listas/tabelas.
3. **Mostrar sempre os cêntimos** (`54,00`, não `54`) para as linhas não mudarem de largura.
4. **De-enfatizar símbolo e cêntimos** em valores grandes: símbolo e `,00` a ~60–70% do tamanho e/ou tom mais claro; euros a peso cheio.
5. **Sinal de menos verdadeiro** `−` (U+2212), não hífen — alinha à altura dos dígitos **e** é lido corretamente por leitores de ecrã (o hífen ASCII faz o VoiceOver perder o "negativo").
6. **Formatação por locale** com `Intl.NumberFormat('pt-PT', { style:'currency', currency:'EUR' })` → `"1 234,56 €"`. (Ver `13` para detalhes de pt-PT: vírgula decimal, espaço estreito U+202F como separador de milhares, símbolo € depois do valor.)

### 2.2 Tipos de letra

- **iOS:** **SF Pro** (sistema) — algarismos tabulares excelentes, Dynamic Type grátis.
- **Android / Web / cross-platform:** **Inter** (v4+) — a melhor fonte de UI, com `tnum` tabular e zero cortado. Alternativas: Geist, IBM Plex Sans.
- **Recomendação:** SF Pro no Apple, **Inter** no resto, para paridade visual. Corpo mínimo 17pt (iOS) / 16px (web).

### 2.3 Escala tipográfica (base 16px, ~1.2)

| Token | Tamanho/Linha | Peso | Uso |
|-------|---------------|------|-----|
| `display` | 40/44 | 700 | Saldo hero (tabular) |
| `h1` | 30/36 | 700 | Título de ecrã |
| `h2` | 24/32 | 600 | Cabeçalho de secção |
| `h3` | 20/28 | 600 | Título de cartão |
| `body` | 16/24 | 400 | **Corpo por defeito** |
| `body-sm` | 14/20 | 400 | Secundário, meta de lista |
| `caption` | 13/16 | 500 | Rótulos, timestamps |
| `overline` | 11/16 | 600, +0.06em, MAIÚSCULAS | Etiquetas de categoria |

## 3. Espaçamento e grelha

Grelha **8pt com meio-passo de 4pt** (Material 3). Tudo encaixa em múltiplos de 8; o 4px trata de gaps ícone-rótulo.

`space-1 4` · `space-2 8` · `space-3 12` · `space-4 16` · `space-5 20` · `space-6 24` · `space-8 32` · `space-10 40` · `space-12 48` · `space-16 64`.

- **Telemóvel:** 1 coluna, margens de 16px.
- **Tablet/desktop web:** grelha de 12 colunas, gutter 24px, largura máxima de conteúdo ~1200px.
- **Alvos de toque ≥ 44×44pt (iOS) / 48×48dp (Android)** — usar `hitSlop` para ícones pequenos; ≥8dp entre alvos.
- **Raios:** `radius-sm 8` · `radius-md 12` · `radius-lg 16` (cartões) · `radius-xl 24` · `radius-full 999`.

## 4. Elevação e cartões

**Preferir borda + sombra muito suave a sombras pesadas.** UI de finanças é densa: uma hairline de 1px `neutral-200` + sombra ténue separa cartões sem ar "flutuante".

| Token | box-shadow | Uso |
|-------|-----------|-----|
| `elev-0` | nenhuma (borda 1px `neutral-200`) | Cartões planos, linhas de lista |
| `elev-1` | `0 1px 2px rgba(16,24,38,0.06)` | Cartão em repouso |
| `elev-2` | `0 2px 8px rgba(16,24,38,0.08)` | Cartão elevado, dropdown |
| `elev-3` | `0 8px 24px rgba(16,24,38,0.12)` | Modal, bottom sheet |
| `elev-4` | `0 16px 40px rgba(16,24,38,0.16)` | Diálogo, popover |

Cartão padrão: superfície `neutral-0`, raio 16px, padding 16px, borda 1px `neutral-200` + `elev-1`. Cartão de saldo hero pode ter gradiente `primary`. **Evitar neumorfismo** (falha WCAG/EAA) e glassmorphism em controlos com texto.

## 5. Iconografia

- Estilo **linha (outlined)**, traço 1.5–2px, grelha 24px, terminais arredondados (combina com os raios e o tom familiar). Versão **filled** só para estado ativo (ex.: tab selecionado).
- Sistema: **SF Symbols** (Apple) + **Lucide** ou **Material Symbols Rounded** (cross-platform/web).
- Ícones de categoria consistentes: Mercearia (carrinho), Restauração (talheres), Transporte (carro), Casa (casa), Utilities (raio), Saúde (coração), Receita (seta), Transferências (setas), Subscrições (repeat), Poupança (mealheiro). Cada um em chip circular tintado.

## 6. Modo escuro (obrigatório)

1. **Sem preto puro.** Base cinza-escuro. Ramp de superfícies:

| Token | HEX | Uso |
|-------|-----|-----|
| `dark-bg` | `#0F1115` | Fundo da app |
| `dark-surface-1` | `#16181D` | Cartão em repouso |
| `dark-surface-2` | `#1E2127` | Cartão elevado / linha |
| `dark-surface-3` | `#262A31` | Sheet / menu |
| `dark-surface-4` | `#2E323A` | Diálogo / popover |
| `dark-border` | `rgba(255,255,255,0.10)` | Divisórias, contorno |

2. **Elevação = superfície mais clara**, não sombra maior (sobreposição branca: +5% a +16% conforme a altura).
3. **Dessaturar as cores semânticas** (saturadas vibram no escuro): primária `#A5B4FC`, positivo `#34D399`, negativo `#FB923C` (ou `#F87171`), aviso `#FBBF24`, info `#38BDF8`.
4. **Texto por opacidade de branco:** alto `0.87`, médio `0.60`, desativado `0.38`.
5. Manter **≥4.5:1** de contraste em todas as superfícies (verificar os tons dessaturados contra `#0F1115`).

## 7. Movimento e micro-interações

> Em finanças, o movimento é um **instrumento de confiança**, não entretenimento. Confirma estado, dirige atenção, suaviza transições. Teste: "um banco privado poria isto à frente de um cliente?".

### 7.1 Durações (defaults)

| Elemento | Duração |
|----------|---------|
| Toque em botão (scale para 0.97) | 80–120 ms |
| Toggle / segmento | 100–150 ms |
| Troca de tab / cross-fade | 150–200 ms |
| Expandir linha / revelar | 200–250 ms |
| Navegação push | 280–350 ms |
| Bottom sheet / modal | 300–400 ms |
| Count-up de saldo | 600–1200 ms (escala com a magnitude; **aterra preciso, sem bounce**) |
| Desenho de gráfico (1.ª vez) | 600–900 ms (só na primeira aparição) |
| Celebração (confetti, ✓) | 500–800 ms (mola permitida **só aqui**) |

### 7.2 Easing

- **Ease-out por defeito (~80% do movimento):** entradas iniciadas pelo utilizador. `cubic-bezier(0.25,0.1,0.25,1)` (iOS) / `(0,0,0.2,1)` (Material).
- **Ease-in:** só saídas (dispensar sheets).
- **Mola (overshoot pequeno):** só recompensas (✓ de sucesso, objetivo atingido).

### 7.3 Regras de bom gosto

- **Dinheiro em movimento lê-se com cuidado:** count-up aterra exato, nunca com bounce nos dígitos.
- **Uma celebração por conquista real** (objetivo de poupança atingido, conta paga) — confetti é recurso escasso, nunca em ações de rotina.
- **Erros não saltam** — shake curto de baixa amplitude + háptico de aviso.
- **Respeitar "Reduzir movimento"** (`useReducedMotion()`): trocar count-ups/desenhos por valores instantâneos e cross-fades; suprimir confetti.
- **Animar na UI thread** (Reanimated worklets / Skia) para nunca cair frames.

### 7.4 Hápticos (mapear peso a significado)

| Evento | expo-haptics |
|--------|--------------|
| Mudar segmento/tab | `selectionAsync()` |
| Toggle / confirmação leve | `impactAsync(Light)` |
| Pagamento/transferência concluída | `notificationAsync(Success)` |
| Aviso de limite | `notificationAsync(Warning)` |
| Erro / recusado | `notificationAsync(Error)` |
| Objetivo atingido | Success + confetti (uma vez) |

### 7.5 Bibliotecas de animação (resumo; detalhe técnico em `16`)

- **react-native-reanimated v4** — a fundação (UI thread, gestos, layout).
- **Moti** — transições declarativas de UI (entradas/saídas, skeletons).
- **react-native-skia** / **react-native-graph** — gráficos e desenhos custom.
- **react-native-fast-confetti** — a celebração.
- **expo-haptics** — hápticos.

## 8. Resumo "números legíveis" (checklist)

1. Tabular + lining (`fontVariant: ['tabular-nums']`).
2. Montantes alinhados à direita; cêntimos sempre.
3. Símbolo e cêntimos de-enfatizados; euros a peso cheio.
4. Menos verdadeiro `−` (U+2212); `Intl.NumberFormat('pt-PT', EUR)`.
5. Cor de receita/despesa é sinal **secundário** — sinal/ícone/rótulo primeiro (tema seguro para daltónicos disponível).
6. Contraste ≥4.5:1 em todas as superfícies, claro e escuro.
