import { createSlice } from "@reduxjs/toolkit";

export const userSlicer = createSlice({
  name: "user",
  initialState: {
    cart: {
      items: [],
    },
    access_token: {},
    isAuthenticated: false,
    isLoading: false,
  },

  reducers: {
    initializeCart: (state) => {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    initializeAuth: (state) => {
      if (localStorage.getItem("access_token")) {
        state.access_token = JSON.parse(localStorage.getItem("access_token"));
        state.isAuthenticated = true;
      } else {
        state.access_token = {};
        state.isAuthenticated = false;
      }
    },

    setToken: (state, action) => {
      state.access_token = action.payload;
      localStorage.setItem("access_token", JSON.stringify(state.access_token));
      state.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.access_token = {};
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
    },

    addToCart: (state, action) => {
      //Check if book already exists in the cart
      const exists = state.cart.items.filter(
        (item) => item.book.id === action.payload.book.id
      );

      //If it exists increase its quantity
      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(action.payload.quantity);
      } else {
        //If does not exist push the item to the cart
        state.cart.items.push(action.payload);
      }

      //store the cart in the local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = {
        items: [],
      };
      localStorage.removeItem("cart");
    },

    increment: (state, action) => {
      //Check if book already exists in the cart
      const exists = state.cart.items.filter(
        (item) => item.book.id === action.payload.book.id
      );

      //If it exists increase its quantity
      if (exists) {
        exists[0].quantity = parseInt(exists[0].quantity) + 1;
      }
      //store the cart in the local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    decrement: (state, action) => {
      //Check if book already exists in the cart
      const exists = state.cart.items.filter(
        (item) => item.book.id === action.payload.book.id
      );

      //If it exists decrease its quantity
      if (exists) {
        exists[0].quantity = parseInt(exists[0].quantity) - 1;
      }

      //store the cart in the local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeCartItem: (state, action) => {
      //Check if book already exists in the cart
      const exists = state.cart.items.filter(
        (item) => item.book.id === action.payload.book.id
      );

      //If it exists remove the item
      if (exists) {
        //get its index
        const index = state.cart.items.indexOf(exists[0]);
        if (index > -1) {
          state.cart.items.splice(index, 1);
        }
      }
      //store the cart in the local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  initializeCart,
  initializeAuth,
  addToCart,
  increment,
  decrement,
  removeCartItem,
  setToken,
  removeToken,
  clearCart,
} = userSlicer.actions;

export default userSlicer.reducer;
