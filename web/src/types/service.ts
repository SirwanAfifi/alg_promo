export interface ServiceItem {
  id: number;
  title: string;
  price: number;
  description: string;
}

export interface ServicePaginatedResult {
  rows: ServiceItem[];
  count: number;
}
