export const dynamic = "force-dynamic";

import ProductsGrid from "@/components/ProductsGrid";

export default function AllProductsPage() {
  return (
    <main className="bg-[#f8f7f4] text-[#101010]">
      <section className="relative h-[62vh] min-h-105 overflow-hidden bg-[#101010]">
        <div className="absolute inset-0">
          <img
            src="/all_products_hero.png"
            alt="All Products Backdrop"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/45 to-black/60" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
            <span className="rounded-full bg-white text-xs font-semibold text-[#141414] p-1 px-3">
              Explore
            </span>
            <span className="text-xs font-light text-white p-1 px-2">
              Our Complete Range
            </span>
          </div>

          <h1 className="text-balance font-semibold leading-[1.1] text-white text-5xl md:text-6xl">
            All Collections
          </h1>

          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/80">
            Discover pieces crafted with intention. From timeless essentials to
            modern statement wear.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 mb-32 w-full px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <h3 className="text-3xl font-semibold text-left text-[#101010]">
                Every Style, Sorted
              </h3>
            </div>
            <div className="text-sm text-black/55">Showing all products</div>
          </div>
          <ProductsGrid />
        </div>
      </section>
    </main>
  );
}
