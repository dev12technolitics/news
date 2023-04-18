// import React from 'react'
import { AppCarousel } from '../basics'
import { ProductCard } from '../cards/ProductsCard'
import { useGetAllProductsByAnyCategoryById } from 'src/services/productServices'

const RelatedProducts = ({
  userType,
  userData,
  categoryId,
  currentLocation,
}) => {
  const slugs = categoryId
    ?.map((el) => {
      return el?.slug
    })
    ?.join(',')
  const { data, isLoading, isError } = useGetAllProductsByAnyCategoryById(slugs)
  if (isLoading) return <div />
  if (isError) return <div />
  // const redirectPathResolver = () => {
  //   let newArray = currentLocation?.split('/')
  //   switch (newArray?.length) {
  //     case 6:
  //       return '/categories/[categorySlug]/p/[productSlug]'
  //     case 7:
  //       return '/categories/[categorySlug]/[subCategorySlug]/p/[productSlug]'
  //     case 8:
  //       return '/categories/[categorySlug]/[subCategorySlug]/[supersubCategorySlug]/p/[productSlug]'
  //     default:
  //       return '/p/[slug]'
  //   }
  // }
  // const redirectPath = redirectPathResolver()
  const settings = {
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 500,
    infinite: data?.length >= 5 ? true : false,
    speed: 2000,
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
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  // console.log(redirectPath)
  return (
    <div className="mx-auto w-11/12 sm:w-10/12">
      {/* <AppHeading title="Related Products" /> */}
      <AppCarousel {...settings}>
        {data?.map((item) => {
          return (
            <div key={item._id} className="p-2">
              <ProductCard
                item={item}
                userData={userData}
                userType={userType}
                redirectPath={'/p/[slug]'}
                redirectUrl={'/p'}
              />
            </div>
          )
        })}
      </AppCarousel>
    </div>
  )
}

export default RelatedProducts
