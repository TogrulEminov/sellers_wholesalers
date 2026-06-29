import { useLiveQuery } from "dexie-react-hooks";
import { getOrdersByCustomerId } from "../repositories/orderRepository";
import type { OrderRecord } from "../db/types";

export function useCustomerOrders(customerId: string | undefined): OrderRecord[] | undefined {
  return useLiveQuery(async () => {
    if (!customerId) return [];
    return getOrdersByCustomerId(customerId);
  }, [customerId]);
}
