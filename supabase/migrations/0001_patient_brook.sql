/*
  # Dashboard Tables Setup

  1. New Tables
    - dashboard_metrics: Stores aggregated metrics for the dashboard
    - price_history: Stores historical price data for products
    - products: Stores product information and current metrics

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Dashboard Metrics Table
CREATE TABLE IF NOT EXISTS dashboard_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_revenue numeric NOT NULL DEFAULT 0,
  active_listings integer NOT NULL DEFAULT 0,
  buy_box_win_rate numeric NOT NULL DEFAULT 0,
  last_updated timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read dashboard metrics"
  ON dashboard_metrics
  FOR SELECT
  TO authenticated
  USING (true);

-- Price History Table
CREATE TABLE IF NOT EXISTS price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL,
  price numeric NOT NULL,
  market_price numeric NOT NULL,
  competitor_price numeric,
  timestamp timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read price history"
  ON price_history
  FOR SELECT
  TO authenticated
  USING (true);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  current_price numeric NOT NULL,
  market_price numeric NOT NULL,
  competitor_price numeric,
  last_sold_price numeric,
  last_sold_date timestamptz,
  stock integer NOT NULL DEFAULT 0,
  buy_box_status text NOT NULL CHECK (buy_box_status IN ('winning', 'losing', 'no_competition')),
  margin numeric NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'inactive', 'out_of_stock')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

-- Add foreign key constraint
ALTER TABLE price_history
  ADD CONSTRAINT fk_price_history_product
  FOREIGN KEY (product_id)
  REFERENCES products(id)
  ON DELETE CASCADE;

-- Add indexes for better query performance
CREATE INDEX idx_price_history_product_id_timestamp ON price_history(product_id, timestamp);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_sku ON products(sku);