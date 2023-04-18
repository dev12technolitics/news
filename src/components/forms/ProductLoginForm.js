import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import Link from 'next/link'
import { useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { RHFTextField } from 'src/components/hook-form'
import { AppData } from 'src/data/app-data'
import { login } from 'src/redux/slices/userSlice'
import * as Yup from 'yup'
import { AppButton } from '../basics'
import FormProvider from '../hook-form'
// import { AppGoogleLogin } from '../social-login/AppGoogleLogin'

export default function ProductLoginForm() {
  // const { loginMutation, data, isLoading } = useCreateLoginUser()
  const dispatch = useDispatch()
  const LoginFormSchema = Yup.object().shape({
    username: Yup.string().required('UserName is required'),
    password: Yup.string().required('Password is required'),
  })

  const defaultValues = useMemo(() => ({
    username: '',
    password: '',
  }))
  //save in redux persist
  useEffect(() => {
    if (data?.status) {
      const payload = {
        userAccessToken: data?.accessToken,
        userData: data?.user,
      }
      dispatch(login(payload))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  //forms
  const methods = useForm({
    resolver: yupResolver(LoginFormSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = () => {
    try {
      // const payload = {
      //   username: data?.username,
      //   password: data?.password,
      // }
      // loginMutation(payload)
    } catch (error) {}
  }

  // const responseGoogle = (response) => {}
  return (
    <div className="p-2 sm:p-5">
      <div className="text-center">
        <p className="mb-0 text-sm  font-bold capitalize sm:text-xl">
          UP TO <span className="text-theme-primary-main">30% OFF</span>
        </p>
        <p className="mt-2 mb-5 pt-2 text-sm font-bold capitalize sm:text-2xl">
          Sign up to{' '}
          <span className="text-theme-primary-main">
            {AppData.webSiteData.shopName}
          </span>
        </p>
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 w-full ">
          <Stack>
            <RHFTextField
              fullWidth
              name="contact_number"
              label="Mobile Number"
            />
          </Stack>
        </div>

        <AppButton
          type="submit"
          title="Login"
          variant="contained"
          themeColor="secondary"
          fullWidth
          disabled={isSubmitting}
        />
        {/* <AppGoogleLogin /> */}
      </FormProvider>
      <div className="text-center lg:text-left">
        <p className="mt-2 mb-0 pt-2 text-sm font-semibold">
          Don't have an account?
          <Link href={'/auth/registration'} legacyBehavior>
            <span className="cursor-pointer text-theme-primary-main transition duration-200 ease-in-out">
              &nbsp; Register
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}
