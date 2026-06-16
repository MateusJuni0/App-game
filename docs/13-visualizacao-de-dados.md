# 13 — Visualização de Dados (gráficos)

> Regra-mãe (Cleveland & McGill): **os humanos leem bem posição-numa-escala-comum e comprimento; leem mal ângulo, área e intensidade de cor.** Quase toda a recomendação abaixo sai daí. Em finanças há ainda um dever ético: **eixos honestos** (barras sempre a partir do zero) — um eixo cortado pode levar a más decisões de dinheiro.

## 1. Que gráfico para cada coisa

| Caso | Gráfico recomendado | Porquê / evitar |
|------|---------------------|-----------------|
| **Gastos por categoria** | **Barras horizontais ordenadas** (maior→menor); "Outros" para a cauda | Tarte exige comparar ângulos/áreas (o pior para o olho); 10+ categorias tornam-na ilegível. Donut só como KPI de um número ("68% do orçamento") |
| **Gastos ao longo do tempo** | **Linha** (tendência contínua) ou **barras** (totais por período discreto) | Linha para "como está a evoluir"; barras para "mês a mês". Evitar área empilhada de muitas categorias |
| **Orçamento vs real** | **Barra de progresso** ou **bullet chart** (Stephen Few) | **Nunca gauges/velocímetros** (pouca info, codificam por ângulo). Cor muda no limite (verde→âmbar→vermelho) |
| **Património ao longo do tempo** | **Linha** (default; aguenta negativos cruzando o zero) ou **área** (só positivos) | Sempre com linha de referência no zero. Evitar escala log |
| **Fluxo de caixa (entra vs sai)** | **Waterfall** (saldo inicial → movimentos → saldo final) | Verde a subir = entrada, vermelho a descer = saída. Agrupar itens pequenos em "Outros" |
| **Receita vs despesa** | **Colunas agrupadas** por período; **barras divergentes** se o foco é o saldo (superávit/défice) | Evitar barras empilhadas se é para comparar receita com despesa |
| **Mapa de calor de gastos diários** (estilo GitHub) | **Heatmap de calendário** | Ótimo para ver padrões (fins de semana, dias de contas). Cor = intensidade (lê-se mal → tooltip com valor exato). Escala sequencial de 1 cor; cortar outliers (renda) |
| **Saldo por conta (na lista)** | **Sparkline** (Tufte): minúsculo, sem eixos, ponto colorido no valor atual + número ao lado | Empacota muitas contas numa lista; banda cinza de "intervalo normal" |
| **Runway / previsão** (ver `14`) | **Linha de saldo projetado** com "zona de perigo" abaixo do buffer | Marca a data exata em que cruza o zero |

## 2. Regras gerais

- **Maximizar data-ink (Tufte):** fora gridlines pesadas, bordas, fundos, legendas redundantes.
- **Nunca 3D.** Distorce área/comprimento; é chartjunk puro.
- **Sem eixos duplos** (dois eixos Y) — fabricam correlações falsas. Usar small multiples, gráficos indexados (% face a uma base) ou rotular a série principal.
- **Cor acessível:** paleta segura para daltónicos (Okabe-Ito), diferenciar também por **luminosidade**, e **nunca codificar só por cor** (em finanças, verde=ganho/vermelho=perda tem de vir com sinal/seta/rótulo). Ver `12`.
- **Mobile: "um ecrã, uma ideia"** — mostrar o gráfico mais importante, esconder detalhe atrás de toque/tooltip. Alvos ≥44px. Preferir barras horizontais (rótulos cabem), sparklines, barras de progresso, KPIs únicos. Trocar dropdowns de data por **swipe horizontal entre períodos**.
- **Tooltips ganham o seu lugar:** o gráfico mostra a forma; o número exato vem do tooltip/tabela.

## 3. Tornar os gráficos bonitos (técnicas concretas)

- **Gradiente sob linha/área:** preenchimento vertical da cor da linha (topo, ~45% alpha) a transparente (base). Skia `LinearGradient` ou `react-native-svg` `Defs/LinearGradient/Stop`.
- **Barras com cantos arredondados só em cima:** `<rect rx>` arredonda os 4 cantos (errado); usar um `<path>` com arcos só nos cantos superiores; clampar o raio a `min(r, larguraBarra/2)`.
- **Curvas suaves SEM mentir:** usar **`curveMonotoneX`** (default para finanças) — passa pelos pontos sem oscilações falsas. Alternativa segura: `curveCatmullRom.alpha(0.5)`. **Evitar** `curveNatural`/`curveBasis`/`curveCardinal` (fazem overshoot / não passam nos pontos — inventam um pico de preço que não existe).
- **Cor por categoria:** mapear categoria→cor **uma vez** num token central (por chave estável, nunca por índice de array). A mesma categoria tem a mesma cor em todos os gráficos.
- **Modo escuro:** fundo `#121212`/`#1E1E1E`, gridlines a branco 6–10% de opacidade, cores de dados **dessaturadas ~25%**, rótulos com contraste ≥4.5:1.
- **Ganhos/perdas:** preferir **azul (sobe) / laranja (desce)** + setas ▲▼ ao verde/vermelho (o par que daltónicos não distinguem).
- **Estados:** **skeleton com shimmer** a imitar a forma do gráfico enquanto carrega (só se >500ms); **estado vazio** com ilustração + CTA ("Ainda não há transações este mês"), nunca um eixo vazio.

