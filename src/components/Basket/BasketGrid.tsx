import ProductBasketCard from "../Product/ProductBasketCard.tsx";

const staticItems = [
    {
        id: 1,
        name: "Industrial Grade 3D Printer Pro X1",
        description: "Professional 3D printing solution",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=400",
        quantity: 1,
        stock: 5
    },
    {
        id: 2,
        name: "Industrial Grade 3D Printer Pro X1",
        description: "Professional 3D printing solution",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=400",
        quantity: 1,
        stock: 5
    },
    {
        id: 3,
        name: "Industrial Grade 3D Printer Pro X1",
        description: "Professional 3D printing solution",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=400",
        quantity: 1,
        stock: 5
    },
    {
        id: 4,
        name: "Industrial Grade 3D Printer Pro X1",
        description: "Professional 3D printing solution",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=400",
        quantity: 1,
        stock: 5
    }
];
export default function BasketGrid() {
    return (
        <div className={"space-y-4"}>
            {
                staticItems.map((item) => (
                    <ProductBasketCard
                        key={item.id}
                        item={item}
                    />
                ))
            }
        </div>
    );
}
