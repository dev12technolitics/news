import { Tab } from '@mui/material'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FadeRight } from 'src/components/animate'
import {
  AppNoProducts,
  ErrorScreen,
  LoadingScreen,
} from 'src/components/basics'
import { CategoriesCard, ProductsCard } from 'src/components/cards'
import { useGetAllProductsByAnyCategoryById } from 'src/services/productServices'
import {
  useGetAllOthersProductByCategory,
  useGetSubCategoryById,
} from 'src/services/subCategoryServices'
import { useGetSuperSubCategoryById } from 'src/services/superSubCategoryServices'

const SubCategoriesPage = () => {
  const { query } = useRouter()
  // const id = query?.slug?.split('-')?.pop()
  const slug = query.categorySlug
  const { userData, userType } = useSelector((state) => state.user)
  const [tabValue, setTabValue] = useState(0)
  const [productFetchId, setProductFetchId] = useState('')

  useEffect(() => {
    setProductFetchId(slug)
  }, [slug])
  const { data, isLoading, isError } = useGetSubCategoryById(slug)

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetAllProductsByAnyCategoryById(productFetchId)

  const {
    data: otherProducts,
    isLoading: otherProductsLoading,
    isError: otherProductsError,
  } = useGetAllOthersProductByCategory(slug)

  const {
    data: superSubCategories,
    isLoading: superSubCategoriesLoading,
    isError: superSubCategoriesError,
  } = useGetSuperSubCategoryById(productFetchId)

  if (
    isLoading ||
    productsLoading ||
    otherProductsLoading ||
    superSubCategoriesLoading
  )
    return <LoadingScreen />

  if (isError || productsError || otherProductsError || superSubCategoriesError)
    return <ErrorScreen />

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
    setProductFetchId(newValue === 0 ? slug : newValue)
  }
  return (
    <>
      <FadeRight durationTime={'1s'}>
        <div className="mx-auto mt-10 flex flex-col items-center justify-center w-mobile-w sm:w-full container">
          {data?.length > 0 && (
            <div className="mx-auto w-full ">
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
                      color: '#696969',
                    },
                  }}
                  label="All"
                />
                {data?.map((item, index) => {
                  return (
                    <Tab
                      sx={{
                        color: 'black',
                        '&:hover': {
                          color: '#696969',
                        },
                      }}
                      key={index}
                      label={item?.name}
                      value={item?.slug}
                    />
                  )
                })}
                {otherProducts?.length && <Tabs label="Others" />}
              </Tabs>
            </div>
          )}
          <div className="mx-auto w-w-main my-10">
            <CategoriesCard
              data={superSubCategories}
              isLoadingCategories={superSubCategoriesLoading}
              redirectPath="/categories/[categorySlug]/[subCategorySlug]/[superSubCategorySlug]"
              redirectUrl={`/categories/${slug}/${tabValue}`}
            />

            {/* <AppHeading title="Explore Products" /> */}
            {/* <NextSeo
            title={'Herco Transformers || Category: ' + oneCategory?.name}
            openGraph={{
              title: oneCategory?.name,
              url: `https://www.hercotransformers.com/categories/subcategories/${oneCategory?._id}`,
              images: [
                {
                  url: oneCategory?.icon,
                  width: 800,
                  height: 600,
                  alt: oneCategory?.name,
                },
              ],
            }}
          /> */}
            {superSubCategories?.length > 0 && (
              <div className=" w-full flex justify-center my-10">
                <p className="font-robo font-medium text-center text-2xl border-theme-primary-main border-b-2 m-0">
                  Explore Products
                </p>
              </div>
            )}
            {products?.length > 0 ? (
              <ProductsCard
                data={products}
                userType={userType}
                userData={userData}
                // redirectUrl={`/p`}
                redirectPath="/categories/[categorySlug]/p/[productSlug]"
                redirectUrl={`/categories/${query?.categorySlug}/p`}
              />
            ) : (
              <div className="my-10">
                <AppNoProducts />
              </div>
            )}
          </div>
        </div>
      </FadeRight>
    </>
  )
}

export default SubCategoriesPage
