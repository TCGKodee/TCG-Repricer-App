/*
  # Fix Dashboard Metrics Table

  1. Changes
    - Drop and recreate dashboard_metrics table with proper constraints
    - Insert initial data with fixed UUID
    - Update RLS policies to allow proper access
    - Add more realistic sample data
*/

-- First, drop the existing table and recreate it
DROP TABLE IF EXISTS dashboard_metrics CASCADE;

CREATE TABLE dashboard_metrics (
  id uuid PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001'::uuid,
  total_revenue numeric NOT NULL DEFAULT 0,
  active_listings integer NOT NULL DEFAULT 0,
  buy_box_win_rate numeric NOT NULL DEFAULT 0,
  last_updated timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ensure_single_row CHECK (id = '00000000-0000-0000-0000-000000000001'::uuid)
);

-- Insert initial data
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

-- Create simplified RLS policy that allows all authenticated users to read
CREATE POLICY "Public read access"
  ON dashboard_metrics
  FOR SELECT
  TO authenticated
  USING (true);

-- Update the metrics with actual data from products table
UPDATE dashboard_metrics
SET
  active_listings = (SELECT count(*) FROM products WHERE status = 'active'),
  buy_box_win_rate = (
    SELECT 
      ROUND(
        (COUNT(*) FILTER (WHERE buy_box_status = 'winning')::numeric / 
        NULLIF(COUNT(*), 0)::numeric * 100)::numeric, 
        1
      )
    FROM products 
    WHERE status = 'active'
  ),
  last_updated = now()
WHERE id = '00000000-0000-0000-0000-000000000001'::uuid;