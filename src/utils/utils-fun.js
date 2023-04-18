// Description: This file contains all the form related utility functions
import moment from 'moment'

// Allow only numbers in input field
export const allowOnlyNumbers = (e) => {
  const value = e.target.value
  if (value === undefined) {
    return value
  }
  return value.replace(/[^0-9]/g, '')
}

// Allow only characters in input field
export const allowOnlyCharacters = (e) => {
  const value = e.target.value
  if (value === undefined) {
    return value
  }
  return value.replace(/[^a-zA-Z]/g, '')
}

// Calculate age from date string
export const calculateAge = (date) => {
  const today = new Date()
  const birthDate = new Date(date)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age < 0 ? 0 : age
}

// Render date in DD-MMM-YYYY format from date object
export const renderDate = (dateObject, format = 'DD-MMM-YYYY') => {
  let d = moment(dateObject).format(format)
  return d
}
// Render time in hh:mm A format from date object
export const renderTime = (dateObject, format = 'hh:mm A') => {
  let d = moment(dateObject).format(format)
  return d
}
// Render date and time in DD-MMM-YYYY hh:mm A format from date object
export const renderDateWithTime = (
  dateObject,
  format = 'DD-MMM-YYYY hh:mm A'
) => {
  let d = moment(dateObject).format(format)
  return d
}
// Get Current Year
export const getCurrentYear = () => {
  return new Date().getFullYear()
}
// getting priceDetails by userType
export const getPriceDataByUserType = (product, userType) => {
  let finalRows = 'b2cRows'
  if (userType?.toLowerCase() === 'b2b') {
    finalRows = 'b2bRows'
  }
  return product?.[finalRows][0]
}
// to get only needded images from product all types of images
export const getProductImages = (product, title) => {
  const images = product?.images?.filter(
    (item) => item?.title?.toLowerCase() === title?.toLowerCase()
  )
  return images[0]?.values
}
// for sending images according to variants for cart
export const getImageForCart = (product, userType) => {
  if (product?.variants?.length > 0) {
    const variants = product?.[`${userType}Rows`][0]?.variantData
    let leadVariantTitle = variants?.filter(
      (item) =>
        item?.title?.toLowerCase() === product?.leadVariant?.toLowerCase()
    )
    const finalImages = product?.images?.filter(
      (row) =>
        row?.title?.toLowerCase() === leadVariantTitle[0]?.value?.toLowerCase()
    )
    return finalImages?.length > 0
      ? finalImages
      : product?.images?.filter((row) => row?.title?.toLowerCase() === 'base')
  } else {
    return product?.images?.filter(
      (row) => row?.title?.toLowerCase() === 'base'
    )
  }
}
// for changing currency in INR of price
export function formatCurrency(number, standard = 'en-IN', currency = 'INR') {
  if (Number(number) !== 0 && number !== NaN) {
    const formatter = new Intl.NumberFormat(standard, {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: currency,
    })
    return formatter.format(number)
  }
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export const reversedArray = (array) => {
  let newArray = []
  for (let i = array.length - 1; i >= 0; i--) {
    newArray.push(array[i])
  }
  return newArray
}

export function pageLoadingFunction(isLoading = true) {
  // console.log(isLoading, 'ok')
  let load = true
  if (!isLoading) {
    setTimeout(() => {
      // console.log(isLoading, load, 'ok1')
    }, 5000)
    // console.log(isLoading, load, 'ok2')
    load = false
  }
  return load
}
