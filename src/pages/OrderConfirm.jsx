import React from 'react'
import BitMap from "../images/remove-bg-white.png";
import { formatPrice } from '../utils';
import PrimaryButtons from '../components/PrimaryButtons';

const OrderConfirm = () => {
  return (
    <div className="section-container">
      <div className=" my-20  bg-white  rounded-lg shadow-md  px-4 py-8 smallTablet:max-w-full smallTablet:px-10 smallDekstop:max-w-3xl smallDekstop:mx-auto">
        <div className="bg-[#D87D4A] text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black ">
          &#x2713;
        </div>

        <h4 className="my-4 text-black font-sans text-2xl font-bold leading-7 uppercase">
          THANK YOU <br /> FOR YOUR ORDER
        </h4>

        <p className="mt-4 mb-6 text-black opacity-50 font-sans text-base font-normal">
          You will receive an email confirmation shortly.
        </p>

        {/* product-card */}

        <div className="grid grid-cols-1 smallTablet:grid-cols-2">
          <div className="bg-[#f1f1f1] py-5 rounded-md px-3  smallTablet:rounded-r-none smallTablet:px-6 smallDekstop:px-10">
            <div className="  rounded-md flex items-center justify-between w-full ">
              <div>
                <img src={BitMap} alt="bitmap" className="h-12 w-12" />
              </div>

              <div className="flex flex-col  gap-1">
                <h5 className="text-black text-base font-bold leading-6 font-sans">
                  {" "}
                  XX99 MK II
                </h5>
                <h6 className="text-black opacity-50 text-sm font-bold leading-6">
                  {formatPrice(29999)}
                </h6>
              </div>

              <div className="text-black opacity-50 font-bold leading-6 text-base">
                x 2
              </div>
            </div>

            <div className="w-full h-[2px] bg-black opacity-15 my-3"></div>

            <p className="text-center text-black opacity-50 text-xs font-bold mb-6">
              and 2 other item(s)
            </p>
          </div>

          <div className="bg-black  px-3 py-10 rounded-md flex flex-col justify-center smallTablet:rounded-l-none smallTablet:px-5 smallDekstop:px-10">
            <h6 className="uppercase text-white font-sans opacity-50 tracking-widest text-base font-normal leading-6 mb-2">
              grand total
            </h6>

            <h2 className="text-white font-sans text-base font-bold uppercase">
              {formatPrice(299999)}
            </h2>
          </div>
        </div>

        <div className="my-10">
          <PrimaryButtons
            text={"back to home"}
            background={"bg-[#D87D4A]"}
            color={"text-white"}
            link={"/"}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderConfirm