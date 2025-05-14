import { IFiltersRequestParams, IPaginationMeta } from "../interfaces/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getAxios } from "./axios";
import { ITopic } from "../interfaces/topic";

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

  const isEmpty = data?.results?.length === 0;

  return {
    topic: data,
    topicLoading: isLoading,
    topicFetching: isFetching,
    topicError: error,
    topicEmpty: isEmpty,
    topicRefetch: refetch,
  };
}
