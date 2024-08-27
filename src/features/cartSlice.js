import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  numItemsInCart: 0,
  orderTotal: 0,
  tax: 0,
  shipping: 500,
  cartTotal: 0,
};

const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || initialState;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getDataFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const addedProduct = action.payload;

      const productExist = state.cartItems.find(
        (i) => i.cartId === addedProduct.cartId
      );

      if (productExist) {
        productExist.productAmount += addedProduct.productAmount;
      } else {
        state.cartItems.push(addedProduct);
      }

      state.orderTotal += addedProduct.price * addedProduct.productAmount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success("product added to cart successfully");

      return state;
    },
    removeItem: (state, action) => {
      const removeId = action.payload;

      const productToRemoved = state.cartItems.find(
        (items) => items.cartId === removeId
      );

      state.cartItems = state.cartItems.filter(
        (items) => items.cartId !== removeId
      );

      state.orderTotal -=
        productToRemoved.price * productToRemoved.productAmount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.error("item removed from cart");
    },
    editItem: (state, action) => {
      const { amount, cartId } = action.payload;

      console.log("act", action.payload);

      const editedProduct = state.cartItems.find(
        (product) => product.cartId === cartId
      );

      console.log("bef", state.orderTotal);

      console.log((amount - editedProduct.productAmount) * editedProduct.price);

      state.orderTotal +=
        (amount - editedProduct.productAmount) * editedProduct.price;

      console.log("aft", state.orderTotal);

      cartSlice.caseReducers.calculateTotals(state);

      editedProduct.productAmount = amount;
    },
    clearCart: (state) => {
      state.cart = initialState;

      return state;
    },

    calculateTotals: (state) => {
      state.numItemsInCart = state.cartItems.length;
      state.tax = 0.1 * state.orderTotal;
      state.cartTotal = state.orderTotal + state.tax + state.shipping;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
