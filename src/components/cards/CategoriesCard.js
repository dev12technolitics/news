import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useDeviceType from 'src/custom-hooks/useDeviceType'
import { Skeleton } from '@mui/material'

const CategoriesCard = ({
  data,
  redirectUrl,
  isLoadingCategories,
  redirectPath,
}) => {
  return (
    <div>
      <div className=" grid grid-cols-2 justify-center gap-3 p-0 sm:grid-cols-3 sm:gap-7 sm:p-0 md:grid-cols-3 lg:grid-cols-5">
        {data?.map((item) => {
          return (
            <CategoryCard
              key={item?._id}
              item={item}
              redirectUrl={redirectUrl}
              redirectPath={redirectPath}
              isLoading={isLoadingCategories}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CategoriesCard

export function CategoryCard({ item, redirectUrl, redirectPath }) {
  const { icon, name, slug } = item || {}
  const { isMobile } = useDeviceType()
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
        <div className=" rounded-md sm:rounded-xl  overflow-hidden bg-white shadow-shadow-primary p-3">
          {pageLoading ? (
            <Skeleton
              variant="rectangular"
              height={'100%'}
              className="relative aspect-square w-full animate-opacityAnimation rounded-md sm:w-full "
            />
          ) : (
            <div className=" overflow-hidden relative aspect-square bg-white  ">
              <Image
                fill
                src={icon}
                alt={name}
                className="overflow-hidden hover:scale-125 w-full  object-contain transition-all duration-500"
              />
            </div>
          )}

          <div className="flex justify-center w-full  text-center">
            {pageLoading ? (
              <Skeleton height={'100%'} className="my-2  w-4/5 mx-auto" />
            ) : (
              <h2 className="my-2  h-5 w-full overflow-hidden text-base  font-robo Capitalize font-medium text-black">
                {name}
              </h2>
            )}
          </div>
        </div>
      </Link>
    </>
  )
}
