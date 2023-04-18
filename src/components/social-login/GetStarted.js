import Image from 'next/image'
// import React from 'react'
import logopngOne from '../../assets/RoboPowerImages/mobile_getstarted_one.jpeg'
import logopngTwo from '../../assets/RoboPowerImages/mobile_getstarted_two.jpeg'
import logopngThree from '../../assets/RoboPowerImages/mobile_getstarted_three.jpeg'
import Logo from '../../assets/RoboPowerImages/logo.png'
import { AppButton, AppCarousel, AppModal } from '../basics'
import { useMemo, useState } from 'react'
import * as Yup from 'yup'
import FormProvider from '../hook-form/FormProvider'
import { useCreateOTPUser } from 'src/services/loginRegisterServices'
import { RHFTextField } from '../hook-form'
import { OTPValidation } from '../forms'
import { useDispatch } from 'react-redux'
import { login, userDetails } from 'src/redux/slices/userSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import api from 'src/services/api'
import { BiLockOpen } from 'react-icons/bi'
import { FiCornerUpRight } from 'react-icons/fi'
import RegistrationForm from '../forms/RegistrationForm'
import MobileNavbar from '../navbar/MobileNavbar'

export default function GetStarted({ handleChangeUserVisit }) {
  const dispatch = useDispatch()
  const { createOtp, isLoading } = useCreateOTPUser()

  const [toLogin, setToLogin] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isRegistered, setIsRegistered] = useState(true)

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const LoginFormSchema = Yup.object().shape({
    contact_no: Yup.string()
      .min(10, 'Contact number must be atleast 10 digits')
      .max(10, 'Contact number must be only 10 digits')
      .matches(phoneRegExp, 'Contact number is not valid'),
  })

  const defaultValues = useMemo(() => ({
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
        contact_no: data?.contact_no,
      }
      createOtp(payload, {
        onSuccess: (data) => {
          setIsOtpSent(true)
          setShowLoginModal(true)
          localStorage.setItem(
            'userOtpData',
            JSON.stringify(data?.data?.result)
          )
        },
      })
    } catch (error) {}
  }
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
  const handleSkipLogin = () => {
    handleChangeUserVisit()
    window.localStorage.setItem('loginUser', 'skip')
  }
  const Images = [logopngOne?.src, logopngTwo?.src, logopngThree?.src]
  const settings = {
    slidesToShow: 1,
    fade: false,
    vertical: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 300,
  }
  return (
    <>
      {toLogin ? (
        <section style={{ height: '90vh' }} className="w-screen">
          {isRegistered ? (
            <div className="h-full w-11/12 mx-auto my-auto flex items-center">
              <div className="my-auto">
                <div className="mx-auto w-fit">
                  <Image src={Logo} height={60} width={160} alt="logo" />
                </div>
                <div className="w-full mt-7">
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <RHFTextField
                      name="contact_no"
                      variant="outlined"
                      label="Enter Contact No."
                      fullWidth
                      inputProps={{ inputMode: 'numeric' }}
                    />
                    <AppButton
                      onClick={() => setToLogin(true)}
                      variant="outlined"
                      className="mt-7 text-theme-secondary border border-theme-secondary"
                      size="large"
                      type="submit"
                      loading={isLoading}
                      loadingIndicator="Loading..."
                      title={'Continue with OTP'}
                      fullWidth
                    />
                  </FormProvider>
                  <AppButton
                    onClick={() => handleSkipLogin()}
                    variant="contained"
                    className="mt-7 bg-theme-secondary"
                    title={'Continue as Guest'}
                    size="large"
                    fullWidth
                  />
                  <p className="text-xs text-center mt-7">
                    New to RobotPower Tools?{' '}
                    <span
                      className="text-theme-primary-main hover:cursor-pointer"
                      onClick={() => setIsRegistered(false)}
                    >
                      Register Now
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-screen overflow-hidden">
              <MobileNavbar />
              <div className="pt-16 w-11/12 mx-auto">
                <p className="mt-2 mb-5 pt-2 text-xl font-bold capitalize sm:text-2xl">
                  register
                </p>
                <RegistrationForm setIsRegistered={setIsRegistered} />
              </div>
            </div>
          )}
          <AppModal
            open={showLoginModal}
            handleClose={() => {
              setShowLoginModal(false)
              setIsOtpSent(false)
            }}
            title={'Login'}
            fullWidth
          >
            <div className="h-full p-5">
              <OTPValidation
                setUserDataInSlice={setUserDataInSlice}
                isOtpSent={isOtpSent}
                createOtp={createOtp}
                otpLoading={isLoading}
                setShowLoginModal={setShowLoginModal}
                handleChangeUserVisit={handleChangeUserVisit}
                closeLoginModal={() => {}}
              />
            </div>
          </AppModal>
        </section>
      ) : (
        <section className=" flex items-center justify-center">
          <div className="w-full">
            <AppCarousel {...settings}>
              {Images?.map((item, index) => {
                return (
                  <div className="relative aspect-square w-full" key={index}>
                    <Image
                      priority
                      src={item}
                      alt="Picture of the author"
                      fill
                      className="object-cover w-full"
                    />
                  </div>
                )
              })}
            </AppCarousel>
            <div className="flex justify-center my-7">
              <div>
                <p className=" text-[#464646] font-robo w-full items-center text-3xl font-medium text-center my-auto">
                  Robot Power Tools
                </p>
                <h4 className="font-robo text-center  px-6 text-lg text-gray opacity-40">
                  Empowering the future of work with cutting-edge technology!
                </h4>
              </div>
            </div>
            <div className="w-10/12 mx-auto">
              <AppButton
                endIcon={<BiLockOpen size={23} />}
                onClick={() => setToLogin(true)}
                variant="outlined"
                className="mt-5"
                size="large"
                title={'Login'}
                fullWidth
              />
              <AppButton
                endIcon={<FiCornerUpRight size={23} />}
                onClick={() => handleChangeUserVisit()}
                variant="contained"
                className="mt-5"
                size="large"
                title={'Skip'}
                fullWidth
              />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
