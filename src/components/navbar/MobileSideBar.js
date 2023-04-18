import { useState, Fragment } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Link from 'next/link'
import { Divider } from '@mui/material'
import { CgMenu } from 'react-icons/cg'
import { MOBILE_NAVBAR_LINKS } from '../../data/app-data-links'
import { useGetAllCategories } from 'src/services/categoryServices'
import { AppAccordion, AppButton, ErrorScreen, LoadingScreen } from '../basics'
import { useGetSuperSubCategoryById } from 'src/services/superSubCategoryServices'
import { useGetSubCategoryById } from 'src/services/subCategoryServices'
import { useRouter } from 'next/router'

export default function MobileSidebar({ userData }) {
  const [state, setState] = useState({
    left: false,
  })
  //categories
  const { data: categoriesData, isLoading, isError } = useGetAllCategories()

  if (isLoading) return <></>

  if (isError) return <></>

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
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270,
        height: '',
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      className=""
    >
      <div className="px-1">
        {userData === null ? (
          <div className="mx-auto w-11/12 py-4">
            <Link href="/auth/login">
              <AppButton size="small" variant="outlined" title="Login Here" />
            </Link>
          </div>
        ) : (
          <div className="mx-auto w-11/12 py-4">
            <Link href="/account/profile">
              <>
                <p className="m-0 text-sm capitalize text-theme-primary-main">
                  {userData?.name || userData?.dist_name}
                </p>
                <p className="m-0 pt-1 text-sm text-theme-primary-main">
                  {userData?.contact_no || userData?.dist_contact}
                </p>
              </>
            </Link>
          </div>
        )}
      </div>
      <Divider className="mb-4" />
      <Box className="pr-2">
        {categoriesData?.map((item, index) => {
          return <CategoryAccordion key={index} item={item} />
        })}
      </Box>
      {categoriesData?.length > 0 && <Divider className="mb-4" />}
      {MOBILE_NAVBAR_LINKS?.map((item, index) => {
        return (
          <div
            className="py-1 m-0"
            key={index}
            onClick={toggleDrawer(anchor, false)}
          >
            <Link href={item?.link}>
              <p className="m-0  flex items-center px-5 h-10 text-sm uppercase text-[#3e4152]">
                {item?.name}
              </p>
            </Link>

            <hr />
          </div>
        )
      })}
    </Box>
  )

  return (
    <div className="">
      {['left'].map((anchor) => (
        <Fragment key={anchor}>
          <div className="h-fit w-fit p-2" onClick={toggleDrawer(anchor, true)}>
            <CgMenu className="text-2xl text-theme-primary-main " />
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="relative h-full">
              {list(anchor)}
              {/* <div className="w-full h-auto absolute left-0 bottom-0 w-full">
                <div className="relative w-full h-24">
                  <Image
                    fill
                    alt="something"
                    src={lastImage}
                    // placeholderSrc={lastImage}
                    className="w-full h-full"
                  />
                </div>
              </div> */}
            </div>
          </Drawer>
        </Fragment>
      ))}
    </div>
  )
}
export const CategoryAccordion = ({ item }) => {
  const { push } = useRouter()
  const {
    data: subCategories,
    isLoading: subCategoriesLoading,
    isError: subCategoriesError,
  } = useGetSubCategoryById(item?.slug)
  if (subCategoriesLoading) <div>Loading</div>
  if (subCategoriesError) return <div>Error</div>
  return (
    <AppAccordion
      disabled={subCategories?.length > 0 ? false : true}
      onClick={() => {
        if (subCategories?.length === 0) {
          push(`/categories/${item?.slug}`)
        }
      }}
      sx={{
        backgroundColor: 'transparent',
        '&.Mui-expanded': {
          boxShadow: 'none',
          borderRadius: 0,
          padding: 0,
          height: 'auto',
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
        },
      }}
      panelName={item?._id}
      title={
        <div className=" py-1 w-full flex items-center justify-between text-base font-medium text-home-content hover:cursor-pointer">
          {item?.name}
        </div>
      }
      description={
        <>
          {subCategories?.length > 0 &&
            subCategories?.map((item) => {
              return (
                <SubCategoryAccordion key={item?._id} item={item} push={push} />
              )
            })}
        </>
      }
    />
  )
}

export const SubCategoryAccordion = ({ push, item }) => {
  const {
    data: supSubCategories,
    isLoading: supSubCategoriesLoading,
    isError: supSubCategoriesError,
  } = useGetSuperSubCategoryById(item?.slug)
  if (supSubCategoriesLoading) return <LoadingScreen />
  if (supSubCategoriesError) return <ErrorScreen />
  return (
    <>
      <AppAccordion
        disabled={supSubCategories?.length > 0 ? false : true}
        onClick={() => {
          if (supSubCategories?.length === 0) {
            push(`/categories/${item?.categorySlug}/${item?.slug}`)
          }
        }}
        sx={{
          backgroundColor: 'transparent',
          '&.Mui-expanded': {
            boxShadow: 'none',
            borderRadius: 0,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        }}
        panelName={item?._id}
        title={
          <div className="hover:cursor-pointer flex items-center justify-between  text-base font-medium text-home-content hover:cursor-pointer">
            {item?.name}
          </div>
        }
        description={
          <>
            {supSubCategories?.map((item) => {
              return (
                <Fragment key={item?._id}>
                  <Link
                    href="/categories/[categorySlug]/[subCategorySlug]/[superSubCategorySlug]"
                    as={`/categories/${item?.categorySlug}/${item?.subCategorySlug}/${item?.slug}`}
                  >
                    <div
                      key={item?._id}
                      // onClick={() => push(`/p/${item?.slug}`)}
                      className="hover:cursor-pointer flex items-center justify-between py-2 text-base font-medium text-home-content hover:cursor-pointer"
                    >
                      {item?.name}
                    </div>
                  </Link>
                </Fragment>
              )
            })}
          </>
        }
      />
    </>
  )
}
