#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Setting up TCG Repricer Shopify Integration...${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is required but not installed.${NC}"
    exit 1
fi

# Check if Shopify CLI is installed
if ! command -v shopify &> /dev/null; then
    echo "Installing Shopify CLI..."
    npm install -g @shopify/cli @shopify/theme
fi

# Create project structure
echo "Creating project structure..."
mkdir -p shopify/{snippets,assets,config}

# Create necessary files
echo "Creating integration files..."

# Create script-tag.liquid
cat > shopify/snippets/script-tag.liquid << 'EOL'
<!-- TCG Repricer Shopify Integration -->
<script>
  window.TCG_REPRICER_CONFIG = {
    shop: "{{ shop.permanent_domain }}",
    apiKey: "{{ settings.tcg_repricer_api_key }}"
  };
</script>
<script src="{{ 'tcg-repricer.js' | asset_url }}" defer></script>
EOL

# Create tcg-repricer.js
cat > shopify/assets/tcg-repricer.js << 'EOL'
class TCGRepricerShopify {
  constructor(config) {
    this.config = config;
    this.apiEndpoint = 'https://api.tcgrepricer.com';
  }

  async init() {
    try {
      const response = await fetch(`${this.apiEndpoint}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shop: this.config.shop,
          apiKey: this.config.apiKey
        })
      });

      if (!response.ok) {
        throw new Error('Failed to initialize TCG Repricer');
      }

      this.startPriceMonitoring();
    } catch (error) {
      console.error('TCG Repricer initialization failed:', error);
    }
  }

  async startPriceMonitoring() {
    setInterval(async () => {
      await this.checkPrices();
    }, 5 * 60 * 1000);
  }

  async checkPrices() {
    try {
      const response = await fetch(`${this.apiEndpoint}/check-prices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shop: this.config.shop
        })
      });

      if (!response.ok) {
        throw new Error('Failed to check prices');
      }

      const updates = await response.json();
      if (updates.length > 0) {
        await this.updateShopifyPrices(updates);
      }
    } catch (error) {
      console.error('Price check failed:', error);
    }
  }

  async updateShopifyPrices(updates) {
    for (const update of updates) {
      try {
        await fetch('/admin/api/2024-01/products/' + update.productId + '.json', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: {
              variants: [{
                id: update.variantId,
                price: update.newPrice
              }]
            }
          })
        });
      } catch (error) {
        console.error(`Failed to update price for product ${update.productId}:`, error);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.TCG_REPRICER_CONFIG) {
    const repricer = new TCGRepricerShopify(window.TCG_REPRICER_CONFIG);
    repricer.init();
  }
});
EOL

# Create config.yml
cat > shopify/config.yml << 'EOL'
app_name: TCG Repricer
version: 1.0.0
scopes:
  - read_products
  - write_products
  - read_inventory
  - write_inventory
settings:
  - label: API Key
    name: tcg_repricer_api_key
    type: text
    required: true
EOL

# Create package.json
cat > shopify/package.json << 'EOL'
{
  "name": "tcg-repricer-shopify",
  "version": "1.0.0",
  "description": "TCG Repricer Shopify Integration",
  "scripts": {
    "postinstall": "shopify extension create --type theme-ui-extension --name tcg-repricer && shopify theme push --path=shopify"
  },
  "dependencies": {
    "@shopify/cli": "^3.0.0",
    "@shopify/theme": "^3.0.0"
  }
}
EOL

# Initialize npm project
echo "Initializing npm project..."
cd shopify && npm install

echo -e "${GREEN}Installation complete!${NC}"
echo -e "\nNext steps:"
echo -e "1. Go to your Shopify admin panel"
echo -e "2. Navigate to Apps > TCG Repricer"
echo -e "3. Enter your API key in the settings"
echo -e "4. Add this line to your theme.liquid file:"
echo -e "${BLUE}{% include 'script-tag' %}${NC}"