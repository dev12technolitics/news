// import { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import logopng from "../../assets/RoboPowerImages/logo.png";
import MobileSideBar from "./MobileSideBar";
// import AppIconButton from '../basics/AppIconButton'
// import { BsPersonCircle } from 'react-icons/bs'
// import { Menu, MenuItem, Tooltip } from '@mui/material'
// import { MdFormatListBulleted, MdLogout } from 'react-icons/md'
// import { useDispatch } from 'react-redux'
// import { logout } from 'src/redux/slices/userSlice'
import { CartSideBar } from "../cart";

export default function MobileNavbar({ userData, userType }) {
  const { pathname } = useRouter();
  // const dispatch = useDispatch()
  // const [anchorEl, setAnchorEl] = useState(null)
  // const [scrolled, setScrolled] = useState(false)
  // const changeNavbarShadow = () => {
  //   if (window.scrollY >= 80) {
  //     setScrolled(true)
  //   } else {
  //     setScrolled(false)
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener('scroll', changeNavbarShadow)
  // }, [])
  const handlePageBack = () => {
    if (window.history.length > 1) {
      Router.back();
    } else {
      Router.replace("/");
    }
  };
  // const open = Boolean(anchorEl)
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }
  // //logout function
  // const handleLogout = () => {
  //   dispatch(logout())
  //   window.localStorage.setItem('userVisit', false)
  //   push('/')
  // }

  return (
    <>
      {/* <div
        className={`w-screen z-50 py-3  transition-all duration-300 
        ${
          pathname === '/'
            ? scrolled
              ? 'fixed bg-shade-blue  '
              : 'absolute left-0 top-0 w-screen custom-max-screen:bg-shade-blue '
            : 'fixed bg-shade-blue '
        }
        `}
      > */}
      <div className="w-screen z-50 py-1 bg-white fixed shadow-shadow-primary transition-all duration-300">
        <div className=" relative mx-auto flex w-full items-center justify-between ">
          <div className="flex px-2">
            {pathname !== "/" && (
              <div onClick={handlePageBack} className=" p-2">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 64L0 32L32 0L37.7 5.6L15.3 28H64V36H15.3L37.7 58.4L32 64Z"
                    fill="#ff5451"
                  />
                </svg>
              </div>
            )}
            {pathname == "/" && (
              <MobileSideBar userType={userType} userData={userData} />
            )}
          </div>
          <div className="flex items-start w-full mt-1">
            <div className="flex w-full justify-center hover:cursor-pointer">
              <Link href={"/"}>
                <div>
                  <Image
                    loading="lazy"
                    src={logopng}
                    alt="Picture of the author"
                    width={80}
                    height={35}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div />
          <div className="cursor-pointer text-xl px-2">
            {/* {userData == null ? (
              <Link className="cursor-pointer " href="/account/profile">
                <AppIconButton
                  Icon={<BsPersonCircle className="text-theme-primary-main " />}
                />
              </Link>
            ) : (
              <div>
                <Tooltip title="My Account">
                  <AppIconButton
                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    Icon={<BsPersonCircle className="text-[#3d3c7c]" />}
                  />
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                  }}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                  }}
                >
                  <MenuItem onClick={() => push('/account/profile')}>
                    <MdFormatListBulleted className="mr-2" />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <MdLogout className="mr-2" />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )} */}
            <CartSideBar />
          </div>
        </div>
      </div>
    </>
  );
}
