import { Box } from '@mui/system'
// import React from 'react'
import { OffersCard } from 'src/components/offers'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import GlobalSEO, { SITE_LOGO, SITE_URL } from '../../data/next-seo.data'
const Offers = () => {
  const products = [
    {
      colors: [('#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF')],
      cover:
        'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_10.jpg',

      name: 'Rod Laver low-top sneakers',

      percent: '20%',
      status: 'Expired',
      couponCode: 'KGFCH2',
    },
  ]
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO['/offers']} />
      <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
      <div className="mx-auto my-7 md:container sm:my-16">
        <Box
          container
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          className="mx-auto w-full sm:w-fit"
        >
          {products?.map((product, index) => {
            return <OffersCard key={index} product={product} />
          })}
        </Box>
      </div>
    </>
  )
}

export default Offers
