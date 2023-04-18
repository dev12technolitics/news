import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useGetAllGst = () => {
  const { data, isError, isLoading } = useQuery(
    ["_getAllGst"],
    () => api.get("/generalconfig/all"),
    { enabled: true }
  );
  return {
    data: data?.data,
    isLoading,
    isError,
  };
};