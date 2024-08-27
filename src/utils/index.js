import axios from "axios";

export const authFetch = axios.create({
  baseURL: "https://strapi-store-server.onrender.com/api",
});

export const formatPrice = (price) => {
  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const formattedPrice = rupee.format(price);

  console.log("Rupees: ", formattedPrice);
  return formattedPrice;
};

export const createOptions = (amount) => {
  return Array.from({ length: amount }, (_, index) => index+1)
};
