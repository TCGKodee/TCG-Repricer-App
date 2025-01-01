class TCGRepricerShopify {
  constructor(config) {
    this.config = config;
    this.apiEndpoint = 'https://api.tcgrepricer.com'; // Replace with your actual API endpoint
  }

  async init() {
    try {
      // Initialize connection with TCG Repricer backend
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

      // Start price monitoring
      this.startPriceMonitoring();
    } catch (error) {
      console.error('TCG Repricer initialization failed:', error);
    }
  }

  async startPriceMonitoring() {
    // Implementation for price monitoring
    setInterval(async () => {
      await this.checkPrices();
    }, 5 * 60 * 1000); // Check every 5 minutes
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
    // Implementation for updating Shopify prices
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

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.TCG_REPRICER_CONFIG) {
    const repricer = new TCGRepricerShopify(window.TCG_REPRICER_CONFIG);
    repricer.init();
  }
});