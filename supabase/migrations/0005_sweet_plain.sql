/*
  # Fix Dashboard Metrics Table

  1. Changes
    - Drop existing constraints
    - Recreate table with proper constraints
    - Insert initial data
    - Update RLS policies

  2. Security
    - Enable RLS
    - Add policy for authenticated users
*/

-- First recreate the table with proper constraints
DROP TABLE IF EXISTS dashboard_metrics;

CREATE TABLE dashboard_metrics (
  id uuid PRIMARY KEY,
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
  '00000000-0000-0000-0000-000000000001',
  24567.89,
  156,
  68.5,
  now()
);

-- Enable RLS and set up policies
ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read dashboard metrics"
  ON dashboard_metrics
  FOR SELECT
  TO authenticated
  USING (id = '00000000-0000-0000-0000-000000000001'::uuid);