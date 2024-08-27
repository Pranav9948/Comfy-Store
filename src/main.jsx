import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  RegisterPage,
  ErrorPage,
  AboutPage,
  CartPage,
  CheckoutPage,
  HomeLayoutPage,
  LandingPage,
  LoginPage,
  OrdersPage,
  ProductsPage,
  SingleProductPage,
  OrderConfirm,
} from "./pages";

import { ErrorElement } from "./components";
import { Loader as landingLoader } from "./pages/Landing.jsx";
import { Loader as singleProductLoader } from "./pages/SingleProduct.jsx";
import { Loader as productsLoader } from "./pages/Product.jsx";
import { Loader as cartLoader } from "./pages/Cart.jsx";
import { loader as ordersLoader } from "./pages/Orders.jsx";
import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { action as checkoutAction } from "./pages/Checkout.jsx";
import HomeLayout from "./pages/HomeLayout.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";

import { Loader as checkoutLoader } from "./pages/Checkout.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },

      {
        path: "products",
        element: <ProductsPage />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },

      {
        path: "about",
        element: <AboutPage />,
        errorElement: <ErrorElement />,
      },

      {
        path: "checkout",
        element: <CheckoutPage />,
        errorElement: <ErrorElement />,
        loader: checkoutLoader(store),
        action: checkoutAction(store,queryClient),
      },

      {
        path: "orders",
        element: <OrdersPage />,
        errorElement: <ErrorElement />,
        loader: ordersLoader(store,queryClient),
      },

      {
        path: "products/:id",
        element: <SingleProductPage />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
      },

      {
        path: "cart",
        element: <CartPage />,
        errorElement: <ErrorElement />,
        loader: cartLoader(store),
      },

      {
        path: "order-confirmed",
        element: <OrderConfirm />,
        errorElement: <ErrorElement />,
      },
    ],
  },

  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: loginAction(store),
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </Provider>
    </QueryClientProvider>
  </>
);
