import { useTranslate } from "@/locales";
import BoxLayout from "../components/box-layout";
import TableHead from "../components/head-table";
import NoTableData from "@/components/empty/no-data-table";
import TableLoading from "@/components/loading/table-loading";
import { fDateTime } from "@/utils/format-time";
import { useTopic } from "@/hooks/actions/useTopic";
export function TopicListView() {
  const { t } = useTranslate("overview");
  const { topic, topicLoading, topicEmpty } = useTopic();
  return (
    <BoxLayout>
      <div className="mt-[43px]">
        <div className="flex flex-col justify-between items-center w-full p-4 gap-4 rounded-[20px] border border-[#D8D8D8] dark:border-main-dark-color bg-white dark:bg-main-dark-color">
          {/* Header row */}
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-main-light-color dark:text-white  text-[18px] sm:text-[20px] md:text-[22px] font-bold leading-[26px] sm:leading-[28px] md:leading-[30px]">
              {t("Topic")}
            </div>
          </div>

          {/* Scrollable table */}
          <div className="overflow-x-auto w-full">
            <table className="table-auto  w-full">
              <TableHead
                columns={[
                  { field: "id", label: "ID" },
                  { field: "title", label: t("Title") },
                  { field: "createdAt", label: t("created_at") },
                ]}
                onSort={(field, direction) => {
                  console.log("Sort:", field, direction);
                  // direction = 'asc' | 'desc' | null
                }}
              />
              <tbody>
                {topicEmpty && <NoTableData />}
                {topicLoading && <TableLoading />}
                {!topicLoading &&
                  topic?.results?.map((row) => (
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
                          {row.title}
                        </td>

                        <td className="px-6 py-4  bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F] rounded-r-xl">
                          {fDateTime(row.createdAt)}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BoxLayout>
  );
}
