import DealerRegistrationForm from 'src/components/forms/DealerRegistrationForm'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import GlobalSEO, { SITE_LOGO, SITE_URL } from '../../data/next-seo.data'
import { FadeRight } from 'src/components/animate'
const Registration = () => {
  
  return (
    <>
      <DefaultSeo
        {...GlobalSEO.global}
        {...GlobalSEO['/auth/dealership-registration']}
      />
      <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
      <FadeRight durationTime={'1s'}>
        <DealerRegistrationForm />
      </FadeRight>
    </>
  )
}

export default Registration
