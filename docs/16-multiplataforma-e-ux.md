# 16 — Multi-plataforma e UX Mobile

> Requisito do chefe: **bom no Android, no iPhone E acessível no navegador.** Uma só base de código (Expo / React Native + TypeScript), cada plataforma a sentir-se nativa. Este doc define a stack e as práticas de UX/engenharia.

## 1. Uma base de código para iOS + Android + Web

- **Expo + expo-router + React Native Web.** O `expo-router` gera rotas que funcionam em telemóvel e como URLs no navegador. A promessa "escrever uma vez, correr em todo o lado" é real para ~90% do código, mas tem arestas — por isso:
- **Ficheiros específicos de plataforma** onde preciso: `componente.web.tsx`, `componente.ios.tsx`, `componente.android.tsx`. O bundler escolhe automaticamente.
- **PWA (instalável + offline) é viável** com Expo Web (`output: "static"`) — acede-se por URL, "instala-se" no ecrã inicial, sem precisar de loja. Bom para os membros da família que preferem o computador.
- **Dev build (não Expo Go)** é obrigatório por causa de módulos nativos (ex.: leitor de notificações Android, ver `05`). Build com **EAS**.
- ⚠️ **Testar a build web cedo** (na Fase 1) para apanhar bibliotecas que não suportam web. Confirmar suporte web de cada lib de gráficos/animação ao escolher.

## 2. Layout responsivo / adaptativo

A **mesma** app, nativa no telemóvel e boa no navegador largo:

| Superfície | Navegação | Layout |
|------------|-----------|--------|
| **Telemóvel** | **Tabs em baixo** (Início, Transações, Orçamento, Família, Bot) | 1 coluna, margens 16px |
| **Tablet** | Tabs ou rail lateral | 1–2 colunas |
| **Navegador / desktop** | **Barra lateral** (sidebar) à esquerda | **Master-detail** (lista + detalhe lado a lado), largura máx. de conteúdo ~1200px |

- Breakpoints com `useWindowDimensions()`; mostrar master-detail (lista de transações + detalhe) só em ecrã largo.
- Conteúdo centrado com largura máxima no desktop (não esticar a linha de transação por todo o ecrã).

## 3. Biblioteca de estilos / UI (decisão)

| Opção | Veredicto |
|-------|-----------|
| **NativeWind** (Tailwind para RN) | **Recomendado.** Tailwind cross-platform, modo escuro fácil, rápido de iterar, comunidade grande, funciona bem em web. Bom para chegar a "bonito" depressa com o design system do `12` como config de tema |
| **Unistyles v3** | Alternativa forte (performance, theming); mais novo |
| **Tamagui** | Muito capaz e otimizado, mas curva de aprendizagem maior |
| **StyleSheet puro** | Sempre disponível; usar para componentes muito específicos |

- **Componentes:** construir os nossos (com os tokens do `12`) em vez de um kit pesado, para o visual ser **nosso** e premium. Usar **Lucide** para ícones (+ SF Symbols no iOS).
- Mapear os tokens do design system (`12`) para a config do NativeWind (cores, espaçamento, raios, tipografia) — fonte única de verdade.

## 4. Backend, auth e sincronização (decisão)

Stack recomendada para um app **privado de família** (poucos utilizadores, custo ~0):

```
Backend:        Supabase (Postgres + Auth + Realtime + Storage)  — tier grátis chega
Auth:           Supabase Auth — magic link / email+password + Apple + Google
                (via expo-auth-session para o redirect OAuth nativo; passkeys depois)
Sync offline:   PowerSync → SQLite local  (1.ª escolha, tier grátis chega)
                ou WatermelonDB + RPC Supabase (alternativa zero-custo)
Tokens:         LargeSecureStore (chave AES no expo-secure-store + cifrado no AsyncStorage)
Cache de estado: react-native-mmkv (não-secreto)
Privacidade:    RLS por household_id (+ regras de sync), cifra em repouso + TLS por defeito
```

