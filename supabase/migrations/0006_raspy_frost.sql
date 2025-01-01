/*
  # Final Fix for Dashboard Metrics

  1. Changes
    - Drop and recreate dashboard_metrics table with proper constraints
    - Add proper indexes
    - Insert initial data with correct UUID
    - Update RLS policies for both read and update operations

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing table and recreate with proper structure
DROP TABLE IF EXISTS dashboard_metrics CASCADE;

CREATE TABLE dashboard_metrics (
  id uuid PRIMARY KEY,
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
  24567.89,
  156,
  68.5,
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
  USING (id = '00000000-0000-0000-0000-000000000001'::uuid);

CREATE POLICY "Allow authenticated users to update dashboard metrics"
  ON dashboard_metrics
  FOR UPDATE
  TO authenticated
  USING (id = '00000000-0000-0000-0000-000000000001'::uuid)
  WITH CHECK (id = '00000000-0000-0000-0000-000000000001'::uuid);