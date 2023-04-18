import { useEffect, useState } from 'react'
import { Grid, Tab, useTheme } from '@mui/material'
import { AppButton, AppHeading, ErrorScreen, LoadingScreen } from '../basics'
import productImg from '../../assets/RoboPowerImages/homeproduct.png'
import AppNoProducts from '../basics/AppNoProducts'
import {
  useGetAllFilteredProducts,
  useGetAllProductsByAnyCategoryById,
} from 'src/services/productServices'
import ProductsCard, { ProductCard } from '../cards/ProductsCard'
import { Box } from '@mui/system'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import Image from 'next/image'
import Link from 'next/link'
import ImageIcon from '../../assets/RoboPowerImages/logo.png'

import { BsFillCloudArrowDownFill } from 'react-icons/bs'
import { useGetAllCategories } from 'src/services/categoryServices'

export default function HomeProductTab({ userType, userData }) {
  const [tabValue, setTabValue] = useState(0)
  const [productFetchUrl, setProductFetchUrl] = useState(
    `/product/all/${userType}`
  )
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategories()
  const { data, isLoading, isError } =
    useGetAllFilteredProducts(productFetchUrl)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
    if (newValue == 0) {
      setProductFetchUrl(`/product/all/${userType}`)
    } else {
      setProductFetchUrl(`/product/byAnyCategory/${newValue}`)
    }
  }
  if (isError || categoriesError) return <ErrorScreen />

  return (
    <section className="w-mobile-w sm:container mx-auto">
      <div className="my-5">
        <AppHeading
          content={'Best Selling'}
          title={'See all'}
          btnClick={'/p'}
        />
      </div>
      <Grid container>
        <Grid
          xxl={3}
          xl={3}
          lg={3}
          md={4}
          sm={4}
          xs={12}
          className="bg-light-golden flex items-center w-full"
        >
          <div className="my-auto w-full">
            <div className="flex justify-center flex-col items-center text-center w-full h-full">
              <Image
                className="transition-all overflow-hidden duration-500  hover:scale-125 sm:mb-7"
                alt="product page"
                src={productImg}
                height={200}
                width={200}
              />
              <div className="sm:mb-7">
                <span className="text-[#683D00] text-sm sm:text-lg mb-1 sm:mb-1">
                  We promise For selling
                </span>
                <h2 className="text-white text-base sm:text-2xl m-2 font-medium ">
                  Quality & high
                  <br />
                  Efficient Products
                </h2>
                <div
                  style={{ lineHeight: '2rem' }}
                  className="text-[#683D00] text-sm sm:text-sm mb-1 sm:mb-1 mt-4 w-8/12 text-center mx-auto"
                >
                  Discover our range of high-quality power tools designed for
                  maximum efficiency.
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center pb-4 sm:pb-4 pt-2">
              <Link href="/brochure.pdf" legacyBehavior>
                <a target="_blank" name="brochure" download>
                  <AppButton
                    variant="contained"
                    title={' Download Brochure'}
                    startIcon={
                      <BsFillCloudArrowDownFill
                        size={35}
                        // className="text-white"
                      />
                    }
                  />
                </a>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid xxl={9} xl={9} lg={9} md={8} sm={8} xs={12} className="bg-white ">
          <div className="mx-auto  w-full md:w-full relative flex py-4 md:py-1">
            <div className="mx-auto w-full">
              <Box>
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons={true}
                  sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                      '&.Mui-disabled': { opacity: 0.3 },
                    },
                  }}
                >
                  <Tab
                    sx={{
                      color: 'black',
                      '&:hover': {
                        color: '#c3c3c3',
                      },
                    }}
                    label="All"
                  />
                  {categories?.length > 0 &&
                    categories?.map((item, index) => {
                      return (
                        <Tab
                          sx={{
                            color: 'black',
                            '&:hover': {
                              color: (theme) => theme.palette.primary.main,
                            },
                          }}
                          key={index}
                          label={item?.name}
                          value={item?.slug}
                        />
                      )
                    })}
                  {/* {otherProducts?.length && <Tabs label="Others" />}/ */}
                </Tabs>
              </Box>
            </div>
          </div>
          <div className="mx-auto w-full p-0 sm:p-4">
            {isLoading ? (
              <LoadingScreen />
            ) : data?.length > 0 ? (
              <div>
                <div className="w-full md:hidden">
                  <div className="grid grid-cols-2 gap-4">
                    {data?.slice(0, 6)?.map((item) => {
                      return (
                        <ProductCard
                          key={item?._id}
                          item={item}
                          userType={userType}
                          userData={userData}
                          redirectPath="/categories/[categorySlug]/p/[productSlug]"
                          redirectUrl={`/categories/${tabValue}/p`}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className="hidden md:block">
                  <ProductsCard
                    data={data}
                    cardDisplayIn={'home'}
                    userType={userType}
                    userData={userData}
                    redirectPath="/categories/[categorySlug]/p/[productSlug]"
                    redirectUrl={`/categories/${tabValue}/p`}
                  />
                </div>
              </div>
            ) : (
              <AppNoProducts />
            )}
          </div>
        </Grid>
      </Grid>
    </section>
  )
}
