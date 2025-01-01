-- Add Shopify-specific fields to products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS shopify_product_id text UNIQUE,
ADD COLUMN IF NOT EXISTS shopify_variant_id text,
ADD COLUMN IF NOT EXISTS shopify_synced_at timestamptz;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_shopify_product_id 
ON products(shopify_product_id);

-- Add trigger to update shopify_synced_at
CREATE OR REPLACE FUNCTION update_shopify_synced_at()
RETURNS trigger AS $$
BEGIN
  NEW.shopify_synced_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_shopify_synced_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  WHEN (OLD.shopify_product_id IS DISTINCT FROM NEW.shopify_product_id 
    OR OLD.shopify_variant_id IS DISTINCT FROM NEW.shopify_variant_id)
  EXECUTE FUNCTION update_shopify_synced_at();