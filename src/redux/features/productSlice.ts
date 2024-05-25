import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductDetail {
  id: number;
  name: string;
  isSelected: boolean;
  quantity: number;
  price: number;
  image: string;
  category: string;
}

const initialState = <ProductDetail[]>[];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleAllCheckboxes: (state: ProductDetail[]) => {
      state.forEach((product: ProductDetail) => {
        product.isSelected = true;
      });
    },
    resetAllCheckboxes: (state: ProductDetail[]) => {
      state.forEach((product: ProductDetail) => {
        product.isSelected = false;
      });
    },
    toggleSelect: (state: ProductDetail[], action: PayloadAction<number>) => {
      const product = state.find((p: ProductDetail) => p.id === action.payload);
      if (product) {
        product.isSelected = !product.isSelected;
      }
    },
    setProductsFromJSON: (
      state: ProductDetail[],
      action: PayloadAction<ProductDetail[]>
    ) => {
      return action.payload;
    },
    inputProductQuantity: (
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
    addProductQuantity: (
      state: ProductDetail[],
      action: PayloadAction<number>
    ) => {
      const product = state.find((p: ProductDetail) => p.id === action.payload);

      if (product) {
        product.quantity = product.quantity + 1;
      }
    },
    removeProductQuantity: (
      state: ProductDetail[],
      action: PayloadAction<number>
    ) => {
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
  },
});

export const {
  toggleAllCheckboxes,
  resetAllCheckboxes,
  toggleSelect,
  setProductsFromJSON,
  inputProductQuantity,
  addProductQuantity,
  removeProductQuantity,
} = productSlice.actions;
export default productSlice.reducer;
