"use client";

import api from "@/components/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  thumbnailImage1?: string;
  totalPrice: number;
};

type Order = {
  orderId: number;
  status: string;
  totalAmount: number;
  orderSummary: OrderItem[];
};

type OrdersResponse = {
  success: boolean;
  message: string;
  data?: Order[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const { data } = await api.get<OrdersResponse>("/orders");

        if (!data.success || !data.data) {
          setErrorMessage(data.message || "Could not load orders.");
          return;
        }

        setOrders(data.data);
      } catch (error) {
        setErrorMessage("Failed to load orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FBFAF7] px-5 py-10 text-[#332518] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl animate-pulse space-y-4">
          <div className="h-8 w-56 rounded bg-[#eadfce]" />
          <div className="grid gap-4">
            <div className="h-32 rounded-2xl bg-[#f1e8da]" />
            <div className="h-32 rounded-2xl bg-[#f1e8da]" />
            <div className="h-32 rounded-2xl bg-[#f1e8da]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBFAF7] px-5 py-10 text-[#332518] sm:px-10 lg:px-16">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-logo text-4xl leading-none sm:text-5xl">
            My Orders
          </h1>
          <Link
            href="/"
            className="border-b border-transparent text-xs uppercase tracking-[0.08em] transition-all duration-300 hover:border-[#332518]"
          >
            Back Home
          </Link>
        </div>

        {errorMessage ? (
          <div className="mb-6 border border-[#d8b4a0] bg-[#fff2ea] px-4 py-3 text-sm text-[#7a2f08]">
            {errorMessage}
          </div>
        ) : null}

        {orders.length === 0 ? (
          <div className="border border-[#ded4c8] bg-white p-8 text-center">
            <p className="text-sm text-[#6d5a48]">
              You haven't placed any orders yet.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block border border-[#ded4c8] bg-[#332518] px-6 py-2 text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#24190f]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link
                key={order.orderId}
                href={`/orders/${order.orderId}`}
                className="block border border-[#ded4c8] bg-white p-5 transition-all duration-300 hover:border-[#332518] hover:shadow-md sm:p-6"
              >
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto_auto]">
                  {/* Order ID & Status */}
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-[#6d5a48]">
                      Order ID
                    </p>
                    <p className="mt-1 text-base font-semibold text-[#332518] sm:text-lg">
                      #{order.orderId}
                    </p>
                    <div className="mt-2">
                      <p className="inline-block border border-[#ded4c8] bg-[#f8f2ea] px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[#332518]">
                        {order.status}
                      </p>
                    </div>
                  </div>

                  {/* Items count */}
                  <div className="text-right sm:text-left">
                    <p className="text-xs uppercase tracking-[0.08em] text-[#6d5a48]">
                      Items
                    </p>
                    <p className="mt-1 text-base font-semibold text-[#332518]">
                      {order.orderSummary.length} item
                      {order.orderSummary.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Total Amount */}
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.08em] text-[#6d5a48]">
                      Total
                    </p>
                    <p className="mt-1 text-base font-semibold text-[#332518] sm:text-lg">
                      Rs. {order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Products preview */}
                <div className="mt-4 border-t border-[#ded4c8] pt-3">
                  <p className="truncate text-xs text-[#6d5a48]">
                    {order.orderSummary.map((item) => item.name).join(", ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
