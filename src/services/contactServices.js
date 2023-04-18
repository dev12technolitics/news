/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import api from './api'

export const useCreateContactEnquiry = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data
      return api.post('/contactenquiry/add', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createContactEnquiry'])
        dispatch(
          handleToastOpen({
            message: data?.data?.message || 'success',
            status: 'success',
          })
        )
      },
      onError: (error) => {
        dispatch(
          handleToastOpen({
            message: error || 'error',
            status: 'error',
          })
        )
        console.log(error)
      },
    }
  )
  return {
    mutate,
    isLoading,
  }
}
export const useCreateProductEnquiry = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data
      return api.post('/product/productEnquiryAdd', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createContactEnquiry'])
        dispatch(
          handleToastOpen({
            message: data?.data?.message || 'success',
            status: 'success',
          })
        )
      },
      onError: (error) => {
        dispatch(
          handleToastOpen({
            message: error?.response?.data?.message || 'error',
            status: 'error',
          })
        )
        console.log(error)
      },
    }
  )
  return {
    mutate,
    isLoading,
  }
}
export const useCreateRetailerEnquiry = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data
      return api.post('/retailer/signup', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createRetailerEnquiry'])
        dispatch(
          handleToastOpen({
            message: data?.data?.message || 'success',
            status: 'success',
          })
        )
      },
      onError: (error) => {
        dispatch(
          handleToastOpen({
            message: error?.response?.data?.message || 'error',
            status: 'error',
          })
        )
        console.log(error)
      },
    }
  )
  return {
    createUser: mutate,
    isLoading,
  }
}
