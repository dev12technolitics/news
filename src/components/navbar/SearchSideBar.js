import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useRouter } from 'next/router'
import { AiOutlineSearch } from 'react-icons/ai'
import AppIconButton from '../basics/AppIconButton'
import { MdClose } from 'react-icons/md'
export default function SearchSideBar() {
  //all product
  const router = useRouter()
  const [search, setSearch] = React.useState('')

  //drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const handleSubmit = (e, anchor) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.which === 13) {
      e.preventDefault()
      router.push(`/p?search=${search}`)
      setState({ ...state, [anchor]: false })
    }
  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }}
      role="presentation"
    >
      <div
        style={{ height: '10vh' }}
        className="flex pr-2 pt-5 pr-16 justify-end text-2xl"
      >
        <AppIconButton
          className="hover:rotate-90 transition-all"
          onClick={toggleDrawer(anchor, false)}
          Icon={<MdClose />}
        />
      </div>
      <div
        style={{ height: '90vh', alignItems: 'center' }}
        className="flex items-center "
      >
        <div className="w-full h-fit">
          {/* <form > */}
          <div className="w-[100%] mx-auto flex justify-center">
            <div className="relative border-dark-grey border-b-2 flex items-center w-8/12 h-20 focus-within:shadow-lg bg-white overflow-hidden">
              <input
                className="peer h-full w-full outline-none font-robo text-gray-700 pl-3"
                type="text"
                id="search"
                style={{
                  background: 'white',
                  fontSize: '25px',
                }}
                // onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => handleSubmit(e, anchor)}
                placeholder="Search products.."
                // onKeyDown={() => push(`p?search=${search}`)}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="grid place-items-center h-full w-12 text-gray-500 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </Box>
  )

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}>
            <div className="hover:cursor-pointer">
              <AppIconButton
                Icon={<AiOutlineSearch className="text-theme-primary-main" />}
              />
            </div>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
