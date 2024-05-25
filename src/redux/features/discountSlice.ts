import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Discount {
  coupon: number;
  ontop: number;
  point: number;
  seasonal: number;
}

const initialState = <Discount>{
  coupon: 0,
  ontop: 0,
  point: 0,
  seasonal: 0,
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setCoupon: (state: Discount, action: PayloadAction<number>) => {
      state.coupon = action.payload;
    },
    setOntop: (state: Discount, action: PayloadAction<number>) => {
      state.ontop = action.payload;
    },
    setPoint: (state: Discount, action: PayloadAction<number>) => {
      state.point = action.payload;
    },
    setSeasonal: (state: Discount, action: PayloadAction<number>) => {
      state.seasonal = action.payload;
    },
    setAll: (state: Discount, action: PayloadAction<number>) => {
      state.coupon = action.payload;
      state.ontop = action.payload;
      state.point = action.payload;
      state.seasonal = action.payload;
    },
  },
});

export const { setCoupon, setOntop, setPoint, setSeasonal, setAll } =
  discountSlice.actions;
export default discountSlice.reducer;
