import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../database.types';

export class BaseQueries {
  protected client: SupabaseClient<Database>;
  private retryAttempts = 3;
  private retryDelay = 1000;

  constructor(client: SupabaseClient<Database>) {
    this.client = client;
  }

  protected async withRetry<T>(
    operation: () => Promise<T>,
    context: string,
    fallback: T
  ): Promise<T> {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === this.retryAttempts) {
          return this.handleError(error, context, fallback);
        }
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
      }
    }
    return fallback;
  }

  protected handleError<T>(error: unknown, context: string, fallback: T): T {
    console.error(`Database error in ${context}:`, {
      error,
      timestamp: new Date().toISOString(),
      context
    });
    return fallback;
  }

  protected validateResponse<T>(data: T | null, error: unknown, context: string, fallback: T): T {
    if (error) {
      return this.handleError(error, context, fallback);
    }
    return data || fallback;
  }
}