import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useGetAllBrands = () => {
  const { data, isError, isLoading } = useQuery(
    ["_getAllAllBrands"],
    () => api.get("/brand/all"),
    { enabled: true }
  );
  return {
    data: data?.data?.brands,
    isLoading,
    isError,
  };
};

export const useGetOneBrandsById = (id) => {
    const { data, isError, isLoading } = useQuery(
      ["_getOneBrandsById"],
      () => api.get(`/brand/one/${id}`),
      { enabled: id ? true : false }
    );
    return {
      data: data?.data?.brands,
      isLoading,
      isError,
    };
  };