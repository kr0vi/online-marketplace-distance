export const dynamic = "force-dynamic";

import ProductDetailsPanel from "@/components/ProductDetailsPanel";
import ProductMediaScroller from "@/components/ProductMediaScroller";
import api from "@/components/lib/api";

const getProductById = async (id: number) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
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

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (id < 0) {
    return <div>Invalid product id</div>;
  }

  const product: Product | null = await getProductById(id);
  if (!product) {
    return <div>Product not found</div>;
  }
  console.log("Fetched product data:", product["showcaseImages"]);

  return (
    <main className="h-screen bg-white text-black flex items-center justify-center lg:overflow-hidden">
      <div className="w-[80%] h-[99%] rounded-2xl  overflow-hidden ">
        <section className="grid h-full grid-cols-1   lg:grid-cols-[1fr_1fr]">
          {/* TODO: Remove temporary page-layout debug background color (bg-orange-100). */}
          <ProductMediaScroller images={product["showcaseImages"]} />
          <ProductDetailsPanel product={product} />
        </section>
      </div>
    </main>
  );
}

export default page;
