export const dynamic = "force-dynamic";

import CatalogSortBar from "@/components/CatalogSortBar";
import ProductsGrid from "@/components/ProductsGrid";

type ProductSearchParams = {
  category?: string;
  isNew?: string;
  isFeatured?: string;
};

const categoryLabelMap: Record<string, string> = {
  TOP: "Topwear",
  BOTTOM: "Bottomwear",
  ACCESSORIES: "Accessories",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductSearchParams>;
}) {
  const params = await searchParams;
  const category = (params.category ?? "").trim().toUpperCase();
  const isNew = params.isNew === "true";
  const isFeatured = params.isFeatured === "true";

  const title = category
    ? `${categoryLabelMap[category] ?? category} Collection`
    : isNew
      ? "New Arrivals"
      : isFeatured
        ? "Featured Styles"
        : "All Products";

  const subtitle = category
    ? "Filtered by selected category"
    : isNew
      ? "Latest drops, right now"
      : isFeatured
        ? "Most loved picks from the store"
        : "Browse the full catalogue";

  return (
    <main className="min-h-screen bg-white pb-16">
      <section className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-8 lg:px-12">
        <div className="rounded-3xl border  bg-linear-to-br  px-6 py-10 relative sm:px-10  overflow-hidden">
          <p className="text-xs uppercase tracking-[0.28em] text-black z-20">
            Catalogue
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-oranblack z-20 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-black/70 z-20">{subtitle}</p>
        </div>

        <CatalogSortBar />

        <ProductsGrid
          category={category}
          isNew={isNew}
          isFeatured={isFeatured}
        />
      </section>
    </main>
  );
}
