import { useMemo } from 'react'
import dummyImage from '../../assets/images/dummy_pic.png'
import Image from 'next/image'
import FormProvider from '../hook-form/FormProvider'
import { RHFTextField } from '../hook-form'
import { AppButton } from '../basics'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { useUpdateLoginUserById } from 'src/services/loginRegisterServices'
import { userDetails } from 'src/redux/slices/userSlice'
import { allowOnlyCharacters, allowOnlyNumbers } from 'src/utils/utils-fun'

export default function Myprofile({ userData, userType }) {
  //other functions
  const dispatch = useDispatch()

  //update api hook
  const { mutate, isLoading } = useUpdateLoginUserById()

  //form resolver schema
  const B2CUserFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email_id:
      userData?.pincode !== undefined &&
      Yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    contact_no:
      userData?.pincode !== undefined &&
      Yup.string()
        .max(10, 'Contact number must be only 10 digits')
        .min(10, 'Contact number must be atleast 10 digits')
        .required('Phone number is required'),
    pincode:
      userData?.pincode !== undefined &&
      Yup.string()
        .max(6, 'Pincode must be only 6 digits')
        .min(6, 'Pincode must be atleast 6 digits')
        .required('Pincode is required'),
    city:
      userData?.pincode !== undefined &&
      Yup.string().required('City is required'),
  })
  const B2BUserFormSchema = Yup.object().shape({
    dist_name: Yup.string().required('Retailer Name is required'),
    dist_com_name:
      userData?.pincode !== undefined &&
      Yup.string().required('Company Name is required'),
    dist_email:
      userData?.pincode !== undefined &&
      Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required'),
    dist_address: Yup.string().required('Address is required'),
    city:
      userData?.pincode !== undefined &&
      Yup.string().required('Ctiy is required'),
    pincode:
      userData?.pincode !== undefined &&
      Yup.string()
        .min(6, 'Pincode must be atleast 6 digits')
        .max(6, 'Pincode must be only 6 digits')
        .required('Pincode is required'),
    dist_contact:
      userData?.pincode !== undefined &&
      Yup.string()
        .min(10, 'Contact number must be atleast 10 digits')
        .max(10, 'Contact number must be only 10 digits'),
  })
  // default values
  const defaultValues = useMemo(
    () =>
      userType?.toLowerCase() === 'b2c'
        ? {
            name: userData?.name,
            email_id: userData?.email_id,
            contact_no: userData?.contact_no,
            pincode: userData?.pincode,
            city: userData?.city,
          }
        : {
            dist_name: userData?.dist_name,
            dist_com_name: userData?.dist_com_name,
            dist_email: userData?.dist_email,
            dist_contact: userData?.dist_contact,
            dist_address: userData?.dist_address,
            pincode: userData?.pincode,
            city: userData?.city,
          },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userType]
  )
  const methods = useForm({
    resolver: yupResolver(
      userType?.toLowerCase() === 'b2c' ? B2CUserFormSchema : B2BUserFormSchema
    ),
    defaultValues,
  })
  const {
    setValue,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods

  const handleUpdateUser = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500))
      if (userType?.toLowerCase() === 'b2c') {
        const payload = {
          _id: userData?._id,
          name: data?.name,
          contact_no: data?.contact_no,
          email_id: data?.email_id,
          city: data?.city,
          pincode: data?.pincode,
          password: userData?.password,
        }
        mutate(
          { formData: payload, userApi: 'customer' },
          {
            onSuccess: (data) => dispatch(userDetails(data?.data?.data)),
          }
        )
      } else {
        const payload = {
          _id: userData?._id,
          dist_name: data?.dist_name,
          dist_com_name: data?.dist_com_name,
          dist_contact: data?.dist_contact,
          dist_email: data?.dist_email,
          dist_address: data?.dist_address,
          city: data?.city,
          pincode: data?.pincode,
          password: userData?.password,
          ret_id: userData?.ret_id,
          view_status: userData?.view_status,
          status: userData?.status,
        }
        mutate(
          { formData: payload, userApi: 'retailer' },
          {
            onSuccess: (data) => dispatch(userDetails(data?.data?.data)),
          }
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="px-4">
      <div className="grid w-full grid-cols-1 py-7 md:grid-cols-3 md:py-12">
        <div className="h-full w-full px-4">
          <div className="flex w-full items-center justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full object-contain shadow-lg">
              <Image
                alt="user"
                fill
                src={dummyImage}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-5 md:mt-0">
          {userType?.toLowerCase() === 'b2c' ? (
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(handleUpdateUser)}
            >
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 md:px-4 lg:grid-cols-2">
                <RHFTextField
                  variant="outlined"
                  label="Full Name"
                  name={'name'}
                />
                <RHFTextField
                  variant="outlined"
                  onChange={(e) => {
                    setValue('contact_no', allowOnlyNumbers(e))
                  }}
                  label="Contact Number"
                  name={'contact_no'}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {userData?.email_id !== undefined && (
                  <>
                    <RHFTextField
                      variant="outlined"
                      label="Email Id"
                      name={'email_id'}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <RHFTextField
                      variant="outlined"
                      label="City"
                      name={'city'}
                      onChange={(e) => {
                        setValue('city', allowOnlyCharacters(e))
                      }}
                    />
                    <RHFTextField
                      variant="outlined"
                      onChange={(e) => {
                        setValue('pincode', allowOnlyNumbers(e))
                      }}
                      label="Pincode"
                      name={'pincode'}
                      InputProps={{
                        maxLength: 6,
                      }}
                    />
                  </>
                )}
              </div>
              <div className="flex justify-end py-7 md:px-3">
                <AppButton
                  variant="contained"
                  title={'update'}
                  type="submit"
                  loading={isLoading}
                  loadingIndicator="Loading..."
                />
              </div>
            </FormProvider>
          ) : (
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(handleUpdateUser)}
            >
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 md:px-4 lg:grid-cols-2">
                <RHFTextField
                  variant="outlined"
                  label="Full Name"
                  name={'dist_name'}
                />
                <RHFTextField
                  variant="outlined"
                  onChange={(e) => {
                    setValue('dist_contact', allowOnlyNumbers(e))
                  }}
                  label="Contact Number"
                  name={'dist_contact'}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {userData?.dist_email !== undefined && (
                  <>
                    <RHFTextField
                      variant="outlined"
                      label="Company Name"
                      name={'dist_com_name'}
                    />
                    <RHFTextField
                      variant="outlined"
                      label="Email Id"
                      name={'dist_email'}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <RHFTextField
                      variant="outlined"
                      label="Full Address"
                      name={'dist_address'}
                    />
                    <RHFTextField
                      variant="outlined"
                      label="City"
                      name={'city'}
                      onChange={(e) => {
                        setValue('city', allowOnlyCharacters(e))
                      }}
                    />
                    <RHFTextField
                      variant="outlined"
                      onChange={(e) => {
                        setValue('pincode', allowOnlyNumbers(e))
                      }}
                      label="Pincode"
                      name={'pincode'}
                      InputProps={{
                        maxLength: 6,
                      }}
                    />
                  </>
                )}
              </div>
              <div className="flex justify-end py-7 md:px-3">
                <AppButton
                  variant="contained"
                  title={'update'}
                  type="submit"
                  loading={isLoading}
                  loadingIndicator="Loading..."
                />
              </div>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  )
}
