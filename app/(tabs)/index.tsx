import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { useGameStore } from '@/hooks/use-game-store';
import { CATEGORIES, CategoryKey } from '@/constants/game-data';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Users, Settings, Play, Trash2, Camera as CameraIcon, CheckCircle2, Circle } from 'lucide-react-native';

export default function GameScreen() {
  const { 
    players, addPlayer, removePlayer, selectedCategories, toggleCategory, 
    isImpostorHintEnabled, toggleImpostorHint, startGame, gameStatus,
    secretWord, impostorId, voteForPlayer, votedPlayerIds, resetGame
  } = useGameStore();

  const [newName, setNewName] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState<string | undefined>();
  const [revealedPlayerId, setRevealedPlayerId] = useState<string | null>(null);

  const handleAddPlayer = () => {
    if (newName.trim()) {
      addPlayer(newName.trim(), currentPhoto);
      setNewName('');
      setCurrentPhoto(undefined);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmara para tirar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setCurrentPhoto(result.assets[0].uri);
    }
  };

  if (gameStatus === 'setup') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Image 
          source={require('@/assets/images/main-game-image.png')} 
          style={styles.mainImage} 
        />
        
        <Text style={styles.title}>Configuração do Jogo</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jogadores ({players.length})</Text>
          <View style={styles.inputRow}>
            <TouchableOpacity onPress={takePhoto} style={styles.photoButton}>
              {currentPhoto ? (
                <Image source={{ uri: currentPhoto }} style={styles.miniPhoto} />
              ) : (
                <CameraIcon size={24} color="#666" />
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Nome do jogador"
              value={newName}
              onChangeText={setNewName}
            />
            <TouchableOpacity onPress={handleAddPlayer} style={styles.addButton}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          {players.map(player => (
            <View key={player.id} style={styles.playerItem}>
              <View style={styles.playerInfo}>
                {player.photoUri ? (
                  <Image source={{ uri: player.photoUri }} style={styles.miniPhoto} />
                ) : (
                  <Users size={20} color="#666" />
                )}
                <Text style={styles.playerName}>{player.name}</Text>
              </View>
              <TouchableOpacity onPress={() => removePlayer(player.id)}>
                <Trash2 size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias (Escolha várias)</Text>
          <View style={styles.categoriesGrid}>
            {(Object.keys(CATEGORIES) as CategoryKey[]).map(cat => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => toggleCategory(cat)}
                style={[
                  styles.categoryTag,
                  selectedCategories.includes(cat) && styles.categoryTagActive
                ]}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategories.includes(cat) && styles.categoryTextActive
                ]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={toggleImpostorHint} style={styles.hintRow}>
            {isImpostorHintEnabled ? <CheckCircle2 color="#4CAF50" /> : <Circle color="#666" />}
            <Text style={styles.hintText}>Impostor recebe dica (categoria)</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={startGame} 
          disabled={players.length < 3 || selectedCategories.length === 0}
          style={[
            styles.mainButton,
            (players.length < 3 || selectedCategories.length === 0) && styles.buttonDisabled
          ]}
        >
          <Play size={24} color="white" />
          <Text style={styles.mainButtonText}>Iniciar Jogo</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (gameStatus === 'roles') {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.title}>Revelar Papéis</Text>
        <Text style={styles.subtitle}>Clica no teu nome para veres a palavra secreta.</Text>
        
        <ScrollView style={{ width: '100%' }}>
          {players.map(player => (
            <TouchableOpacity 
              key={player.id} 
              style={styles.roleCard}
              onPress={() => setRevealedPlayerId(player.id)}
            >
              <Text style={styles.playerNameLarge}>{player.name}</Text>
              {revealedPlayerId === player.id && (
                <View style={styles.revealBox}>
                  <Text style={styles.roleText}>
                    {player.role === 'impostor' ? 'Tu és o IMPOSTOR!' : 'Tu és um Cidadão.'}
                  </Text>
                  <Text style={styles.wordText}>
                    Palavra: {player.role === 'impostor' 
                      ? (isImpostorHintEnabled ? `Dica: ${selectedCategories.join(', ')}` : '???') 
                      : secretWord}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setRevealedPlayerId(null)}
                    style={styles.closeReveal}
                  >
                    <Text style={{ color: 'white' }}>OK, entendi!</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity 
          onPress={() => useGameStore.setState({ gameStatus: 'playing' })}
          style={styles.mainButton}
        >
          <Text style={styles.mainButtonText}>Todos viram? Começar!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (gameStatus === 'playing') {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.title}>A Jogar...</Text>
        <Text style={styles.instruction}>Debatam e tentem descobrir quem é o impostor!</Text>
        <TouchableOpacity 
          onPress={() => useGameStore.setState({ gameStatus: 'voting' })}
          style={styles.mainButton}
        >
          <Text style={styles.mainButtonText}>Ir para Votação</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (gameStatus === 'voting') {
    const currentVoterIndex = votedPlayerIds.length;
    const currentVoter = players[currentVoterIndex];

    return (
      <View style={styles.containerCenter}>
        <Text style={styles.title}>Votação</Text>
        <Text style={styles.subtitle}>Vez de: {currentVoter?.name}</Text>
        <Text style={styles.instruction}>Quem achas que é o impostor?</Text>

        <ScrollView style={{ width: '100%' }}>
          {players.map(player => (
            <TouchableOpacity 
              key={player.id} 
              disabled={player.id === currentVoter?.id}
              style={[
                styles.voteButton,
                player.id === currentVoter?.id && { opacity: 0.5 }
              ]}
              onPress={() => voteForPlayer(currentVoter.id, player.id)}
            >
              <Text style={styles.voteButtonText}>{player.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (gameStatus === 'result') {
    const sortedPlayers = [...players].sort((a, b) => b.votesReceived - a.votesReceived);
    const mostVoted = sortedPlayers[0];
    const won = mostVoted.role === 'impostor';

    return (
      <View style={styles.containerCenter}>
        <Text style={styles.title}>Fim de Jogo!</Text>
        <Text style={[styles.resultText, { color: won ? '#4CAF50' : '#ff4444' }]}>
          {won ? 'Os Cidadãos Ganharam!' : 'O Impostor Ganhou!'}
        </Text>
        <Text style={styles.subtitle}>O impostor era: {players.find(p => p.role === 'impostor')?.name}</Text>
        <Text style={styles.subtitle}>Palavra secreta: {secretWord}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votos:</Text>
          {sortedPlayers.map(p => (
            <Text key={p.id} style={styles.playerName}>
              {p.name}: {p.votesReceived} votos {p.role === 'impostor' ? '🕵️' : ''}
            </Text>
          ))}
        </View>

        <TouchableOpacity onPress={resetGame} style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Novo Jogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  containerCenter: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', padding: 20 },
  content: { padding: 20 },
  mainImage: { width: '100%', height: 200, borderRadius: 15, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
  instruction: { fontSize: 18, color: '#444', marginBottom: 30, textAlign: 'center', paddingHorizontal: 20 },
  section: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 20, width: '100%' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15, color: '#444' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  input: { flex: 1, backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8, marginRight: 10 },
  addButton: { backgroundColor: '#2196F3', width: 45, height: 45, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  photoButton: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', marginRight: 10, overflow: 'hidden' },
  miniPhoto: { width: '100%', height: '100%' },
  buttonText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  playerItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  playerInfo: { flexDirection: 'row', alignItems: 'center' },
  playerName: { fontSize: 16, marginLeft: 10, color: '#333' },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryTag: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#eee', borderWidth: 1, borderColor: '#ddd' },
  categoryTagActive: { backgroundColor: '#2196F3', borderColor: '#2196F3' },
  categoryText: { color: '#666' },
  categoryTextActive: { color: 'white', fontWeight: 'bold' },
  hintRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  hintText: { fontSize: 16, color: '#444' },
  mainButton: { backgroundColor: '#2196F3', padding: 18, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 10, width: '100%' },
  mainButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  buttonDisabled: { backgroundColor: '#ccc' },
  roleCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 10, width: '90%', alignSelf: 'center', alignItems: 'center', elevation: 2 },
  playerNameLarge: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  revealBox: { marginTop: 15, alignItems: 'center', backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, width: '100%' },
  roleText: { fontSize: 18, fontWeight: 'bold', color: '#2196F3', marginBottom: 5 },
  wordText: { fontSize: 16, color: '#666', marginBottom: 15 },
  closeReveal: { backgroundColor: '#333', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 5 },
  voteButton: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, width: '90%', alignSelf: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#2196F3' },
  voteButtonText: { fontSize: 18, color: '#2196F3', fontWeight: '600' },
  resultText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});
