import { IconButton } from '@mui/material'
// import React from 'react'

function AppIconButton({ Icon, ...otherProps }) {
  return (
    <>
      <IconButton {...otherProps}>{Icon}</IconButton>
    </>
  )
}

export default AppIconButton
