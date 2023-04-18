import PropTypes from 'prop-types'
// @mui
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
} from '@mui/material'
import { MdEditNotifications } from 'react-icons/md'
import { AppButton } from 'src/components/basics'

// ----------------------------------------------------------------------

CheckoutAddressInfo.propTypes = {
  billing: PropTypes.object,
  onBackStep: PropTypes.func,
}

export default function CheckoutAddressInfo({ title, address, onBackStep }) {
  const { name, contact_no, delivery_address, address_title } = address
  return (
    <div>
      <Card>
        <CardHeader
          title={title}
          action={
            <AppButton
              title="Edit"
              size="small"
              startIcon={<MdEditNotifications />}
              onClick={onBackStep}
            />
          }
        />
        <CardContent className="max-h-address-max min-h-address-min">
          <Typography variant="subtitle2" className="capitalize" gutterBottom>
            {name}&nbsp;
            <Typography
              component="span"
              variant="body2"
              sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
            >
              {`(${address_title})`}
            </Typography>
          </Typography>

          <Typography variant="body2" className="capitalize" gutterBottom>
            {delivery_address}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {contact_no}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
