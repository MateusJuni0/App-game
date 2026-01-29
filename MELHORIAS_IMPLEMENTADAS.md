# 🎮 Jogo de Impostor - Melhorias Implementadas

## 📋 Resumo Executivo

Foi criado um jogo de impostor completo do zero com React Native + Expo, implementando todas as funcionalidades solicitadas. O jogo está totalmente funcional e pronto para ser testado no Expo Go.

---

## ✨ Funcionalidades Implementadas

### 1. **Nova Imagem Principal**
- ✅ Imagem cinética e profissional gerada com IA
- ✅ Localização: `/assets/images/main-game-image.png`
- ✅ Tema: Impostor em ambiente futurista com neon azul e vermelho
- ✅ Exibida na tela de configuração do jogo

### 2. **Seleção de Múltiplas Categorias**
- ✅ Interface com tags clicáveis
- ✅ Categorias disponíveis:
  - 🦁 Animais (Cachorro, Gato, Elefante, etc.)
  - 🍕 Comida (Pizza, Hambúrguer, Sushi, etc.)
  - 🏖️ Lugares (Praia, Montanha, Cidade, etc.)
  - 👨‍⚕️ Profissões (Médico, Professor, Policial, etc.)
  - 🔧 Objetos (Telemóvel, Computador, Relógio, etc.)
  - 🎬 Filmes (Star Wars, Harry Potter, Vingadores, etc.)
- ✅ Seleção visual com feedback (azul quando ativa)
- ✅ Mínimo de 1 categoria obrigatório para iniciar

### 3. **Votação com Múltiplos Votos**
- ✅ Todos os jogadores podem votar
- ✅ Sistema sequencial: um jogador por vez
- ✅ Impossível votar em si mesmo
- ✅ Contagem de votos por jogador
- ✅ Transição automática para resultado quando todos votarem

### 4. **Opção de Dica para o Impostor**
- ✅ Toggle na tela de configuração
- ✅ Se ativado: impostor vê a categoria como dica
- ✅ Se desativado: impostor vê "???"
- ✅ Cidadãos sempre veem a palavra completa

### 5. **Remoção do Mr. White**
- ✅ Removido completamente
- ✅ Apenas dois papéis: Cidadão e Impostor
- ✅ Atribuição aleatória do impostor entre os jogadores

### 6. **Avatares com Fotos**
- ✅ Câmara integrada para tirar fotos
- ✅ Botão de câmara na tela de entrada de jogadores
- ✅ Foto aparece como avatar do jogador
- ✅ Permissões configuradas para iOS e Android
- ✅ Fallback para ícone se não houver foto

### 7. **Entrada de Jogadores Melhorada**
- ✅ Campo de texto para nome
- ✅ Botão de câmara para tirar foto
- ✅ Botão "+" para adicionar jogador
- ✅ Lista de jogadores com opção de remover
- ✅ Mínimo de 3 jogadores obrigatório

---

## 🏗️ Arquitetura Técnica

### Ficheiros Criados/Modificados

#### 1. **`constants/game-data.ts`** (Novo)
- Define todas as categorias e palavras do jogo
- Exporta tipos TypeScript para segurança

#### 2. **`hooks/use-game-store.ts`** (Novo)
- Store global usando Zustand
- Gerencia estado do jogo:
  - Lista de jogadores
  - Categorias selecionadas
  - Palavra secreta
  - Status do jogo
  - Votos
- Ações principais:
  - `addPlayer()` - Adicionar jogador
  - `removePlayer()` - Remover jogador
  - `toggleCategory()` - Selecionar/desselecionar categoria
  - `toggleImpostorHint()` - Ativar/desativar dica
  - `startGame()` - Iniciar jogo (atribui papéis)
  - `voteForPlayer()` - Registar voto
  - `resetGame()` - Reiniciar jogo

#### 3. **`app/(tabs)/index.tsx`** (Modificado)
- Substituído completamente com lógica do jogo
- Estados do jogo:
  - **setup**: Configuração inicial
  - **roles**: Revelação de papéis
  - **playing**: Debate
  - **voting**: Votação
  - **result**: Resultado final

#### 4. **`app.json`** (Modificado)
- Adicionadas permissões de câmara
- Plugins para `expo-camera` e `expo-image-picker`
- Configurações para iOS e Android

#### 5. **`assets/images/main-game-image.png`** (Novo)
- Imagem principal do jogo gerada com IA

### Dependências Instaladas

```json
{
  "expo-camera": "Acesso à câmara",
  "expo-image-picker": "Seleção de imagens",
  "lucide-react-native": "Ícones",
  "zustand": "State management"
}
```

