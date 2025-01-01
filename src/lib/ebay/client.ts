import { EbayConfig, EbayPriceData, EbaySearchParams } from './types';
import { EbayConfigError, EbayNetworkError } from './errors';
import { EBAY_DEFAULTS } from './constants';

export class EbayClient {
  private config: EbayConfig;

  constructor(config: Partial<EbayConfig>) {
    this.config = this.validateConfig(config);
  }

  private validateConfig(config: Partial<EbayConfig>): EbayConfig {
    const appId = config.appId || import.meta.env.VITE_EBAY_APP_ID || EBAY_DEFAULTS.SANDBOX_APP_ID;
    const certId = config.certId || import.meta.env.VITE_EBAY_CERT_ID || EBAY_DEFAULTS.SANDBOX_CERT_ID;
    const devId = config.devId || import.meta.env.VITE_EBAY_DEV_ID || EBAY_DEFAULTS.SANDBOX_DEV_ID;

    if (!appId || !certId || !devId) {
      throw new EbayConfigError('Missing required eBay API credentials');
    }

    return {
      appId,
      certId,
      devId,
      sandbox: config.sandbox ?? true
    };
  }

  private async makeRequest(endpoint: string, params: EbaySearchParams): Promise<EbayPriceData[]> {
    try {
      const response = await fetch(`/api/ebay/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-EBAY-API-APP-ID': this.config.appId
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new EbayNetworkError(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof EbayNetworkError) {
        throw error;
      }
      throw new EbayNetworkError('Failed to fetch eBay data', error);
    }
  }

  async searchItems(params: EbaySearchParams): Promise<EbayPriceData[]> {
    return this.makeRequest('search', params);
  }

  async getCompletedSales(params: EbaySearchParams): Promise<EbayPriceData[]> {
    return this.makeRequest('completed', params);
  }
}