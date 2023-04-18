import PropTypes from 'prop-types'
import { useState } from 'react'
// @mui
import { Grid, Stack } from '@mui/material'
import CheckoutSummary from '../CheckoutSummary'
import { useDispatch } from 'react-redux'
import { AppButton, AppModal } from 'src/components/basics'
import { IoIosArrowBack } from 'react-icons/io'
import BillingAndShippingAccordion from './BillingAndShippingAccordion'
import AddAddressForm from 'src/components/my-account/AddressForm'
import {
  checkoutUserBillingAddress,
  checkoutUserShippingAddress,
} from 'src/redux/slices/cartSlice'

// ----------------------------------------------------------------------

CheckoutAddress.propTypes = {
  cart: PropTypes.object,
  userData: PropTypes.object,
  billingAddress: PropTypes.object,
  shippingAddress: PropTypes.object,
  priceSummary: PropTypes.object,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func,
}

export default function CheckoutAddress({
  userData,
  // cart,
  priceSummary,
  onNextStep,
  onBackStep,
  billingAddress,
  shippingAddress,
}) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [singleAddress, setSingleAddress] = useState()
  const [expanded, setExpanded] = useState('shippingAccordion')
  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const handleOpen = (item) => {
    setSingleAddress(item)
    setOpen(true)
  }
  const handleClose = () => {
    setSingleAddress({})
    setOpen(false)
  }
  const onCreateShipping = (address) => {
    if (billingAddress !== null) {
      dispatch(checkoutUserShippingAddress(address))
      onNextStep()
    } else {
      dispatch(checkoutUserShippingAddress(address))
      setExpanded('billingAccordion')
    }
  }
  const onCreateBilling = (address) => {
    if (shippingAddress !== null) {
      dispatch(checkoutUserBillingAddress(address))
      onNextStep()
    } else {
      dispatch(checkoutUserBillingAddress(address))
      setExpanded('shippingAccordion')
    }
  }
  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <AppButton
          size="small"
          color="inherit"
          onClick={onBackStep}
          startIcon={<IoIosArrowBack />}
          title={'Back'}
        />
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <BillingAndShippingAccordion
            expanded={expanded}
            userData={userData}
            shippingAddress={shippingAddress}
            handleOpen={handleOpen}
            handleChangeAccordion={handleChangeAccordion}
            onCreateShipping={onCreateShipping}
            onCreateBilling={onCreateBilling}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary
            total={priceSummary?.total}
            discount={priceSummary?.discount}
            subtotal={priceSummary?.subtotal}
            gstValue={priceSummary?.gstValue}
            gstAmount={priceSummary?.gstAmount}
          />
        </Grid>
      </Grid>

      <AppModal
        fullWidth
        maxWidth="sm"
        title={'Address Form'}
        open={open}
        handleClose={handleClose}
      >
        <AddAddressForm
          isEdit={singleAddress?._id ? true : false}
          singleAddress={singleAddress}
          userId={userData?._id}
          userData={userData}
          open={open}
          defaultStatusLabel={''}
          onClose={handleClose}
        />
      </AppModal>
    </>
  )
}

// ----------------------------------------------------------------------
