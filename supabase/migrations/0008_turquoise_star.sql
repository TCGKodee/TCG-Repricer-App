/*
  # Fix Dashboard Metrics Table

  1. Changes
    - Drop and recreate dashboard_metrics table with proper constraints
    - Insert initial data with fixed UUID
    - Update RLS policies
    - Add proper indexes

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing table and recreate with proper structure
DROP TABLE IF EXISTS dashboard_metrics CASCADE;

CREATE TABLE dashboard_metrics (
  id uuid PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001'::uuid,
  total_revenue numeric NOT NULL DEFAULT 0,
  active_listings integer NOT NULL DEFAULT 0,
  buy_box_win_rate numeric NOT NULL DEFAULT 0,
  last_updated timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ensure_single_row CHECK (id = '00000000-0000-0000-0000-000000000001'::uuid)
);

-- Create index for faster lookups
CREATE INDEX idx_dashboard_metrics_last_updated ON dashboard_metrics(last_updated);

-- Insert initial data with the fixed UUID
INSERT INTO dashboard_metrics (
  id,
  total_revenue,
  active_listings,
  buy_box_win_rate,
  last_updated
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
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

-- Enable RLS
ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow authenticated users to read dashboard metrics" ON dashboard_metrics;
DROP POLICY IF EXISTS "Allow authenticated users to update dashboard metrics" ON dashboard_metrics;

-- Create new policies
CREATE POLICY "Allow authenticated users to read dashboard metrics"
  ON dashboard_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update dashboard metrics"
  ON dashboard_metrics
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (id = '00000000-0000-0000-0000-000000000001'::uuid);