import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { message } from "antd";
import BasketTotalApply from "../components/Basket/BasketTotalApply.tsx";
import BasketTitle from "../components/Basket/BasketTitle.tsx";
import SelectAll from "../components/Basket/SelectAll.tsx";
import ReturnShipping from "../components/Basket/ReturnShipping.tsx";
import BasketGrid from "../components/Basket/BasketGrid.tsx";
import LoginModal from "../components/Auth/LoginModal.tsx";
import { useCartItems } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { removeFromCart } from "../services/cartService";
import { createOrderFromCart } from "../services/orderService";
import { mainPath } from "../data/constant";
import type { AuthUser } from "../db/types";

export default function BasketPage() {
  const navigate = useNavigate();
  const items = useCartItems();
  const { isAuthenticated, user } = useAuth();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!items) return;

    setSelectedIds((prev) => {
      const currentIds = items.map((item) => item.product.id);
      const kept = currentIds.filter((id) => prev.has(id));
      if (kept.length > 0) return new Set(kept);
      return new Set(currentIds);
    });
  }, [items]);

  const selectedItems = useMemo(
    () => items?.filter((item) => selectedIds.has(item.product.id)) ?? [],
    [items, selectedIds],
  );

  const selectedTotal = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [selectedItems],
  );

  const allSelected = (items?.length ?? 0) > 0 && selectedIds.size === items!.length;
  const indeterminate = selectedIds.size > 0 && !allSelected;

  const toggleSelectAll = useCallback(
    (checked: boolean) => {
      if (!items) return;
      setSelectedIds(checked ? new Set(items.map((item) => item.product.id)) : new Set());
    },
    [items],
  );

  const toggleItem = useCallback((productId: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(productId);
      else next.delete(productId);
      return next;
    });
  }, []);

  const submitOrder = useCallback(
    async (authUser: AuthUser) => {
      if (selectedItems.length === 0) {
        message.warning("Sifariş üçün ən azı bir məhsul seçin");
        return;
      }

      setSubmitting(true);
      try {
        const order = await createOrderFromCart(authUser.id, selectedItems);
        await Promise.all(selectedItems.map((item) => removeFromCart(item.product.id)));
        message.success(`Sifariş ${order.orderNumber} qeydə alındı`);
        navigate(mainPath.orders.main);
      } catch {
        message.error("Sifariş tamamlanmadı");
      } finally {
        setSubmitting(false);
      }
    },
    [selectedItems, navigate],
  );

  const handleCompleteOrder = useCallback(() => {
    if (selectedItems.length === 0) {
      message.warning("Sifariş üçün ən azı bir məhsul seçin");
      return;
    }

    if (!isAuthenticated || !user) {
      setLoginModalOpen(true);
      return;
    }

    submitOrder(user);
  }, [selectedItems, isAuthenticated, user, submitOrder]);

  const handleLoginSuccess = useCallback(
    (authUser: AuthUser) => {
      submitOrder(authUser);
    },
    [submitOrder],
  );

  return (
    <section className="min-h-screen py-8 md:py-12">
      <div className="container">
        <BasketTitle />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <SelectAll
              checked={allSelected}
              indeterminate={indeterminate}
              onChange={toggleSelectAll}
              selectedCount={selectedIds.size}
              totalCount={items?.length ?? 0}
            />
            <BasketGrid
              selectedIds={selectedIds}
              onToggleSelect={toggleItem}
            />
            <ReturnShipping />
          </div>
          <BasketTotalApply
            selectedCount={selectedIds.size}
            selectedTotal={selectedTotal}
            onCompleteOrder={handleCompleteOrder}
            loading={submitting}
          />
        </div>
      </div>

      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </section>
  );
}
