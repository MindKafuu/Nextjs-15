import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import couponReducer from "./features/couponSlice";
import campaignReducer from "./features/campaignCartSlice";
import userReducer from "./features/userSlice";
import discountReducer from "./features/discountSlice";

export const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    couponReducer,
    campaignReducer,
    userReducer,
    discountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
