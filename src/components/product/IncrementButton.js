/* eslint-disable react/display-name */
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
// @mui
import { alpha } from '@mui/material/styles'
import { Stack } from '@mui/material'
// components
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import AppIconButton from '../basics/AppIconButton'

// ----------------------------------------------------------------------

const IncrementerButton = forwardRef(
  (
    {
      quantity,
      onIncrease,
      onManualAddOfQuantity,
      onDecrease,
      disabledIncrease,
      disabledDecrease,
      sx,
      ...other
    },
    ref
  ) => (
    <Stack
      ref={ref}
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mb: 0.5,
        py: 0.5,
        px: 0.75,
        width: 96,
        borderRadius: 1,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        ...sx,
      }}
      {...other}
    >
      <AppIconButton
        Icon={<AiOutlineMinus />}
        size="small"
        color="inherit"
        onClick={() => onDecrease()}
        disabled={disabledDecrease}
        sx={{ color: 'text.secondary' }}
      />

      {/* {quantity} */}
      <input
        onChange={(e) => onManualAddOfQuantity(e.target.value)}
        className="w-full focus:outline-none text-center bg-transparent"
        value={quantity}
      />
      <AppIconButton
        Icon={<AiOutlinePlus />}
        size="small"
        color="inherit"
        onClick={() => onIncrease()}
        disabled={disabledIncrease}
        sx={{ color: 'text.secondary' }}
      />
    </Stack>
  )
)

IncrementerButton.propTypes = {
  sx: PropTypes.object,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
  quantity: PropTypes.number,
  disabledDecrease: PropTypes.bool,
  disabledIncrease: PropTypes.bool,
}

export default IncrementerButton
