"use client";
import api from "@/components/lib/api";
import React, { useState } from "react";

function page() {
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    price: 0,
    sizes: "",
    description: "",
    thumbnailImage1: "",
    thumbnailImage2: "",
    showcaseImages: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
  ) => {
    const { value } = e.target;
    if (type === "price") {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [type]: numericValue,
      }));
      return;
    }
    if (type === "productId") {
      setFormData((prev) => ({
        ...prev,
        [type]: value,
      }));
      return;
    }
    setFormData((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const handleUpdateProduct = async () => {
    try {
      if (!formData.productId) {
        alert("Please enter a product ID");
        return;
      }

      if (formData.description && formData.description.length < 10) {
        alert("Description must be at least 10 characters if provided");
        return;
      }

      const updatePayload: Record<string, any> = {};

      if (formData.name) updatePayload.name = formData.name;
      if (formData.price) updatePayload.price = formData.price;
      if (formData.sizes) updatePayload.sizes = formData.sizes;
      if (formData.description)
        updatePayload.description = formData.description;
      if (formData.thumbnailImage1)
        updatePayload.thumbnailImage1 = formData.thumbnailImage1;
      if (formData.thumbnailImage2)
        updatePayload.thumbnailImage2 = formData.thumbnailImage2;
      if (
        formData.showcaseImages &&
        formData.showcaseImages.length > 0 &&
        formData.showcaseImages[0]
      )
        updatePayload.showcaseImages = formData.showcaseImages;

      if (Object.keys(updatePayload).length === 0) {
        alert("Please update at least one field");
        return;
      }

      const { data } = await api.put(
        `/products/update/${formData.productId}`,
        updatePayload,
      );
      if (data.success) {
        alert("Product updated successfully!");
        setFormData({
          productId: "",
          name: "",
          price: 0,
          sizes: "",
          description: "",
          thumbnailImage1: "",
          thumbnailImage2: "",
          showcaseImages: [""],
        });
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to update product. Please try again.",
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
            Update existing products in your catalogue.
          </p>
        </header>
        <section className="">
          <article className="border border-[#ded4c8] bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg uppercase tracking-[0.08em]">
                Update Product
              </h2>
            </div>

            <form className="space-y-3">
              <input
                type="number"
                placeholder="Product ID"
                value={formData.productId}
                onChange={(e) => {
                  handleInputChange(e, "productId");
                }}
                className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
              />
              <input
                type="text"
                placeholder="Product name (optional)"
                value={formData.name}
                onChange={(e) => {
                  handleInputChange(e, "name");
                }}
                className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  placeholder="Price (optional)"
                  value={formData.price || ""}
                  onChange={(e) => {
                    handleInputChange(e, "price");
                  }}
                  className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Sizes (optional, max 7 chars)"
                  value={formData.sizes}
                  onChange={(e) => {
                    handleInputChange(e, "sizes");
                  }}
                  className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Description (optional, min 10 chars if provided)"
                value={formData.description}
                onChange={(e) => {
                  handleInputChange(e, "description");
                }}
                className="w-full resize-none border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
              />
              <div className="">
                <input
                  type="text"
                  placeholder="Thumbnail image URL (optional)"
                  value={formData.thumbnailImage1}
                  onChange={(e) => {
                    handleInputChange(e, "thumbnailImage1");
                  }}
                  className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
                />
                <input
                  type="text"
                  placeholder="Second thumbnail image URL (optional)"
                  value={formData.thumbnailImage2}
                  onChange={(e) => {
                    handleInputChange(e, "thumbnailImage2");
                  }}
                  className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518] mt-3"
                />
                <div className="pt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Showcase image URLs (optional, comma-separated)"
                    value={formData.showcaseImages.join(", ")}
                    onChange={(e) => {
                      const urls = e.target.value
                        .split(",")
                        .map((url) => url.trim());
                      setFormData((prev) => ({
                        ...prev,
                        showcaseImages: urls,
                      }));
                    }}
                    className="w-full border flex-1 border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleUpdateProduct}
                className="w-full border border-[#332518] bg-[#332518] px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-[#FBFAF7] transition hover:bg-transparent hover:text-[#332518]"
              >
                Update Product
              </button>
            </form>
          </article>
        </section>
      </section>
    </main>
  );
}

export default page;
