import Dialog from '@mui/material/Dialog'
import { BiCheckCircle, BiError, BiErrorCircle } from 'react-icons/bi'
import AppButton from './AppButton'

export function appDialog(status, open) {
  switch (status) {
    case 'success':
      return <AppDialog status={status} open={open} />
    case 'error':
      return <AppDialog status={status} open={open} />
    case 'warning':
      return <AppDialog status={status} open={open} />
    default:
      return null
  }
}

export default function AppDialog({
  title = 'App Dialog',
  onClose,
  onSuccess,
  open,
  message = 'This is a msg',
  status,
  ...otherProps
}) {
  const handleClose = () => {
    onClose()
  }

  const handleCase = (value) => {
    switch (value) {
      case 'success':
        return (
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full bg-dialog-success p-6 text-white`}
          >
            <BiCheckCircle color="#ffff" size={70} />
          </div>
        )
      case 'error':
        return (
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full bg-dialog-error p-6 text-white`}
          >
            <BiErrorCircle color="#ffff" size={70} />
          </div>
        )
      case 'warning':
        return (
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full bg-dialog-warning p-6 text-white`}
          >
            <BiError color="#ffff" size={70} />
          </div>
        )
      default:
        return (
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full bg-dialog-success p-6 text-white`}
          >
            <BiError color="#ffff" size={70} />
          </div>
        )
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      open={open}
      {...otherProps}
    >
      <div className="relative my-5 flex w-full flex-col items-center justify-center p-3">
        {handleCase(status)}

        <h2 className="text-2xl">{title}</h2>
        <p className="text-center">{message}</p>

        <div className="flex w-full justify-center space-x-2">
          <AppButton
            type={'button'}
            onClick={onClose}
            title={'no'}
            variant="outlined"
          />
          <AppButton
            onClick={onSuccess}
            type={'button'}
            title={'yes'}
            variant={'contained'}
          />
        </div>
      </div>
    </Dialog>
  )
}
