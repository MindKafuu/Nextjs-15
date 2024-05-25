import React, { useMemo, useState } from "react";
import { Checkbox } from "@mui/material";
import { HiTicket } from "react-icons/hi2";
import {
  CouponDetail,
  toggleCouponSelect,
  updateWhenSelectedCat,
} from "@/redux/features/couponSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export const CampaignItemCard = ({ coupon }: { coupon: CouponDetail }) => {
  const dispatch = useAppDispatch();

  const handleCheckCoupon = () => {
    const category = coupon.Category;
    const id = coupon.id;
    const status = coupon.isSelected;
    dispatch(toggleCouponSelect({ category, id }));
    dispatch(updateWhenSelectedCat({ category, id, status }));
  };

  const displayInfo = () => {
    if (coupon.Category === "Coupon") {
      return (
        <div className="flex justify-start items-center label-l6 w-full h-full">
          <div
            className={`w-1/4 ${
              coupon.isActived ? "bg-violet-400" : "bg-[#667085]"
            } h-full flex justify-center items-center rounded-md`}
          >
            <HiTicket size={24} color="white" />
          </div>
          <p className="ml-2">
            ส่วนลด {coupon.Param2} {coupon.Param1 === "Amount" ? "฿" : "%"}
          </p>
        </div>
      );
    } else if (coupon.Category === "On Top") {
      return (
        <div className="flex justify-start items-center label-l6 w-full h-full">
          <div
            className={`w-1/4 ${
              coupon.isActived && coupon.status ? "bg-pink-400" : "bg-[#667085]"
            } h-full flex justify-center items-center rounded-md`}
          >
            <HiTicket size={24} color="white" />
          </div>
          <p className="ml-2">ส่วนลด {coupon.Param3} %</p>
          <p className="ml-2">{coupon.Param2}</p>
        </div>
      );
    } else {
      return (
        <div className="flex justify-start items-center label-l6 w-full h-full">
          <div
            className={`w-1/4 ${
              coupon.isActived ? "bg-sky-400" : "bg-[#667085]"
            } h-full flex justify-center items-center rounded-md`}
          >
            <HiTicket size={24} color="white" />
          </div>
          <p className="ml-2">ส่วนลด {coupon.Param1} ฿</p>
          <p className="ml-2">ทุกๆการซื้อ {coupon.Param2} ฿</p>
        </div>
      );
    }
  };

  return (
    <div className=" h-20 mb-2 w-full shadow-md border rounded-md p-2 flex justify-between items-center">
      {useMemo(
        () => displayInfo(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [coupon]
      )}
      <div className="flex justify-end items-center">
        <Checkbox
          checked={coupon.isSelected}
          onChange={handleCheckCoupon}
          disabled={!coupon.isActived || !coupon.status}
        />
      </div>
    </div>
  );
};
