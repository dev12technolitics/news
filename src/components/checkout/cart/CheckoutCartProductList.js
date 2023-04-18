import PropTypes from 'prop-types'
// @mui
import { Table, TableBody, TableContainer } from '@mui/material'
// components
import Scrollbar from 'src/components/scrollbar'
import { TableHeadCustom } from 'src/components/table'
//
import CheckoutCartProduct from './CheckoutCartProduct'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'totalPrice', label: 'Total Price', align: 'right' },
  { id: '' },
]

// ----------------------------------------------------------------------

CheckoutCartProductList.propTypes = {
  onDelete: PropTypes.func,
  userType: PropTypes.string,
  products: PropTypes.array,
  onManualAddOfQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
}

export default function CheckoutCartProductList({
  products,
  userType,
  onDelete,
  onManualAddOfQuantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  return (
    <TableContainer sx={{ overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {products?.map((row, index) => (
              <CheckoutCartProduct
                key={index}
                row={row}
                userType={userType}
                onDelete={() => onDelete(row)}
                onManualAddOfQuantity={onManualAddOfQuantity}
                onDecrease={() => onDecreaseQuantity(row)}
                onIncrease={() => onIncreaseQuantity(row)}
              />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  )
}
