import React, { useState } from "react";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { FormInput, InputCheck } from "../components";
import BitMap from "../images/remove-bg-white.png";
import { authFetch, formatPrice } from "../utils";
import PrimaryButtons from "../components/PrimaryButtons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Loader =
  (store) =>
  async ({ request, params }) => {
    const user = store.getState().user.user;

    if (!user) {
      toast.warn("please login to continue");
      return redirect("/");
    }

    return "something";
  };

export const action =
  (store,queryClient) =>
  async ({ request }) => {
    const { orderTotal, cartTotal, numItemsInCart, cartItems } =
      store.getState().cart;

    const { token } = store.getState().user.user;

    console.log("orderTotal,cartTotal", orderTotal, cartTotal);

    const formData = await request.formData();

    const formdataValues = Object.fromEntries(formData);

    const { name, address } = formdataValues;

    console.log("toke", token);

    const info = {
      address: address,

      cartItems: cartItems,
      chargeTotal: cartTotal,
      name: name,
      numItemsInCart: numItemsInCart,
      orderTotal: formatPrice(orderTotal),
    };

    console.log("name,address", info);

    try {
      const response = await authFetch.post(
        "/orders",
        { data: info },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("order created successfully");
        queryClient.removeQueries(["orders"]);
        return redirect("/orders");
      }
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.error.message);

      if (err.response.status === 403 || 401) {
        return redirect("/login");
      }

      toast.error(err?.response?.data?.error.message);
    }

    return "something...";
  };

