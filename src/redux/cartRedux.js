import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    removeProducts: (state, action) => {
      console.log(action.payload._id);
      // console.log(state.products);
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      console.log(productIndex);

      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        state.quantity -= 1;
        state.total -= removedProduct.price * removedProduct.quantity;
        state.products.splice(productIndex, 1);
      }
    },

    emptyProducts: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    
    increaseQuantity: (state, action) => {
      const product = state.products.find((item) => item._id === action.payload._id); 
    
      if (product) {
        product.quantity += 1;
        state.total += product.price;
      } else {
        console.log("Product not found!");
      }
    },
    

    decreaseQuantity: (state, action) => {
      const product = state.products.find((item) => item._id === action.payload._id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.total -= product.price;
      }
    },
  },
});

export const { addProducts, removeProducts, emptyProducts, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