## 4. Interação (o "efeito Robinhood")

O padrão universal: **toque → shared value na UI thread → elemento Skia**, com o React state **fora** do loop de scrub (senão treme).

- **Scrub:** arrastar o dedo na linha revela o valor na data. Ponto/crosshair seguem o dedo; `snapToPoint` ao ponto mais próximo.
- **Tooltip:** lê shared values via `useDerivedValue` (nunca `useState`); clampar à borda do canvas.
- **Háptico por ponto:** um tick leve (`expo-haptics` `impactLight`) cada vez que o scrub passa para um novo ponto — é o detalhe que faz o gráfico parecer físico (assinatura Robinhood).
- **Transições:** desenho-on de 600–900ms só na 1.ª aparição; depois interpolar suave entre datasets (manter nº de pontos constante para morphing, ou animar opacidade/clip).
- **Pinch-to-zoom** na série temporal com `Gesture.Pinch`; compor com o scrub via `Gesture.Race`.

## 5. Bibliotecas (decisão)

| Necessidade | Escolha | Notas |
|-------------|---------|-------|
| **Gráfico de linha estilo Robinhood, rápido** | **react-native-wagmi-charts** | `LineChart.Provider` + `onCurrentIndexChange`→háptico + `CursorCrosshair` + `PriceText`. Turnkey |
| **Linha animada drop-in** | **react-native-graph** (margelo, Skia) | `<LineGraph animated points color enablePanGesture SelectionDot>`, até 120fps |
| **Gráficos custom / multi-série / barras / velas** | **Victory Native XL** (Skia) + `useChartPressState` | Desenhar tooltip Skia próprio via `useDerivedValue` |
| **Desenho totalmente custom (glow, gauges)** | **@shopify/react-native-skia** | GPU; integra com shared values do Reanimated |
| **Animação base / gestos** | **react-native-reanimated v4** | Fundação (UI thread). Funciona em web também |

> Verificar suporte web (Expo Web) de cada lib ao escolher — Skia e Reanimated têm caminhos web; confirmar na fase de protótipo (ver `16`).

## 6. Números e formatação (pt-PT / EUR)

- `Intl.NumberFormat('pt-PT', { style:'currency', currency:'EUR' })` → `"1 234,56 €"`. **Vírgula decimal**, **espaço estreito (U+202F)** como separador de milhares, **€ depois** do valor.
- ⚠️ **Nunca fazer parsing da string formatada** (o separador é U+202F, não espaço normal) — guardar sempre o número-fonte.
- **Compacto:** `notation: 'compact'` → `"1,2 mil"`, `"3,4 M"`. ⚠️ Tem bug no Hermes — testar no dispositivo; polyfill `@formatjs` se falhar. Nunca usar o valor compacto para totais exatos.
- **Count-up animado:** animar o número cru com Reanimated, renderizar via `react-native-animateable-text` (o `<Text>` normal não aceita props animadas), formatar na JS thread (Intl não é worklet). `fontVariant: ['tabular-nums']` para não tremer.
- **Hermes/Intl:** `Intl.NumberFormat().format()` funciona nativamente, mas `formatToParts()` tem falha no iOS — manter polyfill `@formatjs/intl-numberformat` + locale `pt-PT` como rede de segurança.
- **Locale:** obter com `expo-localization` `getLocales()`; default sempre para `pt-PT`/`EUR`.

## 7. Acessibilidade dos gráficos (resumo; ver `12` para o geral)

- Gráficos Skia/SVG são invisíveis para leitores de ecrã por defeito → dar `accessibilityLabel` com resumo ("Tendência de gastos, últimos 6 meses, de 1 200 a 2 400 euros, pico em março").
- Oferecer **"ver como tabela"** (alternativa em tabela navegável).
- Séries distinguíveis por **forma/rótulo/padrão**, não só cor; ≥3:1 de contraste vs fundo e vs séries adjacentes.
