import { useRouter } from 'next/router'
// import React from 'react'
import { useSelector } from 'react-redux'
import { FadeIn, FadeRight } from 'src/components/animate'
import { FaHistory, FaAddressBook, FaUserAlt } from 'react-icons/fa'
import { BsHeartFill } from 'react-icons/bs'
import {
  MyAddresses,
  MyWishlist,
  Myprofile,
  OrderHistory,
} from 'src/components/my-account'
import { DefaultSeo, LogoJsonLd } from 'next-seo'
import GlobalSEO, { SITE_LOGO, SITE_URL } from '../../data/next-seo.data'

function MobileAccountPage() {
  const { query } = useRouter()
  const tabValue = query?.tab
  const { userData, userType } = useSelector((state) => state.user)
  return (
    <>
      <FadeRight durationTime={'1s'}>
        <div className="px-5">
          <DefaultSeo
            {...GlobalSEO.global}
            {...GlobalSEO['/account/profile']}
          />
          <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
          <div
            className={`text-base capitalize tracking-wider pl-2 py-5 font-normal hover:cursor-pointer flex items-center`}
          >
            {tabValue == 'my-profile' && <FaUserAlt className="mr-3" />}
            {tabValue == 'address-book' && <FaAddressBook className="mr-3" />}
            {tabValue == 'wishlist' && <BsHeartFill className="mr-3" />}
            {tabValue == 'order-history' && <FaHistory className="mr-3" />}
            {/* {tabValue == 'order-tracking' && <MdTrackChanges className="mr-3" />} */}
            {tabValue?.replace('-', ' ')}
          </div>
          {tabValue == 'my-profile' && (
            <FadeIn durationTime={'1s'}>
              <Myprofile userData={userData} userType={userType} />
            </FadeIn>
          )}{' '}
          {tabValue == 'address-book' && (
            <FadeIn durationTime={'1s'}>
              <MyAddresses userData={userData} userType={userType} />
            </FadeIn>
          )}
          {tabValue == 'wishlist' && (
            <FadeIn durationTime={'1s'}>
              <MyWishlist userData={userData} userType={userType} />
            </FadeIn>
          )}
          {tabValue == 'order-history' && (
            <FadeIn durationTime={'1s'}>
              <OrderHistory userData={userData} userType={userType} />
            </FadeIn>
          )}
        </div>
      </FadeRight>
    </>
  )
}

export default MobileAccountPage
