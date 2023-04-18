import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { AppButton } from '../basics'
import {
  useCreateverifyOTPUser,
  useUpdateLoginUserById,
} from 'src/services/loginRegisterServices'
import { Stack, Typography } from '@mui/material'
import FormProvider from '../hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RHFTextField } from '../hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails } from 'src/redux/slices/userSlice'

function OTPValidation({
  setUserDataInSlice,
  setShowLoginModal,
  createOtp,
  otpLoading,
  isOtpSent,
  handleChangeUserVisit,
  closeLoginModal,
}) {
  const { createOtpVerify, verifyLoading } = useCreateverifyOTPUser()
  const [otp, setOtp] = useState(new Array(4).fill(''))
  const [counter, setCounter] = useState(60)
  const [resend, setResend] = useState(false)
  const [showNameField, setShowNameField] = useState(false)
  const [userOtpData, setUserOtpData] = useState()

  useEffect(() => {
    if (isOtpSent == true) {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000)
      } else {
        setResend(true)
      }
    }
  }, [counter, isOtpSent])
  useEffect(() => {
    setUserOtpData(JSON.parse(localStorage.getItem('userOtpData')))
  }, [resend])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false
    setOtp([...otp?.map((d, idx) => (idx === index ? element.value : d))])
    if (element.value != '' && element.nextSibling) {
      element.nextSibling.focus()
    }
    if (element.value == '' && element.previousSibling != null) {
      element.previousSibling.focus()
    }
  }

  const handleResend = () => {
    try {
      const payload = {
        contact_no: userOtpData?.contact_no,
      }
      createOtp(payload, {
        onSuccess: (data) => {
          localStorage.setItem(
            'userOtpData',
            JSON.stringify(data?.data?.result)
          )
          setResend(false)
          setCounter(60)
        },
      })
    } catch (error) {}
  }
  const handleVerifyOtpFun = () => {
    if (userOtpData?.otp == otp?.join('')) {
      try {
        const payload = {
          contact_no: userOtpData?.contact_no,
          otp: otp.join(''),
        }
        createOtpVerify(payload, {
          onSuccess: (data) => {
            setUserDataInSlice(data?.data)
            if (userOtpData?.type === 'Registration') {
              setShowNameField(true)
            } else {
              setShowLoginModal(false)
              handleChangeUserVisit()
              closeLoginModal()
            }
          },
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleEnterFun = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.which === 13) {
      e.preventDefault()
      handleVerifyOtpFun()
    }
  }
  return (
    <div>
      {showNameField ? (
        <UpdateUserName
          setShowLoginModal={setShowLoginModal}
          handleChangeUserVisit={handleChangeUserVisit}
          closeLoginModal={closeLoginModal}
        />
      ) : (
        <Box>
          <div className="flex justify-center">
            <Typography mb={2} variant="subtitle1">
              Enter OTP
            </Typography>
          </div>
          <div className="mx-auto w-full">
            <div className=" flex justify-center">
              {otp?.map((data, index) => {
                return (
                  <input
                    inputMode={'numeric'}
                    readOnly={resend ? true : false}
                    type="text"
                    name="otp"
                    maxLength="1"
                    className="m-1 h-14 w-14 rounded-xl border border-slate-300 bg-white text-center text-lg shadow-md focus:outline-none"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleEnterFun(e)}
                  />
                )
              })}
            </div>

            {resend == false && (
              <Typography
                mt={2}
                variant="subtitle1"
                sx={{ textAlign: 'center' }}
              >
                {`00:${counter < 10 ? '0' : ''}` + counter}
              </Typography>
            )}
            <div className="mt-7  flex w-full justify-center">
              <div className="mr-2">
                <AppButton
                  variant="contained"
                  size="large"
                  type={'button'}
                  title={'Clear'}
                  themeColor="secondary"
                  onClick={(e) => setOtp([...otp?.map((v) => '')])}
                />
              </div>
              {resend ? (
                <AppButton
                  variant="outlined"
                  themeColor="secondary"
                  size="large"
                  onClick={handleResend}
                  loading={otpLoading}
                  type={'button'}
                  title={'Resend'}
                />
              ) : (
                <AppButton
                  type={'button'}
                  title={'Verify'}
                  variant="outlined"
                  loading={verifyLoading}
                  themeColor="secondary"
                  disabled={otp?.length < 4}
                  onClick={handleVerifyOtpFun}
                />
              )}
            </div>
          </div>
        </Box>
      )}
    </div>
  )
}

export default OTPValidation

export const UpdateUserName = ({
  setShowLoginModal,
  closeLoginModal,
  handleChangeUserVisit,
}) => {
  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { mutate, isLoading } = useUpdateLoginUserById()
  const LoginFormSchema = Yup.object().shape({
    name: Yup.string().required('UserName is required'),
  })
  const defaultValues = useMemo(() => ({
    _id: '',
    name: '',
    contact_no: '',
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
        _id: userData?._id,
        name: data?.name,
        contact_no: userData?.contact_no,
      }
      mutate(
        { formData: payload, userApi: 'customer' },
        {
          onSuccess: (data) => {
            reset()
            dispatch(userDetails(data?.data?.data))
            setShowLoginModal(false)
            handleChangeUserVisit()
            closeLoginModal()
          },
        }
      )
    } catch (error) {}
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFTextField name="name" variant="outlined" label="Username" />
        <AppButton
          variant="contained"
          themeColor="secondary"
          type="submit"
          fullWidth
          size="large"
          loading={isLoading}
          loadingIndicator="Loading..."
          title="Save And proceed"
        />
      </Stack>
    </FormProvider>
  )
}
