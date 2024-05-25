import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponDetail } from "./couponSlice";

const initialState = <CouponDetail[]>[];

const campaignCartSlice = createSlice({
  name: "campaignCart",
  initialState,
  reducers: {
    toggleCampiagnSelect: (
      state: CouponDetail[],
      action: PayloadAction<number>
    ) => {
      // const campaign = state.find(
      //   (p: CampaignDetail) => p.id === action.payload
      // );
      // if (campaign) {
      //   campaign.isSelected = !campaign.isSelected;
      // }
    },
    resetCampiagnSelect: (
      state: CouponDetail[],
      action: PayloadAction<number>
    ) => {
      // const campaign = state.find(
      //   (p: CampaignDetail) => p.id === action.payload
      // );
      // if (campaign) {
      //   campaign.isSelected = !campaign.isSelected;
      // }
    },
    resetAllCampiagnSelect: (state: CouponDetail[]) => {
      // state.forEach((product: CampaignDetail) => {
      //   product.isSelected = false;
      // });
    },
  },
});

export const {
  toggleCampiagnSelect,
  resetCampiagnSelect,
  resetAllCampiagnSelect,
} = campaignCartSlice.actions;

export default campaignCartSlice.reducer;
