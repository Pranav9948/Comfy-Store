import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const user = useSelector((state) => state?.user?.user);

  const links = [
    { id: 2, url: "about", text: "about" },
    { id: 3, url: "products", text: "products" },
    { id: 4, url: "cart", text: "cart" },
    { id: 5, url: "checkout", text: "checkout" },
    { id: 6, url: "orders", text: "orders" },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-10 ps-10 lg:ps-0 ">
      {links.map((link) => {
        const { id, url, text } = link;

        if ((url === "checkout" || url === "orders") && !user) return null;

        return (
          <>
            <NavLink
              to={url}
              key={id}
              className={
                "capitalize font-sans  font-semibold  smallDekstop:text-lg laptop:text-xl"
              }
            >
              {text}
            </NavLink>
          </>
        );
      })}
    </div>
  );
};

export default NavLinks;
