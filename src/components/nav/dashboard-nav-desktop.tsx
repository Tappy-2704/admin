import DashboardBoldIcon from "@/assets/icons/dashboard-bold-icon";
import DashboardIcon from "@/assets/icons/dashboard-icon";
import DepositBoldIcon from "@/assets/icons/deposit-bold-icon";
import DepositIcon from "@/assets/icons/deposit-icon";
import InvestFundBoldIcon from "@/assets/icons/invest-fund-bold-icon";
import InvestFundIcon from "@/assets/icons/invest-fund-icon";
import PersonIcon from "@/assets/icons/person-icon";
import { useRouter } from "@/routes/hooks/use-router";
import { paths } from "@/routes/paths";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslate } from "@/locales";
import { Moon, Sun } from "lucide-react";

interface Props {
  onSelect?: () => void;
}

const DashboardNavDesktop = ({ onSelect }: Props) => {
  const { t } = useTranslate("overview");
  const router = useRouter();
  const { setDarkMode } = useDarkModeStore();
  const theme = localStorage.getItem("theme");
  const [isDark, setIsDark] = useState(theme === "dark");
  const location = useLocation();

  const dataNav = [
    {
      _id: "topic",
      name: "Topic",
      icon: <DashboardIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: (
        <DashboardBoldIcon currentColor={isDark ? "white" : "#202654"} />
      ),
      url: paths.topic.list,
    },
    {
      _id: "category",
      name: "Category",
      icon: <DepositIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: (
        <DepositBoldIcon currentColor={isDark ? "white" : "#202654"} />
      ),
      url: paths.category.list,
    },

    {
      _id: "articles",
      name: "Articles",
      icon: <InvestFundIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: (
        <InvestFundBoldIcon currentColor={isDark ? "white" : "#202654"} />
      ),
      url: paths.article.list,
    },
    {
      _id: "user",
      name: "User",
      icon: <PersonIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: <PersonIcon currentColor={isDark ? "white" : "#202654"} />,
      url: paths.user.list,
    },
  ];
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  }, [isDark, setDarkMode]);

  const handleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="w-full overflow-y-auto flex flex-col h-full min-w-[300px] md:h-[700px] py-[36px] justify-between items-center flex-shrink-0 rounded-b-[32px] bg-white shadow-[0_0_4px_rgba(0,0,0,0.25)] dark:bg-main-dark-color ">
      {/* logo */}
      <div>
        <div
          className="flex flex-row  hover:cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <div className="flex flex-col">
            <span className="text-main-light-color dark:text-white text-[19px] not-italic font-extrabold uppercase  ">
              Tappy
            </span>
            <span className="text-main-light-color dark:text-white  text-[17px] not-italic font-normal">
              Welcome to Admin
            </span>
          </div>
        </div>

        {/* menu */}
        <div className="flex flex-col gap-4 mt-[10px] md:mt-[64px]">
          {dataNav.map((item) => (
            <button
              onClick={() => {
                setSelected(item.url);
                router.push(item.url);
                if (!onSelect) return;
                onSelect();
              }}
              key={item._id}
              className={`flex items-center w-[205px] h-[49px] shrink-0 rounded-[50px] ${selected === item.url ? " bg-main-light-color dark:bg-white" : ""} hover:cursor-pointer`}
            >
              <div className="flex flex-row gap-3 items-center ml-2 ">
                <div className="flex items-center justify-center w-[37px] h-[37px] shrink-0 bg-white dark:bg-main-dark-color  rounded-3xl">
                  {selected === item.url ? item.iconActive : item.icon}
                </div>

                <span
                  className={` ${selected === item.url ? "text-white dark:text-black" : "text-main-light-color dark:text-white"} text-[16px] font-normal  leading-none`}
                >
                  {item.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <button
            onClick={handleTheme}
            className="cursor-pointer relative w-14 h-8 bg-gray-400 rounded-full flex items-center p-1 transition-all duration-300 float-end"
          >
            <div
              className={`w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md transition-transform duration-300 ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDark ? (
                <Moon size={16} className="text-gray-800" />
              ) : (
                <Sun size={16} className="text-yellow-500" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavDesktop;
