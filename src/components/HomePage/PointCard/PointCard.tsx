import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";
import styled from "./PointCard.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FindTotalPrice, NumberFormat } from "@/utils/tools";
import { ProductDetail } from "@/redux/features/productSlice";
import { setPoint } from "@/redux/features/discountSlice";

export const PointCard = ({
  handleClosePointPopup,
}: {
  handleClosePointPopup: any;
}) => {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((state) => state.cartReducer);
  const userInfo = useAppSelector((state) => state.userReducer);
  const discounts = useAppSelector((state) => state.discountReducer);

  const [pointValue, setPointValue] = useState<any>(0);

  useEffect(() => {
    if (discounts.point > 0) {
      setPointValue(discounts.point);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    let point = Number(e.target.value);
    const limit = Math.round((FindTotalPrice(cartList) * 20) / 100);

    if (e.target.value === "" || regex.test(e.target.value)) {
      if (e.target.value === "") {
        setPointValue(0);
      } else if (
        e.target.value.length > 1 &&
        e.target.value[0] === "0" &&
        point <= limit
      ) {
        setPointValue(Number(e.target.value));
      } else if (point > limit) {
        if (limit > userInfo.points) {
          setPointValue(userInfo.points);
        } else {
          setPointValue(limit);
        }
      } else {
        setPointValue(e.target.value);
      }
    }
  };

  const handleOk = () => {
    dispatch(setPoint(Number(pointValue)));
    handleClosePointPopup(false);
  };

  return (
    <div className="p-6">
      <p className="label-h1">คะแนนสะสม</p>
      <div className="w-full flex justify-between items-center">
        {useMemo(
          () => (
            <label className="label-l6 text-[#667085] text-start">
              คุณมีคะแนนสะสม: {NumberFormat(userInfo.points, 0)} คะแนน
            </label>
          ),
          [userInfo]
        )}
        <div className="flex justify-end items-center w-[30%]">
          <TextField
            value={pointValue}
            onChange={handleInputChange}
            autoComplete="off"
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "1px solid #2c2c2c",
                },
                "& fieldset": {
                  border: "1px solid #2c2c2c",
                },
                "&:hover fieldset": {
                  border: "1px solid #2c2c2c",
                },
              },
              width: "100%",
            }}
            InputProps={{
              className: `label-l6 ${styled.inputText}`,
              inputProps: {
                style: { textAlign: "center" },
              },
            }}
          />
        </div>
      </div>
      <div className="flex justify-end items-center mt-2">
        {useMemo(
          () => (
            <label className="label-l7 text-[#d45c7e] mt-2">
              * ใช้ได้ไม่เกิน{" "}
              {NumberFormat(
                Math.round((FindTotalPrice(cartList) * 20) / 100),
                0
              ) ?? 0}{" "}
              คะแนน
            </label>
          ),
          [cartList]
        )}
      </div>

      <div className="mt-6 flex justify-between items-center w-full gap-2 label-h6">
        <button
          className="border-2 rounded-lg h-10 w-full text-[#2c2c2c] border-[#2c2c2c]"
          onClick={() => handleClosePointPopup(false)}
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
