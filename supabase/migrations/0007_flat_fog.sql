/*
  # Add Mock Data for Dashboard

  1. Changes
    - Add more sample products with realistic TCG card data
    - Add price history data points for trend analysis
    - Update existing products with more realistic values

  2. Data Categories
    - Pokemon Cards
    - One Piece Cards
    - Various conditions and rarities
*/

-- Add more sample products
INSERT INTO products (
  name,
  sku,
  current_price,
  market_price,
  competitor_price,
  last_sold_price,
  last_sold_date,
  stock,
  buy_box_status,
  margin,
  status
) VALUES 
  -- Pokemon Cards
  ('Lugia V (Alt Art)', 'SWSH11-186', 189.99, 195.99, 192.99, 188.50, now() - interval '2 days', 3, 'losing', 32, 'active'),
  ('Umbreon VMAX (Alt Art)', 'SWSH07-215', 259.99, 265.99, 262.99, 255.00, now() - interval '1 day', 2, 'winning', 38, 'active'),
  ('Rayquaza VMAX (Alt Art)', 'SWSH07-217', 219.99, 225.99, 222.99, 220.00, now() - interval '3 days', 4, 'winning', 35, 'active'),
  ('Charizard V (Alt Art)', 'SWSH12-157', 169.99, 175.99, 172.99, 168.50, now() - interval '4 days', 6, 'losing', 30, 'active'),
  
  -- One Piece Cards
  ('Monkey D. Luffy (Leader)', 'OP01-001', 149.99, 155.99, 152.99, 148.50, now() - interval '1 day', 8, 'winning', 28, 'active'),
  ('Roronoa Zoro (Parallel)', 'OP01-002', 89.99, 95.99, 92.99, 88.50, now() - interval '2 days', 10, 'winning', 25, 'active'),
  ('Portgas D. Ace (Secret)', 'OP02-100', 299.99, 305.99, 302.99, 298.50, now() - interval '3 days', 2, 'losing', 42, 'active'),
  ('Trafalgar Law (Alt Art)', 'OP02-050', 129.99, 135.99, 132.99, 128.50, now() - interval '4 days', 5, 'winning', 32, 'active')
ON CONFLICT (sku) DO UPDATE SET
  current_price = EXCLUDED.current_price,
  market_price = EXCLUDED.market_price,
  competitor_price = EXCLUDED.competitor_price,
  last_sold_price = EXCLUDED.last_sold_price,
  last_sold_date = EXCLUDED.last_sold_date,
  stock = EXCLUDED.stock,
  buy_box_status = EXCLUDED.buy_box_status,
  margin = EXCLUDED.margin,
  status = EXCLUDED.status;

-- Add price history data for the last 30 days
INSERT INTO price_history (product_id, price, market_price, competitor_price, timestamp)
SELECT 
  p.id,
  -- Generate slightly varying prices over time
  p.current_price + (random() * 20 - 10),
  p.market_price + (random() * 20 - 10),
  CASE WHEN p.competitor_price IS NOT NULL 
    THEN p.competitor_price + (random() * 20 - 10)
    ELSE NULL
  END,
  -- Generate timestamps for the last 30 days
  now() - (interval '1 day' * generate_series(1, 30))
FROM products p
WHERE p.status = 'active';

-- Update dashboard metrics with more realistic data
UPDATE dashboard_metrics
SET 
  total_revenue = 124567.89,
  active_listings = (SELECT count(*) FROM products WHERE status = 'active'),
  buy_box_win_rate = (
    SELECT 
      ROUND(
        (COUNT(*) FILTER (WHERE buy_box_status = 'winning')::numeric / 
        COUNT(*)::numeric * 100)::numeric, 
        1
      )
    FROM products 
    WHERE status = 'active'
  ),
  last_updated = now()
WHERE id = '00000000-0000-0000-0000-000000000001';