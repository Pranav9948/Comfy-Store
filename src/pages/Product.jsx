import React from "react";
import { authFetch } from "../utils";
import { toast } from "react-toastify";
import { FeaturedCardz, Filters, Pagination, Products } from "../components";

const allProductsQuery = (queryParams) => {
  const url = `/products/`;

  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      authFetch(url, {
        params: queryParams,
      }),
  };
};

export const Loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    console.log('res',response);
    

    const products = response ?.data?.data;
    const meta = response?.data?.meta;

    return { products, meta, params };
  };

const Product = () => {
  return (
    <div className="bg-black text-white">
      <div className="section-container py-20">
        <Filters />
        <Products />
        <Pagination />
      </div>
    </div>
  );
};

export default Product;
