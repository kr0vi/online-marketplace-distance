import ProductTile from "@/components/ProductTile";
import {
  fetchProducts,
  fetchProductsBySearchQuery,
  Product,
} from "./lib/products/products";

export default async function ProductsGrid({
  searchQuery = "",
  category = "",
  isNew = false,
  isFeatured = false,
}: {
  searchQuery?: string;
  category?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}) {
  let products: Product[] = [];
  console.log("The current search querry = ", searchQuery);
  if (searchQuery) {
    products = await fetchProductsBySearchQuery(searchQuery);
  } else {
    products = await fetchProducts(category, isNew, isFeatured);
  }
  if (products.length === 0) {
    return (
      <div className="w-full rounded-lg border border-black/10 bg-white p-4 text-center text-sm text-black/65">
        No products found.
      </div>
    );
  }
  return (
    <section className="w-full  p-1">
      {/* TODO: Remove temporary grid debug background color (bg-amber-100). */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-9 sm:grid-cols-3">
        {products.map((product) => (
          <ProductTile
            key={product.id}
            name={product.name}
            id={product.id}
            price={product.price}
            thumbnailImage1={product.thumbnailImage1}
            thumbnailImage2={product.thumbnailImage2}
          />
        ))}
      </div>
    </section>
  );
}
