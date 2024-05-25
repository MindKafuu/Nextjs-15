import { ProductDetail } from "@/redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  FindTotalCoupon,
  FindTotalDiscount,
  FindTotalOntop,
  FindTotalPrice,
  FindTotalSeasonal,
  NumberFormat,
} from "@/utils/tools";
import { Dialog } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { FiGift } from "react-icons/fi";
import { IoMdAlert } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import { CampaignCard } from "./CampaignCard/CampaignCard";
import { PointCard } from "./PointCard/PointCard";
import couponJson from "@/public/data/campaignList.json";
import {
  Campaigns,
  CouponDetail,
  resetAllCouponSelect,
  setAllStatus,
  setCouponFromJSON,
  updateOntopStatus,
} from "@/redux/features/couponSlice";
import {
  setAll,
  setCoupon,
  setOntop,
  setSeasonal,
} from "@/redux/features/discountSlice";

export const TotalCard = () => {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((state) => state.cartReducer);
  const couponList = useAppSelector((state) => state.couponReducer);
  const userInfo = useAppSelector((state) => state.userReducer);
  const discounts = useAppSelector((state) => state.discountReducer);

  const [openCampaignPopup, setOpenCampaignPopup] = useState<boolean>(false);
  const [openPointPopup, setOpenPointPopup] = useState<boolean>(false);

  useEffect(() => {
    if (couponList.length === 0) {
      loadCouponFromJson();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponList]);

  useEffect(() => {
    if (cartList.length <= 0) {
      dispatch(setAll(0));
      dispatch(resetAllCouponSelect());
    } else if (cartList.length > 0) {
      recalculatePrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartList]);

  const recalculatePrice = () => {
    let coupon = 0;
    let ontop = 0;
    let seasonal = 0;

    coupon = FindTotalCoupon(couponList, FindTotalPrice(cartList));
    ontop = FindTotalOntop(couponList, cartList);
    seasonal = FindTotalSeasonal(couponList, FindTotalPrice(cartList));

    console.log(ontop);
    dispatch(setCoupon(coupon));
    dispatch(setOntop(ontop));
    dispatch(setSeasonal(seasonal));
  };

  const loadCouponFromJson = () => {
    const data: Campaigns[] = couponJson as Campaigns[];
    dispatch(setCouponFromJSON(data));
    dispatch(setAllStatus());
  };

  return (
    <aside className="right-sidebar p-4 label-l6">
      <div className="flex justify-start items-center">
        <FiGift
          size={44}
          color="#38539a"
          className="rounded-full bg-[#CCE5FF] p-2"
        />
        <p className="ml-2">คุณมีแคมเปญส่วนลด :</p>
      </div>
      <div className="mt-8 w-full label-h5">
        <button
          className={`${
            cartList.length > 0 ? "campaignBtn" : "disCampaignBtn"
          } w-full h-10`}
          onClick={() => {
            dispatch(updateOntopStatus(cartList));
            setOpenCampaignPopup(true);
          }}
          disabled={cartList.length === 0}
        >
          <div className="flex flex-row justify-center items-center">
            {cartList.length > 0 &&
              discounts.point === 0 &&
              discounts.coupon === 0 &&
              discounts.ontop === 0 &&
              discounts.seasonal === 0 && (
                <IoMdAlert size={24} color="#FF9933" />
              )}
            <p className="ml-2">แคมเปญส่วนลด</p>
          </div>
        </button>
      </div>
      <div className="mt-2 w-full label-l6">
        <button
          className={`${
            cartList.length > 0 ? "campaignBtn" : "disCampaignBtn"
          } w-full h-10`}
          onClick={() => setOpenPointPopup(true)}
          disabled={cartList.length === 0}
        >
          <div className="flex justify-between items-center p-2">
            <div className="flex flex-row justify-center items-center">
              {cartList.length > 0 && discounts.point === 0 && (
                <IoMdAlert size={24} color="#FF9933" />
              )}
              {useMemo(
                () => (
                  <label className="ml-2">
                    คุณมีคะแนน: {userInfo.points} คะแนน
                  </label>
                ),
                [userInfo]
              )}
            </div>
            <div className="flex flex-row justify-center items-center">
              <p className="mx-2">ใช้ส่วนลด</p>
              {cartList.length > 0 && (
                <SlArrowRight size={15} color="#2c2c2c" />
              )}
            </div>
          </div>
        </button>
      </div>
      <div className="mt-4 w-full grid grid-cols-2 gap-4 label-l7 text-[#667085]">
        <div className="flex justify-start items-center">
          {useMemo(
            () => (
              <label>{cartList.length ?? 0}</label>
            ),
            [cartList.length]
          )}
          <p className="ml-2">รายการ</p>
        </div>
        {useMemo(
          () => (
            <label className="text-end">
              {NumberFormat(FindTotalPrice(cartList), 2) ?? 0} ฿
            </label>
          ),
          [cartList]
        )}
        {useMemo(
          () => (
            <>
              {cartList.length > 0 && discounts.coupon > 0 && (
                <>
                  <p className="text-start">Coupon</p>
                  <label className="text-end">
                    - {NumberFormat(discounts.coupon, 2)} ฿
                  </label>
                </>
              )}
              {cartList.length > 0 && discounts.ontop > 0 && (
                <>
                  <p className="text-start">On Top</p>
                  <label className="text-end">
                    - {NumberFormat(discounts.ontop, 2)} ฿
                  </label>
                </>
              )}
              {cartList.length > 0 && discounts.point > 0 && (
                <>
                  <p className="text-start">Point</p>
                  <label className="text-end">
                    - {NumberFormat(discounts.point, 2)} ฿
                  </label>
                </>
              )}
              {cartList.length > 0 && discounts.seasonal > 0 && (
                <>
                  <p className="text-start">Seasonal</p>
                  <label className="text-end">
                    - {NumberFormat(discounts.seasonal, 2)} ฿
                  </label>
                </>
              )}
            </>
          ),
          [discounts, cartList]
        )}

        <p className="text-start">รวม</p>
        {useMemo(
          () => (
            <label className="text-end">
              {cartList.length === 0
                ? 0
                : NumberFormat(
                    FindTotalPrice(cartList) - FindTotalDiscount(discounts),
                    2
                  ) ?? 0}{" "}
              ฿
            </label>
          ),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [cartList, discounts]
        )}
      </div>
      <div className="mt-8 w-full label-h5">
        <button
          // className="rounded-2xl bg-[#2c2c2c] text-white w-full h-11"
          className="rounded-2xl bg-[#e4e7ec] text-[#98a2b3] w-full h-11"
          disabled
        >
          สั่งซื้อสินค้า
        </button>
      </div>

      <Dialog
        open={openCampaignPopup}
        PaperProps={{
          className: "rounded-lg w-[30rem]",
        }}
      >
        <div className="h-[600px]">
          <CampaignCard handleCloseCampaignPopup={setOpenCampaignPopup} />
        </div>
      </Dialog>

      <Dialog
        open={openPointPopup}
        PaperProps={{
          className: "rounded-lg w-[30rem]",
        }}
      >
        <PointCard handleClosePointPopup={setOpenPointPopup} />
      </Dialog>
    </aside>
  );
};
