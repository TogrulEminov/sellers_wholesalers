export interface UnitRecord {
  id: number;
  name: string;
}

export interface ProductRecord {
  id: string;
  code: string;
  name: string;
  unit: string;
  group: string | null;
  brand: string | null;
  canUseCurrency: number;
  currencyCode: string;
  priceClass: number;
  price: number;
}

export interface MetaRecord {
  key: string;
  value: string;
}

export interface CartItemRecord {
  productId: string;
  quantity: number;
  addedAt: number;
}

export interface CartItemWithProduct {
  product: ProductRecord;
  quantity: number;
  addedAt: number;
}

export interface CustomerRecord {
  id: string;
  code: string;
  name: string;
  lastName: string;
  group: string;
  canUseCurrency: number;
  currencyCode: string;
  priceClass: number;
  debtAgingGroup: number;
  isRiskyCustomer: number;
  birthDate: string | null;
  isActive: number;
  department: string;
  phone: string | null;
  mobilePhone: string | null;
  phoneNormalized: string | null;
  mobileNormalized: string | null;
}

export interface CustomerCredentialRecord {
  customerId: string;
  password: string;
}

export interface OtpRecord {
  phoneNormalized: string;
  code: string;
  customerId: string;
  expiresAt: number;
}

export interface SessionRecord {
  id: "current";
  customerId: string;
  phone: string;
  phoneNormalized: string;
  loggedInAt: number;
}

export interface AuthUser {
  id: string;
  code: string;
  name: string;
  phone: string;
  group: string;
  department: string;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface OrderItemRecord {
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface OrderRecord {
  id: string;
  customerId: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  currencyCode: string;
  itemCount: number;
  items: OrderItemRecord[];
  createdAt: number;
}
