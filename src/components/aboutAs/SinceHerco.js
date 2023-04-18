import Image from 'next/image'
// // import React from 'react'
import icon1 from '../../assets/RoboPowerImages/homeproduct.png'
export default function SinceHerco() {
  const hercodata = [
    {
      images: icon1?.src,
      title: 'Manufacturing Services',
      desc: 'HERCO has a dedicated engineering team looking after new product development & introduction.',
    },
    {
      images: icon1?.src,
      title: 'Engineering Services',
      desc: 'HERCO offers outstanding manufacturing services with or without product design services.',
    },
  ]
  return (
    <div>
      {/* <div>
        <p className="md:hidden font-raleway text-theme-primary-main gap-1 md:gap-2 md:text-xl flex text-sm  mt-2 sm:mt-0 mb-2">
          <span className="uppercase font-semibold md:text-3xl text-base">
            Herco
          </span>
          <span className="font-medium pt-1">Since</span>
          <span className="font-medium pt-1">1958</span>
        </p>
        <div className="md:hidden">
          <p className="text-xs md:text-sm font-robo opacity-60 leading-5 md:leading-7 text-justify md:text-left m-0">
            HERCO has successfully completed 65 years of quality product
            deliverance to its customers. On the occasion of 65 year completion
            ceremony the founders family re-committed itself to bring changes to
            HERCO India and gear it up to be stronger world force ever expanding
            its horizons.
          </p>
        </div>
   
      </div> */}
      <div className="h-[99%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-14 h-full">
          {hercodata?.map((item, index) => {
            return (
              <div
                className="bg-white h-full shadow-shadow-light rounded-2xl flex justify-center"
                key={index}
              >
                <div className="p-5">
                  <div className=" flex justify-center items-center">
                    <Image
                      alt={item?.title}
                      height={80}
                      width={80}
                      src={item?.images}
                    />
                  </div>
                  <p className="font-raleway font-extrabold text-lg flex justify-center items-center">
                    {item?.title}
                  </p>
                  <span className="text-center text-sm font-robo opacity-60 leading-7 flex justify-center items-center">
                    {item?.desc}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
