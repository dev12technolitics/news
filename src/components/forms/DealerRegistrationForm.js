import { useMemo } from 'react'
import { AppButton } from '../basics'
import * as Yup from 'yup'
import { RHFTextField } from '../hook-form'
import FormProvider from '../hook-form/FormProvider'
import { useCreateRetailerEnquiry } from 'src/services/contactServices'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { allowOnlyCharacters, allowOnlyNumbers } from 'src/utils/utils-fun'
import { useRouter } from 'next/router'

const DealerRegistrationForm = () => {
  const { push } = useRouter()
  const { createUser, isLoading } = useCreateRetailerEnquiry()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const RegistrationFormSchema = Yup.object().shape({
    dist_name: Yup.string().required('Retailer Name is required'),
    dist_com_name: Yup.string().required('Company Name is required'),
    dist_email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    dist_address: Yup.string().required('Address is required'),
    city: Yup.string().required('Ctiy is required'),
    pincode: Yup.string()
      .min(6, 'Pincode must be atleast 6 digits')
      .max(6, 'Pincode must be only 6 digits')
      .required('Pincode is required'),
    dist_contact: Yup.string()
      .required('Contact Number is required')
      .min(10, 'Contact number must be atleast 10 digits')
      .max(10, 'Contact number must be only 10 digits')
      .matches(phoneRegExp, 'Contact number is not valid'),
    password: Yup.string().required('Password is required'),
  })

  const defaultValues = useMemo(
    () => (
      {
        dist_name: '',
        dist_com_name: '',
        dist_address: '',
        password: '',
        city: '',
        pincode: '',
        dist_contact: '',
        dist_email: '',
      },
      []
    )
  )

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

  const onSubmitDealerForm = (data) => {
    const payload = {
      dist_name: data?.dist_name,
      dist_com_name: data?.dist_com_name,
      dist_address: data?.dist_address,
      password: data?.password,
      city: data?.city,
      pincode: data?.pincode,
      dist_contact: data?.dist_contact,
      dist_email: data?.dist_email,
    }
    createUser(payload, {
      onSuccess: () => {
        reset()
        push('/')
      },
    })
  }
  return (
    <div>
      <section className="">
        <div className="mx-auto max-w-screen-md py-2 px-4 lg:py-5">
          <h2 className="mb-4 text-center text-lg sm:text-4xl font-extrabold tracking-tight ">
            Become a Dealer
          </h2>
          <p className="mb-8 text-center font-light text-sm sm:text-base lg:mb-16">
            Want to become a dealer? Need details about our Business plan? Let
            us know.
          </p>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmitDealerForm)}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <RHFTextField
                name="dist_name"
                label="Retailer Name"
                variant="outlined"
              />
              <RHFTextField
                name="dist_com_name"
                label="Company Name"
                variant="outlined"
              />
              <RHFTextField
                name="dist_contact"
                label="Contact Number"
                variant="outlined"
                onChange={(e) => {
                  setValue('dist_contact', allowOnlyNumbers(e))
                }}
              />
              <RHFTextField
                name="dist_email"
                label="Email Address"
                variant="outlined"
              />
              <RHFTextField
                name="city"
                label="City"
                variant="outlined"
                onChange={(e) => {
                  setValue('city', allowOnlyCharacters(e))
                }}
              />
              <RHFTextField name="pincode" label="Pincode" variant="outlined" />
              <RHFTextField
                name="dist_address"
                label="Full Address"
                variant="outlined"
              />
              <RHFTextField
                name="password"
                label="Password"
                variant="outlined"
              />
            </div>
            <div className="mx-auto w-full md:w-3/5 mt-5">
              <AppButton
                // disabled={}
                fullWidth
                size="large"
                type="submit"
                title="Send message"
                variant="contained"
                loading={isLoading}
                loadingIndicator="Loading..."
                themeColor="secondary"
              />
            </div>
          </FormProvider>
        </div>
      </section>
    </div>
  )
}

export default DealerRegistrationForm
