"use client";
import api from "./api";

function AddProductButton({ productId }: { productId: number }) {
  const handleCheckout = async () => {
    console.log(`Adding product with ID ${productId} to cart...`);
    const { data } = await api.post("/cart", {
      productId,
      quantity: 1,
    });
    if (data.success) {
      alert("Product added to cart successfully!");
    } else {
      alert(data.message || "Failed to add product to cart.");
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleCheckout();
      }}
      type="button"
      className="mt-20 flex-1 w-full cursor-pointer border border-black bg-black p-3 text-[17px] font-medium uppercase tracking-[0.02em] text-[#FBFAF7] transition-all duration-300 ease-in-out hover:border-black hover:bg-[#fbfaf7] hover:text-black"
    >
      ADD
    </button>
  );
}

export default AddProductButton;
