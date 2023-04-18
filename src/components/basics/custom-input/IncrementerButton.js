/* eslint-disable react/display-name */
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
// @mui
import { alpha } from '@mui/material/styles'
import { Stack, IconButton } from '@mui/material'
import { BiMinus, BiPlus } from 'react-icons/bi'
// components
// import Iconify from '../iconify';

// ----------------------------------------------------------------------

const IncrementerButton = forwardRef(
  (
    {
      row,
      quantity,
      onManualAddOfQuantity,
      onIncrease,
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
      <IconButton
        size="small"
        color="inherit"
        onClick={() => onDecrease(row)}
        disabled={disabledDecrease}
        sx={{ color: 'text.secondary' }}
      >
        <BiMinus />
      </IconButton>

      <input
        onChange={(e) => onManualAddOfQuantity(row, e.target.value)}
        className="w-full focus:outline-none text-center bg-transparent"
        value={quantity}
      />

      <IconButton
        size="small"
        color="inherit"
        onClick={() => onIncrease(row)}
        disabled={disabledIncrease}
        sx={{ color: 'text.secondary' }}
      >
        <BiPlus />
      </IconButton>
    </Stack>
  )
)

IncrementerButton.propTypes = {
  sx: PropTypes.object,
  row: PropTypes.object,
  onManualAddOfQuantity: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
  quantity: PropTypes.number,
  disabledDecrease: PropTypes.bool,
  disabledIncrease: PropTypes.bool,
}

export default IncrementerButton
