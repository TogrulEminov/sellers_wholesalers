import { Empty, Spin } from "antd";
import { useCartItems } from "../../hooks/useCart";
import { removeFromCart, updateQuantity } from "../../services/cartService";
import ProductBasketCard from "../Product/ProductBasketCard.tsx";

interface Props {
  selectedIds: Set<string>;
  onToggleSelect: (productId: string, checked: boolean) => void;
}

export default function BasketGrid({ selectedIds, onToggleSelect }: Props) {
  const items = useCartItems();

  if (items === undefined) {
    return (
      <div className="flex items-center justify-center h-48">
        <Spin size="large" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <Empty description="Səbətiniz boşdur" className="[&_.ant-empty-description]:text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ProductBasketCard
          key={item.product.id}
          item={item}
          selected={selectedIds.has(item.product.id)}
          onSelectChange={(checked) => onToggleSelect(item.product.id, checked)}
          onQuantityChange={(productId, qty) => updateQuantity(productId, qty)}
          onRemove={(productId) => removeFromCart(productId)}
        />
      ))}
    </div>
  );
}
