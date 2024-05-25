import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetail } from "./productSlice";

const initialState = <ProductDetail[]>[];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addProduct: (
      state: ProductDetail[],
      action: PayloadAction<ProductDetail>
    ) => {
      const productIndex = state.findIndex(
        (product: ProductDetail) => product.id === action.payload.id
      );

      if (productIndex === -1) {
        state.push(action.payload);
      }
    },
    addProductAll: (
      state: ProductDetail[],
      action: PayloadAction<ProductDetail[]>
    ) => {
      return action.payload;
    },
    removeProduct: (state: ProductDetail[], action: PayloadAction<number>) => {
      const productIndex = state.findIndex(
        (product: ProductDetail) => product.id === action.payload
      );

      if (productIndex !== -1) {
        state.splice(productIndex, 1);
      }
    },
    removeProductAll: (state: ProductDetail[]) => {
      return initialState;
    },
    addQuantity: (state: ProductDetail[], action: PayloadAction<number>) => {
      const product = state.find((p: ProductDetail) => p.id === action.payload);

      if (product) {
        product.quantity = product.quantity + 1;
      }
    },
    removeQuantity: (state: ProductDetail[], action: PayloadAction<number>) => {
      const productIndex = state.findIndex(
        (product: ProductDetail) => product.id === action.payload
      );

      if (productIndex !== -1) {
        const product = state[productIndex];
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.splice(productIndex, 1);
        }
      }
    },
    inputQuantity: (
      state: ProductDetail[],
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const product = state.find(
        (p: ProductDetail) => p.id === action.payload.id
      );

      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  addProductAll,
  addProduct,
  removeProduct,
  removeProductAll,
  addQuantity,
  removeQuantity,
  inputQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
