import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment/moment'
import { AppButton, AppModal, ErrorScreen } from '../basics'
import { useGetAllOrderById } from 'src/services/orderServices'
import { formatCurrency, getProductImages } from 'src/utils/utils-fun'
import InvoiceDetails from '../invoice/details'
import LoadingScreen from '../basics/LoadingScreen'
import NoItemsInAccount from './NoItemsInAccount'
import InvoicePDF from '../invoice/details/InvoicePDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import api from 'src/services/api'
// import OrderDetails from "./orderDetails";

export default function OrderHistory({ userData, userType }) {
  const { data, isLoading, isError } = useGetAllOrderById(userData?._id)

  const [showModal, setShowModal] = useState(false)
  const [shippingAddress, setShippingAddress] = useState()
  const [billingAddress, setBillingAddress] = useState()
  const [invoice, setInvoice] = useState()
  const handleViewDetails = (item) => {
    setShowModal(true)
    setInvoice(item)
  }
  async function getSingleAddress(id, setState) {
    try {
      const res = await api.get(`/address/one/${id}`)
      console.log('res', res)
      if (res?.data?.status) {
        setState(res?.data?.address)
      }
    } catch (error) {
      console.log('err', error)
    }
  }
  useEffect(() => {
    if (invoice) {
      getSingleAddress(invoice?.ship_deliv_address, setShippingAddress)
      getSingleAddress(invoice?.bill_deliv_address, setBillingAddress)
    }
  }, [invoice])
  console.log('shippingAddress', shippingAddress, billingAddress)
  if (isLoading) return <LoadingScreen />
  if (isError) return <ErrorScreen />

  return (
    <>
      <div className="flex w-full justify-center">
        {data?.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((item, index) => {
              return (
                <OrderData
                  key={index}
                  item={item}
                  userType={userType}
                  handleViewDetails={handleViewDetails}
                />
              )
            })}
          </div>
        ) : (
          <NoItemsInAccount title="No Order history" />
        )}
      </div>
      {/* details modal  */}
      <AppModal
        maxWidth="sm"
        fullWidth
        open={showModal}
        handleClose={() => setShowModal(false)}
      >
        <InvoiceDetails invoice={invoice} />
        {/* <InvoicePDF invoice={invoice} /> */}
        <PDFDownloadLink
          document={
            <InvoicePDF
              invoice={invoice}
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
            />
          }
          fileName={'invoice.pdf'}
        >
          {() => (
            <AppButton
              variant="contained"
              title={'download invoice'}
              type={'button'}
            />
          )}
        </PDFDownloadLink>
      </AppModal>
    </>
  )
}
const OrderData = ({ item, userType, handleViewDetails }) => {
  const { ord_product } = item
  const image = ord_product?.cart[0]?.images?.values[0]?.url

  return (
    <Fragment>
      {Object?.values(ord_product)?.map((ord, idx) => {
        return (
          <Fragment key={idx}>
            <div className="w-full rounded-lg p-3 shadow-shadow-primary">
              <div className="grid w-full grid-cols-6">
                <div className="relative flex aspect-square w-full  animate-opacityAnimation items-center">
                  <Image
                    loading="lazy"
                    alt={ord[0]?.title}
                    fill
                    src={image || 'https://picsum.photos/seed/picsum/200/300'}
                    className={`h-full w-full overflow-hidden rounded-lg object-cover transition-all duration-500`}
                  />
                </div>
                <div className="col-span-3 pl-3">
                  <p className="mt-1 h-7 overflow-hidden text-base font-normal capitalize">
                    {ord[0]?.title}
                  </p>
                </div>
                <div className="col-span-2  box-border pt-2 text-right text-sm font-custom-500 tracking-wide text-theme-primary-main">
                  <span className="rounded-lg bg-light-grey p-1">
                    {item?.ord_status?.replaceAll('_', ' ')}
                  </span>
                </div>
              </div>
              <hr className="my-3" />
              <div>
                <div>
                  <div className="w-full text-sm font-custom-500 capitalize tracking-wider text-dark-grey">
                    order number
                  </div>
                  <div className="w-full pt-1 text-sm font-normal capitalize tracking-wide">
                    {item?.ord_id}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full text-sm font-custom-500 capitalize tracking-wider text-dark-grey">
                    total amount
                  </div>
                  <div className="w-full pt-1 text-sm font-normal capitalize tracking-wide">
                    {formatCurrency(
                      ord[0]?.[`${userType?.toLowerCase()}Rows`][0]
                        ?.perProductPrice
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full text-sm font-custom-500 capitalize tracking-wider text-dark-grey">
                    order date
                  </div>
                  <div className="w-full pt-1 text-sm font-normal capitalize tracking-wide">
                    {moment(item?.ord_date).format('MMMM DD, yyyy')}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <div className="w-fit">
                  <AppButton
                    variant="contained"
                    onClick={() => handleViewDetails(item)}
                    title={'view details'}
                    type={'button'}
                  />
                </div>
              </div>
            </div>
          </Fragment>
        )
      })}
    </Fragment>
  )
}

{
}
