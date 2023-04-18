import PropTypes from 'prop-types'
// @mui
import { styled } from '@mui/material/styles'
import {
  Box,
  Card,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  Stack,
} from '@mui/material'
// utils
import Logo from '../../../assets/RoboPowerImages/logo.png'
// components
import { formatCurrency } from 'src/utils/utils-fun'
import Scrollbar from 'src/components/scrollbar/Scrollbar'
import Label from 'src/components/product/Label'
import Image from 'next/image'
import moment from 'moment'
import { AppData } from 'src/data/app-data'
import { useGetOneAddressById } from 'src/services/addressServices'

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}))

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object,
}

export default function InvoiceDetails({ invoice }) {
  if (!invoice) {
    return null
  }
  const {
    ord_status,
    discount_amt,
    ord_date,
    ord_id,
    ord_value,
    cust_type,
    bill_deliv_address,
    ship_deliv_address,
    ord_product,
    gst,
    gst_amt,
  } = invoice
  const { shopName, shopAddress, shopContactNo, shopEmail } =
    AppData?.webSiteData
  const totalPrice = Number(ord_value) + Number(gst_amt) - Number(discount_amt)
  return (
    <Card sx={{ pt: 3, px: 3 }}>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
          <Image
            height={40}
            width={115}
            alt="logo"
            src={Logo}
            // sx={{ maxWidth: 120 }}
          />

          {/* <Typography variant="body2" className="capitalize">
              {shopName}
            </Typography> */}

          <Typography variant="body2" className="capitalize text-xs">
            {shopAddress}
          </Typography>

          <Typography variant="body2" className="capitalize text-xs">
            Phone: {shopContactNo}
          </Typography>
          <Typography variant="body2" className="text-xs">
            {shopEmail}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
          <Box sx={{ textAlign: { sm: 'right' } }}>
            <Label
              variant="soft"
              color={
                (ord_status === 'paid' && 'success') ||
                (ord_status === 'unpaid' && 'warning') ||
                (ord_status === 'overdue' && 'error') ||
                'default'
              }
              sx={{ textTransform: 'uppercase', mb: 1 }}
            >
              {ord_status}
            </Label>

            <Typography variant="h6">{ord_id}</Typography>
            <Typography variant="subtitle1">
              {moment(ord_date).format('MMMM DD, yyyy')}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
          <AddressDetails id={ship_deliv_address} title={'Shipping Address'} />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
          <AddressDetails id={bill_deliv_address} title={'Billing Address'} />
        </Grid>

        {/* <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: 'text.disabled' }}
            >
              Due date
            </Typography>

            <Typography variant="body2">{dueDate}</Typography>
          </Grid> */}
      </Grid>

      <TableContainer>
        {/* <Scrollbar> */}
        <Table>
          <TableHead
            sx={{
              borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
              '& th': { backgroundColor: 'transparent' },
            }}
          >
            <TableRow>
              <TableCell width={40}>#</TableCell>

              <TableCell align="left">Product</TableCell>

              <TableCell align="left">Qty</TableCell>

              <TableCell align="right">Unit price</TableCell>

              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ord_product?.cart?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <TableCell>{index + 1}</TableCell>

                <TableCell align="left">
                  <Box sx={{ maxWidth: 160 }}>
                    <Typography variant="subtitle2">{row?.title}</Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                      noWrap
                    >
                      {row?.[`${cust_type}Rows`][0]?.variantData?.map(
                        (variant, index) => {
                          return (
                            <Stack
                              key={index}
                              direction="row"
                              alignItems="center"
                              sx={{
                                typography: 'body2',
                                color: 'text.secondary',
                                textTransform: 'capitalize',
                              }}
                            >
                              {variant?.title}
                              {' :'}
                              <Typography
                                sx={{
                                  typography: 'subtitle2',
                                  ml: 0.5,
                                  textTransform: 'capitalize',
                                }}
                              >
                                {' '}
                                {variant?.value}{' '}
                              </Typography>
                              {/* <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} /> */}
                              {/* <ColorPreview /> */}
                            </Stack>
                          )
                        }
                      )}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell align="left">{row.quantity}</TableCell>

                <TableCell align="right">
                  {formatCurrency(
                    row?.[`${cust_type}Rows`][0]?.perProductPrice
                  )}
                </TableCell>

                <TableCell align="right">
                  {formatCurrency(
                    row?.[`${cust_type}Rows`][0]?.perProductPrice * row.quantity
                  )}
                </TableCell>
              </TableRow>
            ))}

            <StyledRowResult>
              <TableCell colSpan={3} />

              <TableCell align="right" sx={{ typography: 'body1' }}>
                <Box sx={{ mt: 2 }} />
                Subtotal
              </TableCell>

              <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                <Box sx={{ mt: 2 }} />
                {formatCurrency(ord_value)}
              </TableCell>
            </StyledRowResult>

            <StyledRowResult>
              <TableCell colSpan={3} />

              <TableCell align="right" sx={{ typography: 'body1' }}>
                Discount
              </TableCell>

              <TableCell
                align="right"
                width={120}
                sx={{ color: 'error.main', typography: 'body1' }}
              >
                {discount_amt ? formatCurrency(-discount_amt) : 0}
              </TableCell>
            </StyledRowResult>

            <StyledRowResult>
              <TableCell colSpan={3} />

              <TableCell align="right" sx={{ typography: 'body1' }}>
                GST&nbsp;
                {`(${gst && gst + '%'})`}
              </TableCell>

              <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                {gst && formatCurrency(gst_amt)}
              </TableCell>
            </StyledRowResult>

            <StyledRowResult>
              <TableCell colSpan={3} />

              <TableCell align="right" sx={{ typography: 'h6' }}>
                Total
              </TableCell>

              <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                {formatCurrency(totalPrice)}
              </TableCell>
            </StyledRowResult>
          </TableBody>
        </Table>
        {/* </Scrollbar> */}
      </TableContainer>

      {/* <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">NOTES</Typography>

            <Typography variant="body2">
              We appreciate your business. Should you need us to add VAT or
              extra notes let us know!
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Have a Question?</Typography>

            <Typography variant="body2">support@minimals.cc</Typography>
          </Grid>
        </Grid> */}
    </Card>
  )
}

const AddressDetails = ({ id, title }) => {
  const { data, isError, isLoading } = useGetOneAddressById(id)
  if (isLoading) return console.log('isLoading..')
  if (isError) return <h5>Error</h5>
  const { delivery_address, name, contact_no, email_id } = data
  return (
    <Stack>
      <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
        {title}
      </Typography>

      <Typography variant="body2" className="capitalize">
        {name}
      </Typography>

      <Typography variant="body2" className="capitalize">
        {delivery_address}
      </Typography>

      <Typography variant="body2" className="capitalize">
        Phone: {contact_no}
      </Typography>
    </Stack>
  )
}
