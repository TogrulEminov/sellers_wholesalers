import type { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Industrial Grade 3D Printer Pro X1",
    category: "Electronics",
    price: 2499.99,
    image:
      "https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=800&auto=format&fit=crop&q=60",
    description:
      "Professional 3D printing solution with dual extruder system and heated chamber.",
    stock: 15,
    minOrderQuantity: 1,
    unit: "piece",
  },
  {
    id: "2",
    name: "Ergonomic Office Chair Executive",
    category: "Furniture",
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&auto=format&fit=crop&q=60",
    description:
      "Premium ergonomic chair with lumbar support and adjustable armrests.",
    stock: 50,
    minOrderQuantity: 2,
    unit: "piece",
  },
  {
    id: "3",
    name: "Safety Helmet Industrial Grade",
    category: "Safety Equipment",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&auto=format&fit=crop&q=60",
    description:
      "ANSI certified safety helmet with adjustable suspension system.",
    stock: 200,
    minOrderQuantity: 10,
    unit: "piece",
  },
  {
    id: "4",
    name: "Heavy Duty Pallet Jack 5500lbs",
    category: "Industrial",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60",
    description: "Industrial strength pallet jack with polyurethane wheels.",
    stock: 25,
    minOrderQuantity: 1,
    unit: "piece",
  },
  {
    id: "5",
    name: "Premium A4 Copy Paper (500 sheets)",
    category: "Office Supplies",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=60",
    description: "High-quality 80gsm A4 paper for professional printing.",
    stock: 1000,
    minOrderQuantity: 50,
    unit: "ream",
  },
  {
    id: "6",
    name: "Wireless Conference Speakerphone",
    category: "Electronics",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60",
    description: "360° voice pickup with noise reduction technology.",
    stock: 30,
    minOrderQuantity: 1,
    unit: "piece",
  },
  {
    id: "7",
    name: "Standing Desk Electric Adjustable",
    category: "Furniture",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&auto=format&fit=crop&q=60",
    description: "Electric height adjustable desk with memory presets.",
    stock: 20,
    minOrderQuantity: 1,
    unit: "piece",
  },
  {
    id: "8",
    name: "Safety Goggles Anti-Fog",
    category: "Safety Equipment",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&auto=format&fit=crop&q=60",
    description: "Clear anti-fog safety goggles with UV protection.",
    stock: 500,
    minOrderQuantity: 20,
    unit: "piece",
  },
];

export const categories = [
  "All",
  "Electronics",
  "Office Supplies",
  "Industrial",
  "Furniture",
  "Safety Equipment",
];
export const getCategoryStats = () => ({
  Electronics: { count: 124, trending: true },
  Tools: { count: 89, trending: true },
  Furniture: { count: 56, trending: false },
  "Office Supplies": { count: 203, trending: false },
});
