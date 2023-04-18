import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  billingAddress: null,
  shippingAddress: null,
  priceSummary: {
    subtotal: 0,
    discount: 0,
    shiiping: 0,
    total: 0,
    gstValue: 0,
    gstAmount: 0,
  },
  gstData: {},
  discountData: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantityInCart: (state, action) => {
      const { product, userType } = action.payload
      const itemIndex = state.cartItems?.findIndex(
        (item) =>
          item?.[`${userType}Rows`][0]?.id ==
          product?.[`${userType}Rows`][0]?.id
      )
      if (itemIndex >= 0) {
        //check if quantity variant is there
        if (state.cartItems[itemIndex].quantityVariants?.length > 0) {
          //find out if quantity is equal to any qauantityVariant
          let newPriceCheck = state.cartItems[
            itemIndex
          ]?.quantityVariants?.filter(
            (el) => el == state.cartItems[itemIndex].quantity
          )
          // set the quantity variant price if it is there
          if (newPriceCheck?.length > 0) {
            let rowValue = state.cartItems[itemIndex]?.[`${userType}Rows`][0]
            let newPrice =
              rowValue?.[`for${newPriceCheck[0]}plusQuantityPriceIs`]
            rowValue.perProductPrice = newPrice
          }
        }
        state.cartItems[itemIndex].quantity += 1
      }
    },
    decreaseQuantityInCart: (state, action) => {
      const { product, userType } = action.payload
      const itemIndex = state.cartItems?.findIndex(
        (item) =>
          item?.[`${userType}Rows`][0]?.id ==
          product?.[`${userType}Rows`][0]?.id
      )
      if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
        //check if quantity variant is there
        if (state.cartItems[itemIndex].quantityVariants?.length > 0) {
          //find out if quantity is equal to any qauantityVariant
          let newPriceCheck = state.cartItems[
            itemIndex
          ]?.quantityVariants?.findIndex(
            (el) => state.cartItems[itemIndex].quantity - 1 == Number(el)
          )
          let rowValue = state.cartItems[itemIndex]?.[`${userType}Rows`][0]
          //else set the previous quantityvariant price in it
          if (newPriceCheck >= 1) {
            let priceValue =
              state.cartItems[itemIndex].quantityVariants[newPriceCheck - 1]
            let newPrice = rowValue?.[`for${priceValue}plusQuantityPriceIs`]
            rowValue.perProductPrice = newPrice
          }
          //if it is first in quantityVariant then set the actual price it
          else if (newPriceCheck == 0) {
            rowValue.perProductPrice = rowValue.actualPrice
          }
        }
        state.cartItems[itemIndex].quantity -= 1
      }
    },
    addManualQuantityInCart: (state, action) => {
      let { product, quantity, userType } = action.payload
      const itemIndex = state.cartItems?.findIndex(
        (item) =>
          item?.[`${userType}Rows`][0]?.id ==
          product?.[`${userType}Rows`][0]?.id
      )
      if (itemIndex >= 0) {
        //check if quantity variant is there
        if (state.cartItems[itemIndex].quantityVariants?.length > 0) {
          //find out if quantity is equal to any auantityVariant
          let newPriceCheck = state.cartItems[
            itemIndex
          ]?.quantityVariants?.filter((el) => quantity > Number(el))

          let rowValue = state.cartItems[itemIndex]?.[`${userType}Rows`][0]
          //set the price equal to the checked quantity variant
          if (newPriceCheck?.length > 0) {
            let priceValue = newPriceCheck?.pop()
            let newPrice = rowValue?.[`for${priceValue}plusQuantityPriceIs`]
            rowValue.perProductPrice = newPrice
          } else {
            rowValue.perProductPrice = rowValue.actualPrice
          }
        }
        state.cartItems[itemIndex].quantity = quantity
      }
    },
    addToCart: (state, action) => {
      let { product, userType } = action.payload
      const itemIndex = state.cartItems?.findIndex(
        (item) =>
          item?.[`${userType}Rows`][0]?.id ==
          product?.[`${userType}Rows`][0]?.id
      )
      if (itemIndex < 0) {
        //=======================================================================
        if (product?.quantityVariants?.length > 0) {
          let rowValue = product?.[`${userType}Rows`][0]
          //save the actualPrice in another key
          rowValue = {
            ...rowValue,
            actualPrice: rowValue.perProductPrice,
          }
          //find out if quantity is equal to any auantityVariant
          let newPriceCheck = product?.quantityVariants?.filter(
            (el) => product?.quantity > Number(el)
          )
          //set the price equal to the checked quantity variant
          if (newPriceCheck?.length > 0) {
            const priceValue = newPriceCheck?.pop()
            const newPrice = rowValue?.[`for${priceValue}plusQuantityPriceIs`]
            rowValue.perProductPrice = newPrice
          }
          product[`${userType}Rows`] = [rowValue]
        }
        //=======================================================================
        state.cartItems.push(product)
      }
    },
    removeFromCartByCartId: (state, action) => {
      let { product, userType } = action.payload
      const filteredCartItems = state.cartItems?.filter(
        (item) =>
          item?.[`${userType}Rows`][0]?.id !==
          product?.[`${userType}Rows`][0]?.id
      )
      state.cartItems = filteredCartItems
    },
    emptyCartItems: (state) => {
      state.cartItems = []
      state.discountData = {}
      state.shippingAddress = null
      state.billingAddress = null
    },
    checkoutUserShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
    },
    checkoutUserBillingAddress: (state, action) => {
      state.billingAddress = action.payload
    },
    handleSetDiscountData: (state, action) => {
      state.discountData = action.payload
    },
    handleSetGstData: (state, action) => {
      state.gstData = action.payload
    },
    handleAllPriceAmount: (state, action) => {
      let userType = action.payload
      let discountAmt = 0
      let shippingAmt = 0
      let gstAmt = 0
      const gstData = state.gstData
      const discountData = state.discountData
      //calculating subtotal amount of products
      let subTotalAmt = state.cartItems?.reduce(
        (acc, curr) =>
          acc +
          Number(
            curr?.[`${userType}Rows`][0]?.perProductPrice * curr?.quantity
          ),
        0
      )
      //collecting gst amount
      if (gstData?.show_gst) {
        gstAmt = (gstData?.gst * subTotalAmt) / 100
        console.log("gst",gstAmt)
      }
      //calculating discount
      if (discountData?.discount_type) {
        if (discountData?.discount_type == 'Percent') {
          discountAmt = (subTotalAmt * discountData?.discount) / 100
        } else {
          discountAmt = discountData?.discount
        }
      }
      console.log("discount",discountAmt)

      state.priceSummary = {
        subtotal: subTotalAmt,
        discount: discountAmt,
        shiiping: shippingAmt,
        gstValue: gstData?.gst,
        gstAmount: gstAmt,
        total: eval(subTotalAmt + gstAmt + shippingAmt-discountAmt),
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addToCart,
  addManualQuantityInCart,
  increaseQuantityInCart,
  decreaseQuantityInCart,
  emptyCartItems,
  removeFromCartByCartId,
  checkoutUserShippingAddress,
  checkoutUserBillingAddress,
  handleSetDiscountData,
  handleSetGstData,
  handleAllPriceAmount,
} = cartSlice.actions

export default cartSlice.reducer
