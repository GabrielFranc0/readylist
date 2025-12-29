export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  inCart: boolean;
  createdAt: Date;
}

export type SortOption = 'name' | 'price' | 'recent';

