import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useGetAllCategories = () => {
  const { data, isError, isLoading } = useQuery(
    ["_getGetAllCategories"],
    () => api.get("/category/all"),
    { enabled: true }
  );
  return {
    data: data?.data?.categorys,
    isLoading,
    isError,
  };
};

export const useGetOneCategoryById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ["_getOneCategoryById"],
    () => api.get(`/category/one/${id}`),
    { enabled: id ? true : false }
  );
  return {
    data: data?.data?.category,
    isLoading,
    isError,
  };
};

export const useGetOneNewsById = (slug) => {
  const { data, isError, isLoading } = useQuery(
    ["_getOneNewsById", slug],
    () => api.get(`/newsmanagement/allByCategory/${slug}`),
    { enabled: slug ? true : false }
  );
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  };
};

export const useGetOneCategoryOtherCountById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ["_getOneCategoryOtherCountById"],
    () => api.get(`/product/categoryProductCount/${id}`),
    { enabled: id ? true : false }
  );
  return {
    data: data?.data?.product,
    isLoading,
    isError,
  };
};
