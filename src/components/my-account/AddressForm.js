//--------------------------------------------
import { useEffect, useState, useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import {
  useCreateUserAddress,
  useUpdateUserAddressById,
} from 'src/services/addressServices'
import FormProvider from '../hook-form/FormProvider'
import { RHFTextField } from '../hook-form'
import { AppButton } from '../basics'
import { Box, Stack } from '@mui/system'
import { allowOnlyCharacters, allowOnlyNumbers } from 'src/utils/utils-fun'
import { useQueryClient } from '@tanstack/react-query'

export default function AddAddressForm({
  userId,
  userData,
  isEdit,
  singleAddress,
  // defaultStatusLabel,
  onClose,
}) {
  //add and update address mutations
  const { createUser, isLoading: createLoading } = useCreateUserAddress()
  const { updateUser, isLoading: updateLoading } = useUpdateUserAddressById()
  console.log('okk', createLoading, updateLoading)
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('home')
  useEffect(() => {
    if (isEdit) {
      setTitle(singleAddress?.address_title)
    }
  }, [isEdit, singleAddress])
  const addressTitle = ['home', 'work', 'other']
  // form
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const AddressFormSchema = Yup.object().shape({
    name: Yup.string().required('UserName is required'),
    contact_no: Yup.string()
      .required('Contact is required')
      .max(10, 'Contact number must be only 10 digits')
      .min(10, 'Contact number must be atleast 10 digits')
      .matches(phoneRegExp, 'Contact number is not valid'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string()
      .required('Pincode is required')
      .max(6, 'Pincode must be only 6 digits')
      .min(6, 'Pincode must be atleast 6 digits'),
    delivery_address: Yup.string().required('Address is required'),
  })
  const defaultValues = useMemo(() => ({
    cust_id: userId,
    _id: isEdit ? singleAddress?._id : '',
    name: isEdit
      ? singleAddress?.name
      : userData?.name || userData?.dist_name || '',
    contact_no: isEdit
      ? singleAddress?.contact_no
      : userData?.contact_no || userData?.dist_contact || '',
    address_title: isEdit ? singleAddress?.address_title : title,
    other_title: isEdit ? singleAddress?.other_title : '',
    city: isEdit ? singleAddress?.city : '',
    pincode: isEdit ? singleAddress?.pincode : '',
    delivery_address: isEdit ? singleAddress?.delivery_address : '',
  }))

  const methods = useForm({
    resolver: yupResolver(AddressFormSchema),
    defaultValues,
  })

  const {
    reset,
    setValue,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods

  const closeIt = () => {
    reset()
    onClose()
    queryClient.invalidateQueries(['_getAllAddressById'])
  }
  const onSubmitFun = async (data) => {
    try {
      const payload = {
        _id: defaultValues?._id,
        cust_id: userId,
        name: data?.name,
        contact_no: data?.contact_no,
        city: data?.city,
        pincode: data?.pincode,
        delivery_address: data?.delivery_address,
        address_title: title,
      }
      isEdit
        ? updateUser(payload, {
            onSuccess: () => closeIt(),
          })
        : createUser(payload, {
            onSuccess: () => closeIt(),
          })
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <div>
      <div className="relative mx-auto flex h-full w-full flex-col rounded-lg border-0 bg-white p-5">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitFun)}>
          <Stack spacing={3}>
            <Box
              sx={{ py: 1 }}
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField variant="outlined" name="name" label="Full Name" />
              <RHFTextField
                onChange={(e) => {
                  setValue('contact_no', allowOnlyNumbers(e))
                }}
                variant="outlined"
                name="contact_no"
                label="Contact Number"
              />
            </Box>
            <RHFTextField
              variant="outlined"
              name="delivery_address"
              label="Full Address"
            />
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Stack
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                {addressTitle?.map((item) => (
                  <AppButton
                    size="small"
                    key={item}
                    title={item}
                    variant={title == item ? 'contained' : 'outlined'}
                    onClick={() => setTitle(item)}
                  />
                ))}
              </Stack>
              {title?.toLowerCase() == 'other' && (
                <RHFTextField
                  variant="outlined"
                  name="other_title"
                  label="Other Title"
                />
              )}
            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                onChange={(e) => {
                  setValue('city', allowOnlyCharacters(e))
                }}
                variant="outlined"
                name="city"
                label="City"
              />
              <RHFTextField
                onChange={(e) => {
                  setValue('pincode', allowOnlyNumbers(e))
                }}
                variant="outlined"
                name="pincode"
                label="Pincode"
              />
            </Box>

            <Stack
              flexDirection={'row'}
              justifyContent={'flex-end'}
              alignItems={'center'}
            >
              <AppButton
                type="submit"
                variant="contained"
                loading={createLoading || updateLoading}
                loadingIndicator="Loading..."
                title="Save And Proceed"
              />
            </Stack>
          </Stack>
        </FormProvider>
      </div>
    </div>
  )
}
