/* eslint-disable no-console */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import { login } from 'src/redux/slices/userSlice'
import api from './api'
// customer create with username and password
export const useCreateRegisterUser = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate, isSuccess, data, isLoading, isError } = useMutation(
    (data) => {
      const formData = data
      return api.post('/customer/signup', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createRegisterUser'])
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
    data: data?.data,
    isSuccess,
    isError,
    isLoading,
  }
}

export const useCreateRegisterOTPUser = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (data) => {
      const formData = data
      return api.post('/customer/formSubmit', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createRegisterOTPUser'])
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
  }
}

export const useGetAllOTPLoginUserById = (id) => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllOTPLoginUserById'],
    () => api.get(`/customer/one/${id}`),
    { enabled: id ? true : false }
  )
  return {
    data: data?.data?.users,
    isLoading,
    isError,
  }
}

// user login with username and password
export const useGetUserLoginDetails = (user) => {
  const { data, isError, isLoading } = useQuery(
    ['_getAllOTPLoginUserById'],
    () => {
      if (user?.type?.toLowerCase() === 'b2b') {
        api.get(`/retailer/one/${user?.id}`),
          { enabled: user?.id ? true : false }
      } else {
        api.get(`/customer/one/${user?.id}`),
          { enabled: user?.id ? true : false }
      }
    }
  )
  return {
    data: data?.data?.users,
    isLoading,
    isError,
  }
}
// user login with username and password
export const useCreateUserLogin = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { mutate, data, isSuccess, isLoading, isError } = useMutation(
    (data) => {
      const formData = data?.formData
      if (data?.userType === 'b2c') {
        return api.post('/customer/login', formData)
      } else {
        return api.post('/retailer/login', formData)
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createLoginUser'])
        dispatch(
          handleToastOpen({
            message: data?.data?.message || 'success',
            status: 'success',
          })
        )
        dispatch(
          login({
            userAccessToken: data?.data?.accessToken,
            userData: data?.data?.user,
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
    loginMutation: mutate,
    response: data?.data,
    isSuccess,
    isError,
    isLoading,
  }
}

//customer check type of B2B or B2C
export const useCreateCheckUserType = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data
      return api.post('/userlogin/login', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createLoginUser'])
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
    userTypeMutation: mutate,
    isLoading,
  }
}

export const useCreateOTPUser = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data
      return api.post('/customer/loginWithOtp', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createOTPUser'])
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
    createOtp: mutate,
    isLoading,
  }
}

export const useCreateverifyOTPUser = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    (data) => {
      const formData = data
      return api.post('/customer/verifyotp', formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_createverifyOTPUser'])
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
        console.log("err comin!",error)
      },
    }
  )
  return {
    createOtpVerify: mutate,
    isLoading,
  }
}

export const useUpdateLoginUserById = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate, data, isSuccess, isLoading, isError } = useMutation(
    (data) => {
      const id = data?.formData?._id
      const userApi = data?.userApi
      return api.put(`/${userApi}/update/${id}`, data?.formData)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['_updateLoginUserById'])
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
  return { mutate, data: data?.data, isSuccess, isError, isLoading }
}
