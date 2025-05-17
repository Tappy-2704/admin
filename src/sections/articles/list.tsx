import { useTranslate } from "@/locales";
import BoxLayout from "../components/box-layout";
import TableHead from "../components/head-table";
import NoTableData from "@/components/empty/no-data-table";
import TableLoading from "@/components/loading/table-loading";
import { fDateTime } from "@/utils/format-time";
import { useState } from "react";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";
import SecondButton from "@/components/button/second-button";
import MoreMenu from "@/components/more/more-menu";
import FormPopup from "./components/form-popup";
import { useArticle } from "@/hooks/actions/useArticle";
import { IArticle } from "@/hooks/interfaces/article";

export function ArticleListView() {
  const { t } = useTranslate("overview");
  const { articles, artLoading, artEmpty } = useArticle();
  const [item, setItem] = useState<IArticle>();
  const { isDarkStore } = useDarkModeStore();
  const [open, setOpen] = useState({
    create: false,
    update: false,
  });

  return (
    <div>
      <BoxLayout>
        <div className="mt-[43px]">
          <div className="flex flex-col justify-between items-center w-full p-4 gap-4 rounded-[20px] border border-[#D8D8D8] dark:border-main-dark-color bg-white dark:bg-main-dark-color">
            {/* Header row */}
            <div className="flex flex-row justify-between items-center w-full">
              <div className="text-main-light-color dark:text-white  text-[18px] sm:text-[20px] md:text-[22px] font-bold leading-[26px] sm:leading-[28px] md:leading-[30px]">
                {t("Topic")}
              </div>
              <div className="w-24">
                <SecondButton
                  onClick={() => {
                    setOpen((prev) => ({
                      ...prev,
                      create: !prev.create,
                    }));
                  }}
                  text="Create"
                />
              </div>
            </div>
            {/* Scrollable table */}
            <div className="overflow-x-auto w-full">
              <table className="table-auto  w-full">
                <TableHead
                  columns={[
                    { field: "id", label: "ID" },
                    { field: "title", label: t("Title") },
                    { field: "cat", label: t("Category") },
                    { field: "vn", label: t("VN") },
                    { field: "en", label: t("EN") },
                    { field: "createdAt", label: t("created_at") },
                    { field: "action", label: t("action") },
                  ]}
                  onSort={(field, direction) => {
                    console.log("Sort:", field, direction);
                    // direction = 'asc' | 'desc' | null
                  }}
                />
                <tbody>
                  {!artLoading && artEmpty && <NoTableData />}
                  {artLoading && <TableLoading />}
                  {!artLoading &&
                    articles?.results?.map((row) => (
                      <>
                        <br />
                        <tr
                          key={row._id}
                          className="text-center text-sm sm:text-base dark:text-white"
                        >
                          <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                            {row._id}
                          </td>
                          <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                            {row.name}
                          </td>
                          <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                            {row.catId.title}
                          </td>

                          <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                            {row.vn}
                          </td>
                          <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                            {row.en}
                          </td>
                          <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                            {fDateTime(row.createdAt)}
                          </td>

                          <td className="flex justify-center px-6 py-4  bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F] rounded-r-xl">
                            <MoreMenu
                              onEdit={() => {
                                 setItem(row);
                                setOpen((prev) => ({
                                  ...prev,
                                  update: !prev.update,
                                }));
                              }}
                              isDarkStore={isDarkStore}
                            />
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
              {open.create && (
                <FormPopup
                  open={open.create}
                  onClose={() =>
                    setOpen((prev) => ({ ...prev, create: !prev.create }))
                  }
                />
              )}
              {open.update && (
                <FormPopup
                  open={open.update}
                  item={item}
                  onClose={() =>
                    setOpen((prev) => ({ ...prev, update: !prev.update }))
                  }
                />
              )}
            </div>
          </div>
        </div>
      </BoxLayout>
    </div>
  );
}
