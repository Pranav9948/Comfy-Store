import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { useLoaderData } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";
import FeaturedCardz from "./FeaturedCardz";
import ProductList from "./ProductList";


const Products = () => {
  const datas= useLoaderData();

const { products ,meta ,params }=datas

console.log(`metadata`,datas);

  

  const [view, setView] = useState("grid");

  return (
    <div className="my-10">
   

      <div className=" h-16 rounded-md flex items-center justify-around smallDekstop:justify-between bg-transparent border p-2 smallDekstop:px-5 mb-16">
        <div className="flex items-center gap-3">
          <MdProductionQuantityLimits className="text-2xl hidden mobile:flex font-semibold text-purple-400" />
          <h4 className="text-xl font-sans font-bold tracking-wide">
            {meta?.pagination?.total}{" "}
            {meta?.pagination?.total > 1 ? "Products" : "Product"}{" "}
          </h4>
        </div>

        <div className="flex items-center gap-5">
          <div className="h-8 w-8  rounded-xl bg-blue-700 flex items-center justify-center cursor-pointer">
            <IoGridSharp onClick={() => setView("grid")} />
          </div>

          <div className="h-8 w-8  rounded-xl bg-green-700 flex items-center justify-center cursor-pointer">
            <FaList onClick={() => setView("list")} />
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <div className=" section-container   py-32 grid grid-cols-1 gap-20 smallTablet:grid-cols-3 smallTablet:gap-6 smallDekstop:gap-10">
          {products?.map((product) => {
            const { attributes, id } = product;

            return <FeaturedCardz attributes={attributes} id={id} key={id} />;
          })}
        </div>
      ) : (
        products?.map((product, idx) => {
          const { attributes, id } = product;

          return <ProductList attributes={attributes} id={id} key={idx} />;
        })
      )}
    </div>
  );
};

export default Products;
