export const POKEMON_SETS = [
  // Sword & Shield Series
  {
    id: 'swsh1',
    name: 'Sword & Shield Base Set',
    series: 'Sword & Shield',
    releaseDate: '2020-02-07',
    totalCards: 202
  },
  {
    id: 'swsh2',
    name: 'Rebel Clash',
    series: 'Sword & Shield',
    releaseDate: '2020-05-01',
    totalCards: 192
  },
  {
    id: 'swsh3',
    name: 'Darkness Ablaze',
    series: 'Sword & Shield',
    releaseDate: '2020-08-14',
    totalCards: 189
  },
  {
    id: 'swsh4',
    name: 'Vivid Voltage',
    series: 'Sword & Shield',
    releaseDate: '2020-11-13',
    totalCards: 185
  },
  {
    id: 'swsh5',
    name: 'Battle Styles',
    series: 'Sword & Shield',
    releaseDate: '2021-03-19',
    totalCards: 163
  },
  {
    id: 'swsh6',
    name: 'Chilling Reign',
    series: 'Sword & Shield',
    releaseDate: '2021-06-18',
    totalCards: 198
  },
  {
    id: 'swsh7',
    name: 'Evolving Skies',
    series: 'Sword & Shield',
    releaseDate: '2021-08-27',
    totalCards: 203
  },
  {
    id: 'swsh8',
    name: 'Fusion Strike',
    series: 'Sword & Shield',
    releaseDate: '2021-11-12',
    totalCards: 264
  },
  {
    id: 'swsh9',
    name: 'Brilliant Stars',
    series: 'Sword & Shield',
    releaseDate: '2022-02-25',
    totalCards: 172
  },
  {
    id: 'swsh10',
    name: 'Astral Radiance',
    series: 'Sword & Shield',
    releaseDate: '2022-05-27',
    totalCards: 189
  },
  {
    id: 'swsh11',
    name: 'Lost Origin',
    series: 'Sword & Shield',
    releaseDate: '2022-09-09',
    totalCards: 196
  },
  {
    id: 'swsh12',
    name: 'Silver Tempest',
    series: 'Sword & Shield',
    releaseDate: '2022-11-11',
    totalCards: 195
  },
  {
    id: 'swsh13',
    name: 'Crown Zenith',
    series: 'Sword & Shield',
    releaseDate: '2023-01-20',
    totalCards: 159
  },
  // Scarlet & Violet Series
  {
    id: 'sv1',
    name: 'Scarlet & Violet Base Set',
    series: 'Scarlet & Violet',
    releaseDate: '2023-03-31',
    totalCards: 195
  },
  {
    id: 'sv2',
    name: 'Paldea Evolved',
    series: 'Scarlet & Violet',
    releaseDate: '2023-06-30',
    totalCards: 193
  },
  {
    id: 'sv3',
    name: 'Obsidian Flames',
    series: 'Scarlet & Violet',
    releaseDate: '2023-08-11',
    totalCards: 197
  },
  {
    id: 'sv4',
    name: 'Paradox Rift',
    series: 'Scarlet & Violet',
    releaseDate: '2023-11-03',
    totalCards: 182
  },
  {
    id: 'sv5',
    name: '151',
    series: 'Scarlet & Violet',
    releaseDate: '2023-09-22',
    totalCards: 165
  }
] as const;

export type PokemonSet = typeof POKEMON_SETS[number];