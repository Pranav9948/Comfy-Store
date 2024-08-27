import React from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

const FeaturedCardz = ({ id, attributes }) => {
  const { category, colors, company, description, image, price, title } =
    attributes;

  return (
    <div className=" relative h-44 bg-[#f1f1f1] rounded-lg smallDekstop:h-60 mb-10 smallTablet:mb-20 group">
      <figure>
        {" "}
        <img
          src={image}
          alt="product-image"
          className="w-32 h-28 mx-auto absolute -top-10 inset-0 smallDekstop:h-40 smallDekstop:w-44 rounded-md overflow-hidden group-hover:scale-110 group-hover:duration-300 group-hover:ease-out"
        />
      </figure>

      <h1 className="mt-24 mb-2 text-center text-black font-sans font-bold text-base tracking-wider uppercase smallDekstop:text-lg smallDekstop:mt-36">
        {title}
      </h1>

      <Link to={`/products/${id}`}>
        <div className="flex items-center gap-1 justify-center">
          <p className="text-black opacity-50 font-semibold text-sm tracking-widest uppercase ">
            shop
          </p>
          <IoMdArrowDropright className="text-orange-600 text-2xl font-semibold" />
        </div>
      </Link>
    </div>
  );
};

export default FeaturedCardz;
