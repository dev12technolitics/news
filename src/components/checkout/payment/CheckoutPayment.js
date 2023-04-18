import PropTypes from 'prop-types'
import * as Yup from 'yup'
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import { Grid } from '@mui/material'
import FormProvider from 'src/components/hook-form'
//
import CheckoutSummary from '../CheckoutSummary'
import CheckoutAddressInfo from './CheckoutAddressInfo'
import CheckoutPaymentMethods from './CheckoutPaymentMethods'
import { IoIosArrowBack } from 'react-icons/io'
import { AppButton } from 'src/components/basics'
import { useCreateUserOrder } from 'src/services/orderServices'
import { useQueryClient } from '@tanstack/react-query'

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'cash on checkout delivery',
    title: 'Cash on Checkout Delivery',
    description: 'Pay with cash when your order is delivered.',
    icons: [],
  },
]

CheckoutPayment.propTypes = {
  cart: PropTypes.array,
  userType: PropTypes.string,
  userData: PropTypes.object,
  gstData: PropTypes.object,
  discountData: PropTypes.object,
  priceSummary: PropTypes.object,
  shippingAddress: PropTypes.object,
  billingAddress: PropTypes.object,
  onReset: PropTypes.func,
  onBackStep: PropTypes.func,
  onGotoStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onApplyShipping: PropTypes.func,
}

export default function CheckoutPayment({
  cart,
  userData,
  userType,
  gstData,
  discountData,
  priceSummary,
  onReset,
  shippingAddress,
  billingAddress,
  onNextStep,
  onBackStep,
  onGotoStep,
  // onApplyShipping,
}) {
  const queryClient = useQueryClient()
  const { createOrder, isLoading } = useCreateUserOrder()
  const { shipping } = cart
  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Payment is required!'),
  })

  const defaultValues = {
    delivery: shipping,
    payment: '',
  }

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      const payload = {
        ord_payid: '',
        ord_product: {
          cart,
        },
        ord_quantity: cart?.length,
        ord_value: priceSummary?.subtotal,
        ord_by: userData?.name,
        ord_status: 'new',
        payment_status: 0,
        payment_method: data?.payment,
        cust_id: userData?._id,
        cust_name: userData?.name,
        cust_email: userData?.email_id,
        cust_num: userData?.contact_no,
        firm_name: userData?.dist_com_name || '',
        cust_type: userType,
        deliv_city: shippingAddress?.city,
        ship_deliv_address: shippingAddress?._id,
        bill_deliv_address: billingAddress?._id,
        gst: gstData?.gst,
        gst_amt: (gstData?.gst * priceSummary?.subtotal) / 100,
        discount_name: discountData?.discount_name || '',
        discount_amt:
          discountData?.discount_type?.toLowerCase() == 'percent'
            ? (priceSummary?.subtotal * Number(discountData?.discount)) / 100
            : discountData?.discount || '',
        discount_type: discountData?.discount_type || '',
        discount_code: discountData?.discount_code || '',
      }
      createOrder(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries(['_createUserOrder'])
          onNextStep()
          onReset()
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <AppButton
        sx={{ mb: 1 }}
        size="small"
        color="inherit"
        onClick={onBackStep}
        startIcon={<IoIosArrowBack />}
        title={'Back'}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* shipping Address */}
              <CheckoutAddressInfo
                title={'Shipping Address'}
                onBackStep={onBackStep}
                address={shippingAddress}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* billing  Address */}
              <CheckoutAddressInfo
                title={'Billing Address'}
                onBackStep={onBackStep}
                address={billingAddress}
              />
            </Grid>
          </Grid>

          <CheckoutPaymentMethods
            cardOptions={[]}
            paymentOptions={PAYMENT_OPTIONS}
            sx={{ my: 3 }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary
            enableEdit
            total={priceSummary?.total}
            discount={priceSummary?.discount}
            subtotal={priceSummary?.subtotal}
            shipping={priceSummary?.shipping}
            gstValue={priceSummary?.gstValue}
            gstAmount={priceSummary?.gstAmount}
            onEdit={() => onGotoStep(0)}
          />
          <AppButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isLoading}
            loadingIndicator="Loading..."
            title="Complete Order"
          />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
