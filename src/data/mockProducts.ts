// Update mock products with image URLs
export const mockProducts: Product[] = [
  {
    id: 'pkmn-001',
    name: 'Charizard VMAX (Secret)',
    sku: 'SWSH04-200',
    category: 'pokemon',
    currentPrice: 279.99,
    targetPrice: 299.99,
    competitorPrice: 289.99,
    tcgPlayerMarket: 295.99,
    tcgPlayerLow: 275.50,
    lastSold: {
      price: 285.00,
      date: '2024-03-10T15:30:00Z'
    },
    stock: 5,
    status: 'active',
    buyBoxStatus: 'losing',
    margin: 35,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.pokemontcg.io/swsh4/200_hires.png'
  },
  {
    id: 'pkmn-002',
    name: 'Lugia V (Alt Art)',
    sku: 'SWSH11-186',
    category: 'pokemon',
    currentPrice: 189.99,
    targetPrice: 195.99,
    competitorPrice: 192.99,
    tcgPlayerMarket: 195.99,
    tcgPlayerLow: 185.50,
    lastSold: {
      price: 188.50,
      date: '2024-03-11T10:15:00Z'
    },
    stock: 3,
    status: 'active',
    buyBoxStatus: 'winning',
    margin: 32,
    lastUpdated: new Date().toISOString(),
    imageUrl: 'https://images.pokemontcg.io/swsh11/186_hires.png'
  },
  // Add more products with their respective image URLs...
];