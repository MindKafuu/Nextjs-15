import React, { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@mui/material";
import { ProductCard } from "./ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  ProductDetail,
  resetAllCheckboxes,
  setProductsFromJSON,
  toggleAllCheckboxes,
} from "@/redux/features/productSlice";
import productJson from "@/public/data/productList.json";
import { addProductAll, removeProductAll } from "@/redux/features/cartSlice";
import { setAll } from "@/redux/features/discountSlice";

export const MainCard = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state) => state.productReducer);
  const cartList = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    if (productList.length === 0) {
      loadProductsFromJSON();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productList]);

  const loadProductsFromJSON = () => {
    const data: ProductDetail[] = productJson as ProductDetail[];
    dispatch(setProductsFromJSON(data));
  };

  const handleCheckAllProducts = () => {
    if (
      productList.every((product: ProductDetail) => product.isSelected === true)
    ) {
      dispatch(removeProductAll());
      dispatch(resetAllCheckboxes());
    } else {
      dispatch(addProductAll(productList));
      dispatch(toggleAllCheckboxes());
    }
  };

  return (
    <main>
      <div className="bg-white flex justify-start items-center px-10 py-2">
        <div className="label-l6 flex flex-row items-center">
          {useMemo(() => {
            return (
              <Checkbox
                checked={productList.every(
                  (product: ProductDetail) => product.isSelected === true
                )}
                indeterminate={
                  productList.some(
                    (product: ProductDetail) => product.isSelected === true
                  ) &&
                  !productList.every(
                    (product: ProductDetail) => product.isSelected === true
                  )
                }
                onChange={handleCheckAllProducts}
              />
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [productList, dispatch])}
          สินค้าทั้งหมด
        </div>
      </div>

      <div className="mt-4">
        <ProductCard />
      </div>
    </main>
  );
};
