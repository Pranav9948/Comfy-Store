import React from 'react'
import { formatPrice } from '../utils';

const ProductList = ({ attributes, id }) => {

       const { title, image,price,company } = attributes;
  return (
    <>
      {/* product-list */}

      <div className="  group my-8 bg-white text-black max-w-full gap-6 rounded-lg flex items-center justify-start smallTablet:justify-between  py-3 px-4 smallTablet:py-6 smallTablet:px-8 cursor-pointer">
        <div className="flex items-center justify-start gap-6  ">
          <div className="bg-blue-300 p-1">
            <img
              src={image}
              alt="image"
              className="h-16 w-14 laptop:h-24 laptop:w-24 group-hover:scale-120 group-hover:duration-300 group-hover:ease-out"
            />
          </div>

          <div className="hidden smallTablet:flex flex-col">
            <h4 className="text-base font-bold mb-1 laptop:text-xl  capitalize">
              {title}
            </h4>
            <h6 className="text-sm font-normal mb-1 capitalize laptop:text-lg">
              {company}
            </h6>
          </div>
        </div>

        <div>
          {/* hidden in large m0bile */}
          <div className="smallTablet:hidden">
            <h4 className="text-base font-bold mb-1 capitalize">{title}</h4>
            <h6 className="text-sm font-normal mb-1 capitalize">{company}</h6>
          </div>

          {/* price */}

          <p className="text-orange-600 text-base font-bold laptop:text-xl">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductList