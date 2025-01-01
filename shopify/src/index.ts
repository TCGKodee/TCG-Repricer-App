import { ApiClient } from './api/client';
import { PriceMonitor } from './services/PriceMonitor';
import { ShopifyService } from './services/ShopifyService';
import { Logger } from './utils/logger';
import { ShopifyConfig } from './types';

class TCGRepricerApp {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('TCGRepricerApp');
  }

  async init(config: ShopifyConfig): Promise<void> {
    try {
      const apiClient = new ApiClient(config);
      const shopifyService = new ShopifyService();
      
      // Connect to TCG Repricer API
      const connected = await apiClient.connect();
      if (!connected) {
        throw new Error('Failed to connect to TCG Repricer API');
      }

      // Start price monitoring
      const monitor = new PriceMonitor(apiClient, shopifyService);
      monitor.start();
      
      this.logger.info('TCG Repricer initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize TCG Repricer:', error);
    }
  }
}

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.TCG_REPRICER_CONFIG) {
    const app = new TCGRepricerApp();
    app.init(window.TCG_REPRICER_CONFIG);
  }
});