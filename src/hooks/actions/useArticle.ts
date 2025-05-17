import { IFiltersRequestParams, IPaginationMeta } from "../interfaces/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getAxios } from "./axios";
import apiClient from "@/axios";
import { IArticle } from "../interfaces/article";

export function useArticle(filterParams?: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    IPaginationMeta<IArticle>,
    AxiosError
  >({
    queryKey: ["get-articles", filterParams],
    queryFn: () =>
      getAxios({
        url: "/articles/get-all",
        filterParams,
      }),
    gcTime: 0,
  });

  const isEmpty = Array.isArray(data?.results)
    ? data?.results?.length === 0
    : !data;

  return {
    articles: data,
    artLoading: isLoading,
    artFetching: isFetching,
    artError: error,
    artEmpty: isEmpty,
    artRefetch: refetch,
  };
}
export const createArticle = async ({
  catId,
  name,
  vn,
  en,
}: {
  catId: string;
  name: string;
  vn: string;
  en: string;
}) => {
  const response = await apiClient.post("/articles/create", {
    name,
    catId,
    vn,
    en,
  });
  return response.data;
};
export const updateArticle = async ({
  articleId,
  catId,
  name,
  vn,
  en,
}: {
  articleId: string;
  catId: string;
  name: string;
  vn: string;
  en: string;
}) => {
  const response = await apiClient.put(`/articles/update/${articleId}`, {
    catId,
    name,
    vn,
    en,
  });
  return response.data;
};
