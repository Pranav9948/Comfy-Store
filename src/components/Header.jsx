import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cartSlice";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    queryClient.removeQueries();
    navigate("/login");
  };

  return (
    <div className="bg-violet-900 px-7">
      <div className="section-container  py-3 grid place-content-end ">
        {/* links-container */}

        <div className="flex justify-center items-center gap-8 text-white font-medium text-base">
          <>
            <div className="text-xs smallTablet:text-base  ">
              {user ? user?.username : "Sign in / Guest "}
            </div>
            <div className="text-xs smallTablet:text-base">
              {" "}
              {user ? (
                <button
                  onClick={() => logout()}
                  className="px-2  py-1  text-xs bg-cyan-500 text-black rounded-md capitalize"
                >
                  logout
                </button>
              ) : (
                <Link to={"/register"}>
                  <button className="px-2  py-1  text-xs bg-cyan-500 text-black rounded-md capitalize">
                    create Account
                  </button>
                </Link>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;
