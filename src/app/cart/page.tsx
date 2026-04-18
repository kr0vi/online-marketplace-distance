"use client";
import api from "@/components/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/lib/auth/useUser";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { user, isLoaded, isSignedIn, logout } = useUser();

  const placeholderImage =
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80";
  const fetchCartItems = async () => {
    try {
      const { data } = await api.get("/cart");
      if (!data.success) {
        return <div>Failed to fetch cart data: {data.message}</div>;
      }
      const cart = data.data;
      setCartItems(cart);
    } catch (error) {
      alert("Failed to fetch cart data. Please try again later.");
    }
  };
  useEffect(() => {
    // If auth check finished and user is not signed in, kick to login.
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    } else {
      fetchCartItems();
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <main className="min-h-screen bg-[#fbfaf7] px-6 py-20 text-[#111111]">
        <div className="mx-auto max-w-3xl text-sm text-[#6b7280]">
          Loading...
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#0b0a08] text-[#f5efe6]">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://cdn.cosmos.so/2b710cf0-d024-499d-a61c-e207b7b21e9d?format=jpeg"
            className="w-full h-full object-cover object-[0%_29%]"
          ></img>
        </div>
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-16">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-[#d4c8b7]">
            Cart
          </p>
          <h2 className="text-center text-4xl font-light sm:text-5xl">
            Your bag is empty
          </h2>
          <p className="mt-3 max-w-md text-center text-sm text-[#cfc3b2]">
            Start with a few favorites and build your next look.
          </p>
          <Link
            href="/"
            className="mt-8 rounded-full border border-[#e7dccb] bg-[#f5efe6] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#2c2014] transition hover:bg-white"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="relative min-h-screen bg-[#fbfaf7] text-[#111111]">
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:pt-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.45em] text-[#6b7280]">
            Cart
          </p>
          <h1 className="mt-4 text-4xl  font-semibold leading-[1.2] tracking-tighter ">
            Curated selections for your
            <br /> next look
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[#6b7280]">
            Review each piece before checkout. Adjust quantities or keep
            browsing for more inspiration.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div
            className="h-[70vh] overflow-y-auto rounded-lg
 border border-black/10 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-light">
                Bag <span className="font-normal">{cartItems.length}</span>
              </h2>
              <span className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">
                Essentials
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-8">
              {cartItems.map((item: any) => (
                <ProductCard
                  productId={item.id}
                  key={item.id}
                  productName={item.product.name}
                  productPrice={item.product.price}
                  productQuantity={item.quantity}
                  productImage={
                    item.product.thumbnailImage1 || placeholderImage
                  }
                />
              ))}
            </div>
          </div>

          <aside
            className="h-fit rounded-lg
 border border-black/10 bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">
              Summary
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#6b7280]">Items</span>
                <span className="font-medium">{cartItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b7280]">Subtotal</span>
                <span className="font-medium">
                  ₹{" "}
                  {cartItems
                    .reduce(
                      (total, item) =>
                        total + item.product.price * item.quantity,
                      0,
                    )
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b7280]">Shipping</span>
                <span className="text-xs uppercase text-[#6b7280]">
                  Calculated at checkout
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-8 flex w-full items-center justify-center rounded-lg border border-[#111111] bg-[#111111] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-black/10 backdrop-blur-3xl bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-[#111111]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#6b7280]">
              Total
            </div>
            <div className="text-lg font-semibold">
              ₹{" "}
              {cartItems
                .reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0,
                )
                .toLocaleString()}
            </div>
          </div>
          <Link
            href="/checkout"
            className="rounded-lg border border-[#111111] bg-[#111111] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-black"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}

function ProductCard({
  productName,
  productPrice,
  productQuantity,
  productImage,
  productId,
}: {
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  productId: number;
}) {
  const [quantity, setQuantity] = useState<number>(productQuantity);
  const handleRemoveCartItem = async () => {
    const { data } = await api.delete(`/cart/${productId}`);
    if (!data.success) {
      alert("Failed to remove item from cart. Please try again later.");
    } else {
      alert("Item removed from cart successfully.");
    }
  };

  const handleChangeQuantity = async (delta: number) => {
    const newQuantity = productQuantity + delta;
    setQuantity(newQuantity);
    if (newQuantity <= 0) {
      await handleRemoveCartItem();
      return;
    }
    const { data } = await api.put(`/cart/${productId}`, {
      quantity: newQuantity,
    });
    if (!data.success) {
      alert("Failed to update item quantity. Please try again later.");
    } else {
      alert("Item quantity updated successfully.");
    }
  };
  return (
    <div className="flex w-full gap-4 border-b border-black/10 pb-6">
      <div className="h-28 w-24 overflow-hidden rounded-2xl border border-black/10 bg-[#f4f4f5]">
        <img
          src={productImage}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="mb-2">
          <div className="text-lg font-semibold">{productName}</div>
          <div className="text-sm text-[#6b7280]">₹{productPrice}</div>
        </div>
        <div className="mt-2 flex w-full max-w-55 items-center">
          <button
            className="h-10 w-16 rounded-l-full border border-black/10 bg-[#f4f4f5] text-lg font-semibold"
            onClick={() => {
              handleChangeQuantity(-1);
            }}
          >
            -
          </button>
          <div className="flex h-10 flex-1 items-center justify-center border-y border-black/10 bg-white text-sm">
            {quantity}
          </div>
          <button
            className="h-10 w-16 rounded-r-full border border-black/10 bg-[#f4f4f5] text-lg font-semibold"
            onClick={() => {
              handleChangeQuantity(1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="ml-auto text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b7280] hover:text-[#111111]"
        onClick={handleRemoveCartItem}
      >
        REMOVE
      </button>
    </div>
  );
}
