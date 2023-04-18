import { useState } from 'react'
import { GrAddCircle } from 'react-icons/gr'

import { AppButton, AppModal, AppDialog } from '../basics'
import {
  useDeleteUserAddressById,
  useGetAllAddressById,
} from 'src/services/addressServices'
import AddAddressForm from './AddressForm'

import LoadingScreen from '../basics/LoadingScreen'
import { Box, Stack, Typography } from '@mui/material'

export default function MyAddresses({ userData }) {
  // get all address
  const { data, isError, isLoading } = useGetAllAddressById(userData?._id)
  const { mutate } = useDeleteUserAddressById(userData?._id)
  //all states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddressFormModal, setShowAddressFormModal] = useState(false)
  const [oneAddress, setOneAddress] = useState()

  //address edit and delete modal
  const handleModalClose = () => {
    setShowAddressFormModal(false)
    setOneAddress(null)
  }
  const handleEditAddress = (item) => {
    setShowAddressFormModal(true)
    setOneAddress(item)
  }
  const handleDeleteAddress = (item) => {
    setOneAddress(item)
    setShowDeleteModal(true)
  }
  const handleSuccessDeleteAddress = (item) => {
    mutate(item?._id, {
      onSuccess: () => {
        setOneAddress(null)
        setShowDeleteModal(false)
      },
    })
  }
  if (isLoading) return <LoadingScreen />

  if (isError) return <div>Error</div>
  return (
    <Box className="w-full">
      <Box className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Box
          onClick={() => setShowAddressFormModal(true)}
          className="flex max-h-address-max min-h-address-min w-full items-center justify-center rounded-lg border border-theme-primary-main p-4 hover:cursor-pointer"
        >
          <Stack spacing={1}>
            <Stack className="mx-auto w-fit text-lg font-semibold">
              <GrAddCircle />
            </Stack>
            <Typography variant="subtitle1">Add Address</Typography>
          </Stack>
        </Box>
        {data?.map((item) => {
          return (
            <Address
              key={item?._id}
              item={item}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
            />
          )
        })}
      </Box>
      {/* edit address modal */}
      <AppModal
        title={'Address Form'}
        open={showAddressFormModal}
        handleClose={handleModalClose}
      >
        <AddAddressForm
          userId={userData?._id}
          isEdit={oneAddress?._id ? true : false}
          singleAddress={oneAddress}
          onClose={() => setShowAddressFormModal(false)}
        />
      </AppModal>
      {/* delete address dialog */}
      <AppDialog
        status={'warning'}
        message={'Are You Sure You want to Delete this Address ?'}
        title="Delete Address"
        open={showDeleteModal}
        onSuccess={() => handleSuccessDeleteAddress(oneAddress)}
        onClose={() => setShowDeleteModal(false)}
      />
    </Box>
  )
}

const Address = ({ item, handleDeleteAddress, handleEditAddress }) => {
  const {
    name,
    address_title,
    // other_title,
    delivery_address,
    // city,
    contact_no,
  } = item
  return (
    <>
      <Box
        className="relative max-h-address-max min-h-address-min rounded-lg border border-theme-primary-main"
        sx={{
          p: 2,
        }}
      >
        <Stack
          spacing={2}
          alignItems={{
            md: 'flex-end',
          }}
          direction={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Stack flexGrow={1} spacing={1}>
            <Stack direction="row" alignItems="center" className="capitalize">
              <Typography variant="subtitle1">
                {name}
                <Box
                  component="span"
                  sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}
                  className="capitalize"
                >
                  ({address_title})
                </Box>
              </Typography>

              {/* {shipping_status && (
                <Typography color="info" sx={{ ml: 1 }}>
                  Default
                </Typography>
              )} */}
            </Stack>

            <Typography variant="body2" className="capitalize">
              {delivery_address}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {contact_no}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          flexShrink={0}
          sx={{ mt: 1 }}
          className="absolute left-0 bottom-3 w-full pl-3"
        >
          <AppButton
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => handleEditAddress(item)}
            title={'Edit'}
          />
          <AppButton
            variant="outlined"
            onClick={() => handleDeleteAddress(item)}
            title={'Delete'}
          />
        </Stack>
      </Box>
    </>
  )
}
