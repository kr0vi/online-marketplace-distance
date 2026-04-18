
import ProductsGrid from "./ProductsGrid";

function BestSellerSection() {
  return (
    <section className="mx-auto w-full px-4 sm:px-8 lg:px-12 mt-40 ">
      <div className=" max-w-7xl mx-auto">
        <div className=" h-50 flex items-center justify-between">
          <div>
            <p className="text-xs bg-black text-white  w-fit p-2 rounded-full">
              Best Sellers
            </p>
            <h3 className="text-5xl font-semibold text-left  py-12">
              Signature styles in
              <br /> our best sellers
            </h3>
          </div>
        </div>
        <ProductsGrid category="TOP" />
      </div>
    </section>
  );
}

export default BestSellerSection;
