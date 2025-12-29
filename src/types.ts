export interface Product {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
  inCart: boolean;
  createdAt: Date;
}

export type SortOption = 'name' | 'price' | 'recent';