---

## 🎮 Fluxo do Jogo

```
┌─────────────────────────────────────────────────────────┐
│ 1. SETUP - Configuração                                 │
│    • Adicionar jogadores com fotos                       │
│    • Selecionar categorias (múltiplas)                   │
│    • Ativar/desativar dica para impostor                 │
│    • Clicar "Iniciar Jogo"                               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 2. ROLES - Atribuição de Papéis                          │
│    • Cada jogador clica no seu nome                      │
│    • Vê se é Cidadão ou Impostor                         │
│    • Cidadão: vê a palavra secreta                       │
│    • Impostor: vê a categoria (se dica ativa) ou "???"   │
│    • Clica "OK, entendi!" para confirmar                 │
│    • Todos confirmam → "Começar!"                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 3. PLAYING - Debate                                      │
│    • Todos discutem para descobrir o impostor            │
│    • Clica "Ir para Votação" quando pronto               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 4. VOTING - Votação (Todos Votam!)                       │
│    • Um jogador por vez                                  │
│    • Escolhe em quem votar                               │
│    • Não pode votar em si mesmo                          │
│    • Próximo jogador vota                                │
│    • Quando todos votarem → Resultado                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│ 5. RESULT - Resultado Final                              │
│    • Mostra quem era o impostor                          │
│    • Mostra a palavra secreta                            │
│    • Mostra contagem de votos                            │
│    • Cidadãos ganharam? Impostor ganhou?                 │
│    • Botão "Novo Jogo" para recomeçar                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Lógica de Jogo

### Atribuição de Papéis
- Um jogador aleatório é escolhido como Impostor
- Todos os outros são Cidadãos
- Palavra secreta é escolhida aleatoriamente da categoria selecionada

### Votação
- Cada jogador vota uma única vez
- Não pode votar em si mesmo
- Voto é registado e contabilizado
- Quando todos votarem, o jogo vai para resultado

### Resultado
- O jogador com mais votos é "eliminado"
- Se for o Impostor → Cidadãos ganham ✅
- Se for um Cidadão → Impostor ganhou ❌

---

## 📱 Como Testar no Expo Go

### Pré-requisitos
- Telemóvel com Expo Go instalado (iOS ou Android)
- Mesmo Wi-Fi que o computador

### Passos
1. O servidor está a correr em: `exp://169.254.0.21:8081`
2. Abra o Expo Go no telemóvel
3. Escanear o código QR que aparece no terminal
4. Ou copie o link e abra no Expo Go

### Testando Funcionalidades
1. **Adicionar Jogadores**
   - Clique no botão de câmara para tirar foto
   - Digite o nome do jogador
   - Clique "+"

2. **Selecionar Categorias**
   - Clique em várias categorias (ficam azuis)
   - Mínimo 1 obrigatório

3. **Dica para Impostor**
   - Ative o toggle "Impostor recebe dica"
   - Veja a diferença no ecrã de papéis

4. **Iniciar Jogo**
   - Clique "Iniciar Jogo" (botão azul)
   - Cada jogador clica no seu nome para ver o papel

5. **Votação**
   - Clique "Ir para Votação"
   - Cada jogador vota em quem acha que é o impostor
   - Todos conseguem votar!

6. **Resultado**
   - Ver quem era o impostor
   - Ver a palavra secreta
   - Ver contagem de votos

---

## 🐛 Bugs Corrigidos

- ✅ Votação: Agora TODOS podem votar (antes apenas 1)
- ✅ Categorias: Pode escolher múltiplas (antes era 1 só)
- ✅ Mr. White: Removido completamente
- ✅ Avatares: Integração de câmara funcionando
- ✅ Dica: Sistema de dica para impostor implementado

---

## 📦 Push para GitHub

Todas as alterações foram feitas push para o repositório:
- Branch: `master`
- Commit: "Implementação completa do jogo de impostor com melhorias"
- URL: https://github.com/MateusJuni0/App-game

---

## 🚀 Próximas Melhorias Possíveis

- [ ] Modo multiplayer online
- [ ] Histórico de jogos
- [ ] Ranking de jogadores
- [ ] Customização de temas
- [ ] Som e música
- [ ] Animações mais fluidas
- [ ] Modo dark/light automático

---

## 📞 Suporte

Se encontrar algum problema:
1. Verifique se tem permissões de câmara ativadas
2. Tente recarregar o app (pressione `r` no terminal)
3. Limpe o cache: `npm start -- --clear`

---

**Desenvolvido com ❤️ usando React Native + Expo**
