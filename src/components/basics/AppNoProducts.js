import Image from 'next/image'
// import React from 'react'
import useDeviceType from 'src/custom-hooks/useDeviceType'
import noProductImg from '../../assets/images/out-of-stock.png'
import { FadeIn, FadeRight } from '../animate'

function AppNoProducts() {
  const { isMobile } = useDeviceType()
  return (
    <FadeIn durationTime={'1s'}>
      <div className="h-full w-full ">
        <div className="flex items-center justify-center">
          <div>
            <div className="mx-auto w-fit">
              <Image
                height={isMobile ? 100 : 150}
                width={isMobile ? 100 : 150}
                alt="AppNoProducts"
                src={noProductImg}
                className="mx-auto object-cover "
              />
            </div>

            <h4 className="text-center text-base font-semibold">
              Oops !! <br /> No products found.
            </h4>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default AppNoProducts
