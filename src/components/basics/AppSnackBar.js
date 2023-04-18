import { forwardRef } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import { useDispatch, useSelector } from 'react-redux'
import { handleToastClose } from 'src/redux/slices/toastSlice'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function AppSnackBar() {
  const { toggle, status, message } = useSelector((state) => state.toast)
  const dispatch = useDispatch()

  function TransitionRight(props) {
    return <Slide {...props} direction="left" />
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(handleToastClose())
  }

  if (toggle)
    return (
      <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={toggle}
            autoHideDuration={1800}
            onClose={handleClose}
            TransitionComponent={TransitionRight}
          >
            <Alert
              onClose={handleClose}
              severity={status}
              sx={{ width: '100%', fontWeight: 'semi-medium' }}
            >
              {message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    )
}
