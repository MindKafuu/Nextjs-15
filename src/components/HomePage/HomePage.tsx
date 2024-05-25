import React, { useEffect } from "react";
import { TotalCard } from "./TotalCard";
import { MainCard } from "./MainCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import userJson from "@/public/data/userInfo.json";
import { User, setUser } from "@/redux/features/userSlice";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const discounts = useAppSelector((state) => state.discountReducer);

  useEffect(() => {
    loadProductsFromJSON();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const loadProductsFromJSON = () => {
    const data: User = userJson as User;
    dispatch(setUser(data));
  };

  return (
    <div className="w-full h-full mt-6">
      <div className="site">
        <MainCard />
        <TotalCard />
      </div>
    </div>
  );
};
