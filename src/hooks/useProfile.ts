import { useLiveQuery } from "dexie-react-hooks";
import { getCustomerProfile } from "../services/profileService";
import type { CustomerRecord } from "../db/types";

export function useCustomerProfile(
  customerId: string | undefined,
): CustomerRecord | null | undefined {
  return useLiveQuery(async () => {
    if (!customerId) return null;
    return (await getCustomerProfile(customerId)) ?? null;
  }, [customerId]);
}
