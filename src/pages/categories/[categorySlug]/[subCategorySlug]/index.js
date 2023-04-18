import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { ProductListCard } from 'src/components/cards'

const SubCategorySlugPage = () => {
  const { query } = useRouter()
  const { subCategorySlug, categorySlug } = query
  const { userType, userData } = useSelector((state) => state.user)
  const initialUrl = `/product/byAnyCategory/${subCategorySlug}`

  return (
    <ProductListCard
      redirectPath="/categories/[categorySlug]/[subCategorySlug]/p/[productSlug]"
      redirectUrl={`/categories/${categorySlug}/${subCategorySlug}/p`}
      initialUrl={initialUrl}
      userType={userType}
      userData={userData}
    />
  )
}

export default SubCategorySlugPage

// export async function getServerSideProps({ params }) {
//   const response = await api.get('/category/all')
//   const categories = await response.data.categorys
//   const { slug } = params
//   const id = slug?.split('-')?.pop()

//   const res = await api.get(`/product/byAnyCategory/${id}`)
//   const product = await res.data.product

//   return {
//     props: {
//       product,
//       categories,
//     },
//   }
// }
