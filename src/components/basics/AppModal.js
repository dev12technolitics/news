import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { IoMdClose } from 'react-icons/io'
import AppIconButton from './AppIconButton'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0),
  },
}))

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, px: 2 }} {...other}>
      {children}
      {onClose ? (
        <AppIconButton
          aria-label="close"
          Icon={<IoMdClose />}
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            // top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        />
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function AppModal({
  open = false,
  children,
  title,
  handleClose,
  ...otherProps
}) {
  return (
    <div className="h-full w-full">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        {...otherProps}
      >
        {title && (
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {title}
          </BootstrapDialogTitle>
        )}
        <DialogContent dividers>{children}</DialogContent>
      </BootstrapDialog>
    </div>
  )
}
