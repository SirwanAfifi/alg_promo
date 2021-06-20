export interface ServiceItem {
  id: number;
  title: string;
  price: number;
  description: string;
  userServices?: { promoCodeId: number; userId: number }[];
}

export interface ServicePaginatedResult {
  rows: ServiceItem[];
  count: number;
}
