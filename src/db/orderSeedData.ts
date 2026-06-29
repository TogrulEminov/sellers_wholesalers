import type { OrderRecord } from "./types";

export const SEED_ORDERS: OrderRecord[] = [
  {
    id: "ord-001",
    customerId: "741",
    orderNumber: "SIF-2026-0041",
    status: "delivered",
    totalAmount: 156.5,
    currencyCode: "USD",
    itemCount: 3,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    items: [
      {
        productCode: "ST00354",
        productName: "8ML - HAZIR MASIN ETIRLERI HURREM",
        quantity: 20,
        unit: "EDED",
        price: 2.0,
      },
      {
        productCode: "7784",
        productName: "ARABIAN OUD - EHSAS",
        quantity: 500,
        unit: "QRAM",
        price: 0.3,
      },
    ],
  },
  {
    id: "ord-002",
    customerId: "741",
    orderNumber: "SIF-2026-0058",
    status: "shipped",
    totalAmount: 89.0,
    currencyCode: "USD",
    itemCount: 2,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    items: [
      {
        productCode: "8198",
        productName: "ARD AL ZAAFARAN - DIRHAM",
        quantity: 200,
        unit: "QRAM",
        price: 0.3,
      },
      {
        productCode: "ST00001JKLLK",
        productName: "AJMAL - IRIS VIOLET",
        quantity: 100,
        unit: "QRAM",
        price: 0.5,
      },
    ],
  },
  {
    id: "ord-003",
    customerId: "747",
    orderNumber: "SIF-2026-0062",
    status: "confirmed",
    totalAmount: 42.0,
    currencyCode: "USD",
    itemCount: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    items: [
      {
        productCode: "7784",
        productName: "ARABIAN OUD - EHSAS",
        quantity: 140,
        unit: "QRAM",
        price: 0.3,
      },
    ],
  },
  {
    id: "ord-004",
    customerId: "756",
    orderNumber: "SIF-2026-0065",
    status: "pending",
    totalAmount: 25.0,
    currencyCode: "USD",
    itemCount: 1,
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    items: [
      {
        productCode: "ST00354",
        productName: "8ML - HAZIR MASIN ETIRLERI HURREM",
        quantity: 10,
        unit: "EDED",
        price: 2.0,
      },
    ],
  },
];
