"use client";
import api from "@/components/lib/api";
import React, { useState } from "react";

function page() {
  const [productId, setProductId] = useState("");

  const handleDeleteProduct = async () => {
    try {
      if (!productId) {
        alert("Please enter a product ID");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to delete product with ID ${productId}? This action cannot be undone.`,
      );

      if (!confirmed) {
        return;
      }

      const { data } = await api.delete(`/products/delete/${productId}`);
      if (data.success) {
        alert(`Product "${data.data.name}" deleted successfully!`);
        setProductId("");
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to delete product. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#FBFAF7] px-4 pb-12 pt-24 text-[#332518] sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="border border-[#ded4c8] bg-[#fdfcf9] p-5 sm:p-7">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7f7060]">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-2xl uppercase tracking-[0.06em] sm:text-3xl">
            Product Control Center
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5a4a39]">
            Delete products from your catalogue.
          </p>
        </header>
        <section className="">
          <article className="border border-[#ded4c8] bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg uppercase tracking-[0.08em]">
                Delete Product
              </h2>
            </div>

            <div className="space-y-3">
              <div className="bg-[#fef2f2] border border-[#f5d5d3] p-4 rounded">
                <p className="text-sm text-[#b83b2d] font-semibold">
                  ⚠️ Warning: This action is permanent
                </p>
                <p className="text-xs text-[#7f7060] mt-1">
                  Deleting a product cannot be undone. Please be sure before
                  proceeding.
                </p>
              </div>

              <input
                type="number"
                placeholder="Product ID to delete"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
              />

              <button
                type="button"
                onClick={handleDeleteProduct}
                className="w-full border border-[#b83b2d] bg-[#b83b2d] px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-[#FBFAF7] transition hover:bg-transparent hover:text-[#b83b2d]"
              >
                Delete Product
              </button>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

export default page