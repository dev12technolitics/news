import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { handleSetDiscountData } from 'src/redux/slices/cartSlice'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import api from './api'

export const useCreateDiscount = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate } = useMutation(
    (data) => {
      const formData = data
      return api.post('/discount/verify', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createDiscount'])

        dispatch(
          handleToastOpen({
            message: data?.data?.message || 'Discount applied!',
            status: data?.data?.status ? 'success' : 'error',
          })
        )
        dispatch(handleSetDiscountData(data?.data?.discount))
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  return { mutate }
}
