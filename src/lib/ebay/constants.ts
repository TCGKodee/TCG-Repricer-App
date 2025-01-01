export const EBAY_DEFAULTS = {
  SANDBOX_APP_ID: 'DEMO-APP-ID',
  SANDBOX_CERT_ID: 'DEMO-CERT-ID',
  SANDBOX_DEV_ID: 'DEMO-DEV-ID',
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  COMPLETED_SALES_STALE_TIME: 15 * 60 * 1000 // 15 minutes
} as const;

export const FALLBACK_PRICE_DATA = [
  {
    itemId: '1',
    title: 'Charizard VMAX',
    price: 279.99,
    condition: 'New',
    listingType: 'FixedPrice',
    endTime: new Date().toISOString(),
    url: '#'
  }
] as const;