import { useQuery } from '@tanstack/react-query'
import api from './api'

export const useGetAllClints = () => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllAllClints'],
    () => api.get('/client/all'),
    { enabled: true }
  )
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  }
}

export const useGetOneClintsById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ['_getOneClintsById'],
    () => api.get(`/client/one/${id}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  }
}
