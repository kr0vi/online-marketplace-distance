"use client";

import api from "@/components/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  thumbnailImage1?: string;
  totalPrice: number;
};

type OrderDetails = {
  orderId: number;
  status: string;
  totalAmount: number;
  orderSummary: OrderItem[];
  pricing?: {
    originalAmount: number;
    deliveryCharges: number;
    tax: string;
    paymentMethodCharges: number;
    finalAmount: string;
  };
  createdAt?: string;
};

type OrderResponse = {
  success: boolean;
  message: string;
  data?: OrderDetails[];
};

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const { data } = await api.get<OrderResponse>("/orders");

        if (!data.success || !data.data) {
          setErrorMessage(data.message || "Could not load order.");
          return;
        }

        const foundOrder = data.data.find(
          (o) => o.orderId === parseInt(orderId),
        );

        if (!foundOrder) {
          setErrorMessage("Order not found.");
          return;
        }

        setOrder(foundOrder);
      } catch (error) {
        setErrorMessage("Failed to load order details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white px-5 py-10 text-black sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl animate-pulse space-y-4">
          <div className="h-8 w-56 rounded " />
          <div className="space-y-4">
            <div className="h-32 rounded-2xl bg-white" />
            <div className="h-64 rounded-2xl bg-white" />
            <div className="h-40 rounded-2xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-5 mt-20 py-10 text-black sm:px-10 lg:px-16">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-semibold text-4xl tracking-tighter leading-none sm:text-5xl">
            Order Confirmed
          </h1>
          <Link
            href="/"
            className="border-b border-transparent text-xs uppercase tracking-[0.08em] transition-all duration-300 hover:border-black"
          >
            Back Home
          </Link>
        </div>

        {errorMessage ? (
          <div className="mb-6 border border-black bg-[#fff2ea] px-4 py-3 text-sm text-black">
            {errorMessage}
          </div>
        ) : null}

        {order ? (
          <div className="space-y-6">
            {/* Success Message */}
            <article className="border border-[#cfdcc8] bg-[#f1f8ee] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#4caf50] text-white">
                  ✓
                </div>
                <div>
                  <h2 className="font-semibold uppercase tracking-[0.08em] text-[#23411d]">
                    Order Placed Successfully
                  </h2>
                  <p className="mt-1 text-sm text-[#3e5a36]">
                    Thank you for your purchase! Your order has been received
                    and will be processed soon.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2 border-t border-[#d8e6d1] pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-[#5a6d52]">
                    Order ID
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[#23411d]">
                    #{order.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-[#5a6d52]">
                    Status
                  </p>
                  <p className="mt-1 inline-block border border-[#cfdcc8] bg-[#e8f5e9] px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[#23411d]">
                    {order.status}
                  </p>
                </div>
              </div>
            </article>

            {/* Order Summary */}
            <article className="border border-black/20 bg-white p-5 sm:p-6">
              <h2 className="text-xs uppercase tracking-[0.12em] text-black]">
                Order Summary
              </h2>

              <div className="mt-4 space-y-4 border-b border-black/20 pb-4">
                {order.orderSummary.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border border-black/20 p-4"
                  >
                    {item.thumbnailImage1 ? (
                      <div className="h-24 w-24 shrink-0 overflow-hidden border border-black/20 bg-[#f5f1e8]">
                        <img
                          src={item.thumbnailImage1}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-24 shrink-0 border border-black/20 bg-[#f5f1e8]" />
                    )}

                    <div className="flex-1">
                      <p className="font-medium text-black">{item.name}</p>
                      <p className="mt-1 text-sm text-black/80">
                        Quantity: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm text-black/80">
                        Price: Rs. {item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-black">
                        Rs. {item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Subtotal</span>
                  <span className="font-medium">
                    Rs.{" "}
                    {order.pricing
                      ? order.pricing.originalAmount.toFixed(2)
                      : order.orderSummary
                          .reduce((sum, item) => sum + item.totalPrice, 0)
                          .toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Delivery Charges</span>
                  <span className="font-medium">
                    {order.pricing
                      ? `Rs. ${order.pricing.deliveryCharges.toFixed(2)}`
                      : "Calculated"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Tax (18%)</span>
                  <span className="font-medium">
                    {order.pricing ? `Rs. ${order.pricing.tax}` : "Calculated"}
                  </span>
                </div>

                {order.pricing && order.pricing.paymentMethodCharges > 0 ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">COD Charges</span>
                    <span className="font-medium">
                      Rs. {order.pricing.paymentMethodCharges.toFixed(2)}
                    </span>
                  </div>
                ) : null}

                <div className="border-t border-black/20 pt-3">
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Total Amount</span>
                    <span>
                      Rs.{" "}
                      {order.pricing
                        ? Number(order.pricing.finalAmount).toFixed(2)
                        : order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                href="/"
                className="flex-1 border border-black/20 bg-black px-4 py-3 text-center text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#24190f]"
              >
                Continue Shopping
              </Link>
              <Link
                href="/me"
                className="flex-1 border border-black/20 px-4 py-3 text-center text-xs uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#f8f2ea]"
              >
                View All Orders
              </Link>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
