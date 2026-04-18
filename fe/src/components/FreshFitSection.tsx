import React from 'react'
import ProductsGrid from './ProductsGrid';

function FreshFitSection() {
  return (
    <section id='freshFitsSection' className="mx-auto w-full px-4 sm:px-8 lg:px-12 mt-40 mb-20">
      <div className=" max-w-7xl mx-auto">
        <div className=" h-50 flex items-center justify-between">
          <div>
            <p className="text-xs bg-black text-white w-fit p-2 rounded-full">
              New Arrivals
            </p>
            <h3 className="text-5xl font-semibold text-left  py-12">
              Fresh fits in
              <br /> our latest drop
            </h3>
          </div>
        </div>
        <ProductsGrid category="ACCESSORIES" />
      </div>
    </section>
  );
}

export default FreshFitSection