import PropTypes from 'prop-types'
// @mui
import { Box, Stack, TableRow, TableCell, Typography } from '@mui/material'
// utils
import { getPriceDataByUserType, formatCurrency } from 'src/utils/utils-fun'
// components
import { IncrementerButton } from 'src/components/basics/custom-input'
import { AiOutlineDelete } from 'react-icons/ai'
import AppIconButton from 'src/components/basics/AppIconButton'
import Image from 'next/image'

// ----------------------------------------------------------------------

CheckoutCartProduct.propTypes = {
  row: PropTypes.object,
  userType: PropTypes.string,
  onDelete: PropTypes.func,
  onManualAddOfQuantity: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
}

export default function CheckoutCartProduct({
  row,
  userType,
  onManualAddOfQuantity,
  onDelete,
  onDecrease,
  onIncrease,
}) {
  const { title, images, quantity } = row
  const priceData = getPriceDataByUserType(row, userType)
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          loading="lazy"
          alt="product image"
          src={images?.values[0]?.url}
          width={64}
          height={64}
          className="animate-opacityAnimation rounded-lg object-cover"
        />

        <Stack spacing={0.5} className="pl-3">
          <Typography
            noWrap
            variant="subtitle2"
            sx={{ maxWidth: 240 }}
            className="capitalize"
          >
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
      </TableCell>

      <TableCell>{formatCurrency(priceData?.perProductPrice)}</TableCell>

      <TableCell>
        <Box sx={{ width: 96, textAlign: 'right' }}>
          <IncrementerButton
            row={row}
            quantity={quantity}
            onManualAddOfQuantity={onManualAddOfQuantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={false}
          />
        </Box>
      </TableCell>

      <TableCell align="right">
        {formatCurrency(eval(priceData?.perProductPrice * quantity))}
      </TableCell>

      <TableCell align="right">
        <AppIconButton
          Icon={<AiOutlineDelete className="text-xl" />}
          onClick={onDelete}
        />
      </TableCell>
    </TableRow>
  )
}
