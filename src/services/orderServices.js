/* eslint-disable no-console */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from './api'

export const useCreateUserOrder = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data
      return api.post('/order/add', formData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['_createUserOrder'])
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  return {
    createOrder: mutate,
    isLoading,
  }
}

export const useGetAllOrderById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllOrderById'],
    () => api.get(`/order/customer/${id}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.order,
    isLoading,
    isError,
  }
}

export const useGetOneOrderById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ['_getOneOrderById'],
    () => api.get(`/order/one/${id}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.order,
    isLoading,
    isError,
  }
}

export const useGetOrderTrackById = (custId, ordId) => {
  const { data, isError, isLoading } = useQuery(
    ['_getOrderTrackById'],
    () => api.get(`/ordertrack/cust/${custId}/singleorder/${ordId}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.order,
    isLoading,
    isError,
  }
}

export const useGetAllOrdTrackById = (custId) => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllOrderById'],
    () => api.get(`/ordertrack/customer/${custId}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.ordertrack,
    isLoading,
    isError,
  }
}
