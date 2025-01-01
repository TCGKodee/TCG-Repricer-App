export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      dashboard_metrics: {
        Row: {
          id: string
          total_revenue: number
          active_listings: number
          buy_box_win_rate: number
          last_updated: string
        }
        Insert: {
          id?: string
          total_revenue: number
          active_listings: number
          buy_box_win_rate: number
          last_updated?: string
        }
        Update: {
          id?: string
          total_revenue?: number
          active_listings?: number
          buy_box_win_rate?: number
          last_updated?: string
        }
      }
      price_history: {
        Row: {
          id: string
          product_id: string
          price: number
          market_price: number
          competitor_price: number | null
          timestamp: string
        }
        Insert: {
          id?: string
          product_id: string
          price: number
          market_price: number
          competitor_price?: number | null
          timestamp?: string
        }
        Update: {
          id?: string
          product_id?: string
          price?: number
          market_price?: number
          competitor_price?: number | null
          timestamp?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          sku: string
          current_price: number
          market_price: number
          competitor_price: number | null
          last_sold_price: number | null
          last_sold_date: string | null
          stock: number
          buy_box_status: string
          margin: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          sku: string
          current_price: number
          market_price: number
          competitor_price?: number | null
          last_sold_price?: number | null
          last_sold_date?: string | null
          stock?: number
          buy_box_status: string
          margin: number
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          sku?: string
          current_price?: number
          market_price?: number
          competitor_price?: number | null
          last_sold_price?: number | null
          last_sold_date?: string | null
          stock?: number
          buy_box_status?: string
          margin?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}