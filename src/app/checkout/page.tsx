"use client";
import api from "@/components/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: number;
  quantity: number;
  product: {
    name: string;
    price: number;
    thumbnailImage1?: string;
  };
};

type Address = {
  id: number;
  lineOne: string;
  lineTwo?: string;
  city: string;
  pincode: string;
  country: string;
};

type CheckoutResponse = {
  success: boolean;
  message: string;
  data?: {
    orderId: number;
    status: string;
    paymentStatus: string;
    pricing: {
      originalAmount: number;
      deliveryCharges: number;
      tax: string;
      paymentMethodCharges: number;
      finalAmount: string;
    };
    orderSummary: Array<{
      id: number;
      name: string;
      quantity: number;
      price: number;
      thumbnailImage1?: string;
      totalPrice: number;
    }>;
  };
};

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const onPayment = async () => {
    try {
      const { data } = await api.post("/orders/checkout");
      if (!data.success || !data.data) {
        alert(data.message || "Could not initiate payment.");
        return;
      }
      console.log("Checkout response from backend:", data.data);
      const paymentObject = new (window as any).Razorpay({
        key: "rzp_test_SWhO3fPFpPUq2w", // public razorpayy key,
        ...data.data,
        order_id: data.data.id,
        handler: async (response: any) => {
          console.log("Payment response from Razorpay:", response);
          try {
            const res = await api.post("/orders/verify-payment", {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              orderId: data.orderId,
            });
            if (!res.data.success) {
              alert(
                "Payment verification failed. Please contact support with your order details.",
              );
              return;
            }
            alert("Payment successful! Redirecting to order confirmation...");
            router.push(`/orders/${data.orderId}`);
          } catch (error) {
            alert(
              "Payment verification failed. Please contact support with your order details.",
            );
            return;
          }
        },
      });
      paymentObject.open();
    } catch (error) {
      alert("Payment failed. Please try again.");
    }
  };
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");

    const fetchCheckoutData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const [cartRes, addressRes] = await Promise.all([
          api.get("/cart"),
          api.get("/users/address"),
        ]);

        if (!cartRes.data?.success) {
          setErrorMessage(cartRes.data?.message || "Could not load cart.");
          return;
        }

        const fetchedCart = Array.isArray(cartRes.data.data)
          ? cartRes.data.data
          : [];
        const fetchedAddresses = Array.isArray(addressRes.data?.data)
          ? addressRes.data.data
          : [];

        setCartItems(fetchedCart);
        setAddresses(fetchedAddresses);

        if (fetchedAddresses.length > 0) {
          setSelectedAddressId(fetchedAddresses[0].id);
        }
      } catch (error) {
        setErrorMessage("Failed to load checkout data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckoutData();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setErrorMessage("Please select an address before placing the order.");
      return;
    }

    try {
      setIsPlacingOrder(true);
      setErrorMessage(null);

      onPayment();
    } catch (error) {
      setErrorMessage("Checkout failed. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <main className="relative min-h-screen bg-[#fbfaf7] text-[#111111]">
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-56 rounded-lg bg-black/10" />
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="h-[70vh] rounded-lg border border-black/10 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]" />
              <div className="h-[40vh] rounded-lg border border-black/10 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)]" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#fbfaf7] text-[#111111]">
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-[#6b7280]">
              Checkout
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.2] tracking-tighter">
              Complete your order
            </h1>
          </div>
          <Link
            href="/cart"
            className="text-xs font-semibold uppercase tracking-[0.1] text-[#6b7280] underline transition hover:text-[#111111]"
          >
            Back to Cart
          </Link>
        </div>

        {errorMessage && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <article className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:p-8">
              <h2 className="text-2xl font-light">Delivery Address</h2>

              {addresses.length === 0 ? (
                <div className="mt-6 rounded-lg border border-dashed border-black/20 bg-[#fbfaf7] p-6 text-center text-sm text-[#6b7280]">
                  No saved address found. Add an address first, then return to
                  checkout.
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {addresses.map((address) => {
                    const isActive = selectedAddressId === address.id;
                    return (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => setSelectedAddressId(address.id)}
                        className={`rounded-lg border p-5 text-left transition-all duration-200 ${
                          isActive
                            ? "border-[#111111] bg-[#fafafa] ring-1 ring-[#111111]"
                            : "border-black/10 bg-white hover:border-black/30"
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-[#111111]">
                          <span className="font-medium block mb-1">
                            {address.lineOne}
                          </span>
                          {address.lineTwo && (
                            <span className="block text-[#6b7280]">
                              {address.lineTwo}
                            </span>
                          )}
                          <span className="block text-[#6b7280]">
                            {address.city}, {address.pincode}, {address.country}
                          </span>
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </article>

            <article className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:p-8">
              <h2 className="text-2xl font-light">Payment Method</h2>
              <div className="mt-6 rounded-lg border border-[#111111] bg-[#fafafa] p-5 ring-1 ring-[#111111]">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#111111]">
                  Cash On Delivery
                </p>
                <p className="mt-2 text-sm text-[#6b7280]">
                  For now we only accept Payments through RAZORPAY. <br />
                  <span className="text-[10px] text-black uppercase">
                    {" "}
                    COD will be supported in future.
                  </span>
                </p>
              </div>
            </article>
          </div>

          <aside className="h-fit rounded-lg border border-black/10 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] lg:sticky lg:top-24">
            <div className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">
              Order Summary
            </div>

            <div className="mt-6 space-y-4 border-b border-black/10 pb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-medium text-[#111111]">
                      {item.product.name}
                    </p>
                    <p className="mt-1 text-sm text-[#6b7280]">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#111111]">
                    ₹
                    {(item.product.price * item.quantity).toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                    )}
                  </p>
                </div>
              ))}
              {cartItems.length === 0 && (
                <p className="text-sm text-[#6b7280]">Your cart is empty.</p>
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#6b7280]">Subtotal</span>
                <span className="font-medium text-[#111111]">
                  ₹
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6b7280]">Shipping</span>
                <span className="text-xs uppercase tracking-wide text-[#6b7280]">
                  Calculated by backend
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6b7280]">Tax</span>
                <span className="text-xs uppercase tracking-wide text-[#6b7280]">
                  Calculated by backend
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={
                isPlacingOrder ||
                cartItems.length === 0 ||
                addresses.length === 0
              }
              className="mt-8 flex w-full items-center justify-center rounded-lg border border-[#111111] bg-[#111111] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
