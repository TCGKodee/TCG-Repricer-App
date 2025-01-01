export class EbayError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'EbayError';
  }
}

export class EbayConfigError extends EbayError {
  constructor(message: string) {
    super(`Configuration Error: ${message}`);
    this.name = 'EbayConfigError';
  }
}

export class EbayNetworkError extends EbayError {
  constructor(message: string, cause?: unknown) {
    super(`Network Error: ${message}`, cause);
    this.name = 'EbayNetworkError';
  }
}