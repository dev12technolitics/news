// import React from 'react'
import Link from 'next/link'
import { AppCarousel, AppHeading, ErrorScreen } from '../basics'

export default function HomePageCategories() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategories()
  const settings = {
    slidesToShow: 6,
    autoplay: true,
    autoplaySpeed: 500,
    infinite: categories?.length >= 6 ? true : false,
    speed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  
  if (categoriesError) return <ErrorScreen />

  return (
    <section className="relative">
      <div className="w-mobile-w sm:container mx-auto">
        {/* laptop view */}
        <div className="md:block hidden w-full mx-auto bg-white px-2">
          <AppCarousel {...settings}>
            {categories?.map((item) => {
              return (
                <div key={item?._id} className="px-2 py-3">
                  <HomePageCategoriesCard
                    item={item}
                    redirectPath="/categories/[categorySlug]"
                    redirectUrl={`/categories`}
                  />
                </div>
              )
            })}
          </AppCarousel>
        </div>
        {/* mobile view */}
        <div className="md:hidden">
          <div className="mt-4">
            <AppHeading
              content={'Shop By Category'}
              title={'See all'}
              btnClick={'/categories'}
            />
          </div>
          <div className=" w-full mx-auto bg-white px-0 mt-4">
            <div className="scrolll ">
              <div className="w-full grid grid-rows-1 grid-flow-col gap-2 py-2">
                {categories?.map((item) => {
                  return (
                    <div
                      key={item?._id}
                      className="p-1 md:p-6 aspect-square w-[46vw]"
                    >
                      <HomePageCategoriesCard
                        item={item}
                        redirectPath="/categories/[categorySlug]"
                        redirectUrl={`/categories`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'
import Image from 'next/image'
import AppIconButton from '../basics/AppIconButton'
import { BiRightArrowCircle } from 'react-icons/bi'
import { useGetAllCategories } from 'src/services/categoryServices'

export function HomePageCategoriesCard({ item, redirectUrl, redirectPath }) {
  const { icon, name, slug } = item || {}
  const [pageLoading, setPageLoading] = useState(true)
  const [finalUrl, setFinalUrl] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 1000)
    let lastSlug = redirectUrl?.split('/')?.pop()
    if (Number(lastSlug[0]) === 0) {
      setFinalUrl(
        redirectUrl?.split('/')?.slice(0, -1)?.join('/') +
          `/${
            item?.subCategorySlug ? item?.subCategorySlug : item?.categorySlug
          }`
      )
    } else {
      setFinalUrl(redirectUrl)
    }
  }, [redirectUrl, item])
  return (
    <>
      <Link href={redirectPath} as={`${finalUrl}/${slug}`}>
        <div className="rounded-md w-full sm:rounded-lg   dark:bg-[#F9F9F9]  overflow-hidden rounded-lg bg-white p-4">
          {pageLoading ? (
            <Skeleton
              variant="rectangular"
              height={'100%'}
              className=" aspect-square w-full animate-opacityAnimation rounded-md sm:w-full "
            />
          ) : (
            <div className=" overflow-hidden aspect-square bg-white rounded-lg relative">
              <Image
                fill
                src={icon}
                alt={name}
                className="overflow-hidden h-40 hover:scale-125 w-full  object-cover transition-all duration-500"
              />
            </div>
          )}
          {pageLoading ? (
            <Skeleton
              height={'100%'}
              className=" h-5 rounded-md w-full animate-opacityAnimation rounded-md sm:w-full "
            />
          ) : (
            <div className="flex jutify-between">
              <h2 className="mt-2 pl-1 h-5 w-full capitalize overflow-hidden text-sm  font-robo Capitalize font-medium text-black">
                {name}
              </h2>
              <AppIconButton size="small" Icon={<BiRightArrowCircle />} />
            </div>
          )}
        </div>
      </Link>
    </>
  )
}
