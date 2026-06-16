# App-game

Base limpa de um app [Expo](https://expo.dev) com [expo-router](https://docs.expo.dev/router/introduction) (file-based routing), TypeScript e suporte a tema claro/escuro. Pronta para construir um novo app do zero.

## Começar

1. Instalar dependências

   ```bash
   npm install
   ```

2. Iniciar o app

   ```bash
   npx expo start
   ```

   A partir daí dá para abrir num emulador Android, simulador iOS, no navegador (`w`) ou no Expo Go.

## Estrutura

- `app/` — telas e rotas (file-based routing do expo-router). Comece por `app/index.tsx`.
- `components/` — componentes reutilizáveis (`themed-text`, `themed-view`).
- `constants/theme.ts` — cores e fontes do tema.
- `hooks/` — hooks de tema (`use-color-scheme`, `use-theme-color`).
- `assets/images/` — ícones e splash do app.

## Aprender mais

- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
