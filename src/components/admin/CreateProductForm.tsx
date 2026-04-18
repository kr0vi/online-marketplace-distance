"use client";
import api from "@/components/lib/api";
import React, { useState } from "react";

function CreateProductForm() {
  const [formData, setFormData] = useState({
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
    setFormData((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const handleCreateProduct = async () => {
    try {
      if (formData.description.length < 10) {
        alert("Description must be at least 10 characters");
        return;
      }
      if (
        !formData.name ||
        !formData.price ||
        !formData.thumbnailImage1 ||
        !formData.description
      ) {
        alert("Please fill in all required fields");
        return;
      }
      const { data } = await api.post("/products/create", formData);
      if (data.success) {
        alert("Product created successfully!");
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to create product. Please try again.",
      );
    }
  };

  return (
    <section>
      <article className="border border-[#ded4c8] bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg uppercase tracking-[0.08em]">
            Create Product
          </h2>
        </div>

        <form className="space-y-3">
          <input
            type="text"
            placeholder="Product name"
            value={formData.name}
            onChange={(e) => {
              handleInputChange(e, "name");
            }}
            className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => {
                handleInputChange(e, "price");
              }}
              className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Sizes (S, M, L)"
              value={formData.sizes}
              onChange={(e) => {
                handleInputChange(e, "sizes");
              }}
              className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
            />
          </div>
          <textarea
            rows={4}
            placeholder="Short description"
            value={formData.description}
            onChange={(e) => {
              handleInputChange(e, "description");
            }}
            className="w-full resize-none border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
          />
          <div>
            <input
              type="text"
              placeholder="Thumbnail image URL"
              value={formData.thumbnailImage1}
              onChange={(e) => {
                handleInputChange(e, "thumbnailImage1");
              }}
              className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
            />
            <input
              type="text"
              placeholder="Thumbnail image URL"
              value={formData.thumbnailImage2}
              onChange={(e) => {
                handleInputChange(e, "thumbnailImage2");
              }}
              className="w-full border border-[#ded4c8] bg-[#fbfaf7] px-3 py-2.5 text-sm outline-none transition focus:border-[#332518]"
            />
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="image1.jpg, image2.jpg, image3.jpg"
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
            onClick={handleCreateProduct}
            className="w-full border border-[#332518] bg-[#332518] px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-[#FBFAF7] transition hover:bg-transparent hover:text-[#332518]"
          >
            Create Product
          </button>
        </form>
      </article>
    </section>
  );
}

export default CreateProductForm;
