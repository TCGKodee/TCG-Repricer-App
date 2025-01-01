-- Update the initial dashboard metrics with a specific ID
DELETE FROM dashboard_metrics;
INSERT INTO dashboard_metrics (id, total_revenue, active_listings, buy_box_win_rate)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 24567.89, 156, 68.5);

-- Add more price history data points
INSERT INTO price_history (product_id, price, market_price, competitor_price, timestamp)
SELECT 
  p.id,
  p.current_price + (random() * 20 - 10),
  p.market_price + (random() * 20 - 10),
  CASE WHEN p.competitor_price IS NOT NULL 
    THEN p.competitor_price + (random() * 20 - 10)
    ELSE NULL
  END,
  now() - (interval '1 hour' * generate_series(1, 24))
FROM products p
WHERE p.status = 'active';