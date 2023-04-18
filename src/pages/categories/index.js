import { DefaultSeo, LogoJsonLd } from 'next-seo'
import { FadeRight } from 'src/components/animate'
import { ErrorScreen } from 'src/components/basics'
import { CategoriesCard } from 'src/components/cards'
import GlobalSEO, { SITE_LOGO, SITE_URL } from '../../data/next-seo.data'
import api from '../../services/api'

const CategoriesPage = ({ categories }) => {
  // const {
  //   data,
  //   isLoading = { isLoadingCategories },
  //   isError,
  // } = useGetAllCategories()

  // if (isLoading) return <LoadingScreen />

  if (!categories?.status) return <ErrorScreen />

  return (
    <>
      <section className="mx-auto w-mobile-w sm:container my-20">
        <DefaultSeo {...GlobalSEO.global} {...GlobalSEO['/categories']} />
        <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
        <FadeRight durationTime={'1s'}>
          <CategoriesCard
            // isLoadingCategories={}
            data={categories.categorys}
            redirectPath="/categories/[categorySlug]"
            redirectUrl={`/categories`}
          />
        </FadeRight>
      </section>
    </>
  )
}

export default CategoriesPage

export async function getServerSideProps() {
  const res = await api.get('/category/all')

  const categories = res.data

  return {
    props: {
      categories,
    },
  }
}

// export async function getStaticPaths() {
//   const res = await api.get('/category/all')

//   const categories = res.data

//   const paths = categories.categorys.map((category) => ({
//     params: { categorySlug: category.slug },
//   }))

//   return {
//     paths,
//     fallback: true,
//   }
// }
