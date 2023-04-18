import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { RHFTextField } from 'src/components/hook-form'
import { useCreateRegisterUser } from 'src/services/loginRegisterServices'
import { allowOnlyCharacters, allowOnlyNumbers } from 'src/utils/utils-fun'
import * as Yup from 'yup'
import { AppButton } from '../basics'
import FormProvider from '../hook-form'
// import { AppGoogleLogin } from '../social-login/AppGoogleLogin'

const RegistrationForm = ({ setIsRegistered }) => {
  const { mutate, isLoading } = useCreateRegisterUser()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const RegistrationFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email_id: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    pincode: Yup.string()
      .min(6, 'Contact number must be atleast 6 digits')
      .max(6, 'Contact number must be only 6 digits')
      .required('Pincode is required'),
    city: Yup.string().required('City is required'),
    contact_no: Yup.string()
      .min(10, 'Contact number must be atleast 10 digits')
      .max(10, 'Contact number must be only 10 digits')
      .matches(phoneRegExp, 'Contact number is not valid'),
    password: Yup.string().required('Password is required'),
  })

  const defaultValues = useMemo(() => ({
    name: '',
    password: '',
    city: '',
    pincode: '',
    contact_no: '',
    email_id: '',
  }))

  const methods = useForm({
    resolver: yupResolver(RegistrationFormSchema),
    defaultValues,
  })

  const {
    reset,
    setValue,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods

  const onSubmit = (data) => {
    const payload = {
      name: data?.name,
      password: data?.password,
      cust_type: 'b2c',
      city: data?.city,
      pincode: data?.pincode,
      contact_no: data?.contact_no,
      email_id: data?.email_id,
    }
    mutate(payload, {
      onSuccess: () => {
        reset()
        setIsRegistered(true)
      },
    })
  }

  // const responseGoogle = (response) => {
  //   console.log(response)
  // }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <section>
          <div className="h-full w-full text-gray-800">
            <div className="mb-6">
              <Stack spacing={3}>
                <RHFTextField name="name" label="Name" />
                <RHFTextField
                  name="contact_no"
                  label="Contact Number"
                  onChange={(e) => {
                    setValue('contact_no', allowOnlyNumbers(e))
                  }}
                />
                <RHFTextField name="email_id" label="Email" type="email" />
                <RHFTextField
                  name="city"
                  label="City"
                  onChange={(e) => {
                    setValue('city', allowOnlyCharacters(e))
                  }}
                />
                <RHFTextField name="pincode" label="Pincode" />
                <RHFTextField
                  name="password"
                  type="password"
                  label="Password"
                />
              </Stack>
            </div>
            <div className="mb-24 text-center md:mb-0 lg:text-left">
              <AppButton
                type="submit"
                size="large"
                title="Register now"
                variant="contained"
                themeColor="secondary"
                fullWidth
                loading={isLoading}
                loadingIndicator="Loading..."
              />
              {/* <AppGoogleLogin /> */}
              <p className="mt-2 mb-0 pt-2 text-sm font-semibold">
                Already have an account?
                <span
                  className="cursor-pointer text-theme-primary-main transition duration-200 ease-in-out"
                  onClick={() => setIsRegistered(true)}
                >
                  &nbsp; Sign in
                </span>
              </p>
            </div>
          </div>
        </section>
      </Stack>
    </FormProvider>
  )
}

export default RegistrationForm
