import { db } from "../db";
import { SEED_PRODUCTS, SEED_UNITS } from "../db/seedData";
import { SEED_CUSTOMERS, SEED_CUSTOMER_CREDENTIALS } from "../db/customerSeedData";
import { SEED_ORDERS } from "../db/orderSeedData";

const SCHEMA_VERSION = "5";

export async function ensureSeeded(): Promise<void> {
  const version = await db.meta.get("schema_version");
  if (version?.value === SCHEMA_VERSION) {
    return;
  }

  await db.transaction(
    "rw",
    [db.products, db.units, db.customers, db.customerCredentials, db.orders, db.meta],
    async () => {
      await db.products.clear();
      await db.units.clear();
      await db.customers.clear();
      await db.customerCredentials.clear();
      await db.orders.clear();
      await db.units.bulkAdd(SEED_UNITS);
      await db.products.bulkAdd(SEED_PRODUCTS);
      await db.customers.bulkAdd(SEED_CUSTOMERS);
      await db.customerCredentials.bulkAdd(SEED_CUSTOMER_CREDENTIALS);
      await db.orders.bulkAdd(SEED_ORDERS);
      await db.meta.put({ key: "schema_version", value: SCHEMA_VERSION });
    },
  );
}
