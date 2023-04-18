import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const useGetAllTestimonials = () => {
  const { data, isError, isLoading } = useQuery(
    ["_getAllAllTestimonials"],
    () => api.get("/testimonials/all"),
    { enabled: true }
  );
  return {
    data: data?.data?.testimonials,
    isLoading,
    isError,
  };
};

export const useGetOneTestimonialsById = (id) => {
    const { data, isError, isLoading } = useQuery(
      ["_getOneTestimonialsById"],
      () => api.get(`/testimonials/one/${id}`),
      { enabled: id ? true : false }
    );
    return {
      data: data?.data?.testimonials,
      isLoading,
      isError,
    };
  };