import { useState, useEffect, Fragment } from 'react'
import { Grid } from '@mui/material'
import Image from 'next/image'
import {
  AppAccordion,
  AppButton,
  AppCarousel,
  ErrorScreen,
  LoadingScreen,
} from '../basics'
import MobileBanner from './MobileBanner'
import { FadeRight } from '../animate'
import { HiMenu } from 'react-icons/hi'
import Link from 'next/link'
import { TestimonialSliderTwo } from '../testimonials'
import { useGetSuperSubCategoryById } from 'src/services/superSubCategoryServices'
import { useGetSubCategoryById } from 'src/services/subCategoryServices'
import { useRouter } from 'next/router'
import { NAVBAR_LINKS } from 'src/data/app-data-links'
import { NavbarCategoryList } from '../navbar/DesktopNavbar'
import { useGetAllCategories } from 'src/services/categoryServices'
import { useGetAllTestimonials } from 'src/services/testimonialsServices'

export default function Bannerpage({ banners }) {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategories()
  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    isError: testimonialsError,
  } = useGetAllTestimonials()
  const [homeBanner, setHomeBanner] = useState([])
  const settings = {
    slidesToShow: 1,
    fade: false,
    vertical: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 300,
  }
  useEffect(() => {
    const newPop = banners?.filter((item) => item?.ban_type === 'Home Banner')
    setHomeBanner(newPop)
  }, [banners])
  if (categoriesError || testimonialsError) return <ErrorScreen />
  return (
    <>
      <div className="md:block hidden">
        <div className="container lg:h-[500px] mx-auto mt-4 md:-mt-3 mb-4">
          <Grid container className="h-full">
            <Grid
              xxl={3}
              xl={3}
              lg={3}
              md={3}
              sm={12}
              xs={12}
              className="h-full"
            >
              <div className=" mr-3">
                <div className=" h-12 bg-sky-blue flex justify-center items-center">
                  <HiMenu className="mr-2 text-black" fontSize="1.3em" />
                  <h4 className="text-lg text-black font-medium font-robo">
                    Product Categories
                  </h4>
                </div>
                <div className=" font-robo overflow-scroll md:[300px] lg:h-[500px] ">
                  {categoriesLoading ? (
                    <></>
                  ) : (
                    <>
                      {categories?.map((item, index) => {
                        return <CategoryAccordion key={index} item={item} />
                      })}
                    </>
                  )}
                </div>
              </div>
            </Grid>

            <Grid
              xxl={9}
              xl={9}
              lg={9}
              md={9}
              sm={12}
              xs={12}
              className="h-full p-3 bg-white"
            >
              <div className="flex justify-end pb-4 pt-2">
                {NAVBAR_LINKS?.map((element) => (
                  <Fragment key={element?.name}>
                    <Link href={element?.link}>
                      <span className="group lg:tracking-{.1em} hover:cursor-pointer lg:uppercase lg:text-sm font-semibold hover:text-theme-primary-main px-3 py-4 rounded-md leading-7">
                        {element?.name}
                        <span style={{ transition: ' all 0.5s ease-out' }}>
                          {element?.name === 'products' && (
                            <div className="hidden group-hover:block p-2 absolute right-[4vw] z-10 top-10 mx-auto h-fit w-fit overflow-hidden">
                              <NavbarCategoryList data={categories} />
                            </div>
                          )}
                        </span>
                      </span>
                    </Link>
                  </Fragment>
                ))}
              </div>

              <Grid container style={{ height: 'calc(100% - 48px)' }}>
                <Grid
                  xxl={8}
                  xl={8}
                  lg={8}
                  md={7}
                  sm={6}
                  xs={12}
                  spacing={5}
                  className="h-full"
                >
                  <AppCarousel {...settings} style={{ height: '100%' }}>
                    {homeBanner?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full h-full relative animate-opacityAnimation"
                        >
                          <Link href={item?.pro_link}>
                            <Image
                              width={500}
                              height={428}
                              loading="lazy"
                              src={item?.ban_image}
                              className="w-full object-cover"
                              alt={item?.ban_title}
                            />
                          </Link>
                        </div>
                      )
                    })}
                  </AppCarousel>
                </Grid>
                <Grid
                  xxl={4}
                  xl={4}
                  lg={4}
                  md={5}
                  sm={6}
                  xs={12}
                  className="h-full"
                >
                  <div
                    style={{ height: '179px' }}
                    className="bg-light-pink bg-opacity-75 flex justify-center items-center flex-col h-1/3"
                  >
                    <div className="flex justify-center items-center w-full flex-col py-5 h-1/2">
                      <span className="text-home-content text-[15px] font-robo text-left capitalize">
                        Apply now to join the power tools <br /> revolution and
                        network !
                      </span>
                      <div className="mt-3 hover:scale-105 duration-500">
                        <Link href={'/auth/dealership-registration'}>
                          <AppButton
                            variant="outlined"
                            fullWidth
                            title={'Become a Dealer'}
                            sx={{
                              background: 'white',
                              color: (theme) => theme.palette.primary.main,
                              letterSpacing: '.1rem',
                              border: 'none',
                              fontSize: '18px',
                              fontWeight: '400',
                              boxShadow: '0 4px 9px rgba(0,0,0,.1),',
                              '&:hover': {
                                background: 'white',
                                color: (theme) => theme.palette.primary.main,
                                border: 'none',
                              },
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ height: 'calc( 100% - 179px )' }}
                    className="bg-light-golden"
                  >
                    {testimonialsLoading ? (
                      <></>
                    ) : (
                      <div className="h-fit">
                        <TestimonialSliderTwo testimonials={testimonials} />
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="md:hidden mt-5 animate-fadeUpAnimation">
        <FadeRight durationTime={'1s'}>
          <MobileBanner settings={settings} homeBanner={homeBanner} />
        </FadeRight>
      </div>
    </>
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
    <div className="bg-[#F9F9F9]">
      <AppAccordion
        disabled={subCategories?.length > 0 ? false : true}
        onClick={() => {
          if (subCategories?.length === 0) {
            push(`/categories/${item?.slug}`)
          }
        }}
        sx={{
          borderBottom: '1px solid #dddddd',
          borderRadius: 0,
          '&:before': {
            display: 'none',
          },
          backgroundColor: '#F9F9F9',
          '&.Mui-expanded': {
            boxShadow: 'none',
            borderRadius: 0,
            padding: 0,
            height: 'auto',
            cursor: 'pointer',
          },
          '&.Mui-disabled': {
            backgroundColor: '#F9F9F9',
          },
        }}
        panelName={item?._id}
        title={
          <div className="w-full flex items-center justify-between capitalize text-base font-medium font-robo text-home-content hover:cursor-pointer">
            {item?.name}
          </div>
        }
        description={
          <>
            {subCategories?.length > 0 &&
              subCategories?.map((item) => {
                return (
                  <SubCategoryAccordion
                    key={item?._id}
                    item={item}
                    push={push}
                  />
                )
              })}
          </>
        }
      />
    </div>
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
            cursor: 'pointer',
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        }}
        panelName={item?._id}
        title={
          <div className="hover:cursor-pointer flex items-center justify-between capitalize text-base font-medium font-robo text-home-content">
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
                      className="hover:cursor-pointer flex items-center capitalize justify-between text-base font-medium font-robo text-home-content hover:cursor-pointer"
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