const Checkout = () => {
  const [checked, setChecked] = useState("money");

  const cartTotals = useSelector((state) => state?.cart?.cartTotal);
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const orderTotal = useSelector((state) => state.cart.orderTotal);
  const shipping = useSelector((state) => state.cart.shipping);
  const tax = useSelector((state) => state.cart.tax);

  const checkoutCartDetails = [
    {
      "Order Total": orderTotal,
    },

    {
      Tax: tax,
    },

    {
      Shipping: shipping,
    },

    {
      "Cart Total": cartTotal,
    },
  ];

  const makeChecked = (checkValue) => {
    setChecked(checkValue);
  };

  return (
    <div className="bg-white py-20">
      {cartTotals === 0 ? (
        <div className="">
          <div className=" section-container  grid place-content-center min-h-[100vh]  ">
            <h1 className="text-3xl smallTablet:text-5xl font-extrabold text-blue-700 mb-8 text-center laptop:text-6xl laptop:mb-12">
              Your Order is Empty
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
      ) : (
        <div className="bg-white">
          <div className="cart-container">
            <Link to={`/`}>
              <button className="capitalize font-sans text-base font-normal opacity-50 text-yellow-800 p-2 rounded-lg leading-6 mb-10 border-2 border-yellow-700 ">
                Go back
              </button>{" "}
            </Link>

            <div className="grid grid-cols-1 laptop:grid-cols-10  laptop:gap-5 largeDekstop:gap-16 laptop:items-start">
              {/* checkout */}

              <div className="my-12 bg-white max-w-full  px-6 py-6 shadow-md rounded-lg smallTablet:mb-10 smallTablet:text-4xl leading-9 laptop:col-span-6 smallTablet:px-10">
                <h4 className="uppercase text-black font-sans text-3xl font-bold tracking-normal mb-8">
                  checkout
                </h4>

                <h6 className="text-[#d87d4a] text-sm font-bold  leading-6 mb-4  uppercase">
                  billing details
                </h6>

                <Form
                  method="post"
                  onSubmit={(e) => {
                    console.log("Form submitted");
                  }}
                >
                  <div className="grid grid-cols-1 smallTablet:grid-cols-2 smallTablet:place-items-start">
                    <div className="my-2  smallDekstop:w-3/4">
                      <FormInput
                        label={"Name"}
                        name={"name"}
                        type={"text"}
                        defaultValue={"james Anderson"}
                        lighter={true}
                      />
                    </div>

                    <div className="my-2  smallDekstop:w-3/4">
                      <FormInput
                        label={"Email"}
                        name={"email"}
                        type={"text"}
                        defaultValue={"james@gmail.com"}
                        lighter={true}
                      />
                    </div>

                    <div className="my-2  smallDekstop:w-3/4">
                      <FormInput
                        label={"Phone Number"}
                        name={"phone"}
                        type={"number"}
                        defaultValue={"9387293712"}
                        lighter={true}
                      />
                    </div>
                  </div>

                  <h6 className="text-[#d87d4a] text-sm font-bold  leading-6 my-4  uppercase">
                    shipping info
                  </h6>

                  <div className="grid grid-cols-1 smallTablet:grid-cols-2 smallTablet:place-items-start">
                    <div className="my-2  smallDekstop:w-3/4">
                      <FormInput
                        label={"Your Address"}
                        name={"address"}
                        type={"text"}
                        defaultValue={"1137 Williams Avenue"}
                        lighter={true}
                      />
                    </div>

                    <div className="my-2  smallDekstop:w-3/4">
                      <FormInput
                        label={"ZIP Code"}
                        name={"zip"}
                        type={"number"}
                        defaultValue={"695017"}
                        lighter={true}
                      />
                    </div>

                    <div className="my-2  smallDekstop:w-3/4">
                      <FormInput
                        label={"City"}
                        name={"city"}
                        type={"text"}
                        defaultValue={"Kerala"}
                        lighter={true}
                      />
                    </div>

                    <div className="my-2  smallDekstop:w-3/4">
                      <FormInput
                        label={"Country"}
                        name={"country"}
                        type={"text"}
                        defaultValue={"India"}
                        lighter={true}
                      />
                    </div>
                  </div>

                  <h6 className="text-[#d87d4a] text-sm font-bold  leading-6 my-4  uppercase">
                    payment details
                  </h6>

                  <div className="flex flex-col justify-between  smallTablet:flex-row ">
                    <p className="text-base font-medium tracking-wide text-black mb-5 w-full">
                      Payment Method
                    </p>

                    <div className="grid grid-cols-1 smallTablet:place-content-start smallTablet:place-items-start w-full ">
                      <div className="mb-4">
                        {" "}
                        <InputCheck
                          label={"e-Money"}
                          name={"money"}
                          isChecked={checked === "money"}
                          onCheck={() => makeChecked("money")}
                          lighter={true}
                        />
                      </div>

                      <div className="mb-4">
                        <InputCheck
                          label={"Cash on Delivery"}
                          name={"cod"}
                          isChecked={checked === "cod"}
                          onCheck={() => makeChecked("cod")}
                          lighter={true}
                        />
                      </div>
                    </div>
                  </div>

                  {checked === "cod" && (
                    <div className="flex flex-col items-start justify-start smallTablet:items-center gap-4 smallTablet:flex-row smallTablet:gap-8 my-6">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M42.2812 8.4375H46.5938C47.3704 8.4375 48 9.06713 48 9.84375C48 10.6204 47.3704 11.25 46.5938 11.25H45.0938V23.9062C45.0938 24.6829 44.4641 25.3125 43.6875 25.3125H33.8438V40.9688C33.8438 41.7454 33.2141 42.375 32.4375 42.375H25.0773C24.4239 45.5805 21.5831 48 18.1875 48H1.40625C0.629625 48 0 47.3704 0 46.5938C0 45.8171 0.629625 45.1875 1.40625 45.1875H18.1875C20.021 45.1875 21.585 44.012 22.1653 42.375H8.4375C7.66087 42.375 7.03125 41.7454 7.03125 40.9688C7.03125 40.1921 7.66087 39.5625 8.4375 39.5625H12.5625C13.3379 39.5625 13.9688 38.9317 13.9688 38.1562C13.9688 37.3808 13.3379 36.75 12.5625 36.75H9.43444C6.87619 36.75 4.37297 37.6373 2.38575 39.2485C1.78247 39.7376 0.896906 39.6454 0.407719 39.0419C-0.0814688 38.4385 0.0110625 37.553 0.614344 37.0639C2.84203 35.2578 5.58806 34.1792 8.4375 33.9741V18.375C8.4375 17.5984 9.06713 16.9688 9.84375 16.9688H18.375V7.03125C18.375 6.25462 19.0046 5.625 19.7812 5.625H28.1223C31.9334 2.02078 36.9875 0 42.2641 0H46.5938C47.3704 0 48 0.629625 48 1.40625C48 2.18287 47.3704 2.8125 46.5938 2.8125H42.2642C38.805 2.8125 35.4975 3.79453 32.658 5.625H38.0625C38.8326 5.625 39.4688 6.25228 39.4688 7.03125C39.4688 7.52423 39.3372 7.69561 38.4891 8.80021C38.0648 9.3528 37.4613 10.1389 36.6052 11.3157C36.2039 11.8513 36.3433 12.6075 36.8974 12.9688C37.4088 13.3025 38.0923 13.1781 38.4534 12.6856L41.1473 9.01219C41.4121 8.65088 41.8333 8.4375 42.2812 8.4375ZM32.4375 16.9688C32.9273 16.9688 33.3582 17.2195 33.6099 17.5993C35.4415 15.9118 34.2652 12.7969 31.7344 12.7969C29.5943 12.7969 28.2687 15.1348 29.3533 16.9688H32.4375ZM21.1875 8.4375H35.2472C35.0152 8.75898 34.8251 9.00687 34.6644 9.21646C34.3106 9.67792 34.0992 9.95371 33.896 10.4204C29.6796 8.64131 25.1696 12.4771 26.337 16.9688H21.1875V8.4375ZM22.5938 25.4062V19.7812H19.7812V25.4062H22.5938ZM31.0312 39.5625H16.5403C17.5098 36.8283 15.4711 33.9375 12.5625 33.9375H11.25V19.7812H16.9688V26.8125C16.9688 27.5891 17.5984 28.2188 18.375 28.2188H24C24.7766 28.2188 25.4062 27.5891 25.4062 26.8125V19.7812H31.0312V39.5625ZM33.8438 20.7288V22.5H42.2812V12.2217L40.7213 14.3488C39.9301 15.4278 38.6519 16.0371 37.2972 15.9602C37.1467 18.1043 35.7894 19.9393 33.8438 20.7288Z"
                            fill="#D87D4A"
                          />
                        </svg>
                      </div>

                      <p className="text-black text-base my-3 font-normal leading-6 opacity-45 smallTablet:max-w-md smallTablet:my-0">
                        The ‘Cash on Delivery’ option enables you to pay in cash
                        when our delivery courier arrives at your residence.
                        Just make sure your address is correct so that your
                        order will not be cancelled.
                      </p>
                    </div>
                  )}

                  <div className="mt-10 w-1/2 mx-auto">
                    <button type="submit" className="btn btn-warning w-full">
                      Submit
                    </button>
                  </div>
                </Form>
              </div>

              {/* summary */}

              <div className="my-12 bg-white max-w-full   px-6 py-6 shadow-md rounded-lg smallTablet:mb-10 smallTablet:text-4xl leading-9  smallTablet:px-10 laptop:col-span-4 ">
                <h4 className="uppercase text-black font-sans text-3xl font-bold tracking-normal mb-10">
                  summary
                </h4>

                {/* 1 */}

                {cartItems.map((items) => {
                  return (
                    <div className="flex justify-between mb-14 ">
                      <div className="w-16 h-16 rounded-md bg-[#f1f1f1] flex justify-center items-center">
                        <img
                          src={items?.image}
                          alt="bitmap"
                          className="h-10 w-10"
                        />
                      </div>

                      <div className="flex flex-col  gap-1">
                        <h5 className="text-black text-base font-bold leading-6 font-sans">
                          {" "}
                          {items?.title}
                        </h5>
                        <h6 className="text-black opacity-50 text-sm font-bold leading-6">
                          {formatPrice(items.price)}
                        </h6>
                      </div>

                      <div className="text-black opacity-50 font-bold leading-6 text-base">
                        x {items?.productAmount}
                      </div>
                    </div>
                  );
                })}

                {/* calculations */}

                <div>
                  {checkoutCartDetails.map((details) => {
                    const [key, value] = Object.entries(details)[0];

                    return (
                      <div className="flex items-center justify-between mb-5">
                        <p className="text-black opacity-50 text-base font-normal uppercase">
                          {key}
                        </p>

                        <p className="text-lg font-bold uppercase font-sans text-black">
                          {formatPrice(value)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* pay button */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
