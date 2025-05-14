import React from "react";
import DashboardBgImg from "@/assets/dashboard-bg.png";

interface Props {
  children: React.ReactNode;
}
const BoxLayout = ({ children }: Props) => {
  return (
    <div className="h-full w-full px-[10px] text-black dark:text-white  md:px-[30px] py-10  pb-20  dark:bg-[#090A0D]">
      <div
        className=" bg-no-repeat bg-contain bg-center  "
        style={{ backgroundImage: `url(${DashboardBgImg})` }}
      >
        {children}
      </div>
    </div>
  );
};

export default BoxLayout;
