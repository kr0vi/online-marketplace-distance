import Image from "next/image";
import Link from "next/link";

type ProductCard = {
  id: number;
  name: string;
  price: number;
  thumbnailImage1: string;
  thumbnailImage2?: string;
};

export default function ProductTile({
  name,
  price,
  thumbnailImage1,
  thumbnailImage2 = "default",
  id,
}: ProductCard) {
  return (
    <Link
      href={`/products/${id}`}
      className="block p-2  border border-white hover:border-black rounded-2xl  transition-all duration-300"
    >
      {/* TODO: Remove temporary tile debug background color (bg-sky-100). */}
      <div className="aspect-3/4  bg-black">
        <img src={thumbnailImage1} alt={name} className="h-full w-full" />
      </div>
      <div className="flex items-center justify-between gap-3  px-2 py-2 text-[12px]">
        <p className="truncate pr-2">{name}</p>
        <p>${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
