import PropTypes from 'prop-types'
// @mui
import { Divider, Typography, Stack } from '@mui/material'
// components
import cartSuccess from '../../assets/images/cart_success.png'
import { AppButton, AppModal } from '../basics'
import { BsArrowLeft, BsDownload } from 'react-icons/bs'
import Image from 'next/image'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

CheckoutOrderComplete.propTypes = {
  open: PropTypes.bool,
  onReset: PropTypes.func,
  onDownloadPDF: PropTypes.func,
}

export default function CheckoutOrderComplete({ open, onDownloadPDF }) {
  const { push } = useRouter()

  return (
    <AppModal maxWidth={'sm'} fullWidth open={open}>
      <Stack
        // spacing={3, 'auto'}
        sx={{
          // m: 'auto',
          // maxWidth: 480,
          textAlign: 'center',
          px: { xs: 2, sm: 0, md: 2 },
          py: { xs: 2, sm: 0, md: 2 },
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Thank you for your order!
        </Typography>

        {/* <OrderCompleteIllustration sx={{ height: 260 }} /> */}
        <Box sx={{ mb: 2 }} className="relative mx-auto aspect-square w-48">
          <Image
            src={cartSuccess}
            alt="cart success image"
            fill
            className="object-cover"
          />
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          justifyContent="center"
          direction={{ xs: 'column-reverse', sm: 'row' }}
        >
          <AppButton
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={() => push('/p')}
            startIcon={<BsArrowLeft />}
            title={'Continue Shopping'}
          />

          {/* <AppButton
            fullWidth
            size="large"
            variant="contained"
            endIcon={<BsDownload />}
            onClick={onDownloadPDF}
            title={'Download Invoice'}
          /> */}
        </Stack>
      </Stack>
    </AppModal>
  )
}
