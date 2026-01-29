import { create } from 'zustand';
import { CATEGORIES, CategoryKey } from '../constants/game-data';

interface Player {
  id: string;
  name: string;
  photoUri?: string;
  role: 'citizen' | 'impostor';
  votesReceived: number;
}

interface GameState {
  players: Player[];
  selectedCategories: CategoryKey[];
  secretWord: string;
  isImpostorHintEnabled: boolean;
  gameStatus: 'setup' | 'roles' | 'playing' | 'voting' | 'result';
  impostorId: string | null;
  votedPlayerIds: string[];
  
  // Actions
  addPlayer: (name: string, photoUri?: string) => void;
  removePlayer: (id: string) => void;
  toggleCategory: (category: CategoryKey) => void;
  toggleImpostorHint: () => void;
  startGame: () => void;
  voteForPlayer: (voterId: string, targetId: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  selectedCategories: [],
  secretWord: '',
  isImpostorHintEnabled: false,
  gameStatus: 'setup',
  impostorId: null,
  votedPlayerIds: [],

  addPlayer: (name, photoUri) => set((state) => ({
    players: [...state.players, { id: Math.random().toString(36).substr(2, 9), name, photoUri, role: 'citizen', votesReceived: 0 }]
  })),

  removePlayer: (id) => set((state) => ({
    players: state.players.filter(p => p.id !== id)
  })),

  toggleCategory: (category) => set((state) => {
    const isSelected = state.selectedCategories.includes(category);
    if (isSelected) {
      return { selectedCategories: state.selectedCategories.filter(c => c !== category) };
    } else {
      return { selectedCategories: [...state.selectedCategories, category] };
    }
  }),

  toggleImpostorHint: () => set((state) => ({ isImpostorHintEnabled: !state.isImpostorHintEnabled })),

  startGame: () => {
    const { players, selectedCategories } = get();
    if (players.length < 3 || selectedCategories.length === 0) return;

    // Pick random category and word
    const randomCat = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    const words = CATEGORIES[randomCat];
    const secretWord = words[Math.floor(Math.random() * words.length)];

    // Assign impostor
    const impostorIndex = Math.floor(Math.random() * players.length);
    const updatedPlayers = players.map((p, i) => ({
      ...p,
      role: i === impostorIndex ? 'impostor' : 'citizen',
      votesReceived: 0
    }));

    set({
      players: updatedPlayers,
      secretWord,
      impostorId: updatedPlayers[impostorIndex].id,
      gameStatus: 'roles',
      votedPlayerIds: []
    });
  },

  voteForPlayer: (voterId, targetId) => set((state) => {
    if (state.votedPlayerIds.includes(voterId)) return state;

    const updatedPlayers = state.players.map(p => 
      p.id === targetId ? { ...p, votesReceived: p.votesReceived + 1 } : p
    );
    const updatedVoted = [...state.votedPlayerIds, voterId];

    if (updatedVoted.length === state.players.length) {
      return { players: updatedPlayers, votedPlayerIds: updatedVoted, gameStatus: 'result' };
    }

    return { players: updatedPlayers, votedPlayerIds: updatedVoted };
  }),

  resetGame: () => set({
    players: [],
    selectedCategories: [],
    secretWord: '',
    gameStatus: 'setup',
    impostorId: null,
    votedPlayerIds: []
  })
}));
