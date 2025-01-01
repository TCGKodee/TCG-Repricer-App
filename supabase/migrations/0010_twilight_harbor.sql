-- Drop and recreate dashboard_metrics table with proper structure
DROP TABLE IF EXISTS dashboard_metrics CASCADE;

CREATE TABLE dashboard_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_revenue numeric NOT NULL DEFAULT 0,
  active_listings integer NOT NULL DEFAULT 0,
  buy_box_win_rate numeric NOT NULL DEFAULT 0,
  last_updated timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

-- Create a simple RLS policy for authenticated users
CREATE POLICY "Allow authenticated users to read dashboard metrics"
  ON dashboard_metrics
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial data
INSERT INTO dashboard_metrics (
  total_revenue,
  active_listings,
  buy_box_win_rate,
  last_updated
) VALUES (
  124567.89,
  (SELECT count(*) FROM products WHERE status = 'active'),
  (
    SELECT 
      ROUND(
        (COUNT(*) FILTER (WHERE buy_box_status = 'winning')::numeric / 
        NULLIF(COUNT(*), 0)::numeric * 100)::numeric, 
        1
      )
    FROM products 
    WHERE status = 'active'
  ),
  now()
);