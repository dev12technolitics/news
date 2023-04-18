import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AppModal, ErrorScreen } from 'src/components/basics'
import {
  addManualQuantityInCart,
  addToCart,
  decreaseQuantityInCart,
  increaseQuantityInCart,
} from 'src/redux/slices/cartSlice'
import { useGetProductById } from 'src/services/productServices'
import {
  Grid,
  Container,
  Typography,
  Tooltip,
  Stack,
  Skeleton,
} from '@mui/material'
import {
  ProductDetailsCarousel,
  ProductDetailsSummary,
  RelatedProducts,
} from 'src/components/product'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import { getImageForCart } from 'src/utils/utils-fun'
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { BiLink } from 'react-icons/bi'
import { ProductEnquiryForm } from 'src/components/forms'
import { AppData } from 'src/data/app-data'
import { FadeRight } from 'src/components/animate'

const ProductDetailCard = ({ url, currentLocation }) => {
  const { push } = useRouter()
  const dispatch = useDispatch()
  const { data, isLoading, isError } = useGetProductById(url)
  const { cartItems } = useSelector((state) => state.cart)
  const { userType, userData } = useSelector((state) => state.user)
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)

  useEffect(() => {
    const itemIndex = cartItems?.findIndex(
      (item) =>
        item?.[`${userType}Rows`][0]?.id == data?.[`${userType}Rows`][0]?.id
    )
    if (itemIndex >= 0) {
      setQuantity(cartItems[itemIndex]?.quantity)
    } else {
      setQuantity(1)
    }
  }, [cartItems, url, userType, data])

  const [quantity, setQuantity] = useState(1)
  const { shopContactNo } = AppData?.webSiteData

  const initialUrl = url?.split('&')[0]

  // if (isLoading) return <div/>

  if (isError) return <ErrorScreen />

  const handleVariantChange = (variantData, title, option) => {
    // making copy of the variant object
    let variants = { ...variantData }
    let newVariant = {
      title: title?.toLowerCase(),
      value: option?.toLowerCase(),
    }
    // finding index of the value to be replaced
    const index = variantData?.findIndex(
      (item) => item?.title?.toLowerCase() == title?.toLowerCase()
    )
    // replacing the new value in data
    variants[index] = newVariant
    // creating variant url
    const finalHalf = Object?.values(variants)
      ?.map((item) => {
        return `&${item?.title}=${item?.value}`
      })
      ?.join('')
    // linking both url together
    push(`${currentLocation}/${initialUrl + finalHalf}`)
  }
  const handleAddToCart = () => {
    const finalImagesForCart = getImageForCart(data, userType)
    let copyProductForCart = { ...data }
    copyProductForCart.images = finalImagesForCart[0]
    dispatch(
      addToCart({
        product: { ...copyProductForCart, quantity: quantity },
        userType: userType?.toLowerCase(),
      })
    )
    dispatch(handleToastOpen({ message: 'Added To Order', status: 'success' }))
  }
  const handleIncreaseQuantity = () => {
    dispatch(
      increaseQuantityInCart({
        product: data,
        userType: userType?.toLowerCase(),
      })
    )
    setQuantity(quantity + 1)
  }
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(
        decreaseQuantityInCart({
          product: data,
          userType: userType?.toLowerCase(),
        })
      )
      setQuantity(quantity - 1)
    }
  }
  const handleManualAddOfQuantity = (value) => {
    dispatch(
      addManualQuantityInCart({
        product: data,
        userType: userType?.toLowerCase(),
        quantity: Number(value) > 1 ? Number(value) : 1,
      })
    )
    setQuantity(Number(value) > 1 ? Number(value) : 1)
  }

  return (
    <>
      <FadeRight durationTime={'1s'}>
        <div className="my-20 sm:my-10">
          {/* <NextSeo
          
          title={'Herco Transformers || Products: ' + OneProduct?.title}
          openGraph={{
            title: OneProduct?.title,
            url: `https://www.hercotransformers.com/p/${nextStaticUrl}`,
            images: [
              {
                url: OneProduct?.images[0]?.values[0]?.url,
                width: 800,
                height: 600,
                alt: OneProduct?.title,
              },
            ],
          }}
        /> */}
          <ProductDetails
            isLoading={isLoading}
            data={data}
            userType={userType}
            quantity={quantity}
            handleVariantChange={handleVariantChange}
            handleAddToCart={handleAddToCart}
            increaseQuantity={handleIncreaseQuantity}
            decreaseQuantity={handleDecreaseQuantity}
            onManualAddOfQuantity={handleManualAddOfQuantity}
            userData={userData}
            handleproductEnquiry={() => setShowEnquiryModal(true)}
            telNumberIndia={shopContactNo}
            whatsppEnquireLink={`${currentLocation}/${url}`}
          />
          <div className=" w-full flex justify-center my-10 sm:my-20">
            <p className="font-robo font-medium text-center text-2xl border-theme-primary-main border-b-2 m-0">
              Related Products
            </p>
          </div>
          <RelatedProducts
            userType={userType}
            userData={userData}
            categoryId={data?.categoryIds}
            currentLocation={currentLocation}
          />
        </div>
        <AppModal
          open={showEnquiryModal}
          title={'Product Enquiry'}
          handleClose={() => setShowEnquiryModal(false)}
          fullWidth
          maxWidth={'xs'}
        >
          <ProductEnquiryForm
            userData={userData}
            userType={userType}
            _id={data?._id}
            closeEnquiryModal={() => setShowEnquiryModal(false)}
          />
        </AppModal>
      </FadeRight>
    </>
  )
}

