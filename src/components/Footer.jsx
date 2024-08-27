import React from 'react'
import { TiSocialFacebook, TiSocialGithubCircular, TiSocialPinterest } from "react-icons/ti";
import { TbSocial } from "react-icons/tb";

const Footer = () => {


    const navLinks = [
      {
        id: 1,
        option: "home",
        link: "/",
      },

      {
        id: 2,
        option: "headphones",
        link: "#",
      },

      {
        id: 3,
        option: "speakers",
        link: "#",
      },

      {
        id: 4,
        option: "earphones",
        link: "#",
      },
    ];



  return (
    <footer className="bg-black py-20">
      <div className="section-container relative grid grid-cols-1 smallDekstop:grid-cols-2">
        {/* logo */}

        <div className="flex justify-center items-center mb-12 smallTablet:justify-start ">
          <img
            src="https://png.pngtree.com/png-clipart/20211017/original/pngtree-phoenix-png-png-image_6854120.png"
            alt="musiclogo"
            className="w-20 h-20 "
          />

          <h3 className=" text-3xl xl:text-4xl font-extrabold font-sans bg-gradient-to-r from-pink-500  to-yellow-500 inline-block text-transparent bg-clip-text">
            Comfy
          </h3>
        </div>

        {/* navbar */}

        <div className="flex flex-col justify-center items-center gap-4 text-white mb-12 smallTablet:flex-row smallTablet:justify-start smallTablet:gap-10 smallDekstop:justify-end">
          {navLinks.map((link, idx) => {
            return (
              <div
                key={link.id}
                className="text-white text-sm font-bold uppercase tracking-wider"
              >
                {link.option}
              </div>
            );
          })}
        </div>

        {/* paragraph */}

        <p className="max-w-xs text-white text-center mx-auto font-normal font-sans text-sm leading-6 opacity-50 mb-12 smallTablet:text-start smallTablet:mx-0 smallTablet:max-w-full">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>

        {/* copyright */}

        <div className="grid grid-cols-1 smallTablet:grid-cols-2 smallTablet:items-center smallTablet:justify-between  smallDekstop:items-start">
          <p className="max-w-xs text-white text-center mx-auto font-bold font-sans text-sm leading-6 opacity-80 smallTablet:text-start smallTablet:mx-0 smallDekstop:absolute smallDekstop:left-0 smallDekstop:bottom-0">
            &copy; Copyright 2021. All Rights Reserved
          </p>

          {/* social-icons */}

          <div className="flex justify-center items-center gap-3 my-12 smallTablet:my-0 smallTablet:justify-end smallDekstop:absolute smallDekstop:right-0">
            <div>
              <TiSocialGithubCircular className="text-white text-5xl font-bold" />
            </div>
            <div>
              <TiSocialPinterest className="text-white text-5xl font-bold" />
            </div>

            <div>
              <TiSocialFacebook className="text-white text-5xl font-bold" />
            </div>

            <div>
              <TbSocial className="text-white text-5xl font-bold" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer