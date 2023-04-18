import { useState, Fragment } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { Badge, Divider, Typography } from '@mui/material'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import Image from 'next/image'
import { Stack } from '@mui/system'
import IncrementerButton from '../basics/custom-input/IncrementerButton'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  addManualQuantityInCart,
  decreaseQuantityInCart,
  increaseQuantityInCart,
  removeFromCartByCartId,
} from 'src/redux/slices/cartSlice'
import AppIconButton from '../basics/AppIconButton'
import { getPriceDataByUserType, formatCurrency } from 'src/utils/utils-fun'
import { AppButton } from '../basics'
import emptyCart from '../../assets/images/empty_cart.jpeg'
import EmptyContent from '../empty-content/EmptyContent'
import { handleToastOpen } from 'src/redux/slices/toastSlice'
import { HiOutlineShoppingBag } from 'react-icons/hi'

export default function CartSideBar() {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    left: false,
  })
  const { userType } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const handleDeleteCart = (item) => {
    dispatch(
      removeFromCartByCartId({
        product: item,
        userType: userType?.toLowerCase(),
      })
    )
    dispatch(
      handleToastOpen({ message: 'Removed from Order', status: 'success' })
    )
  }
  const handleManualAddOfQuantity = (item, value) => {
    const payload = {
      product: item,
      userType: userType?.toLowerCase(),
      quantity: Number(value) > 1 ? Number(value) : 1,
    }
    dispatch(addManualQuantityInCart(payload))
  }
  const handleIncreaseQuantity = (item) => {
    dispatch(
      increaseQuantityInCart({
        product: item,
        userType: userType?.toLowerCase(),
      })
    )
  }
  const handleDecreaseQuantity = (item) => {
    dispatch(
      decreaseQuantityInCart({
        product: item,
        userType: userType?.toLowerCase(),
      })
    )
  }
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 370,
        height: '600px',
      }}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />

      <div className="flex justify-between px-2">
        <h5 className="mb-5 ml-1 text-base font-bold uppercase">Order List</h5>
        <span
          className="mt-6 cursor-pointer text-xl"
          onClick={toggleDrawer(anchor, false)}
        >
          <span className="transition-all duration-500 hover:rotate-90">
            <MdClose />
          </span>
        </span>
      </div>
      {cartItems?.length > 0 ? (
        cartItems?.map((item, index) => {
          return (
            <CartDataList
              key={index}
              item={item}
              userType={userType}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleManualAddOfQuantity={handleManualAddOfQuantity}
              handleDeleteCart={handleDeleteCart}
            />
          )
        })
      ) : (
        <Box className="flex items-center justify-center">
          <EmptyContent
            title="Cart is empty"
            description="Look like you have no items in your shopping cart."
            img={emptyCart}
          />
        </Box>
      )}
    </Box>
  )

  return (
    <Box className="cursor-pointer">
      {['right'].map((anchor) => (
        <Fragment key={anchor}>
          <Box onClick={toggleDrawer(anchor, true)}>
            <AppIconButton
              Icon={
                <Badge badgeContent={cartItems?.length} color="primary">
                  <HiOutlineShoppingBag className="text-theme-primary-main" />{' '}
                </Badge>
              }
              color="white"
            />
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            {cartItems?.length > 0 && (
              <Box sx={{ p: 2 }}>
                <AppButton
                  fullWidth
                  size="large"
                  variant="contained"
                  title={'Checkout'}
                  href="/orders/checkout"
                  endIcon={<RiShoppingCart2Line className="text-sm" />}
                />
              </Box>
            )}
          </Drawer>
        </Fragment>
      ))}
    </Box>
  )
}

export const CartDataList = ({
  item,
  userType,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleManualAddOfQuantity,
  handleDeleteCart,
}) => {
  const { title } = item
  const priceData = getPriceDataByUserType(item, userType)

  return (
    <Box className="relative mx-auto my-4 w-11/12 rounded-lg border border-light-grey bg-white p-2 shadow-md">
      <Box className="flex justify-between">
        <Box sx={{ maxWidth: '90%' }} className="flex justify-center">
          <Stack className="flex animate-opacityAnimation items-center justify-start hover:cursor-pointer">
            {item?.images?.values[0]?.url && (
              <Image
                loading="lazy"
                src={item?.images?.values[0]?.url}
                alt="cart"
                width={90}
                height={90}
                className="rounded-lg object-cover"
              />
            )}
          </Stack>
          <Box className="pl-2">
            <Stack>
              <Typography variant="subtitle2" className="capitalize">
                {title}
              </Typography>
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
                        }}
                      >
                        {' '}
                        {variant?.value}{' '}
                      </Typography>
                      {/* <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} /> */}
                      {/* <ColorPreview /> */}
                    </Stack>
                  )
                })}
            </Stack>
            <div className="flex justify-between py-1">
              <Stack spacing={1}>
                <IncrementerButton
                  row={item}
                  quantity={item?.quantity}
                  onManualAddOfQuantity={handleManualAddOfQuantity}
                  onDecrease={handleDecreaseQuantity}
                  onIncrease={handleIncreaseQuantity}
                  disabledDecrease={item?.quantity <= 1}
                  disabledIncrease={false}
                />
              </Stack>
              {/* <span>{item?.amount}</span> */}
            </div>
          </Box>
        </Box>
        {/* delete from cart */}
        <Stack className="absolute right-1 top-1">
          <AppIconButton
            Icon={<RxCross2 />}
            size="small"
            onClick={() => handleDeleteCart(item)}
          />
        </Stack>
        <Stack className="absolute right-2 bottom-4">
          <Typography variant="subtitle2">
            {formatCurrency(
              Number(priceData?.perProductPrice * item?.quantity)
            )}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
