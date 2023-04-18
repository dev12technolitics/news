import { DefaultSeo, LogoJsonLd } from 'next-seo'
import { useSelector } from 'react-redux'
import { ProductListCard } from 'src/components/cards'
import GlobalSEO, { SITE_LOGO, SITE_URL } from '../../data/next-seo.data'
import { useRouter } from 'next/router'

const Products = () => {
  const { query } = useRouter()
  const { userType, userData } = useSelector((state) => state.user)
  const initialUrl = `/product/all/${userType}`
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO['/p']} />
      <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
      <ProductListCard
        querySearchValue={query.search}
        redirectPath={'/p/[slug]'}
        redirectUrl={'/p'}
        initialUrl={initialUrl}
        userType={userType}
        userData={userData}
      />
    </>
  )
}

export default Products
