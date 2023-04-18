import LoginForm from 'src/components/forms/LoginForm'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import GlobalSEO, { SITE_LOGO, SITE_URL } from '../../data/next-seo.data'
import { FadeRight } from 'src/components/animate'
const Login = () => {
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO['/auth/login']} />
      <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
      <FadeRight durationTime={'1s'}>
        <LoginForm />
      </FadeRight>
    </>
  )
}

export default Login
