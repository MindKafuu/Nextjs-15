import React, { useMemo } from "react";
import { Divider } from "@mui/material";
import { ProductItemCard } from "./ProductItemCard";
import { useAppSelector } from "@/redux/hook";
import { ProductDetail } from "@/redux/features/productSlice";

export const ProductCard = () => {
  const productList = useAppSelector((state) => state.productReducer);

  return (
    <div className="bg-white px-10 label-l6">
      <div className="flex justify-between items-center p-4">
        <p>รายการสินค้าทั้งหมด</p>
        {useMemo(
          () => (
            <label>{productList.length} รายการ</label>
          ),
          [productList]
        )}
      </div>
      <Divider />

      <div className="mt-8">
        {useMemo(
          () =>
            productList.map((product: ProductDetail) => {
              return (
                <div className="mb-8" key={product.id}>
                  <ProductItemCard productItem={product} />
                </div>
              );
            }),
          [productList]
        )}
      </div>
    </div>
  );
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
