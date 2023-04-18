/* eslint-disable no-console */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import api from './api'

export const useCreateUserAddress = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data
      return api.post('/address/add', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([
          '_createUserAddress',
          '_getAllAddressById',
        ])
        dispatch(
          handleToastOpen({
            message: data?.data?.message || 'success',
            status: 'success',
          })
        )
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  return {
    createUser: mutate,
    isLoading,
  }
}

export const useGetAllAddressById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllAddressById'],
    () => api.get(`/address/custAddress/${id}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.address,
    isLoading,
    isError,
  }
}

export const useGetOneAddressById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ['_getOneAddressById', id],
    () => api.get(`/address/one/${id}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.address,
    isLoading,
    isError,
  }
}

export const useDeleteUserAddressById = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate } = useMutation(
    (id) => {
      return api.delete(`/address/delete/${id}`)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([
          '_deleteUserAddressById',
          '_getAllAddressById',
        ])
        dispatch(
          handleToastOpen({
            message: data?.data?.message || 'success',
            status: 'success',
          })
        )
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  return { mutate }
}

export const useUpdateUserAddressById = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const id = data?._id
      return api.put(`/address/update/${id}`, data)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([
          '_updateUserAddressById',
          '_getAllAddressById',
        ])
        dispatch(
          handleToastOpen({
            message: data?.data?.message || 'success',
            status: 'success',
          })
        )
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  return { updateUser: mutate, isLoading }
}

//for shipping only

export const useCreateDefaultChangeBillingWithShip = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (data) => {
      const formData = data
      return api.post('/address/billing/default', formData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['_createDefaultChangeBillingWithShip'])
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  return {
    createUser: mutate,
  }
}

export const useCreateDefaultChangeShippingTwo = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (data) => {
      const formData = data
      return api.post('/address/shipping/default', formData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['_createDefaultChangeShippingTwo'])
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  return {
    createUser: mutate,
  }
}
