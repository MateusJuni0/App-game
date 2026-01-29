export const CATEGORIES = {
  "Animais": ["Cachorro", "Gato", "Elefante", "Leão", "Girafa", "Zebra", "Panda", "Tubarão", "Águia", "Cobra"],
  "Comida": ["Pizza", "Hambúrguer", "Sushi", "Lasanha", "Churrasco", "Sorvete", "Chocolate", "Pipoca", "Frango", "Salada"],
  "Lugares": ["Praia", "Montanha", "Cidade", "Floresta", "Deserto", "Escola", "Hospital", "Cinema", "Estádio", "Aeroporto"],
  "Profissões": ["Médico", "Professor", "Policial", "Bombeiro", "Engenheiro", "Cozinheiro", "Artista", "Astronauta", "Piloto", "Atleta"],
  "Objetos": ["Telemóvel", "Computador", "Relógio", "Caneta", "Livro", "Chave", "Óculos", "Cadeira", "Mesa", "Lâmpada"],
  "Filmes": ["Star Wars", "Harry Potter", "Vingadores", "Titanic", "Jurassic Park", "Matrix", "O Rei Leão", "Coringa", "Avatar", "Toy Story"]
};

export type CategoryKey = keyof typeof CATEGORIES;
