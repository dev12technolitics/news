import { useEffect, useState } from 'react'
import AppIconButton from '../basics/AppIconButton'
import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi'
import { AppButton, AppModal } from '../basics'
import { AppAosAnnimation } from '../animate'
import { Box, Stack, Skeleton } from '@mui/material'
import { ProductEnquiryForm } from '../forms'
import {
  getPriceDataByUserType,
  getProductImages,
  formatCurrency,
  getImageForCart,
} from 'src/utils/utils-fun'
import {
  useCreateWishlistData,
  useGetAllWishlist,
} from 'src/services/wishlistServices'
import { LoginFormCard, LoginImageCard } from '../forms/LoginForm'
import { useDispatch } from 'react-redux'
// import { addToCart } from 'src/redux/slices/cartSlice'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { BiSearch } from 'react-icons/bi'
import { QuickView } from '../product'
import { addToCart } from 'src/redux/slices/cartSlice'
import RegistrationForm from '../forms/RegistrationForm'

const ProductsCard = ({
  data,
  cardDisplayIn,
  userType,
  userData,
  // isLoading,
  redirectUrl,
  redirectPath,
}) => {
  return (
    <div>
      <AppAosAnnimation animationName={'fade-up'} animationDuration={'800'}>
        <div
          className={`grid grid-cols-2 gap-3 md:container md:grid-cols-3 md:gap-5 ${
            cardDisplayIn == 'home' ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
          } `}
        >
          {data?.length > 0 &&
            (cardDisplayIn == 'home' ? data?.slice(0, 8) : data)?.map(
              (item) => {
                return (
                  <div className="w-full" key={item._id}>
                    <ProductCard
                      item={item}
                      userType={userType}
                      userData={userData}
                      redirectUrl={redirectUrl}
                      redirectPath={redirectPath}
                    />
                  </div>
                )
              }
            )}
        </div>
      </AppAosAnnimation>
    </div>
  )
}

export default ProductsCard

