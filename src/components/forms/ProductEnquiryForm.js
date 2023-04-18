import { Box, Stack } from '@mui/material'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppButton } from '../basics'
import { RHFTextField } from '../hook-form'
import FormProvider from '../hook-form/FormProvider'
import { useCreateProductEnquiry } from 'src/services/contactServices'
import { allowOnlyNumbers } from 'src/utils/utils-fun'

function ProductEnquiryForm({ _id, closeEnquiryModal, userData, userType }) {
  const { mutate, isLoading } = useCreateProductEnquiry()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const ContactUsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    emailId: Yup.string()
      .email('Email must be a valid email address')
      .notRequired(),
    contactNo: Yup.string()
      .min(10, 'Contact number must be atleast 10 digits')
      .max(10, 'Contact number must be only 10 digits')
      .matches(phoneRegExp, 'Contact number is not valid'),
  })

  const defaultValues = useMemo(
    () => ({
      productId: '',
      name: userData?.name || userData?.dist_name || '',
      contactNo: userData?.contact_no || userData?.dist_contact || '',
      emailId: '',
      message: '',
      userType: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userData]
  )

  const methods = useForm({
    resolver: yupResolver(ContactUsSchema),
    defaultValues,
  })

  const {
    reset,
    setValue,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods

  // const values = watch()
  const onSubmit = async (data) => {
    const payload = {
      productId: _id,
      userType: userType,
      name: data?.name,
      contactNo: data?.contactNo,
      emailId: data?.emailId,
      message: data?.message,
    }
    mutate(payload, {
      onSuccess: () => {
        reset()
        closeEnquiryModal()
      },
    })
  }
  return (
    <Box pb={3} px={2} pt={1}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RHFTextField
            sx={{ background: 'white', borderRadius: '8px' }}
            name="name"
            label="Your Name"
          />
          <RHFTextField
            sx={{ background: 'white', borderRadius: '8px' }}
            name="contactNo"
            label="Contact No."
            InputProps={{
              maxLength: 10,
              minLength: 10,
              inputMode: 'numeric',
              min: 10,
              max: 10,
            }}
            onChange={(e) => {
              setValue('contactNo', allowOnlyNumbers(e))
            }}
          />
          <RHFTextField
            sx={{ background: 'white', borderRadius: '8px' }}
            name="emailId"
            label="Email Id"
          />
          <RHFTextField
            multiline
            rows={5}
            name="message"
            label="Message"
            sx={{ background: 'white', borderRadius: '8px', height: 'auto' }}
          />
        </Stack>

        <div className="mt-8">
          <AppButton
            type="submit"
            size="large"
            variant="contained"
            themeColor="secondary"
            title=" Send Message"
            loading={isLoading}
            loadingIndicator="Loading..."
            fullWidth
          />
        </div>
      </FormProvider>
    </Box>
  )
}

export default ProductEnquiryForm
