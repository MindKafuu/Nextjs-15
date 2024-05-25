import React, { useMemo } from "react";
import { CampaignHeader } from "./CampaignHeader";
import { CampaignItemCard } from "./CampaignItemCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  Campaigns,
  CouponDetail,
  resetAllCouponSelect,
  setAllStatus,
} from "@/redux/features/couponSlice";
import styled from "./CampaignCard.module.scss";
import {
  FindTotalCoupon,
  FindTotalOntop,
  FindTotalPrice,
  FindTotalSeasonal,
} from "@/utils/tools";
import {
  setCoupon,
  setOntop,
  setSeasonal,
} from "@/redux/features/discountSlice";

export const CampaignCard = ({
  handleCloseCampaignPopup,
}: {
  handleCloseCampaignPopup: any;
}) => {
  const dispatch = useAppDispatch();
  const couponList = useAppSelector((state) => state.couponReducer);
  const cartList = useAppSelector((state) => state.cartReducer);

  const handleClose = () => {
    dispatch(resetAllCouponSelect());
    dispatch(setAllStatus());
    handleCloseCampaignPopup(false);
  };

  const handleOk = () => {
    let coupon = 0;
    let ontop = 0;
    let seasonal = 0;

    coupon = FindTotalCoupon(couponList, FindTotalPrice(cartList));
    ontop = FindTotalOntop(couponList, cartList);
    seasonal = FindTotalSeasonal(couponList, FindTotalPrice(cartList));

    dispatch(setCoupon(coupon));
    dispatch(setOntop(ontop));
    dispatch(setSeasonal(seasonal));
    handleCloseCampaignPopup(false);
  };

  return (
    <div className="p-6">
      <p className="label-h1">แคมเปญส่วนลด</p>
      <div className="mt-4 max-h-[450px] overflow-y-auto">
        {useMemo(
          () =>
            couponList.map((item: Campaigns, index: number) => {
              return (
                <div key={index} className="mb-6">
                  <CampaignHeader header={item.Category} />
                  <div className="mt-4">
                    {item.CouponList?.map((coupon: CouponDetail, i: number) => {
                      return <CampaignItemCard key={i} coupon={coupon} />;
                    })}
                  </div>
                </div>
              );
            }),
          [couponList]
        )}
      </div>

      <div className={`${styled.popupBtn} label-h6`}>
        <button
          className="border-2 rounded-lg h-10 bg-white w-full text-[#2c2c2c] border-[#2c2c2c]"
          onClick={handleClose}
        >
          ยกเลิก
        </button>
        <button
          className="border rounded-lg h-10 w-full text-white bg-[#2c2c2c]"
          onClick={handleOk}
        >
          ตกลง
        </button>
      </div>
    </div>
  );
};
