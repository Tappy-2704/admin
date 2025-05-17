import { IFiltersRequestParams, IPaginationMeta } from "../interfaces/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getAxios } from "./axios";
import apiClient from "@/axios";
import { ICategory } from "../interfaces/category";

export function useCategory(filterParams?: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    IPaginationMeta<ICategory>,
    AxiosError
  >({
    queryKey: ["get-categories", filterParams],
    queryFn: () =>
      getAxios({
        url: "/categories/get-all",
        filterParams,
      }),
    gcTime: 0,
  });

  const isEmpty = Array.isArray(data?.results)
    ? data?.results?.length === 0
    : !data;

  return {
    categories: data,
    catLoading: isLoading,
    catFetching: isFetching,
    catError: error,
    catEmpty: isEmpty,
    catRefetch: refetch,
  };
}
export const createCategory = async ({
  topicId,
  title,
}: {
  topicId: string;
  title: string;
}) => {
  const response = await apiClient.post("/categories/create", {
    title,
    topicId,
  });
  return response.data;
};
export const updateCategory = async ({
  catId,
  topicId,
  title,
}: {
  catId: string;
  topicId: string;
  title: string;
}) => {
  const response = await apiClient.put(`/categories/update/${catId}`, {
    title,
    topicId,
  });
  return response.data;
};
