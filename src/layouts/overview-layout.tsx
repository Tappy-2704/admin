import DashboardNavDesktop from "@/components/nav/dashboard-nav-desktop";
import React from "react";
interface Props {
  children: React.ReactNode;
}
const OverviewLayout = ({ children }: Props) => {
  return (
    <div className="dark:bg-[#090A0D] h-screen  overflow-y-auto ">
      <div className="flex flex-row   dark:bg-[#090A0D]">
        <div>
          <DashboardNavDesktop />
        </div>
        <div className="flex-1 ">{children}</div>
      </div>
    </div>
  );
};

export default OverviewLayout;
