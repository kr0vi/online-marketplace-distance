"use client";

import { useEffect, useState } from "react";
import api from "@/components/lib/api";
import Link from "next/link";

type Order = {
  orderId: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  orderSummary: Array<{
    name: string;
    quantity: number;
  }>;
};

function MeOrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get("/orders");
        if (response.data.success && response.data.data) {
          setOrders(response.data.data);
        } else if (!response.data.success) {
          setOrders([]);
        }
      } catch (err) {
        setError("Failed to load orders. Please try again.");
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    const colors: Record<Order["status"], string> = {
      PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
      CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
      SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
      DELIVERED: "bg-green-50 text-green-700 border-green-200",
      CANCELLED: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 border border-black/10 bg-white animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border border-black/10 bg-white p-8 text-center">
        <p className="text-sm text-black/60">No orders yet</p>
        <p className="text-xs text-black/40 mt-2">
          Start shopping to place your first order
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link href={`/orders/${order.orderId}`} key={order.orderId}>
          <div
            key={order.orderId}
            className="border border-black/10 bg-white p-5 hover:border-black/20 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-sm font-semibold text-black">
                    Order #{order.orderId}
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs font-medium border ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-black/60">
                  Total: ₹{order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-black/3 p-3">
              <p className="text-xs uppercase tracking-widest text-black/60 font-medium mb-2">
                Items Ordered
              </p>
              <div className="space-y-1.5">
                {order.orderSummary.map((item, idx) => (
                  <div key={idx} className="text-sm text-black/80">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-black/50"> × {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MeOrdersList;
