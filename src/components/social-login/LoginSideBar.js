import { useState, Fragment } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { Divider } from '@mui/material'
import { MdClose } from 'react-icons/md'
import AppIconButton from '../basics/AppIconButton'
import { BsPerson } from 'react-icons/bs'
import { LoginFormCard } from '../forms/LoginForm'
import RegistrationForm from '../forms/RegistrationForm'

export default function LoginSideBar() {
  const [state, setState] = useState({
    left: false,
  })
  const [isRegistered, setIsRegistered] = useState(true)
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 370,
        height: '600px',
      }}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />

      <div className="flex justify-between px-2">
        <h5 className="mb-5 ml-1 text-base font-bold uppercase">
          {isRegistered ? 'Login' : 'Register'}
        </h5>
        <span
          className="mt-6 cursor-pointer text-xl"
          onClick={toggleDrawer(anchor, false)}
        >
          <span className="transition-all duration-500 hover:rotate-90">
            <MdClose />
          </span>
        </span>
      </div>
      <div className="w-11/12 mx-auto">
        {isRegistered ? (
          <LoginFormCard
            setIsRegistered={setIsRegistered}
            closeLoginModal={()=> setState({ ...state, [anchor]: open })}
          />
        ) : (
          <RegistrationForm setIsRegistered={setIsRegistered} />
        )}
      </div>
    </Box>
  )

  return (
    <Box className="cursor-pointer">
      {['right'].map((anchor) => (
        <Fragment key={anchor}>
          <Box onClick={toggleDrawer(anchor, true)}>
            <AppIconButton
              Icon={<BsPerson className="text-theme-primary-main" />}
            />
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Box>
  )
}
