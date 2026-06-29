import Dexie, { type Table } from "dexie";
import type {
  CartItemRecord,
  CustomerCredentialRecord,
  CustomerRecord,
  MetaRecord,
  OtpRecord,
  ProductRecord,
  OrderRecord,
  SessionRecord,
  UnitRecord,
} from "./types";

export class SellersDB extends Dexie {
  products!: Table<ProductRecord, string>;
  units!: Table<UnitRecord, number>;
  cartItems!: Table<CartItemRecord, string>;
  customers!: Table<CustomerRecord, string>;
  customerCredentials!: Table<CustomerCredentialRecord, string>;
  otpCodes!: Table<OtpRecord, string>;
  sessions!: Table<SessionRecord, string>;
  orders!: Table<OrderRecord, string>;
  meta!: Table<MetaRecord, string>;

  constructor() {
    super("sellers_wholesalers");

    this.version(1).stores({
      products: "id, code, group, brand, name",
      groups: "id, name, module",
      meta: "key",
    });

    this.version(2).stores({
      products: "id, code, unit, group, brand, name",
      units: "id, name",
      meta: "key",
    });

    this.version(3).stores({
      products: "id, code, unit, group, brand, name",
      units: "id, name",
      cartItems: "productId, addedAt",
      meta: "key",
    });

    this.version(4).stores({
      products: "id, code, unit, group, brand, name",
      units: "id, name",
      cartItems: "productId, addedAt",
      customers: "id, code, phoneNormalized, mobileNormalized, group",
      customerCredentials: "customerId",
      otpCodes: "phoneNormalized, customerId",
      sessions: "id, customerId",
      meta: "key",
    });

    this.version(5).stores({
      products: "id, code, unit, group, brand, name",
      units: "id, name",
      cartItems: "productId, addedAt",
      customers: "id, code, phoneNormalized, mobileNormalized, group",
      customerCredentials: "customerId",
      otpCodes: "phoneNormalized, customerId",
      sessions: "id, customerId",
      orders: "id, customerId, orderNumber, status, createdAt",
      meta: "key",
    });
  }
}

export const db = new SellersDB();
