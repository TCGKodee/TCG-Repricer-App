/*
  # Add Pokémon Cards Schema

  1. New Tables
    - `pokemon_sets`
      - `id` (uuid, primary key)
      - `series` (text)
      - `name` (text)
      - `release_date` (date)
      - `total_cards` (integer)
    
    - `pokemon_cards`
      - `id` (uuid, primary key)
      - `set_id` (uuid, foreign key)
      - `name` (text)
      - `number` (text)
      - `rarity` (text)
      - `image_url` (text)
      - `market_price` (numeric)
      - `low_price` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create pokemon_sets table
CREATE TABLE pokemon_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  series text NOT NULL,
  name text NOT NULL,
  release_date date,
  total_cards integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create pokemon_cards table
CREATE TABLE pokemon_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id uuid REFERENCES pokemon_sets(id) ON DELETE CASCADE,
  name text NOT NULL,
  number text NOT NULL,
  rarity text,
  image_url text,
  market_price numeric,
  low_price numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(set_id, number)
);

-- Enable RLS
ALTER TABLE pokemon_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE pokemon_cards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read pokemon sets"
  ON pokemon_sets
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read pokemon cards"
  ON pokemon_cards
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_pokemon_sets_series ON pokemon_sets(series);
CREATE INDEX idx_pokemon_sets_name ON pokemon_sets(name);
CREATE INDEX idx_pokemon_cards_name ON pokemon_cards(name);
CREATE INDEX idx_pokemon_cards_set_number ON pokemon_cards(set_id, number);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_pokemon_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_pokemon_sets_updated_at
  BEFORE UPDATE ON pokemon_sets
  FOR EACH ROW
  EXECUTE FUNCTION update_pokemon_updated_at();

CREATE TRIGGER trigger_pokemon_cards_updated_at
  BEFORE UPDATE ON pokemon_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_pokemon_updated_at();

-- Insert Sword & Shield sets
INSERT INTO pokemon_sets (series, name, release_date, total_cards) VALUES
  ('Sword & Shield', 'Sword & Shield Base Set', '2020-02-07', 202),
  ('Sword & Shield', 'Rebel Clash', '2020-05-01', 192),
  ('Sword & Shield', 'Darkness Ablaze', '2020-08-14', 189),
  ('Sword & Shield', 'Vivid Voltage', '2020-11-13', 185),
  ('Sword & Shield', 'Battle Styles', '2021-03-19', 163),
  ('Sword & Shield', 'Chilling Reign', '2021-06-18', 198),
  ('Sword & Shield', 'Evolving Skies', '2021-08-27', 203),
  ('Sword & Shield', 'Fusion Strike', '2021-11-12', 264),
  ('Sword & Shield', 'Brilliant Stars', '2022-02-25', 172),
  ('Sword & Shield', 'Astral Radiance', '2022-05-27', 189),
  ('Sword & Shield', 'Lost Origin', '2022-09-09', 196),
  ('Sword & Shield', 'Silver Tempest', '2022-11-11', 195),
  ('Sword & Shield', 'Crown Zenith', '2023-01-20', 159),
  ('Scarlet & Violet', 'Scarlet & Violet Base Set', '2023-03-31', 195),
  ('Scarlet & Violet', 'Paldea Evolved', '2023-06-30', 193),
  ('Scarlet & Violet', 'Obsidian Flames', '2023-08-11', 197),
  ('Scarlet & Violet', 'Paradox Rift', '2023-11-03', 182),
  ('Scarlet & Violet', '151', '2023-09-22', 165);