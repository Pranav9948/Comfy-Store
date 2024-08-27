import React, { useState } from "react";
import BitMap from "../images/remove-bg-white.png";
import { formatPrice } from "../utils";
import PrimaryButtons from "../components/PrimaryButtons";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { clearCart, editItem, removeItem } from "../features/cartSlice";
import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const Loader = (store) => async () => {
  const user = store.getState().user.user;

  if (!user) {
    toast.warn("please login to continue");
    return redirect("/");
  }

  return "something";
};

const Cart = () => {
  const [amount, setAmount] = useState(1);

  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const orderTotal = useSelector((state) => state.cart.orderTotal);
  const shipping = useSelector((state) => state.cart.shipping);
  const tax = useSelector((state) => state.cart.tax);

  const dispatch = useDispatch();

  const handleAmount = (value, btn, cartId) => {
    let newAmount = value;

    if (btn === "prev") {
      newAmount = value <= 1 ? 1 : value - 1;
    } else {
      newAmount = value + 1;
    }

    setAmount(newAmount);

    dispatch(editItem({ amount: newAmount, cartId }));
  };

  return (
    <div className="cart-container bg-white rounded-lg shadow-md mobile:px-2 py-8 smallTablet:max-w-full smallTablet:px-10">
      <div className="flex justify-between items-center mb-7 ">
        <h6 className="text-black font-sans text-lg font-bold tracking-wide uppercase">
          Cart ({numItemsInCart})
        </h6>

        <div>
          <button
            onClick={() => dispatch(clearCart())}
            className="font-sans text-black font-normal border-b-2 border-b-gray-500 opacity-50 leading-6 pb-1"
          >
            Remove all
          </button>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <>
          {cartItems?.map((items) => {
            return (
              <div className="flex items-center justify-between flex-wrap mb-10 smallTablet:mb-14">
                <div className="bg-[#f1f1f1] w-16 h-16 rounded-md flex justify-center items-center smallTablet:h-32 smallTablet:w-32">
                  <img
                    src={items?.image}
                    alt="Bitmap"
                    className="h-10 w-10 smallTablet:h-20 smallTablet:w-20"
                  />
                </div>

                {/* productname,price */}

                <div className="flex flex-col items-start">
                  <h6 className="text-black flex w-full items-center justify-center font-sans text-sm font-bold leading-6 mb-3 smallTablet:text-2xl">
                    {items?.title}
                  </h6>

                  <div className="flex justify-center  items-center gap-4 mb-4 w-full">
                    <p className="text-black font-sans opacity-50 text-sm font-medium leading-6  smallTablet:text-lg">
                      {formatPrice(items?.price)}
                    </p>

                    <div>
                      <button
                        className={`h-4 w-4 rounded-3xl`}
                        style={{ backgroundColor: `${items?.productColor}` }}
                      ></button>
                    </div>
                  </div>

                  {items?.productAmount >= 2 && (
                    <div className="mb-3 flex justify-center items-center w-full smallTablet:hidden ">
                      <p className="text-black font-sans opacity-50 text-sm font-semibold leading-6 mb-3  ">
                        {formatPrice(items?.price * items?.productAmount)}
                      </p>
                    </div>
                  )}

                  <div className="mb-3 hidden smallTablet:flex smallDekstop:hidden">
                    <p className="text-black font-sans opacity-50 text-base font-semibold leading-6 mb-3  ">
                      {formatPrice(items?.price)} * {items.productAmount} ={" "}
                      {formatPrice(items?.price * items?.productAmount)}
                    </p>
                  </div>

                  <div className="flex justify-center items-center  w-full">
                    <button
                      className="btn btn-secondary hidden smallTablet:flex"
                      onClick={() => dispatch(removeItem(items.cartId))}
                    >
                      Remove item
                    </button>
                  </div>
                </div>

                <div className="mb-3 hidden smallDekstop:flex">
                  <p className="text-black font-sans opacity-50 text-base font-semibold leading-6 mb-3  ">
                    {formatPrice(items?.price)} * {items.productAmount} ={" "}
                    {formatPrice(items?.price * items?.productAmount)}
                  </p>
                </div>

                {/* selectbox */}

                <div>
                  <div className="mb-3 flex items-center justify-center w-full smallTablet:hidden">
                    <button className="px-2 py-1 rounded-md bg-red-700 text-white">
                      <AiFillDelete
                        className="text-lg font-bold"
                        onClick={() => dispatch(removeItem(items.cartId))}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-around  w-24 h-10 bg-[#f1f1f1] rounded-md shadow-md smallTablet:h-14">
                    <div>
                      <button
                        className="text-black font-sans opacity-50 text-sm font-medium leading-6 smallTablet:text-xl "
                        onClick={() =>
                          handleAmount(
                            items.productAmount,
                            "prev",
                            items.cartId
                          )
                        }
                      >
                        -
                      </button>
                    </div>

                    <div className="text-black font-sans text-sm font-bold leading-6">
                      {items?.productAmount}
                    </div>

                    <div>
                      <button
                        className="text-black font-sans opacity-50 text-sm font-medium leading-6 smallTablet:text-xl "
                        onClick={() =>
                          handleAmount(
                            items.productAmount,
                            "next",
                            items.cartId
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* total */}

          <div className="my-12 smallTablet:my-2 smallTablet:grid smallTablet:place-items-end">
            <div className="max-w-full smallTablet:w-2/4 smallDekstop:w-2/5  bg-slate-100 px-2  smallTablet:px-10 py-10 rounded-lg shadow-lg   ">
              {/* 1 */}

              <div className="grid grid-cols-2 gap-6 mb-3  border-2 border-black ">
                <div className="h-full text-center text-base  font-semibold border-r-2 border-r-black  p-2">
                  Order Total
                </div>

                <div className=" h-full text-center text-base  font-semibold p-2">
                  {formatPrice(orderTotal)}
                </div>
              </div>

              {/* 2 */}

              <div className="grid grid-cols-2 gap-6 mb-3 border-2 border-black">
                <div className="h-full text-center text-base  font-semibold border-r-2 border-r-black  p-2">
                  Tax
                </div>

                <div className=" h-full text-center text-base  font-semibold p-2">
                  {formatPrice(tax)}
                </div>
              </div>

              {/* 3 */}

              <div className="grid grid-cols-2 gap-6 mb-10   border-2 border-black">
                <div className="h-full text-center text-base  font-semibold border-r-2 border-r-black  p-2">
                  Shipping
                </div>

                <div className=" h-full text-center text-base  font-semibold p-2">
                  {formatPrice(shipping)}
                </div>
              </div>

              {/* 4 */}

              <div className="grid grid-cols-2 gap-6 mb-3 border-2 border-black ">
                <div className="h-full text-center text-lg  font-bold border-r-2 border-r-black  p-2">
                  Cart Total
                </div>

                <div className=" h-full text-center text-lg  font-bold p-2">
                  {formatPrice(cartTotal)}
                </div>
              </div>

              {/* 5 */}

              <div className="mt-6 w-full">
                <PrimaryButtons text={'checkout'} link={'/checkout'} background={'bg-orange-500'} color={'text-white'} />
               
              </div>
            </div>
          </div>

          {/* checkoutbtn */}
        </>
      ) : (
        <div className="">
          <div className=" section-container  grid place-content-center min-h-[100vh]  ">
            <h1 className="text-3xl smallTablet:text-5xl font-extrabold text-blue-700 mb-8 text-center laptop:text-6xl laptop:mb-12">
              Your Cart is Empty
            </h1>

            <Link to={"/"}>
              {" "}
              <div className="flex justify-center items-center">
                <button className="capitalize btn btn-accent ">
                  Go back home
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
