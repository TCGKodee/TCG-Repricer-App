export interface TrendMetric {
  id: string;
  label: string;
  trend: number;
}

export interface ChartDataPoint {
  date: string;
  price: number;
}

export interface TrendData {
  metrics: TrendMetric[];
  chartData: ChartDataPoint[];
  lastUpdated: string;
}