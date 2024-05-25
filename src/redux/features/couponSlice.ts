import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetail } from "./productSlice";

export interface CouponDetail {
  id: number;
  Campaigns: string;
  Category: string;
  Param1: string;
  Param2: string;
  Param3: string;
  isSelected: boolean;
  isActived: boolean;
  status: boolean;
}

export interface Campaigns {
  Category: string;
  CouponList: CouponDetail[];
}

const initialState = <Campaigns[]>[];

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    setCouponFromJSON: (
      state: Campaigns[],
      action: PayloadAction<Campaigns[]>
    ) => {
      return action.payload;
    },
    toggleCouponSelect: (
      state: Campaigns[],
      action: PayloadAction<{ category: string; id: number }>
    ) => {
      const campaign = state.find(
        (c: Campaigns) => c.Category === action.payload.category
      );

      if (campaign) {
        const item = campaign.CouponList.find(
          (i: CouponDetail) => i.id === action.payload.id
        );

        if (item) {
          item.isSelected = !item.isSelected;
        }
      }
    },
    resetAllCouponSelect: (state: Campaigns[]) => {
      state.forEach((c: Campaigns) => {
        c.CouponList.forEach((i: CouponDetail) => {
          i.isSelected = false;
        });
      });
    },
    setAllStatus: (state: Campaigns[]) => {
      state.forEach((c: Campaigns) => {
        c.CouponList.forEach((i: CouponDetail) => {
          i.isActived = true;
          i.isSelected = false;
          i.status = true;
        });
      });
    },
    updateOntopStatus: (
      state: Campaigns[],
      action: PayloadAction<ProductDetail[]>
    ) => {
      const catLst = [] as any;

      action.payload.forEach((p: ProductDetail) => {
        catLst.push(p.category);
      });

      console.log(catLst);

      state.forEach((c: Campaigns) => {
        c.CouponList.forEach((i: CouponDetail) => {
          if (i.Category === "On Top") {
            if (catLst.includes(i.Param1)) {
              i.status = true;
            } else {
              i.status = false;
            }
          }
        });
      });
    },
    updateWhenSelectedCat: (
      state: Campaigns[],
      action: PayloadAction<{ category: string; id: number; status: boolean }>
    ) => {
      let isSelected = false;
      state.forEach((c: Campaigns) => {
        c.CouponList.forEach((i: CouponDetail) => {
          if (i.Category === action.payload.category) {
            if (i.id === action.payload.id) {
              isSelected = !i.isSelected;
            }
          }
        });
      });

      if (isSelected) {
        let isCouponSelected = false;
        let isOntopSelected = false;
        let isSeasonalSelected = false;

        state.forEach((c: Campaigns) => {
          c.CouponList.forEach((i: CouponDetail) => {
            if (i.isSelected) {
              if (i.Category === "Coupon") {
                isCouponSelected = true;
              }
              if (i.Category === "On Top") {
                isOntopSelected = true;
              }
              if (i.Category === "Seasonal") {
                isSeasonalSelected = true;
              }
            }
          });
        });

        if (action.payload.category === "Coupon") {
          if (!isCouponSelected && (isOntopSelected || isSeasonalSelected)) {
            state.forEach((c: Campaigns) => {
              c.CouponList.forEach((i: CouponDetail) => {
                if (i.Category === action.payload.category) {
                  if (i.id === action.payload.id) {
                    i.isActived = false;
                  }
                }
              });
            });
          } else if (
            !isCouponSelected &&
            !isOntopSelected &&
            !isSeasonalSelected
          ) {
            state.forEach((c: Campaigns) => {
              c.CouponList.forEach((i: CouponDetail) => {
                if (i.Category === action.payload.category) {
                  i.isActived = true;
                }
              });
            });
          }
        } else if (action.payload.category === "On Top") {
          if (
            (isCouponSelected || !isCouponSelected) &&
            !isOntopSelected &&
            isSeasonalSelected
          ) {
            state.forEach((c: Campaigns) => {
              c.CouponList.forEach((i: CouponDetail) => {
                if (i.Category === action.payload.category) {
                  i.isActived = false;
                }
              });
            });
          } else if (
            isCouponSelected &&
            !isOntopSelected &&
            !isSeasonalSelected
          ) {
            state.forEach((c: Campaigns) => {
              c.CouponList.forEach((i: CouponDetail) => {
                if (i.Category === action.payload.category) {
                  i.isActived = true;
                }
              });
            });
          } else if (
            !isCouponSelected &&
            !isOntopSelected &&
            !isSeasonalSelected
          ) {
            state.forEach((c: Campaigns) => {
              c.CouponList.forEach((i: CouponDetail) => {
                i.isActived = true;
              });
            });
          }
        } else if (action.payload.category === "Seasonal") {
          if (!isCouponSelected && !isOntopSelected && !isSeasonalSelected) {
            state.forEach((c: Campaigns) => {
              c.CouponList.forEach((i: CouponDetail) => {
                i.isActived = true;
              });
            });
          } else if (
            (isCouponSelected || !isCouponSelected) &&
            isOntopSelected &&
            !isSeasonalSelected
          ) {
            state.forEach((c: Campaigns) => {
              c.CouponList.forEach((i: CouponDetail) => {
                if (i.Category === action.payload.category) {
                  i.isActived = true;
                }
              });
            });
          } else if (
            isCouponSelected &&
            !isOntopSelected &&
            !isSeasonalSelected
          ) {
            state.forEach((c: Campaigns) => {
              c.CouponList.forEach((i: CouponDetail) => {
                if (
                  i.Category === "On Top" ||
                  i.Category === action.payload.category
                ) {
                  i.isActived = true;
                }
              });
            });
          }
        }

        /////////////////////
      } else {
        if (action.payload.category === "On Top") {
          state.forEach((c: Campaigns) => {
            c.CouponList.forEach((i: CouponDetail) => {
              if (i.Category === "Coupon") {
                if (!i.isSelected) {
                  i.isActived = action.payload.status;
                }
              }
            });
          });
        } else if (action.payload.category === "Seasonal") {
          state.forEach((c: Campaigns) => {
            c.CouponList.forEach((i: CouponDetail) => {
              if (i.Category === "Coupon" || i.Category === "On Top") {
                if (!i.isSelected) {
                  i.isActived = action.payload.status;
                }
              }
            });
          });
        }

        state.forEach((c: Campaigns) => {
          c.CouponList.forEach((i: CouponDetail) => {
            if (i.Category === action.payload.category) {
              if (i.id !== action.payload.id) {
                i.isActived = action.payload.status;
              }
            }
          });
        });
      }
    },
  },
});

export const {
  setCouponFromJSON,
  toggleCouponSelect,
  resetAllCouponSelect,
  updateWhenSelectedCat,
  setAllStatus,
  updateOntopStatus,
} = couponSlice.actions;
export default couponSlice.reducer;
