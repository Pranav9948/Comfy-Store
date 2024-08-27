import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getUserFromLocalStorage(),
  },
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload);

      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;

      localStorage.setItem("user", JSON.stringify(user));
    },

    logoutUser: (state, action) => {
      localStorage.removeItem("user");
      state.user = null;

      toast.success("user logged out successfully");
    },

    registerUser: (state, action) => {
      console.log("register");
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, registerUser } = userSlice.actions;

export default userSlice.reducer;