export const ProductCard = ({
  item,
  userType,
  userData,
  redirectUrl,
  redirectPath,
}) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { mutate } = useCreateWishlistData()
  const { data, isLoading, isError } = useGetAllWishlist(userData?._id)
  const [showModal, setShowModal] = useState({
    login: false,
    quickView: false,
    enquiry: false,
  })
  const [finalRedirectUrl, setFinalRedirectUrl] = useState('')
  const [isRegistered, setIsRegistered] = useState(true)
  const [pageLoading, setPageLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 1000)
    // replace 0 value if category slug not come from All option in tab
    let lastSlug = redirectUrl?.split('/')?.slice(-2)
    if (Number(lastSlug[0]) === 0 && redirectPath !== '/p/[slug]') {
      setFinalRedirectUrl(
        redirectUrl?.split('/')?.slice(0, -2)?.join('/') +
          `/${item?.categoryIds[0]?.slug}/p`
      )
    }
    // else set the coming value as it is
    else {
      setFinalRedirectUrl(redirectUrl)
    }
  }, [redirectUrl, item])

  const { _id, title, seoSlug, partNo } = item
  if (userData !== null && isLoading) return console.log('isLoading...')
  if (userData !== null && isError) return console.log('isError...')
  const priceData = getPriceDataByUserType(item, userType)
  const images = getProductImages(item, 'base')
  const oneDataUrl =
    item?.variants?.length > 0
      ? priceData?.url
      : `${seoSlug}?userType=${userType}`
  const finalUrl = `${finalRedirectUrl}/${oneDataUrl}`
  //add to cart function
  function handleAddToCart() {
    const finalImagesForCart = getImageForCart(item, userType)
    let copyProductForCart = { ...item }
    copyProductForCart.images = finalImagesForCart[0]
    dispatch(
      addToCart({
        product: { ...copyProductForCart, quantity: 1 },
        userType: userType?.toLowerCase(),
      })
    )
    dispatch(handleToastOpen({ message: 'Added To Order', status: 'success' }))
  }
  // add to wishlist function
  function handleAddToWishlist() {
    if (userData !== null) {
      const checkInWishlist = data?.findIndex((row) => row?.productId === _id)
      if (checkInWishlist < 0) {
        const payload = {
          productUrl: oneDataUrl,
          productSlug: seoSlug,
          cust_id: userData?._id,
          productId: _id,
        }
        mutate(payload, {
          onSuccess: () =>
            queryClient.invalidateQueries(['_getAllAllwishlist']),
        })
      } else {
        dispatch(
          handleToastOpen({ message: 'Already Added', status: 'warning' })
        )
      }
    } else {
      setShowModal({ ...showModal, [`login`]: true })
    }
  }
  // mui classes to show elements in hover
  const classes = {
    outerDiv: {
      '&:hover': {
        '& .addIcon': {
          display: 'block',
        },
        '& .buttonBox': {
          display: 'block',
          height: '100%',
          width: '100%',
        },
      },
    },
    addIcon: {
      display: 'none',
      zIndex: 1,
    },
    buttonBox: {
      display: 'none',
      zIndex: 1,
      transition: 'all 0.5s ease-in-out',
    },
  }
  return (
    <div>
      <Box
        sx={classes.outerDiv}
        className="relative h-auto rounded-lg p-2 shadow-shadow-primary bg-white"
      >
        <Box sx={{ cursor: 'pointer', background: 'transparent' }}>
          <Box
            sx={classes.addIcon}
            className="addIcon absolute top-4 right-4"
            spacing="2"
          >
            {pageLoading ? (
              <Skeleton size="small" className="h-10 w-10" />
            ) : (
              <>
                <Stack className="md:block hidden bg-white rounded-full shadow-md">
                  <AppIconButton
                    onClick={() =>
                      setShowModal({ ...showModal, [`quickView`]: true })
                    }
                    size="small"
                    Icon={<BiSearch />}
                  />
                </Stack>
                <Stack className="md:block hidden bg-white rounded-full shadow-md mt-2">
                  <AppIconButton
                    onClick={() => {
                      handleAddToWishlist(_id, oneDataUrl)
                    }}
                    size="small"
                    Icon={<HiOutlineHeart />}
                  />
                </Stack>
              </>
            )}
          </Box>
          <Link href={redirectPath} as={finalUrl}>
            <Box
              sx={classes.outerDiv}
              className="relative aspect-square w-full overflow-hidden rounded-lg"
            >
              {pageLoading ? (
                <Skeleton
                  variant="rectangular"
                  className="h-full w-full rounded-xl"
                />
              ) : (
                <Image
                  fill
                  loading="lazy"
                  src={
                    images !== undefined
                      ? images[0]?.url
                      : 'https://picsum.photos/seed/picsum/200/300'
                  }
                  alt={title}
                  style={{ transition: 'all 0.5s ease-in-out' }}
                  className="animate-fadeUpAnimation h-full w-full overflow-hidden rounded-lg object-cover transition-all duration-1000 md:hover:scale-[1.2]"
                />
              )}
            </Box>
          </Link>
          {/*  only mobileView  */}
          <Stack className="md:hidden bg-white z-10 top-4 right-4 rounded-full absolute shadow-md">
            <AppIconButton
              onClick={() => {
                handleAddToWishlist(_id, oneDataUrl)
              }}
              size="small"
              Icon={<HiOutlineHeart />}
            />
          </Stack>
          <Stack spacing={1} className="">
            <Link href={redirectPath} as={finalUrl}>
              <div className="p-1 sm:p-2">
                {pageLoading ? (
                  <Skeleton className="h-6 w-full rounded-xl" />
                ) : (
                  <>
                    {' '}
                    <span className="font-robo capitalize text-sm text-left mt-3 capitalize overflow-hidden w-full block h-5">
                      {title}
                    </span>
                  </>
                )}
              </div>
            </Link>
          </Stack>

          <Stack spacing={1} className="md:hidden">
            <Link href={redirectPath} as={finalUrl}>
              <div className="p-1 sm:p-2">
                {pageLoading ? (
                  <Skeleton className="h-6 w-full rounded-xl" />
                ) : (
                  <>
                    {' '}
                    <span className="font-robo text-sm uppercase text-dark-grey w-full block h-5 overflow-hidden">
                      {partNo}
                    </span>
                  </>
                )}
              </div>
            </Link>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
            className=" p-1"
          >
            <Box direction="row" alignItems="center" className="md:w-10/12">
              {/* {formatCurrency(priceData?.perProductPrice) && (
                <>
                  <Stack
                    component="span"
                    sx={{
                      color: 'text.disabled',
                      textDecoration: 'line-through',
                    }}
                  >
                    {formatCurrency(priceData?.mrp)}
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ typography: 'subtitle1' }}
                  >
                    {formatCurrency(priceData?.perProductPrice)}
                  </Stack>
                </>
              )} */}
              <span className="md:block hidden font-robo text-sm uppercase text-dark-grey text-base w-full block h-5 overflow-hidden">
                {partNo}
              </span>
            </Box>
            <Box className="md:block hidden bg-light-pink-opacity z-10 rounded-full">
              <AppIconButton
                // size="medium"
                sx={{
                  height: { md: '30px', lg: '40px' },
                  width: { md: '30px', lg: '40px' },
                }}
                className="bg-[#F9F9F9] bg-opacity-[0.1] hover:bg-theme-primary-main hover:text-white text-theme-primary-main"
                onClick={() => handleAddToCart(item, userType)}
                Icon={<HiOutlineShoppingBag className="text-xl" />}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
      {/* {/ login /register modal /} */}
      <AppModal
        open={showModal?.login}
        handleClose={() => setShowModal({ ...showModal, [`login`]: false })}
        maxWidth={'md'}
        fullWidth
      >
        <div className="grid grid-cols-1 gap-5 p-3 sm:grid-cols-2 md:grid-cols-2">
          <div className="hidden md:block">
            <LoginImageCard />
          </div>
          <div className="p-2 lg:py-5 lg:px-7">
            {isRegistered ? (
              <LoginFormCard
                setIsRegistered={setIsRegistered}
                closeLoginModal={() =>
                  setShowModal({ ...showModal, [`login`]: false })
                }
              />
            ) : (
              <div className="">
                <p className="mt-2 mb-5 pt-2 text-xl font-bold capitalize sm:text-2xl">
                  Register
                </p>
                <RegistrationForm setIsRegistered={setIsRegistered} />
              </div>
            )}
          </div>
        </div>
      </AppModal>
      {/* {/ quickview modal /} */}
      <AppModal
        open={showModal?.quickView}
        handleClose={() => setShowModal({ ...showModal, [`quickView`]: false })}
        maxWidth={'md'}
      >
        <QuickView
          handleproductEnquiry={() =>
            setShowModal({ ...showModal, [`enquiry`]: false })
          }
          data={item}
          productUrl={finalUrl}
        />
      </AppModal>
      {/* {/ enquiry modal /} */}
      <AppModal
        open={showModal?.enquiry}
        title={'Product Enquiry'}
        handleClose={() => setShowModal({ ...showModal, [`enquiry`]: false })}
        fullWidth
        maxWidth={'xs'}
      >
        <ProductEnquiryForm
          userData={userData}
          userType={userType}
          _id={_id}
          closeEnquiryModal={() =>
            setShowModal({ ...showModal, [`enquiry`]: false })
          }
        />
      </AppModal>
    </div>
  )
}
