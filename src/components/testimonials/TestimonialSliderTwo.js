// import React from 'react'
import Image from 'next/image.js'
import { AppCarousel } from '../basics'
function TestimonialSliderTwo({ testimonials }) {
  const settings = {
    slidesToShow: 1,
    fade: false,
    vertical: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 300,
  }
  return (
    <div className=" h-ull">
      
        <AppCarousel {...settings}>
          {testimonials?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col justify-center py-4 px-6 my-5"
              >
                <div>
                  {/* <span className=" font-semibold text-lg">&quot;</span> */}
                  <p className="m-0 h-[120px] overflow-hidden text-[15px] leading-7">
                    <span className="font-semibold text-lg">&quot;</span>
                    {item?.test_comment?.slice(0, 120)}...
                    <span className="font-semibold text-lg">&quot;</span>
                  </p>
                </div>

                <div className=" mt-2 flex items-center">
                  <div className="mt-2">
                    <Image
                      src={item?.image}
                      alt="Picture"
                      className="rounded-full object-cover"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="ml-2">
                    <span className=" font-robo text-base font-medium text-home-content capitalize">
                      {item?.test_name}
                    </span>
                    <br />
                    <span className=" font-robo text-theme-primary-main text-sm capitalize">
                      {item?.designation}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </AppCarousel>
      
    </div>
  )
}

export default TestimonialSliderTwo
