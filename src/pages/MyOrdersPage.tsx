import { Link } from "react-router";
import { Empty, Spin } from "antd";
import { FiPackage, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { useCustomerOrders } from "../hooks/useOrders";
import {
  formatMoney,
  formatOrderDate,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from "../data/orderLabels";
import { mainPath } from "../data/constant";
import { formatUnitLabel } from "../data/searchParams";

export default function MyOrdersPage() {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const orders = useCustomerOrders(user?.id);

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-sand flex items-center justify-center">
            <FiPackage className="w-8 h-8 text-brand-copper" />
          </div>
          <h1 className="text-2xl font-bold text-brand-text mb-2">Sifarişlərim</h1>
          <p className="text-brand-muted mb-6">
            Sifariş tarixçənizi görmək üçün hesabınıza daxil olun.
          </p>
          <Link
            to={mainPath.login.main}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-dark text-brand-cream font-semibold hover:bg-brand-darker transition-colors"
          >
            Daxil ol
            <FiArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-8 md:py-12">
      <div className="container">
        <div className="mb-8 md:mb-10">
          <p className="text-brand-copper text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Hesab
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">Sifarişlərim</h1>
          <p className="text-brand-muted">
            {user.name} · {user.code} · {user.group}
          </p>
        </div>

        {orders === undefined ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-brand-border p-12">
            <Empty
              description="Hələ sifarişiniz yoxdur"
              className="[&_.ant-empty-description]:text-brand-muted"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="bg-white rounded-2xl border border-brand-border overflow-hidden hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/5 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 border-b border-brand-border/60 bg-brand-cream/50">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="font-bold text-brand-text">{order.orderNumber}</h2>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${ORDER_STATUS_COLORS[order.status]}`}
                      >
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <p className="text-brand-muted text-sm mt-1">{formatOrderDate(order.createdAt)}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-bold text-brand-copper">
                      {formatMoney(order.totalAmount, order.currencyCode)}
                    </p>
                    <p className="text-brand-muted text-xs mt-0.5">{order.itemCount} məhsul</p>
                  </div>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={`${order.id}-${idx}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-brand-border/40 last:border-0"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-brand-text text-sm line-clamp-1">
                          {item.productName}
                        </p>
                        <p className="text-brand-muted text-xs font-mono mt-0.5">{item.productCode}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm shrink-0">
                        <span className="text-brand-muted">
                          {item.quantity} {formatUnitLabel(item.unit)}
                        </span>
                        <span className="font-semibold text-brand-text">
                          {formatMoney(item.price * item.quantity, order.currencyCode)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
