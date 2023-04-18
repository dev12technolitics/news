import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsFillCloudArrowDownFill } from 'react-icons/bs'
import { FaAngleDoubleRight } from 'react-icons/fa'
import about from '../../assets/RoboPowerImages/homeproduct.png'
import { AppButton } from '../basics'
import TimeLine from './TimeLine'
import Link from 'next/link'
import { History } from 'src/data/app-data'
import { Skeleton } from '@mui/material'
export default function MainAboutPage() {
  const [pageLoading, setPageLoading] = useState()
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 1000)
  }, [])
  return (
    <section>
      <div className="mx-auto w-w-main">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="w-full sm:w-11/12">
            <div className="">
              <p className="mb-6 mt-2 font-raleway text-lg  font-semibold leading-10 sm:leading-[3rem] sm:mt-10 md:text-[35px]">
                <span className="theme-heading">
                  HERCO Transformers Limited -
                </span>
                Pioneering Quality and Innovation in Transformer Technology
                since 1952
              </p>
              <p className="mb-6 text-justify font-robo  text-base leading-9 sm:text-left">
                HERCO was started in mid-1952, trading in speakers used in
                public address systems. HERCO procured licenses and registration
                in the year 1958 committing itself to deliver quality products
                through innovation and a flair for technology. Growing and
                feeding into its customer requirements HERCO expanded through
                many product lines that included battery chargers, signaling
                equipments for India Railways, power packs and High Voltage
                Transformers. HERCO today is focused to deliver all type and
                flavours of transformers.
              </p>
              <p className="mb-6 font-robo  text-base leading-9">
                Our customers have been a great strength to the survival and
                growth of HERCO and we pledge the same sincerity and solidarity
                to our customers.
              </p>
            </div>
            <div className="mx-3 mt-5 flex justify-start gap-5 sm:mt-12">
              <div className="flex items-center justify-center">
                <span className="pt-1">
                  <FaAngleDoubleRight />
                </span>
                <span className="text-xs font-bold text-[#0e0e0e] sm:text-base">
                  Manufacturing Services
                </span>
              </div>
              <div className=" flex items-center justify-center">
                <span className="pt-1">
                  <FaAngleDoubleRight />
                </span>
                <span className="text-xs font-bold text-[#0e0e0e] sm:text-base">
                  Engineering Services
                </span>
              </div>
            </div>
          </div>
          {pageLoading ? (
            <Skeleton variant="rectangular" className="h-full w-full" />
          ) : (
            <div className="relative mt-5 animate-opacityAnimation sm:mt-10">
              <Image
                loading="lazy"
                fill
                alt="img"
                className="h-full w-full  object-cover"
                src={about}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-timeline mt-16">
        <div className=" mx-auto w-full sm:w-10/12">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="">
              <p className="mb-6 mt-10 text-center font-raleway text-lg font-bold text-white  sm:text-left md:text-4xl">
                Highlights of HERCO's Journey: Growing Global Presence and
                Innovation in Manufacturing
              </p>
            </div>
            <div className="mt-10 hidden  h-full w-full sm:block">
              <p className="mb-6 font-robo  text-base leading-9 text-white">
                Expanding global reach with transformer exports, setting up a
                new manufacturing facility, and achieving CE approval for
                advanced 3-phase transformers.
              </p>
            </div>
          </div>

          <TimeLine data={History} />
        </div>
      </div>
      <div className="mt-5 mb-5 sm:mt-16 mb-5 mx-auto w-w-main rounded-lg bg-shade-blue py-3">
        <div className="mx-auto w-full justify-between sm:w-11/12  md:flex">
          <div className="w-full sm:w-8/12">
            <div className="my-7 md:flex ">
              <p className="m-0 text-center font-raleway text-base font-bold leading-8 text-white sm:text-left sm:text-3xl">
                Want to know more about us?
              </p>
              <p className="ml-0 sm:ml-2 mt-3 text-center font-raleway text-[#c6c6c6] text-lg font-light leading-4 text-white sm:text-left ">
                Just download brochure...
              </p>
            </div>
          </div>
          <div className=" w-full sm:w-4/12">
            <div className="my-7 flex justify-center sm:justify-end">
              <Link href="/brochure.pdf" name="brochure" legacyBehavior>
                <a target="_blank" download>
                  <AppButton
                    variant="contained"
                    title={' Download Company Profile '}
                    startIcon={
                      <BsFillCloudArrowDownFill
                        size={35}
                        className="text-white"
                      />
                    }
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-w-main pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            {' '}
            <p className="mt-10 font-raleway text-lg font-bold md:text-5xl">
              HERCO: Advancing tomorrow through{' '}
              <span className="theme-heading">Innovation.</span>
            </p>
            <p className="mb-6 mt-0 font-raleway text-sm  font-bold sm:mt-10 sm:text-base">
              Innovation is the culture of today,
            </p>
          </div>
          <div>
            {' '}
            <p className="my-0 text-justify font-robo text-base leading-9 sm:my-10 sm:text-left">
              “HERCO” has grown over the years serving the nation&apos;s largest
              organization Indian Railways. Innovations and diversification led
              to expansion into a niche area of manufacturing of high voltage
              transformers suitable for various industrial applications like in
              boilers for ignition, electrostatic filtration and high voltage
              instrumentation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
