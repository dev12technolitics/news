/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types'
import { Page, View, Text, Document, Image } from '@react-pdf/renderer'
// utils
import { formatCurrency } from 'src/utils/utils-fun'
import styles from './InvoiceStyle'
import { AppData } from 'src/data/app-data'
import moment from 'moment'
// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object,
}

export default function InvoicePDF({
  invoice,
  billingAddress,
  shippingAddress,
}) {
  const {
    ord_status,
    discount_amt,
    ord_date,
    ord_id,
    ord_value,
    cust_type,
    // bill_deliv_address,
    // ship_deliv_address,
    ord_product,
    gst,
    gst_amt,
  } = invoice
  const { shopName, shopAddress, shopContactNo, shopEmail } =
    AppData?.webSiteData
  const totalPrice = Number(ord_value) + Number(gst) - Number(discount_amt)

  

  return (
    <Document>
      <Page size="A4">
        <View style={[styles.gridContainer, styles.mb40, styles.paddingPage]}>
          <Image source="/logo/logo.png" style={{ height: 40, width: 115 }} />
        </View>
        <View style={[styles.gridContainer, styles.mb40, styles.paddingPage]}>
          <View>
            <Text style={[styles.subtitle3, styles.capitalize]}>
              {shopName}
            </Text>
            <Text style={[styles.subtitle3, styles.capitalize]}>
              {shopAddress}
            </Text>
            <Text style={styles.subtitle3}>{shopEmail}</Text>
            <Text style={styles.subtitle3}>Phone: {shopContactNo}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.statusId}>{ord_status}</Text>
            <Text style={styles.h3}>{ord_id}</Text>
            <Text style={[styles.subtitle3]}>
              {moment(ord_date)?.format('MMMM DD, yyyy')}{' '}
            </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40, styles.paddingPage]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8, styles.subtitle4]}>
              Shipping Address
            </Text>
            <Text style={styles.subtitle3}>{shippingAddress?.name}</Text>
            <Text style={styles.subtitle3}>
              {shippingAddress?.delivery_address}
            </Text>
            <Text style={styles.subtitle3}>
              Phone: {shippingAddress?.contact_no}
            </Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8, styles.subtitle4]}>
              Billing Address
            </Text>
            <Text style={styles.subtitle3}>{billingAddress?.name}</Text>
            <Text style={styles.subtitle3}>
              {billingAddress?.delivery_address}
            </Text>
            <Text style={styles.subtitle3}>
              Phone: {billingAddress?.contact_no}
            </Text>
          </View>
        </View>

        <View style={(styles.table, styles.paddingPage)}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle4}>#</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle4}>Product</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle4}>Qty</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle4}>Unit price</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle4}>Total</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={(styles.tableBody, styles.paddingPage)}>
          <View style={styles.tableHeader}>
            {ord_product?.cart?.map((row, index) => (
              <View style={styles.tableRow} key={row._id}>
                <View style={styles.tableCell_1}>
                  <Text style={styles.subtitle3}>{index + 1}</Text>
                </View>
                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle3}>{row?.title}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle3}>{row?.quantity}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle3}>
                    {' '}
                    {"₹" + formatCurrency(
                      row?.[`${cust_type}Rows`][0]?.perProductPrice
                    )?.slice(1)}
                  </Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.subtitle3}>
                    {' '}
                    {"₹" + formatCurrency(
                      row?.[`${cust_type}Rows`][0]?.perProductPrice *
                        row.quantity
                    )?.slice(1)}
                  </Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle3}>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={[styles.subtitle3]}>
                  {' '}
                  {"₹" + formatCurrency(ord_value)?.slice(1)}
                </Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle3}>Discount</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={[styles.subtitle3]}>
                  {(discount_amt && "₹" + formatCurrency(-discount_amt))?.slice(1) || 0}
                </Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle3}>
                  Taxes{` (${gst && gst + '%'})`}
                </Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle3}>
                  {gst && "₹" + formatCurrency(gst_amt)?.slice(1)}
                </Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h3}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h3}>{"₹" + formatCurrency(totalPrice)?.slice(1)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col6}>
            <Text style={styles.subtitle3}>NOTES</Text>
            <Text style={styles.subtitle2}>Thank You For Your Business!</Text>
          </View>
          <View style={[styles.col6, styles.alignRight]}>
            <Text style={styles.subtitle3}>Have a Question?</Text>
            <Text style={styles.subtitle2}>{shopEmail}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
