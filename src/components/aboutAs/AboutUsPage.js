// // import React from 'react'
import HeadingAboutUs from './HeadingAboutUs'
import Services from './Services'
import SinceHerco from './SinceHerco'
// import VideoLink from ''
import { AppButton } from '../basics'
import useDeviceType from 'src/custom-hooks/useDeviceType'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicVideoLink = dynamic(() => import('./VideoLink'), {
  // loading: () => <p>Loading...</p>,
})
export default function AboutUsPage() {
  const { isMobile } = useDeviceType()
  return (
    <div className="my-5 sm:my-10">
      <HeadingAboutUs />
      <div className="w-11/12 sm:w-9/12 mx-auto">
        <p className="mb-7 text-sm md:text-sm font-robo opacity-60 leading-5 md:leading-7 text-justify md:text-center m-0 ">
          On the occasion of 65 year completion ceremony the founders family
          re-committed itself to bring changes to HERCO India and gear it up to
          be stronger world force ever expanding its horizons.
        </p>
      </div>
      <div className="w-11/12 sm:w-w-main mx-auto mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-5 lg:gap-5 md:mt-14">
          <DynamicVideoLink />
          <SinceHerco />
        </div>
        <div className="flex justify-center sm:pt-10 pt-5">
          <Link href="/about-us">
            <AppButton
              size={isMobile ? 'medium' : 'large'}
              variant={isMobile ? 'outlined' : 'contained'}
              title={'Know more'}
            />
          </Link>
        </div>
      </div>
      <Services isMobile={isMobile} />
    </div>
  )
}
