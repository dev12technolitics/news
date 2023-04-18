import { useQuery } from '@tanstack/react-query'
import api from './api'

export const useGetAllBlog = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllBlogs'],
    () => api.get('/blog/all'),
    { enabled: true }
  )
  return {
    data: data?.data?.blog,
    isLoading,
    isError,
  }
}

export const useGetOneBlogById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ['_getOneBlogById', id],
    () => api.get(`/blog/one/${id}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.blog,
    isLoading,
    isError,
  }
}
