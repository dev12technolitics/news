import { useQuery } from '@tanstack/react-query'
import api from './api'

export const useGetAllSuperSubCategories = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllAllSuperSubCategories'],
    () => api.get('/subsubcategory/all'),
    { enabled: true }
  )
  return {
    data: data?.data,
    isLoading,
    isError,
  }
}

export const useGetSuperSubCategoryById = (slugs) => {
  const { data, isError, isLoading } = useQuery(
    ['_getSuperSubCategoryById', slugs],
    () => api.get(`/subsubcategory/allByAnycategory/${slugs}`),
    { enabled: slugs ? true : false }
  )
  return {
    data: data?.data?.subsubcategory,
    isLoading,
    isError,
  }
}
