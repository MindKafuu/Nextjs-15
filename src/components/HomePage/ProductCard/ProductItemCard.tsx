import React, { ChangeEvent, useMemo, useState } from "react";
import Image from "next/image";
import { Checkbox, TextField } from "@mui/material";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  ProductDetail,
  addProductQuantity,
  inputProductQuantity,
  removeProductQuantity,
  toggleSelect,
} from "@/redux/features/productSlice";
import { NumberFormat } from "@/utils/tools";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addProduct,
  addQuantity,
  inputQuantity,
  removeProduct,
  removeQuantity,
} from "@/redux/features/cartSlice";
import { setAll } from "@/redux/features/discountSlice";
import { resetAllCouponSelect } from "@/redux/features/couponSlice";

export const ProductItemCard = ({
  productItem,
}: {
  productItem: ProductDetail;
}) => {
  const dispatch = useAppDispatch();

  const [itemValue, setItemValue] = useState<any>(0);

  useMemo(() => {
    setItemValue(productItem.quantity);
  }, [productItem.quantity]);

  const handleCheckProduct = () => {
    if (productItem.isSelected) {
      dispatch(removeProduct(productItem.id));
      dispatch(toggleSelect(productItem.id));
    } else {
      dispatch(addProduct(productItem));
      dispatch(toggleSelect(productItem.id));
    }

    dispatch(setAll(0));
    dispatch(resetAllCouponSelect());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    const id = productItem.id;
    let quantity = Number(e.target.value);

    if (e.target.value === "" || regex.test(e.target.value)) {
      if (e.target.value === "") {
        quantity = 0;
        setItemValue(0);
      } else if (e.target.value.length > 1 && e.target.value[0] === "0") {
        setItemValue(Number(e.target.value));
      } else {
        setItemValue(e.target.value);
      }

      dispatch(inputQuantity({ id, quantity }));
      dispatch(inputProductQuantity({ id, quantity }));
    }
  };

  const handleAddQty = () => {
    setItemValue(itemValue + 1);
    dispatch(addQuantity(productItem.id));
    dispatch(addProductQuantity(productItem.id));
  };

  const handleRemoveQty = () => {
    if (itemValue - 1 <= 0) {
      setItemValue(0);
    } else {
      setItemValue(itemValue - 1);
    }

    dispatch(removeQuantity(productItem.id));
    dispatch(removeProductQuantity(productItem.id));
  };

  return (
    <div className="grid grid-cols-4 gap-4 pb-4">
      <div className="flex justify-start items-center col-span-2">
        {useMemo(
          () => (
            <Checkbox
              checked={productItem.isSelected ?? false}
              onChange={handleCheckProduct}
            />
          ),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [productItem]
        )}

        <Image
          src="/images/products/defaultProduct.svg"
          alt="products"
          width={50}
          height={50}
        />
        {useMemo(
          () => (
            <label className="text-product-name">
              {productItem.name ?? ""}
            </label>
          ),
          [productItem.name]
        )}
      </div>
      <div className="flex justify-end items-center">
        <div className="flex items-center">
          <button
            className="mr-1 p-2 border border-[#D0D5DD] rounded-lg flex justify-center items-center"
            onClick={handleRemoveQty}
          >
            <FaMinus />
          </button>
          {useMemo(
            () => (
              <TextField
                value={itemValue}
                onChange={handleInputChange}
                autoComplete="off"
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "1px solid #D0D5DD",
                    },
                    "& fieldset": {
                      border: "1px solid #D0D5DD",
                    },
                    "&:hover fieldset": {
                      border: "1px solid #D0D5DD",
                    },
                  },
                }}
                InputProps={{
                  className: "label-l6 input-text",
                  inputProps: {
                    style: { textAlign: "center" },
                  },
                }}
              />
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [itemValue]
          )}
          <button
            className="ml-1 p-2 border border-[#D0D5DD] rounded-lg flex justify-center items-center"
            onClick={handleAddQty}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="flex justify-end items-center">
        {useMemo(
          () => (
            <label className="ml-4">
              {NumberFormat(productItem.price, 2) ?? 0} ฿
            </label>
          ),
          [productItem.price]
        )}
      </div>
    </div>
  );
};
