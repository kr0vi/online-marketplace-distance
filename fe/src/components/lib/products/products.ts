import api from "@/components/lib/api";

const getProductsFromResponse = (data: any) => {
  // Filter endpoints return data as an array, while list endpoint returns { products }.
  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.data?.products)) {
    return data.data.products;
  }

  return [];
};

export const fetchProductsBySearchQuery = async (searchQuery: string) => {
  console.log("searching for", searchQuery);
  const { data } = await api.get(
    `/search?q=${encodeURIComponent(searchQuery)}`,
  );
  if (data.success && Array.isArray(data.data)) {
    if (data.data.length === 0) {
      return [];
    }
    return data.data;
  }
  return [];
};

export const fetchProducts = async (
  category: string,
  isNew: boolean,
  isFeatured: boolean,
) => {
  if (category) {
    return fetchProductsByCategory(category);
  }

  if (isNew) {
    return fetchProductsByIsNew(true);
  }

  if (isFeatured) {
    return fetchProductsByIsFeatured(true);
  }
  const { data } = await api.get("/products/");

  if (data.success) {
    const products = getProductsFromResponse(data);
    if (products.length === 0) {
      console.log("No products found in the response.");
    }
    console.log("products fetched", products);
    return products;
  }
  return [];
};

export const fetchProductsByCategory = async (category: string) => {
  console.log("fetching products for category", category);
  const { data } = await api.get(
    `/products/filter/category?category=${encodeURIComponent(category)}`,
  );

  if (data.success) {
    const products = getProductsFromResponse(data);
    if (products.length === 0) {
      console.log("No products found in this category.");
    }
    return products;
  }
  return [];
};

export const fetchProductsByIsFeatured = async (isFeatured: boolean) => {
  console.log("fetching featured products");
  const { data } = await api.get(
    `/products/filter/featured?isFeatured=${isFeatured}`,
  );

  if (data.success) {
    const products = getProductsFromResponse(data);
    if (products.length === 0) {
      console.log("No featured products found.");
    }
    return products;
  }
  return [];
};

export const fetchProductsByIsNew = async (isNew: boolean) => {
  console.log("fetching new products");
  const { data } = await api.get(`/products/filter/new?isNew=${isNew}`);

  if (data.success) {
    const products = getProductsFromResponse(data);
    if (products.length === 0) {
      console.log("No new products found.");
    }
    return products;
  }
  return [];
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  sizes: string;
  thumbnailImage1: string;
  thumbnailImage2?: string;
  showcaseImages: string[];
};
