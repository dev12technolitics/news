import { useMemo } from 'react'
import PropTypes from 'prop-types'
// @mui
import {
  Box,
  Card,
  Stack,
  Divider,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
} from '@mui/material'
// utils
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { formatCurrency } from '../../utils/utils-fun'
import { AppButton } from '../basics'
import { MdEditNotifications } from 'react-icons/md'
import { RHFTextField } from '../hook-form'
import FormProvider from '../hook-form/FormProvider'

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  onEdit: PropTypes.func,
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  gstAmount: PropTypes.number,
  gstValue: PropTypes.number,
  enableEdit: PropTypes.bool,
  enableDiscount: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
}

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping,
  gstValue,
  gstAmount,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
}) {
  // form
  const DiscountFormSchema = Yup.object().shape({
    discount_code: Yup.string().required('Please Enter Discount Code!'),
  })
  const defaultValues = useMemo(() => ({
    discount_code: '',
  }))

  const methods = useForm({
    resolver: yupResolver(DiscountFormSchema),
    defaultValues,
  })
  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods
  const displayShipping = shipping !== null ? 'Free' : '-'

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Order Summary"
        action={
          enableEdit && (
            <AppButton
              size="small"
              onClick={onEdit}
              startIcon={<MdEditNotifications />}
              title={'Edit'}
            />
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">
              {formatCurrency(subtotal)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant="subtitle2">
              {discount ? formatCurrency(-discount) : '-'}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              GST&nbsp;
              {`(${gstValue && gstValue + '%'})`}
            </Typography>
            <Typography variant="subtitle2">
              {gstValue ? formatCurrency(gstAmount) : '-'}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Shipping
            </Typography>
            <Typography variant="subtitle2">
              {shipping ? formatCurrency(shipping) : displayShipping}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {formatCurrency(total)}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (Included all applicable GST)
              </Typography>
            </Box>
          </Stack>

          {enableDiscount && onApplyDiscount && (
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onApplyDiscount)}
            >
              <Stack display={'flex'}>
                <RHFTextField
                  placeholder="Discount codes / Gifts"
                  name="discount_code"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AppButton
                          type="submit"
                          sx={{ mr: -0.5 }}
                          title={'Apply'}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </FormProvider>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
