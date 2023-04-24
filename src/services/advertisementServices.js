import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useGetAllAdvertisement = () => {
  const { data, isError, isLoading } = useQuery(
    ["_getAllAdvertisement"],
    () => api.get("/advertisement/all"),
    {
      enabled: true,
    }
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useGetOneAdvertisementById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ["_getOneAdvertisementById"],
    () => api.get(`/advertisement/one/${id}`)
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};