export default ProductDetailCard

const ProductDetails = ({
  data,
  userType,
  quantity,
  handleVariantChange,
  handleAddToCart,
  increaseQuantity,
  decreaseQuantity,
  onManualAddOfQuantity,
  handleproductEnquiry,
  whatsppEnquireLink,
  telNumberIndia,
  isLoading,
}) => {
  const [tooltip, setTooltip] = useState(false)
  const handleCopyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    setTooltip(true)
    setTimeout(() => {
      setTooltip(false)
    }, 2000)
  }
  return (
    <Container
    // maxWidth={themeStretch ? false : 'lg'}
    >
      {data && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6} mt={3}>
              <ProductDetailsCarousel
                isLoading={isLoading}
                product={data}
                userType={userType}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <ProductDetailsSummary
                isLoading={isLoading}
                product={data}
                quantity={quantity}
                userType={userType}
                onManualAddOfQuantity={onManualAddOfQuantity}
                handleVariantChange={handleVariantChange}
                handleAddToCart={handleAddToCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                handleproductEnquiry={handleproductEnquiry}
                whatsppEnquireLink={whatsppEnquireLink}
                telNumberIndia={telNumberIndia}
              />
              {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

              <Stack
                sx={{
                  p: (theme) => ({
                    md: theme.spacing(5, 5, 0, 2),
                  }),
                }}
                className="mt-3 sm:mt-0"
              >
                <div className="flex w-full items-center">
                  {isLoading ? (
                    <Skeleton
                      variant="subtitle1"
                      className="my-auto w-2/5 rounded-xl"
                    />
                  ) : (
                    <Typography variant="subtitle1" className="my-auto w-1/2">
                      Share on:
                    </Typography>
                  )}
                  <div className="mt-3 flex w-full items-center justify-around sm:w-1/2 md:mt-0">
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={() => {
                        setTooltip(false)
                      }}
                      open={tooltip}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Url Copied"
                    >
                      {isLoading ? (
                        <Skeleton className="flex h-12 w-9 items-center justify-center rounded-full " />
                      ) : (
                        <div
                          id="copyPageLink"
                          onClick={handleCopyPageUrl}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-[gray] text-lg text-white hover:cursor-pointer"
                        >
                          <BiLink />
                        </div>
                      )}
                    </Tooltip>
                    <a
                      href={
                        `https://www.facebook.com/sharer/sharer.php?u=#` +
                        window.location?.href
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isLoading ? (
                        <Skeleton className="flex h-12 w-9 items-center justify-center rounded-full " />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-lg text-white hover:cursor-pointer">
                          <FaFacebookF />
                        </div>
                      )}
                    </a>
                    <a
                      href={
                        `https://api.whatsapp.com/send?text=` +
                        window.location?.href
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isLoading ? (
                        <Skeleton className="flex h-12 w-9 items-center justify-center rounded-full " />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0cc143] text-lg text-white hover:cursor-pointer">
                          <FaWhatsapp />
                        </div>
                      )}
                    </a>
                    <a
                      href={
                        `https://twitter.com/intent/tweet?text=` +
                        window.location?.href
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isLoading ? (
                        <Skeleton className="flex h-12 w-9 items-center justify-center rounded-full " />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d9bf0] text-lg text-white hover:cursor-pointer">
                          <FaTwitter />
                        </div>
                      )}
                    </a>
                  </div>
                </div>
              </Stack>
            </Grid>
          </Grid>
        </>
      )}

      {/* {isLoading && <SkeletonProductDetails />} */}
    </Container>
  )
}

// export async function getServerSideProps(context) {
//   const nextStaticUrl = context.resolvedUrl?.split('_')?.pop()
//   const response = await api.get(`/product/one/${nextStaticUrl}`)
//   const OneProduct = response.data.data
//   return {
//     props: { OneProduct, nextStaticUrl },
//   }
// }
