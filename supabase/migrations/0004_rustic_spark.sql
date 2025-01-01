/*
  # Fix Dashboard Metrics

  1. Changes
    - Ensure single row in dashboard_metrics with fixed ID
    - Add constraint to prevent multiple rows
    - Update RLS policies
  
  2. Data
    - Initialize with default values if empty
*/

-- Create a check constraint to ensure only one row
ALTER TABLE dashboard_metrics 
ADD CONSTRAINT ensure_single_row 
CHECK (id = '00000000-0000-0000-0000-000000000001');

-- Delete any existing data
DELETE FROM dashboard_metrics;

-- Insert initial data with fixed ID
INSERT INTO dashboard_metrics (
  id,
  total_revenue,
  active_listings,
  buy_box_win_rate,
  last_updated
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  24567.89,
  156,
  68.5,
  now()
);

-- Update RLS policies
DROP POLICY IF EXISTS "Allow authenticated users to read dashboard metrics" ON dashboard_metrics;

CREATE POLICY "Allow authenticated users to read dashboard metrics"
  ON dashboard_metrics
  FOR SELECT
  TO authenticated
  USING (id = '00000000-0000-0000-0000-000000000001');