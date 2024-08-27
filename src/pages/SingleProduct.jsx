import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { authFetch, formatPrice, createOptions } from "../utils";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import gridone from "../images/gridone.png";
import gridtwo from "../images/gridtwo.png";
import gridthree from "../images/gridthree.png";
import { addItem } from "../features/cartSlice";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => authFetch.get(`/products/${id}`),
  };
};

export const Loader =
  (queryClient) =>
  async ({ request, params }) => {
    const { id } = params;

    const url = `/products/${id}`;

    try {
      const response = await await queryClient.ensureQueryData(
        singleProductQuery(params.id)
      );

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      } else {
        console.error(`Error: Received status code ${response.status}`);
        toast.warn(`Error: Received status code ${response.status}`);
        return null;
      }
    } catch (err) {
      console.error("Error fetching data:", err.message ? err.message : err);
      toast.error(err?.message);
      return null;
    }
  };

const SingleProduct = () => {
  const data = useLoaderData();

  const dispatch = useDispatch();

  const { title, company, description, price, image, colors } =
    data?.attributes;

  const [productColor, setProductColor] = useState(colors[0]);

  const [amount, setAmount] = useState(1);

  const optionss = createOptions(10);

  const productId = data?.id;

  const productAmount = parseInt(amount);

  const productDetails = {
    cartId: productId + productColor,
    productId,
    title,
    company,
    productColor,
    price,
    image,
    productAmount,
  };

  return (
    <div className="bg-white py-20">
      <div className="section-container">
        <Link to={`/`}>
          <button className="capitalize font-sans text-base font-normal opacity-50 text-yellow-800 p-2 rounded-lg leading-6 mb-10 border-2 border-yellow-700 ">
            Go back
          </button>{" "}
        </Link>

        {/* image-container */}

        <div className="grid grid-cols-1 smallTablet:grid-cols-2 smallTablet:gap-10  smallDekstop:gap-20">
          {/* 1 */}

          <div className="h-80 w-full rounded-md bg-[#f1f1f1] my-8  smallTablet:my-0 smallTablet:w-full smallTablet:h-full p-4 laptop:p-12 ">
            <div className="h-full w-full">
              <img
                src={image}
                alt="headphones"
                className="h-full  w-full object-cover rounded-md"
              />
            </div>
          </div>

          {/* 2 */}

          <div className="">
            <h5 className="uppercase text-[#d87d4a] text-sm font-normal tracking-huge mb-6">
              new product
            </h5>
            {/* title */}
            <h1 className="font-sans text-3xl font-bold tracking-wider text-black uppercase max-w-sm mb-6">
              {title}
            </h1>
            {/* company */}
            <h4 className="capitalize text-black text-sm font-bold tracking-wide mb-6">
              {company}
            </h4>
            {/* description */}
            <p className="max-w-sm font-sans text-base font-normal text-black opacity-50 leading-6 mb-6 smallTablet:max-w-full laptop:text-lg">
              {description}
            </p>
            {/* price */}
            <h4 className="text-black font-sans text-lg font-bold uppercase tracking-widest mb-5">
              {formatPrice(price)}
            </h4>
            {/* colors */}
            <div className="flex items-center gap-2 mb-8">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className={`outline-2 border-2 p-2 flex items-center justify-center rounded-md outline-green-600 outline-offset-3 ${
                    productColor === color && "border-yellow-600 border-2"
                  }
                  } `}
                >
                  <button
                    className={`h-6 w-6 rounded-3xl`}
                    onClick={() => setProductColor(color)}
                    style={{ backgroundColor: `${color}` }}
                  ></button>
                </div>
              ))}
            </div>
            {/* amount */}
            <div className="grid grid-cols-1 smallDekstop:grid-cols-2 smallDekstop:gap-5">
              <div className="mb-6">
                <select
                  className="select select-warning bg-white border-yellow-400 text-yellow-900 max-w-full w-full"
                  name="quantity"
                  id="quantity"
                  defaultValue={"select quantity"}
                  onChange={(e) => setAmount(e.target.value)}
                >
                  {optionss.map((option, idx) => (
                    <option value={option} key={idx}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* cart-btn */}

              <div>
                <Link to={"/cart"}>
                  <button
                    onClick={() => dispatch(addItem(productDetails))}
                    className="uppercase text-center text-white font-sans text-sm font-bold -tracking-wide py-4 px-8 bg-[#d87d4a] rounded-xl w-full"
                  >
                    ADD TO CART
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* features-section */}

        <div className="grid grid-cols-1 smallDekstop:grid-cols-2 my-12  smallDekstop:my-20">
          <div>
            <h4 className="capitalize text-black font-sans text-2xl font-bold tracking-wide leading-9 mb-6 text-start smallTablet:text-3xl ">
              features
            </h4>

            <p className="opacity-70 text-sm max-w-sm mx-auto font-sans font-normal leading-6 mb-10 smallTablet:mx-0 smallTablet:max-w-xl">
              As the headphones all others are measured against, the XX99 Mark I
              demonstrates over five decades of audio expertise, redefining the
              critical listening experience. This pair of closed-back headphones
              are made of industrial, aerospace-grade materials to emphasize
              durability at a relatively light weight of 11 oz.
            </p>

            <p className="opacity-70 text-sm max-w-sm mx-auto font-sans font-normal leading-6 mb-10 smallTablet:mx-0 smallTablet:max-w-xl">
              From the handcrafted microfiber ear cushions to the robust metal
              headband with inner damping element, the components work together
              to deliver comfort and uncompromising sound. Its closed-back
              design delivers up to 27 dB of passive noise cancellation,
              reducing resonance by reflecting sound to a dedicated absorber.
              For connectivity, a specially tuned cable is included with a
              balanced gold connector.
            </p>
          </div>

          <div className="grid grid-cols-1 smallTablet:grid-cols-2 smallTablet:mt-10 smallDekstop:grid-cols-1 smallDekstop:justify-end smallDekstop:place-items-center smallDekstop:mt-0 smallDekstop:place-content-start">
            <h4 className="capitalize text-black font-sans text-2xl font-bold tracking-wide leading-9 mb-6 text-start smallTablet:text-3xl ">
              in the box
            </h4>

            <div className="flex flex-col gap-4">
              {/* 1 */}

              <div className="flex justify-start items-center gap-5">
                <p className="text-[#d87d4a] text-sm font-sans font-bold leading-6 ">
                  2x
                </p>

                <p className="opacity-50 text-sm font-normal leading-6 text-black">
                  Speaker Unit
                </p>
              </div>

              {/* 2 */}
              <div className="flex justify-start items-center gap-5">
                <p className="text-[#d87d4a] text-sm font-sans font-bold leading-6 ">
                  2x
                </p>

                <p className="opacity-50 text-sm font-normal leading-6 text-black">
                  Speaker Cloth Panel
                </p>
              </div>

              {/* 3 */}
              <div className="flex justify-start items-center gap-5">
                <p className="text-[#d87d4a] text-sm font-sans font-bold leading-6 ">
                  1x
                </p>

                <p className="opacity-50 text-sm font-normal leading-6 text-black">
                  User Manual
                </p>
              </div>

              {/* 4 */}
              <div className="flex justify-start items-center gap-5">
                <p className="text-[#d87d4a] text-sm font-sans font-bold leading-6 ">
                  1x
                </p>

                <p className="opacity-50 text-sm font-normal leading-6 text-black">
                  3.5mm 7.5m Audio Cable
                </p>
              </div>

              {/* 5 */}
              <div className="flex justify-start items-center gap-5">
                <p className="text-[#d87d4a] text-sm font-sans font-bold leading-6 ">
                  1x
                </p>

                <p className="opacity-50 text-sm font-normal leading-6 text-black">
                  7.5m Optical Cable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* grid-section */}

        <div className="grid grid-cols-1 smallTablet:grid-cols-3 gap-7 smallTablet:gap-3 smallTablet:grid-row-3">
          <div className="smallTablet:col-start-1 smallTablet:col-end-2 smallTablet:row-start-1 smallTablet:row-end-2 group cursor-pointer">
            <img
              src={gridone}
              alt="one-grid"
              className="w-full rounded-md smallDekstop:h-full group-hover:scale-105 group-hover:duration-200 group-hover:ease-in cursor-pointer"
            />
          </div>
          <div className="smallTablet:col-start-2 smallTablet:col-end-4 smallTablet:row-start-1 smallTablet:row-end-3 group ">
            <img
              src={gridone}
              alt="two-grid"
              className="w-full rounded-md smallDekstop:h-full  group-hover:duration-200 group-hover:ease-in cursor-pointer"
            />
          </div>
          <div className="group">
            <img
              src={gridone}
              alt="three-grid"
              className="w-full rounded-md smallDekstop:h-full group-hover:scale-105 group-hover:duration-200 group-hover:ease-in cursor-pointer "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
