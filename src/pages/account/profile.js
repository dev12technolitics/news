// import React from 'react'
import { useSelector } from 'react-redux'
import { LoginForm } from 'src/components/forms'
import MyAccount from 'src/components/my-account/MyAccount'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import GlobalSEO, { SITE_LOGO, SITE_URL } from '../../data/next-seo.data'
import { FadeRight } from 'src/components/animate'

const Profile = () => {
  //user data from slice
  const { userData, userAccessToken, userType } = useSelector(
    (state) => state.user
  )
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO['/account/profile']} />
      <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
      <FadeRight durationTime={'1s'}>
        {userData == null ? (
          <LoginForm />
        ) : (
          <MyAccount
            userData={userData}
            userAccessToken={userAccessToken}
            userType={userType}
          />
        )}
      </FadeRight>
    </>
  )
}

export default Profile
