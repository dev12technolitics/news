import PropTypes from 'prop-types'
// next
// import { useRouter } from 'next/router'
// @mui
import {
  Box,
  Stack,
  Divider,
  Typography,
  // IconButton,
  Skeleton,
} from '@mui/material'

// import IncrementerButton from './IncrementButton'
// import { BsCartPlus } from 'react-icons/bs'
import Label from './Label'
import { getPriceDataByUserType, formatCurrency } from 'src/utils/utils-fun'
import { AppButton } from '../basics'
import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { BsCartPlus } from 'react-icons/bs'
import IncrementerButton from './IncrementButton'
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  quantity: PropTypes.number,
  product: PropTypes.object,
  userType: PropTypes.string,
  handleVariantChange: PropTypes.func,
  handleAddToCart: PropTypes.func,
  onManualAddOfQuantity: PropTypes.func,
  increaseQuantity: PropTypes.func,
  decreaseQuantity: PropTypes.func,
  handleproductEnquiry: PropTypes.func,
  whatsppEnquireLink: PropTypes.func,
  telNumberIndia: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default function ProductDetailsSummary({
  quantity,
  product,
  userType,
  handleVariantChange,
  handleAddToCart,
  onManualAddOfQuantity,
  increaseQuantity,
  decreaseQuantity,
  handleproductEnquiry,
  whatsppEnquireLink,
  telNumberIndia,
  isLoading,
  ...other
}) {
  const { push } = useRouter()

  const { title, description, variants, quantityVariants } = product || {}
  const priceData = getPriceDataByUserType(product, userType)
  const selectedVariants = priceData?.variant?.split(',')
  const [pageLoading, setPageLoading] = useState(true)
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setPageLoading(false)
      }, 1000)
    }
  }, [isLoading])
  const handleBuyNow = () => {
    handleAddToCart()
    push('/orders/checkout')
  }
  return (
    <Stack
      spacing={3}
      sx={{
        p: (theme) => ({
          md: theme.spacing(5, 5, 0, 2),
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        {pageLoading ? (
          <Skeleton
            variant="h5"
            width={'30%'}
            className="animate-opacityAnimation rounded-lg"
          />
        ) : (
          <Label
            variant="soft"
            color={priceData?.stockStatus === 'In Stock' ? 'success' : 'error'}
            sx={{ textTransform: 'uppercase', mr: 'auto' }}
          >
            {priceData?.stockStatus || 'low stock'}
          </Label>
        )}
        {pageLoading ? (
          <Skeleton variant="h5" width={'40%'} className="rounded-lg" />
        ) : (
          <Typography variant="h5">{title}</Typography>
        )}

        {/* <Stack direction="row" alignItems="center" spacing={1}>
          <Rating value={'totalRating'} precision={0.1} readOnly />
        </Stack> */}

        {pageLoading ? (
          <Skeleton variant="h5" width={'40%'} className="rounded-lg" />
        ) : (
          <>
            {priceData?.perProductPrice !== 0 && (
              <Typography variant="h4">
                {formatCurrency(priceData?.perProductPrice) && (
                  <Box
                    component="span"
                    sx={{
                      color: 'text.disabled',
                      textDecoration: 'line-through',
                      mr: 0.5,
                    }}
                  >
                    {formatCurrency(priceData?.mrp)}
                  </Box>
                )}
                {formatCurrency(priceData?.perProductPrice)}
              </Typography>
            )}
          </>
        )}
      </Stack>

      {variants?.map((item, idx) => {
        return (
          <div key={idx} className="flex  items-center space-x-4 font-robo">
            {pageLoading ? (
              <Skeleton
                variant="body1"
                className="h-10  w-2/5 animate-opacityAnimation rounded-xl"
              />
            ) : (
              <Typography variant="body1"> {item?.title + ':'} </Typography>
            )}
            {/* desktop  view*/}
            <Stack
              direction={'row'}
              className="md:flex hidden m-1  flex-wrap  gap-y-2  text-base text-dark-grey sm:text-lg"
            >
              {item?.options?.map((option, index) => {
                return (
                  <>
                    {pageLoading ? (
                      <Skeleton className="flex  min-h-[4rem] min-w-[7rem] animate-opacityAnimation items-center justify-center  rounded-xl" />
                    ) : (
                      <Typography
                        key={index}
                        className={`mr-4 p-2 ${
                          option?.toLowerCase() === selectedVariants[idx].trim()
                            ? 'border-2 border-theme-primary-main'
                            : 'border border-theme-primary-light'
                        }  flex min-h-[30px] min-w-[48px] sm:text-base text-xs cursor-pointer items-center justify-center rounded-full`}
                        onClick={() => {
                          handleVariantChange(
                            priceData?.variantData,
                            item?.title,
                            option
                          )
                        }}
                      >
                        {option}
                      </Typography>
                    )}
                  </>
                )
              })}
            </Stack>
            {/* mobile view */}
            <Stack
              direction={'row'}
              className="m-1 flex gap-y-2 md:hidden text-base text-dark-grey sm:text-lg w-10/12 overflow-scroll"
            >
              {item?.options?.map((option, index) => {
                return (
                  <>
                    {pageLoading ? (
                      <Skeleton className="flex  min-h-[4rem] min-w-[7rem] animate-opacityAnimation items-center justify-center  rounded-xl" />
                    ) : (
                      <Typography
                        key={index}
                        className={`mr-4 p-2 ${
                          option?.toLowerCase() === selectedVariants[idx].trim()
                            ? 'border-2 border-theme-primary-main'
                            : 'border border-theme-primary-light'
                        }  whitespace-nowrap flex min-h-[30px] sm:text-base text-xs cursor-pointer items-center justify-center rounded-xl`}
                        onClick={() => {
                          handleVariantChange(
                            priceData?.variantData,
                            item?.title,
                            option
                          )
                        }}
                      >
                        {option}
                      </Typography>
                    )}
                  </>
                )
              })}
            </Stack>
          </div>
        )
      })}
      <Divider sx={{ borderStyle: 'dashed' }} />
      {pageLoading ? (
        <Skeleton className="h-40  w-full animate-opacityAnimation" />
      ) : (
        <Stack>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Stack>
      )}
      <Divider sx={{ borderStyle: 'dashed' }} />

      {quantityVariants?.length > 0 && (
        <>
          <Stack spacing={2} direction="column">
            <Stack
              spacing={2}
              direction="row"
              sx={{ background: 'text.secondary' }}
            >
              <Typography variant="subtitle1" className="w-full text-center">
                S.No
              </Typography>
              <Typography variant="subtitle1" className="w-full text-center">
                Quantity
              </Typography>
              <Typography variant="subtitle1" className="w-full text-center">
                Price
              </Typography>
            </Stack>
            {quantityVariants?.map((item, index) => {
              return (
                <Stack key={index} spacing={2} direction="row">
                  <Typography className="w-full text-center">
                    {index + 1}.
                  </Typography>
                  <Typography className="w-full text-center">
                    {index + 1 == quantityVariants?.length
                      ? Number(item) + 1 + '+'
                      : Number(item) +
                        1 +
                        '-' +
                        Number(quantityVariants[index + 1])}
                  </Typography>
                  <Typography className="w-full text-center">
                    {formatCurrency(
                      priceData?.[`for${item}plusQuantityPriceIs`]
                    )}
                  </Typography>
                </Stack>
              )
            })}
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}

      {pageLoading ? (
        <Skeleton className="rounded-lg h-20" />
      ) : (
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="subtitle2"
            sx={{ height: 36, lineHeight: '36px' }}
          >
            Quantity
          </Typography>

          <Stack spacing={1}>
            <IncrementerButton
              name="quantity"
              quantity={quantity}
              disabledDecrease={quantity - 1 > 0 ? false : true}
              disabledIncrease={false}
              onManualAddOfQuantity={onManualAddOfQuantity}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          </Stack>
        </Stack>
      )}

      {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

      <Stack direction="row" spacing={2} className="w-full">
        {pageLoading ? (
          <Skeleton
            size="large"
            variant="h5"
            width={'50%'}
            className="mb-2 h-12 animate-opacityAnimation rounded-lg"
          />
        ) : (
          <div className="w-1/2">
            <AppButton
              fullWidth
              size="large"
              color="primary"
              variant="outlined"
              onClick={() => handleproductEnquiry()}
              sx={{ whiteSpace: 'nowrap' }}
              title={'Enquire Now'}
            />
          </div>
        )}
        <a
          className="w-1/2"
          href={`https://api.whatsapp.com/send/?phone=${telNumberIndia}&text=${
            'Hi, I Am Interested In This Product : ' + whatsppEnquireLink
          }`}
          target="_blank"
          rel="noreferrer"
        >
          {pageLoading ? (
            <Skeleton
              size="large"
              variant="h5"
              width={'100%'}
              className="mb-2 h-12 animate-opacityAnimation rounded-lg"
            />
          ) : (
            <AppButton
              fullWidth
              size="large"
              type="button"
              variant="contained"
              title={'Enquire'}
              startIcon={<FaWhatsapp className="text-white" />}
            />
          )}
        </a>
      </Stack>
      <Stack direction="row" spacing={2}>
        {pageLoading ? (
          <Skeleton
            size="large"
            variant="h5"
            width={'50%'}
            className="mb-2 h-12 animate-opacityAnimation rounded-lg"
          />
        ) : (
          <AppButton
            fullWidth
            // disabled={isMaxQuantity}
            size="large"
            color="primary"
            variant="outlined"
            startIcon={<BsCartPlus />}
            onClick={() => handleAddToCart()}
            sx={{ whiteSpace: 'nowrap' }}
            title={'Add To Order'}
          />
        )}

        {pageLoading ? (
          <Skeleton
            size="large"
            variant="h5"
            width={'50%'}
            className="mb-2 h-12 animate-opacityAnimation rounded-lg"
          />
        ) : (
          <AppButton
            fullWidth
            size="large"
            type="button"
            variant="contained"
            onClick={handleBuyNow}
            title={'Buy Now'}
          />
        )}
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="center">
        {_socials.map((social) => (
          <IconButton key={social.name}>
            <social.icon />
          </IconButton>
        ))}
      </Stack> */}
    </Stack>
  )
}
