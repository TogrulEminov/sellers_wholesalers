export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "buyer";
  company?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  minOrderQuantity: number;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export type Category =
  | "Electronics"
  | "Office Supplies"
  | "Industrial"
  | "Furniture"
  | "Safety Equipment";
