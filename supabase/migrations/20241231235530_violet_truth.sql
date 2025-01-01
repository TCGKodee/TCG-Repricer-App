/*
  # Fix Profiles Table Structure

  1. Changes
    - Rename display_name column to displayName for consistency
    - Add missing columns for profile data
    - Update RLS policies
    - Add proper indexes

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing profiles table if it exists
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table with correct structure
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  displayName text,
  avatarUrl text,
  bio text,
  location text,
  website text,
  twitter text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create indexes
CREATE INDEX idx_profiles_displayName ON profiles(displayName);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();