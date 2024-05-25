import { Campaigns, CouponDetail } from "@/redux/features/couponSlice";
import { Discount } from "@/redux/features/discountSlice";
import { ProductDetail } from "@/redux/features/productSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export function NumberFormat(value: any, digits?: number) {
  if (value === "" || Number(value) === 0) {
    return 0;
  } else {
    const formattedValue = Number(value).toLocaleString(undefined, {
      minimumFractionDigits: digits ?? 3,
      maximumFractionDigits: digits ?? 3,
    });

    return formattedValue;
  }
}

export function FindTotalPrice(lst: ProductDetail[]) {
  if (lst == undefined || lst.length <= 0) {
    return 0;
  } else {
    return lst.reduce(
      (accumulator: number, currentValue: ProductDetail) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    );
  }
}

function FindTotalPriceByCate(lst: ProductDetail[], category: string) {
  if (lst == undefined || lst.length <= 0) {
    return 0;
  } else {
    return lst.reduce((accumulator: number, currentValue: ProductDetail) => {
      if (currentValue.category === category) {
        return accumulator + currentValue.price * currentValue.quantity;
      } else {
        return accumulator;
      }
    }, 0);
  }
}

export function FindTotalDiscount(discounts: Discount) {
  return (
    discounts.coupon + discounts.ontop + discounts.point + discounts.seasonal
  );
}

export function FindTotalCoupon(lst: Campaigns[], totalPrice: number) {
  let total = 0;

  lst.forEach((c: Campaigns) => {
    if (c.Category === "Coupon") {
      c.CouponList.forEach((coupon: CouponDetail) => {
        if (coupon.isSelected) {
          if (coupon.Param1 === "Amount") {
            total = total + Number(coupon.Param2);
          } else {
            total = total + (totalPrice * Number(coupon.Param2)) / 100;
          }
        }
      });
    }
  });

  return total;
}

export function FindTotalOntop(lst: Campaigns[], products: ProductDetail[]) {
  let total = 0;

  lst.forEach((c: Campaigns) => {
    if (c.Category === "On Top") {
      c.CouponList.forEach((coupon: CouponDetail) => {
        if (coupon.isSelected) {
          total =
            total +
            (FindTotalPriceByCate(products, coupon.Param1) *
              Number(coupon.Param3)) /
              100;
        }
      });
    }
  });

  return total;
}

export function FindTotalSeasonal(lst: Campaigns[], totalPrice: number) {
  let total = 0;

  lst.forEach((c: Campaigns) => {
    if (c.Category === "Seasonal") {
      c.CouponList.forEach((coupon: CouponDetail) => {
        if (coupon.isSelected) {
          total =
            total +
            Math.floor(totalPrice / Number(coupon.Param2)) *
              Number(coupon.Param1);
        }
      });
    }
  });

  return total;
}