Porquê:
- **Supabase:** dados de finanças são relacionais (contas, transações, categorias, orçamentos, membros) → Postgres + SQL + **Row-Level Security** encaixa perfeitamente. A RLS por `household_id` garante, ao nível da BD, que um membro só lê dados da sua família (ver `15`). Melhor integração com Expo, e tier grátis cobre uma família indefinidamente.
- **Offline-first (PowerSync):** o app é editado em movimento (registar uma despesa sem rede) → SQLite local com sincronização. **Modelo de transações append-only** (linhas imutáveis com UUID gerado no dispositivo) → dois membros a adicionar offline geram duas linhas, sem conflitos; saldos/orçamentos são agregados derivados.
- **Tokens:** sessão Supabase (~2,8 KB) excede o limite de ~2 KB do `expo-secure-store` no iOS → padrão `LargeSecureStore` (chave AES no Keychain/Keystore, blob cifrado no AsyncStorage). `autoRefreshToken` + `start/stopAutoRefresh` no `AppState`.

## 5. Práticas de UX mobile

- **Navegação:** tabs em baixo no telemóvel; gestos de "voltar"; transições push ease-out (ver `12`).
- **Listas performantes:** **FlashList** (não FlatList) para a lista de transações (pode ter milhares de linhas).
- **Carregamento:** **skeleton com shimmer** a imitar o layout real (só se >500ms); nunca ecrã em branco. Estados vazios com ilustração + CTA (ver `17`).
- **Bottom sheets** para detalhe/ações (detalhe de transação, escolher categoria); `react-native-gesture-handler` + Reanimated.
- **Pull-to-refresh** com háptico no limiar; **safe areas** (`react-native-safe-area-context`); teclado bem gerido (`KeyboardAvoidingView` / `react-native-keyboard-controller`).
- **Atualizações otimistas:** ao registar/editar, refletir já na UI e sincronizar em fundo (offline-first ajuda).
- **Large title / scroll** no estilo iOS para o ecrã de Início.

## 6. Acessibilidade (resumo; detalhe nos docs `12`/`13`)

- **WCAG 2.2 AA** como base (também exigido pela lei europeia EAA, em vigor desde jun. 2025, para apps de banca).
- Contraste ≥4.5:1 (texto) / ≥3:1 (UI e gráficos), em claro **e** escuro.
- **Dynamic Type:** `allowFontScaling` ligado; teto `maxFontSizeMultiplier ~1.6` via um componente `<AppText>`; layouts em flex, sem alturas fixas nas linhas.
- **Leitores de ecrã:** montantes com `accessibilityLabel` por extenso ("menos 42 euros e 50 cêntimos") e menos verdadeiro `−` (U+2212) — o hífen ASCII faz o VoiceOver perder o "negativo". Linha de transação = **um** elemento agrupado (role `button`). Gráficos com label-resumo + "ver como tabela".
- **Alvos de toque** 44pt (iOS) / 48dp (Android); `hitSlop` para ícones pequenos.
- **Respeitar "Reduzir movimento"** (ver `12`).

## 7. Performance

- Animações na **UI thread** (Reanimated worklets / Skia) — 60fps mesmo com a JS thread ocupada (rede, parsing).
- Animar `transform`/`opacity`, não propriedades de layout.
- FlashList para listas longas; lazy-load; imagens de logótipos de comerciantes em cache.
- Vigiar o tamanho do bundle web; code-splitting por rota onde der.

## 8. Resumo das decisões técnicas

- **Expo + expo-router + React Native Web**, dev build via EAS; ficheiros `.web/.ios/.android` onde preciso; PWA para o navegador.
- **NativeWind** para estilos (tokens do `12` como tema); componentes próprios; Lucide + SF Symbols.
- **Supabase** (Postgres + Auth + Realtime) com **RLS por família**; **PowerSync** para offline-first; **LargeSecureStore** + MMKV.
- **FlashList**, skeletons, bottom sheets, otimista, safe areas, hápticos.
- **WCAG 2.2 AA**; tudo na UI thread para 60fps.
- Navegação: tabs no telemóvel, **sidebar + master-detail** no navegador.
