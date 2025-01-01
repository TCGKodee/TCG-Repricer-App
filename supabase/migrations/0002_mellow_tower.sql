/*
  # Seed Initial Data
  
  1. Initial Data
    - Add sample dashboard metrics
    - Add sample products
    - Add sample price history
*/

-- Insert initial dashboard metrics
INSERT INTO dashboard_metrics (total_revenue, active_listings, buy_box_win_rate)
VALUES (24567.89, 156, 68.5)
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (name, sku, current_price, market_price, competitor_price, stock, buy_box_status, margin, status)
VALUES 
  ('Charizard VMAX (Secret)', 'SWSH04-200', 279.99, 295.99, 289.99, 5, 'losing', 35, 'active'),
  ('Pikachu VMAX (Rainbow)', 'SWSH04-188', 169.99, 172.50, 174.99, 12, 'winning', 30, 'active'),
  ('Ancient Mew Promo', 'MOVIE-PROMO', 89.99, 92.99, NULL, 8, 'no_competition', 45, 'active')
ON CONFLICT (sku) DO NOTHING;

-- Insert sample price history
INSERT INTO price_history (product_id, price, market_price, competitor_price)
SELECT 
  id,
  current_price,
  market_price,
  competitor_price
FROM products
ON CONFLICT DO NOTHING;