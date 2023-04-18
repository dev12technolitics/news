import Image from 'next/image'
// import React from 'react'
import useDeviceType from 'src/custom-hooks/useDeviceType'
import { AppCarousel, AppHeading } from '../basics'

function OurClients({ clients }) {
  const { isMobile } = useDeviceType()
  // const { data } = useGetAllClints()

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    infinite: clients?.length >= 7 ? true : false,
    slidesToShow: 7,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div>
      <div className="mt-7 text-center md:mt-4">
        <AppHeading title={'Our Clients'} />
      </div>
      <div className="scroll mb-7 md:mb-10">
        <AppCarousel {...settings}>
          {clients?.map((item, index) => {
            return (
              <div key={index} className="">
                <Image
                  className="mx-auto object-contain"
                  height={isMobile ? 65 : 100}
                  width={isMobile ? 65 : 100}
                  alt={item?.name}
                  src={item?.logo}
                />
              </div>
            )
          })}
        </AppCarousel>
      </div>
    </div>
  )
}

export default OurClients
