import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, TextField } from '@mui/material'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { RHFTextField } from 'src/components/hook-form'
import { login, userDetails } from 'src/redux/slices/userSlice'
import api from 'src/services/api'
import {
  useCreateCheckUserType,
  useCreateOTPUser,
} from 'src/services/loginRegisterServices'
import { allowOnlyNumbers } from 'src/utils/utils-fun'
import * as Yup from 'yup'
import { AppButton, AppModal } from '../basics'
import FormProvider from '../hook-form'
import OTPValidation from './OTPValidation'
import RegistrationForm from './RegistrationForm'

const LoginForm = () => {
  const [isRegistered, setIsRegistered] = useState(true)
  return (
    <section className="h-fit pt-0 sm:pt-10">
      <div className=" mx-auto h-full w-full rounded-2xl sm:p-5 text-gray-800 shadow-none sm:w-10/12 sm:shadow-2xl md:w-11/12 lg:w-10/12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2">
          <div className="hidden md:block">
            <LoginImageCard />
          </div>
          <div className="p-2 lg:py-5 lg:px-20">
            {isRegistered ? (
              <LoginFormCard
                setIsRegistered={setIsRegistered}
                closeLoginModal={() => {}}
              />
            ) : (
              <>
                <p className="mt-2 mb-5 pt-2 text-xl font-bold capitalize sm:text-2xl">
                  register
                </p>
                <RegistrationForm setIsRegistered={setIsRegistered} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm

export const LoginImageCard = () => {
  return (
    <div className="flex h-full items-center">
      <Image
        width={400}
        height={400}
        src="https://bsdtol.com/apexnew/app-assets/img/gallery/login.png"
        className="w-full object-contain"
        alt="Sample image"
      />
    </div>
  )
}
export const LoginFormCard = ({ setIsRegistered, closeLoginModal }) => {
  const dispatch = useDispatch()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [contactNo, setContactNo] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)

  const { userTypeMutation, isLoading } = useCreateCheckUserType()
  const { createOtp, isLoading: otpLoading } = useCreateOTPUser()
  const LoginFormSchema = Yup.object().shape({
    username: Yup.string().required('UserName is required'),
    password: Yup.string().required('Password is required'),
  })

  const defaultValues = useMemo(() => ({
    username: '',
    password: '',
  }))
  //save in redux persist

  //forms
  const methods = useForm({
    resolver: yupResolver(LoginFormSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods

  const onSubmit = (data) => {
    try {
      const payload = {
        username: data?.username,
        password: data?.password,
      }
      userTypeMutation(payload, {
        onSuccess: (data) => {
          setUserDataInSlice(data?.data)
          reset()
          closeLoginModal()
        },
      })
    } catch (error) {}
  }
  const onOTPSend = () => {
    if (contactNo?.length !== 10) {
      document.getElementById('contact_no').focus()
    } else {
      try {
        const payload = {
          contact_no: contactNo,
        }

        createOtp(payload, {
          onSuccess: (data) => {
            setIsOtpSent(true),
              localStorage.setItem(
                'userOtpData',
                JSON.stringify(data?.data?.result)
              )
          },
        })
      } catch (error) {}
    }
  }
  const handleOnEnterSubmit = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.which === 13) {
      e.preventDefault()
      contactNo?.length === 10
        ? onOTPSend()
        : () => {
            document.getElementById('contact_no').focus()
          }
    }
  }

  // const responseGoogle = (response) => {}

  async function setUserDataInSlice(data) {
    try {
      const loginDetails = {
        userAccessToken: data?.accessToken,
        userType: data?.user?.type?.toLowerCase(),
      }
      dispatch(login(loginDetails))
      if (data?.user?.type?.toLowerCase() === 'b2b') {
        const response = await api.get(`/retailer/one/${data?.user?.user_id}`)
        dispatch(userDetails(response?.data?.users))
      } else {
        const response = await api.get(`/customer/one/${data?.user?.user_id}`)
        dispatch(userDetails(response?.data?.users))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex w-full justify-center">
        <Image
          width={80}
          height={80}
          src="https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530__340.png"
          alt="Sample image"
        />
      </div>
      <div className="text-center">
        <p className="mt-2 mb-5 pt-2 text-sm font-bold capitalize sm:text-2xl">
          welcome
        </p>
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <Stack spacing={3}>
            <RHFTextField name="username" label="Username" />
            <RHFTextField name="password" type="password" label="Password" />
          </Stack>
        </div>

        <AppButton
          type="submit"
          title="Login"
          size="large"
          variant="outlined"
          themeColor="secondary"
          fullWidth
          loading={isLoading}
          loadingIndicator="Loading..."
          // disabled={isLoading || isSubmitting}
        />
        {/* <AppGoogleLogin /> */}
      </FormProvider>

      <AppButton
        onClick={() => setShowLoginModal(true)}
        type="button"
        title={'Continue with Phone'}
        fullWidth
        sx={{ p: 2, mt: 3 }}
        size="large"
        variant="contained"
        themeColor="secondary"
        // className="mt-5"
      />

      <div className="text-center lg:text-left">
        <p className="mt-2 mb-0 pt-2 text-sm font-semibold">
          Don't have an account?
          <span
            className="cursor-pointer text-theme-primary-main transition duration-200 ease-in-out"
            onClick={() => setIsRegistered(false)}
          >
            &nbsp; Register
          </span>
        </p>
      </div>
      <AppModal
        open={showLoginModal}
        handleClose={() => {
          setShowLoginModal(false)
          setIsOtpSent(false)
        }}
        title={'Login'}
        maxWidth={'md'}
      >
        <div className="h-full w-80 md:w-96 p-5">
          {isOtpSent ? (
            <OTPValidation
              setUserDataInSlice={setUserDataInSlice}
              isOtpSent={isOtpSent}
              createOtp={createOtp}
              otpLoading={otpLoading}
              setShowLoginModal={setShowLoginModal}
              handleChangeUserVisit={() => {}}
              closeLoginModal={closeLoginModal}
            />
          ) : (
            <div>
              <div className="mb-6">
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      '&.Mui-focused fieldset legend': {},
                    },
                  }}
                  label="Enter Phone Number"
                  value={contactNo}
                  id="contact_no"
                  fullWidth
                  onChange={(e) => {
                    setContactNo(allowOnlyNumbers(e))
                  }}
                  onKeyDown={(e) => handleOnEnterSubmit(e)}
                  values={contactNo}
                />
              </div>
              <AppButton
                type="button"
                title="Send Code"
                variant="contained"
                size="large"
                themeColor="secondary"
                loading={otpLoading}
                loadingIndicator="Loading..."
                onClick={() => onOTPSend()}
                fullWidth
              />
            </div>
          )}
        </div>
      </AppModal>
    </div>
  )
}
