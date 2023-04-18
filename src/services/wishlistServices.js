import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import api from './api'

export const useGetAllWishlist = (id) => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllAllwishlist'],
    () => api.get(`/wishlist/customer/${id}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.data,
    isLoading,
    isError,
  }
}

export const useDeleteWishlistDataById = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (id) => {
      return api.delete(`/wishlist/delete/${id}`)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_deleteWishlistDataById'])
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
            message: error?.message || 'error',
            status: 'error',
          })
        )
        console.log(error)
      },
    }
  )
  return { mutate }
}

export const useCreateWishlistData = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (data) => {
      const formData = data
      return api.post('/wishlist/add', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createWishlistData'])
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
            message: 'error',
            status: 'error',
          })
        )
        console.log(error)
      },
    }
  )
  return {
    mutate,
  }
}
