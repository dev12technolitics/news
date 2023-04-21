import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useGetAllNews = () => {
  const { data, isError, isLoading } = useQuery(
    ["_getAllNews"],
    () => api.get("/blog/all"),
    { enabled: true }
  );
  return {
    data: data?.data?.blog,
    isLoading,
    isError,
  };
};

export const useGetOneNewsById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ["_getOneNewsById", id],
    () => api.get(`/blog/one/${id}`),
    { enabled: id ? true : false }
  );
  return {
    data: data?.data?.blog,
    isLoading,
    isError,
  };
};
