import { useRouter } from 'next/router'
// import React from 'react'
import { AppButton } from '../basics'

export default function Services({ isMobile }) {
  const { push } = useRouter()

  const servecesdata = [
    {
      number: '65+',
      title: 'EXPERIENCE',
    },
    {
      number: '70+',
      title: 'EMPLOYEES',
    },
    {
      number: '40+',
      title: 'PRODUCTS',
    },
    {
      number: '03',
      title: 'BRANCHES',
    },
  ]
  return (
    <div className="bg-shade-blue my-10">
      <div className="w-11/12 sm:w-w-main mx-auto flex flex-wrap">
        <div className=" w-full sm:w-2/6">
          <div className="my-7">
            <p className="leading-tight text-white font-raleway text-base text-center sm:text-left sm:text-3xl font-bold m-0">
              We have great <br /> achievements to show.
            </p>
            <div className="sm:block hidden mt-5">
              <div className="flex items-center gap-5">
                <p className="leading-tight text-white font-raleway text-[0.875rem] sm:text-base font-normal sm:font-bold m-0">
                  Need services?
                </p>
                <div className=" flex justify-center">
                  <AppButton
                    onClick={() => push('/contact-us')}
                    variant="outlined"
                    title={'Reach Us'}
                    size="medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-8/12 flex">
          <div className="grid grid-cols-4 my-auto h-fit w-full">
            {servecesdata?.map((item, index) => {
              return (
                <div key={index} className="text-center font-raleway">
                  <span className="theme-gradient-text text-2xl sm:text-custom-44 font-bold ">
                    {item?.number}
                  </span>
                  <p className="theme-gradient-text text-xs sm:text-base font-bold uppercase">
                    {item?.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="sm:hidden flex justify-center items-center gap-5 pb-5">
        <p className="pt-3 leading-tight text-white font-raleway  text-[0.875rem] font-medium">
          Need services?
        </p>
        <div className="flex justify-center sm:py-2 pt-2">
          <AppButton
            onClick={() => push('/contact-us')}
            variant="outlined"
            title={'Reach Us'}
            className={`${isMobile && 'text-white font-normal'}`}
          />
        </div>
      </div>
    </div>
  )
}
