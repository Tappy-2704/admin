import { IFiltersRequestParams, IPaginationMeta } from "../interfaces/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getAxios } from "./axios";
import { ITopic } from "../interfaces/topic";
import apiClient from "@/axios";

export function useTopic(filterParams?: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    IPaginationMeta<ITopic>,
    AxiosError
  >({
    queryKey: ["get-topic", filterParams],
    queryFn: () =>
      getAxios({
        url: "/topics/get-all",
        filterParams,
      }),
    gcTime: 0,
  });

  const isEmpty = Array.isArray(data?.results) ? data?.results?.length === 0 : !data;

  return {
    topic: data,
    topicLoading: isLoading,
    topicFetching: isFetching,
    topicError: error,
    topicEmpty: isEmpty,
    topicRefetch: refetch,
  };
}
export const createTopic = async (title: string) => {
  const response = await apiClient.post("/topics/create", {
    title,
  });
  return response.data;
};
export const updateTopic = async ({
  topicId,
  title,
}: {
  topicId: string;
  title: string;
}) => {
  const response = await apiClient.put(`/topics/update/${topicId}`, {
    title,
  });
  return response.data;
};
