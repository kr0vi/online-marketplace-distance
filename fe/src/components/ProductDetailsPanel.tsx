"use client";
import ColorOptions from "@/components/ColorOptions";
import SizeSelector from "@/components/SizeSelector";
import { useState } from "react";
import AddProductButton from "./lib/AddProductButton";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  sizes: string;
  thumbnailImage1: string;
  thumbnailImage2?: string;
  showcaseImages: string[];
};

export default function ProductDetailsPanel({ product }: { product: Product }) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(true);

  return (
    <section className="h-full  px-6  lg:px-10 lg:py-16 flex items-center justify-center ">
      {/* TODO: Remove temporary details-pane debug background color (bg-rose-100). */}
      <div className="mx-auto py-20  max-w-[60%]  flex flex-col h-full justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[18px] leading-[1.2]  tracking-tight uppercase ">
                {product.name}
              </h1>
              <p className=" text-[16px] font-semibold mt-1  leading-none ">
                Rs. {product.price.toFixed(2)}
              </p>
              <p className="mt-1 text-[12px] ">MRP inclusive of all taxes</p>
            </div>
            <button type="button" className="mt-1 text-[24px] ">
              ♡
            </button>
          </div>

          <ColorOptions />
          <SizeSelector sizes={product.sizes} />

          <div className="mt-14 space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <h5 className="text-[20px] uppercase">Description</h5>
              <button
                type="button"
                className={`text-[28px] leading-none   transition-transform duration-500 ${isDescriptionOpen ? "rotate-45" : ""}`}
              >
                +
              </button>
            </div>
            <div
              className={`h-0 overflow-hidden border-b border-white text-[13px] transition-all duration-500 ${isDescriptionOpen ? "h-20" : ""}`}
            >
              <p>{product.description}</p>
            </div>
          </div>
          <AddProductButton productId={product.id}></AddProductButton>
          <button
        
            type="button"
            className="mt-2 flex-1 w-full cursor-pointer border  bg-white p-3 text-[17px] font-medium uppercase tracking-[0.02em] text-black transition-all duration-300  hover:bg-black hover:text-white"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
