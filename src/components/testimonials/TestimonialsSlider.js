import Image from 'next/image'
// import React from 'react'
import { AppCarousel, AppReadMore } from '../basics'
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'

export default function TestimonialsSlider({ testimonials }) {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    infinite: testimonials?.length >= 3 ? true : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          autoplay: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          autoplay: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <AppCarousel {...settings}>
      {testimonials?.map((item, index) => {
        return (
          <div key={index} className="w-full sm:px-3 py-3">
            <div className="md:my-2 md:mx-1 bg-white shadow-shadow-primary">
              <div className="flex justify-center w-full flex-col py-5 px-7">
                <div>
                  <span className=" font-semibold ">
                    <RiDoubleQuotesL />
                  </span>
                  <AppReadMore height={'140px'} length={172}>
                    {item?.test_comment}
                  </AppReadMore>

                  <span className="flex justify-end font-semibold -mt-5 mb-5">
                    <RiDoubleQuotesR />
                  </span>
                </div>

                <div
                  className="flex w-full h-18 items-center"
                  style={{
                    backgroundColor:
                      index % 2 == 0
                        ? index % 3 == 0
                          ? '#FFDAD6'
                          : '#FFE6C1'
                        : '#CEF0FF',
                  }}
                >
                  <div className="m-2">
                    <Image
                     src={item?.image}
                      alt="Picture"
                      className="rounded-full object-cover"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="m-2 w-full">
                    <p className="m-0 text-base capitalize font-robo leading-0 font-medium">
                      {item?.test_name}
                    </p>
                    <p className="m-0 capitalize text-sm text-theme-primary-main font-robo leading-0 font-normal">
                     {item?.designation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <section key={index} className="mb-[30px] p-1 w-full">
          {item?.image != "" &&
          item?.image != null &&
          item?.image != undefined ? (
            <Image
              src={item?.image}
              alt="image"
              layout="intrinsic"
              width={1000}
              height={1000}
              objectFit="cover"
              className="w-full rounded-lg overflow-hidden"
            />
          ) : (
            <div className="flex justify-center items-center sameHeight bg_theme_light rounded-lg overflow-hidden">
              <Logo heightSvg={"45%"} widthSvg={"45%"} />
            </div>
          )}
          <div className="pt-2 we_Spotted_end px-2">
            <p
              style={{ fontFamily: "Kaushan Script" }}
              className="home_heading capitalize font-[500] md:text-[17px] testimonials_name light_blue_text text-[30px] leading-[2.321em] lg:leading-[2.01em] md:leading-[2.01em] sm:leading-[2.01em] tracking-[.01em]   md:tracking-[.04em] "
            >
              {item?.test_name}
            </p>
            <Readmore>{item?.test_comment}</Readmore>
          </div>
        </section> */}
          </div>
        )
      })}
    </AppCarousel>
  )
}
