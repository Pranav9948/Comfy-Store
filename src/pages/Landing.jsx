import React, { useState } from "react";

import BitMap from "../images/remove-bg-white.png";

import speakerYellow from "../images/speakerYellow.png";

import bringBanner from "../images/bringBanner.jpg";

import Zxspeaker from "../images/Zxspeaker.png";
import largespeaker from "../images/large-speaker.png";

import earpodsBlack from "../images/earpodsBlack.png";

import { FeaturedCardz, SectionTitle } from "../components";

import { toast } from "react-toastify";

import { useLoaderData, useRouteError } from "react-router-dom";
import { authFetch, formatPrice } from "../utils";
import PrimaryButtons from "../components/PrimaryButtons";
import SecondaryButton from "../components/SecondaryButton";


const url = `/products?featured=true`;



const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => authFetch(url),
};


export const Loader = (queryClient) =>  async () => {
  

  try {
    const response = await queryClient.ensureQueryData(featuredProductsQuery);
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

const Landing = () => {
  const data = useLoaderData();


  

  return (
    <div>
      {/* hero-container */}

      <div className="bg-black text-white ">
        <div className="section-container ">
          <div className="grid grid-cols-1 gap-10 px-5 smallMobile:px-0 py-14 smallDekstop:grid-cols-2  ">
            {/* image */}

            <div className="smallDekstop:order-2">
              <img
                src={BitMap}
                alt="bitmap"
                className="mx-auto  laptop:scale-110"
              />
            </div>

            {/* text */}

            <div className="grid place-content-center place-items-center smallDekstop:order-1 smallDekstop:text-left smallDekstop:place-items-start">
              <p className="font-sans text-sm capitalize font-normal opacity-50 text-white tracking-huge    mb-4 smallTablet:mb-6 smallDekstop:text-left ">
                NEW PRODUCT
              </p>
              <h1 className="text-4xl text-center max-w-sm mx-auto font-semibold tracking-wider text-white mb-6 smallTablet:text-5xl smallDekstop:text-left smallDekstop:mx-0 smallDekstop:tracking-widest">
                XX99 Mark II HeadphoneS
              </h1>
              <p className="text-sm font-normal opacity-70 text-white font-sans max-w-xs tracking-wider text-center mx-auto  mb-7 smallTablet:text-base  smallTablet:mb-10 smallDekstop:text-left smallDekstop:max-w-md smallDekstop:mx-0">
                Experience natural, life like audio and exceptional build
                quality made for the passionate music enthusiast.
              </p>
              <button className="text-white font-sans text-sm uppercase tracking-widest font-semibold px-7 py-4 bg-[#D87D4A] rounded-xl smallDekstop:text-left">
                see product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* homepage */}

      <div className="bg-white  my-32 section-container">
        <div className="my-5">
          <SectionTitle text={"Featured Products"} />
        </div>

        <div className=" mt-20 mb-10 grid grid-cols-1 gap-20 smallTablet:grid-cols-3 smallTablet:gap-6 smallDekstop:gap-10">
          {data &&
            data?.map((products, idx) => {
              return <FeaturedCardz {...products} key={idx} />;
            })}
        </div>

        <div className="bg-[#D87D4A] text-white py-14 grid  place-items-center grid-cols-1 smallTablet:grid-cols-2 gap-8 smallDekstop:h-[560px] smallDekstop:py-0 ">
          {/* speaker-img */}

          <div className="relative smallDekstop:grid smallDekstop:place-items-end smallDekstop:h-full">
            <img
              src={speakerYellow}
              alt="speaker-yellow"
              className="w-44 h-52 smallTablet:w-56 smallTablet:h-72 smallDekstop:h-96 smallDekstop:w-80 smallTablet:scale-110"
            />
          </div>

          <div className="flex flex-col justify-center  smallDekstop:justify-start w-full">
            <h3 className="text-white text-center font-sans mt-6 mb-6 text-4xl font-bold uppercase tracking-wider max-w-[250px] mx-auto smallTablet:text-6xl smallTablet:max-w-[350px] smallTablet:mt-12 smallTablet:text-left  smallDekstop:mx-0">
              ZX9 SPEAKER
            </h3>
            <p className="text-white  font-sans text-base font-normal max-w-[260px] text-center mx-auto mb-7 smallTablet:max-w-[350px] smallTablet:mb-10  smallTablet:text-left smallDekstop:mx-0">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>

            <div className="smallTablet:flex smallTablet:justify-start">
              <PrimaryButtons
                text={"see product"}
                link={"/products"}
                background={"bg-black"}
                color={"text-white"}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 smallDekstop:grid-cols-2 my-32 smallDekstop:gap-12 ">
          <div className="w-full smallTablet:h-[250px]  smallDekstop:h-[350px]">
            <img
              src={bringBanner}
              alt="bringbanner"
              className="w-full  smallTablet:h-[250px] smallDekstop:h-[350px] smallDekstop:order-2"
            />
          </div>

          <div className=" smallDekstop:order-1   smallDekstop:flex smallDekstop:flex-col smallDekstop:justify-center smallDekstop:h-[350px]  ">
            <h3 className="mt-10 mb-8 text-black text-center text-3xl font-bold font-sans tracking-wider uppercase smallTablet:mt-10  smallDekstop:text-left smallDekstop:mt-0 smallDekstop:max-w-lg smallDekstop:mx-0">
              Bringing you the <span className="text-[#d89d4a]">best</span>{" "}
              audio gear
            </h3>
            <p className="text-black opacity-50 max-w-xs mx-auto text-left smallTablet:text-base smallTablet:max-w-lg smallDekstop:text-left smallDekstop:mx-0">
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
        </div>

        <div className="grid-cols-2 relative h-96 smallTablet:h-[327px] my-12 bg-black">
          <div className="absolute top-1/3 left-[50px] smallTablet:left-2/4 smallDekstop:left-2/3 laptop:left-2/4">
            <h5 className="text-white font-sans text-2xl font-bold tracking-widest uppercase">
              YX1 SPEAKER
            </h5>

            <div className="mt-5">
              <SecondaryButton
                text={"see product"}
                link={"/products"}
                background={"bg-black"}
                color={"text-white"}
                border={"border-white"}
              />
            </div>
          </div>

          <div className="smallTablet:absolute smallTablet:left-0 laptop:left-[200px] h-full">
            <img src={earpodsBlack} alt="zxspeaker" className="" />
          </div>
        </div>

        {/* You may also like */}

        <div className="my-12">
          <h4 className="capitalize text-black text-center font-sans text-2xl font-bold leading-9 mb-10 smallTablet:text-3xl smallDekstop:text-4xl smallTablet:mb-14">
            you may also like
          </h4>

          <div className="grid grid-cols-1 smallTablet:grid-cols-3 gap-5 smallDekstop:gap-12">
            {data &&
              data?.map((products, idx) => {
                return (
                  <div key={idx} className="bg-[#F1F1F1] group grid place-content-center place-items-center h-full py-10 rounded-xl">
                    <div className="mb-11">
                      <img
                        src={products?.attributes?.image}
                        alt="pic"
                        className="w-32 h-32 rounded-md smallDekstop:w-52 smallDekstop:h-52 group-hover:scale-110 group-hover:ease-out group-hover:duration-100 group-hover:shadow-md "
                      />
                    </div>

                    <h4 className="text-black text-centerfont-sans text-center text-2xl font-bold mb-8 capitalize ">
                      {products?.attributes?.title}
                    </h4>

                    <PrimaryButtons
                      text={"see product"}
                      link={`/products/${products?.id}`}
                      color={"text-white"}
                      background={"bg-[#D87D4A]"}
                    />
                  </div>
                );
              })}
          </div>
        </div>

      
      </div>

      {/* next */}
    </div>
  );
};

export default Landing;
