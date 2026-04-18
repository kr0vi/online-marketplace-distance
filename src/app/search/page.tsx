export const dynamic = "force-dynamic";

import CatalogSortBar from "@/components/CatalogSortBar";
import ProductsGrid from "@/components/ProductsGrid";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = ((await searchParams).q ?? "").trim();

  return (
    <main className="min-h-screen bg-[#f8f7f4] pb-20 text-[#101010]">
      <section className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-4xl border border-black/10 bg-[#0f0f0f] px-6 py-14 shadow-[0_20px_48px_rgba(0,0,0,0.16)] sm:px-10">
          <img
            src="/all_products_hero.png"
            alt="Search Page Backdrop"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/60" />

          <p className="relative text-xs uppercase tracking-[0.28em] text-white/75">
            Search
          </p>
          <h1 className="relative mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {q ? `Results for \"${q}\"` : "Find Your Next Favorite"}
          </h1>
          <p className="relative mt-3 max-w-2xl text-sm text-white/80">
            {q
              ? "Showing matching products from the current catalogue."
              : "Use the search bar in the navbar to explore styles, fabrics, and categories."}
          </p>
        </div>

        <div className="mt-9 rounded-3xl border border-black/10 bg-white/80 p-4 backdrop-blur-sm sm:p-6">
          <CatalogSortBar />

          {q ? (
            <ProductsGrid searchQuery={q} />
          ) : (
            <div className="rounded-2xl border border-dashed border-black/20 bg-[#fcfcfb] px-6 py-14 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-black/65">
                No Query Provided
              </p>
              <p className="mt-3 text-sm text-black/65">
                Start typing in the navbar search field and press Enter to view
                products.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default page;
