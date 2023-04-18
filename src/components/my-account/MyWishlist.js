import { Stack, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from 'src/redux/slices/cartSlice'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import { useGetProductById } from 'src/services/productServices'
import {
  useDeleteWishlistDataById,
  useGetAllWishlist,
} from 'src/services/wishlistServices'

import {
  getImageForCart,
  getPriceDataByUserType,
  getProductImages,
  formatCurrency,
} from 'src/utils/utils-fun'
import { AppButton, ErrorScreen } from '../basics'
import AppIconButton from '../basics/AppIconButton'
import LoadingScreen from '../basics/LoadingScreen'
import { ColorPreview } from '../color-utils'
import NoItemsInAccount from './NoItemsInAccount'

function MyWishlist() {
  const { userType, userData } = useSelector((state) => state.user)
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { data, isError, isLoading } = useGetAllWishlist(userData?._id)
  const { mutate } = useDeleteWishlistDataById()
  function handleAddToCart(item) {
    const finalImagesForCart = getImageForCart(item, userType)
    let copyProductForCart = { ...item }
    copyProductForCart.images = finalImagesForCart[0]
    dispatch(
      addToCart({
        product: { ...copyProductForCart, quantity: 1 },
        userType: userType?.toLowerCase(),
      })
    )
    dispatch(
      addToCart({
        product: { ...item, quantity: 1 },
        userType: userType?.toLowerCase(),
      })
    )
    dispatch(handleToastOpen({ message: 'Added To Order', status: 'success' }))
  }
  function handleDelete(id) {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(['_getAllAllwishlist'])
      },
    })
  }
  if (isLoading) return <LoadingScreen />

  if (isError) return <ErrorScreen />
  // const TABLE_HEAD = 'text-sm py-4 pl-1 uppercase tracking-wide font-semibold'
  return (
    <div className="">
      {data?.length > 0 ? (
        <div className=" grid grid-cols-1 sm:grid-cols-2 w-full gap-5 md:gap-3 lg:gap-4">
          {data?.map((item) => {
            return (
              <WishlistCard
                handleAddToCart={handleAddToCart}
                handleDelete={handleDelete}
                key={item._id}
                item={item}
                userType={userType}
              />
            )
          })}
        </div>
      ) : (
        <NoItemsInAccount title="No Items in wishlist" />
      )}
    </div>
  )
}

export default MyWishlist

const WishlistCard = ({ item, userType, handleDelete }) => {
  const router = useRouter()
  const { productUrl, productSlug } = item
  const { data, isLoading, isError } = useGetProductById(productUrl)

  if (isLoading) return <LoadingScreen />

  if (isError) return <ErrorScreen />
  const priceData = getPriceDataByUserType(data, userType)
  const images = getProductImages(data, 'base')

  const oneDataUrl =
    item?.variants?.length > 0
      ? priceData?.url
      : `${productSlug}?userType=${userType}`
  const redirectUrl = `/p/${oneDataUrl}`
  return (
    <div className="flex w-full   relative rounded-md shadow p-3">
      <div className="w-2/5">
        <div
          onClick={() => router?.push(redirectUrl)}
          className="relative flex aspect-square w-full animate-opacityAnimation items-center overflow-hidden rounded-lg hover:cursor-pointer md:col-span-2 lg:col-span-2"
        >
          <Image
            loading="lazy"
            fill
            alt={data?.title}
            src={images[0]?.url}
            className={`h-full w-full  overflow-hidden rounded-lg object-cover transition-all duration-500`}
          />
        </div>
      </div>
      <div className="w-3/4">
        <div
          onClick={() => router?.push(redirectUrl)}
          className="col-span-8  w-full pl-4 pt-0 sm:pt-2 text-lg font-custom-500 capitalize hover:cursor-pointer "
        >
          <div className="h-6 font-bold overflow-hidden mb-1 sm:mb-2">
            {data?.title}
          </div>
          {priceData?.variantData?.length > 0 &&
            priceData?.variantData?.map((variant, index) => {
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
                      display: 'flex',
                      gap: '6px',
                      paddingLeft: '4px',
                    }}
                  >
                    {variant?.title?.toLowerCase() == 'color' && (
                      <ColorPreview colors={variant?.value} />
                    )}
                    {variant?.value}
                  </Typography>
                  {/* <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} /> */}
                  {/* <ColorPreview /> */}
                </Stack>
              )
            })}
          <div className="flex items-left justify-left text-sm font-custom-500 mt-1 sm:mt-3">
            {formatCurrency(priceData?.perProductPrice)}
          </div>
          <div className=" mt-1 sm:mt-3">
            <AppButton
              size="medium"
              variant="contained"
              title={'view details '}
            />
          </div>
        </div>
      </div>
      {/* <div className="md:col-span-4 lg:col-span-3 flex justify-center items-center">
        <AppButton
          onClick={() => handleAddToCart(data)}
          title={'add order'}
          type={'button'}
          variant={'contained'}
        />
      </div> */}
      <div className="absolute bottom-3 right-2">
        <AppIconButton
          onClick={() => handleDelete(item?._id)}
          size={'large'}
          Icon={<AiOutlineDelete className="text-lg" />}
        />
      </div>
    </div>
  )
}
