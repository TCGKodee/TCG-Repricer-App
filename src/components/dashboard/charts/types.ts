export interface PriceDataPoint {
  date: string;
  price: number;
  marketPrice?: number;
  competitorPrice?: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}