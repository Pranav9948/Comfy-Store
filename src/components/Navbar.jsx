import React, { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { FaCartPlus, FaMoon, FaUserSecret } from "react-icons/fa";
import musicLogo from "../images/Music_logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/userSlice";

const Navbar = () => {
  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();

  return (
    <div className=" bg-black text-white ">
      <div className="">
        <div className="navbar bg-base  px-5  section-container smallDekstop:px-0">
          <div className="navbar-start">
            <div className="dropdown smallDekstop:hidden  text-white rounded-xl">
              <div tabIndex={0} role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52  shadow bg-white text-black"
              >
                <NavLinks />
              </ul>
            </div>

            <Link to={"/"}>
              {" "}
              <div className="hidden smallDekstop:flex justify-start items-center gap-1 smallDekstop:just ">
                <img
                  src="https://png.pngtree.com/png-clipart/20211017/original/pngtree-phoenix-png-png-image_6854120.png"
                  alt="musiclogo"
                  className="w-20 h-20 "
                />

                <h3 className=" text-3xl xl:text-4xl font-extrabold font-sans bg-gradient-to-r from-pink-500  to-yellow-500 inline-block text-transparent bg-clip-text">
                  Comfy
                </h3>
              </div>
            </Link>
          </div>
          <div className="navbar-center   ">
            <div className="btn btn-ghost text-xl hidden smallDekstop:flex">
              <NavLinks />
            </div>

            <Link to={"/"}>
              <div className="smallDekstop:hidden flex items-center gap-1">
                <img
                  src="https://png.pngtree.com/png-clipart/20211017/original/pngtree-phoenix-png-png-image_6854120.png"
                  alt="musiclogo"
                  className="w-10 h-10"
                />

                <h3 className="text-2xl font-extrabold font-sans bg-gradient-to-r from-pink-500  to-yellow-500 inline-block text-transparent bg-clip-text">
                  Comfy
                </h3>
              </div>
            </Link>
          </div>
          <div className="navbar-end">
            <div>
              <button className="btn btn-ghost  btn-circle  smallDekstop:ml-4 relative w-10 h-10 rounded-full">
                <FaCartPlus className="h-6 w-6" />
                <span className="badge badge-sm text-sm font-serif font-semibold badge-primary indicator-item absolute -top-2 -right-3">
                  {numItemsInCart}
                </span>
              </button>
            </div>

            <div>
              <button className="ml-4   ">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <FaUserSecret className="text-base smallTablet:text-2xl smallDekstop:text-3xl" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 text-black rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li className="text-base font-semibold uppercase mt-3 text-center">
                      <a>{user ? user?.username : "please login"}</a>
                    </li>

                    {user ? (
                      <li
                        className="mt-4 cursor-pointer"
                        onClick={() => dispatch(logoutUser())}
                      >
                        <a className="btn btn-secondary">Logout</a>
                      </li>
                    ) : (
                      <Link to={"/login"}>
                        <li className="mt-4 cursor-pointer">
                          <a className="btn btn-secondary">Login</a>
                        </li>
                      </Link>
                    )}
                  </ul>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
