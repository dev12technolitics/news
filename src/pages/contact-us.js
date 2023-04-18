import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { AppButton } from 'src/components/basics'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from 'src/components/hook-form/FormProvider'
import { useForm } from 'react-hook-form'
import { RHFTextField } from 'src/components/hook-form'
import { useCreateContactEnquiry } from 'src/services/contactServices'
import { allowOnlyCharacters, allowOnlyNumbers } from 'src/utils/utils-fun'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import GlobalSEO, { SITE_LOGO, SITE_URL } from '../data/next-seo.data'
import { Box, Stack } from '@mui/system'
import { ContactBranch, ContactInfo } from 'src/components/contact'
import { FadeRight } from 'src/components/animate'
// ----------------------------------------------------------------------
// export const config = {
//   // eslint-disable-next-line camelcase
//   unstable_runtimeJS: false,
// }
ContactUs.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
}

export default function ContactUs() {
  const { mutate, isLoading } = useCreateContactEnquiry()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const ContactUsSchema = Yup.object().shape({
    your_name: Yup.string().required('Name is required'),
    email_id: Yup.string()
      .email('Email must be a valid email address')
      .notRequired(),
    contect_no: Yup.string()
      .min(10, 'Contact number must be atleast 10 digits')
      .max(10, 'Contact number must be only 10 digits')
      .matches(phoneRegExp, 'Contact number is not valid'),
    city: Yup.string().required('City is required'),
  })

  const defaultValues = useMemo(
    () => ({
      your_name: '',
      contect_no: '',
      city: '',
      email_id: '',
      remarks: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const methods = useForm({
    resolver: yupResolver(ContactUsSchema),
    defaultValues,
  })

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  // const values = watch()

  const onSubmit = async (data) => {
    const payload = {
      your_name: data?.your_name,
      contect_no: data?.contect_no,
      city: data?.city,
      email_id: data?.email_id,
      remarks: data?.remarks,
    }
    mutate(payload, {
      onSuccess: () => {
        reset()
      },
    })
  }
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO['/contact-us']} />
      <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
      <FadeRight durationTime={'1s'}>
        <div className="pt-0 sm:pt-10">
          <ContactInfo />
          <Stack>
            <section>
              <div className="pt-10  rounded-2xl px-6 h-full w-full sm:w-8/12 mx-auto text-gray-800">
                <div className="text-center capitalize w-full">
                  <h1 className=" font-robo font-medium text-lg md:text-3xl capitalize text-center">
                    Send Us
                  </h1>
                  <p className=" font-robo text-xs md:text-sm text-center mt-2 px-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Expedita quaerat unde quam dolor culpa veritatis inventore,
                    aut commodi eum veniam vel.
                  </p>
                </div>
                <div className="my-4 sm:my-20">
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Stack spacing={4}>
                      <div className=" grid grid-cols-1 gap-5 md:grid-cols-2">
                        <RHFTextField
                          sx={{ background: 'white', borderRadius: '8px' }}
                          name="your_name"
                          label="Your Name"
                        />
                        <RHFTextField
                          sx={{ background: 'white', borderRadius: '8px' }}
                          name="contect_no"
                          label="Contact No."
                          onChange={(e) => {
                            setValue('contect_no', allowOnlyNumbers(e))
                          }}
                        />
                        <RHFTextField
                          sx={{ background: 'white', borderRadius: '8px' }}
                          name="email_id"
                          label="Email Id"
                        />
                        <RHFTextField
                          name="city"
                          sx={{ background: 'white', borderRadius: '8px' }}
                          label="City"
                          onChange={(e) => {
                            setValue('city', allowOnlyCharacters(e))
                          }}
                        />
                      </div>
                      <RHFTextField
                        multiline
                        rows={6}
                        name="remarks"
                        label="Remarks"
                        sx={{ background: 'white', borderRadius: '8px' }}
                      />
                      <div className="flex justify-start">
                        <AppButton
                          type="submit"
                          size="large"
                          variant="contained"
                          title=" Send Message"
                          loading={isLoading}
                          loadingIndicator="Loading..."
                        />
                      </div>
                    </Stack>
                  </FormProvider>
                </div>
              </div>
            </section>
          </Stack>
          <ContactBranch />
        </div>
      </FadeRight>
    </>
  )
}
