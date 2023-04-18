import { Grid } from '@mui/material'
// import React from 'react'
import { AppHeading } from '../basics'
import sellOne from '../../assets/RoboPowerImages/homeproduct.png'
import selltwo from '../../assets/RoboPowerImages/bestseller3.png'
import toolsOne from '../../assets/RoboPowerImages/tools.png'
import toolsTwo from '../../assets/RoboPowerImages/toolstwo.png'
import toolsThree from '../../assets/RoboPowerImages/spare.png'
import Image from 'next/image'

export default function BestSeller() {
  return (
    <section className="w-mobile-w sm:container mx-auto my-5">
      <Grid container>
        <Grid
          xxl={4}
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          className="bg-[#30BFFE] shadow-md py-1 sm:py-4"
        >
          <div className="flex justify-center flex-col items-center text-center w-full">
            <Image
              height={220}
              width={220}
              alt="product page"
              className="transition-all duration-500  sm:sm:hover:scale-125"
              src={sellOne}
            />

            <div className="flex justify-center flex-col items-center text-center w-[250px] width_mobile_view">
              <h2 className="font-robo text-white text-base sm:text-[22px] font-medium mb-1 ">
                Powerful and Reliable
              </h2>
              <span className="font-robo text-white text-xs sm:text-sm mb-[30px] leading-6 text-center ">
                Powerful and reliable power tools for all your home improvement
                needs.
              </span>
            </div>
          </div>
        </Grid>

        <Grid
          xxl={4}
          xl={4}
          lg={4}
          md={4}
          sm={6}
          xs={12}
          className="bg-white shadow-md"
        >
          <div className="flex justify-center flex-col items-center text-center w-full">
            <div
              style={{
                position: 'relative',
              }}
              className="transition-all duration-500  sm:hover:scale-125"
            >
              <Image
                height={220}
                width={220}
                alt="product page"
                src={toolsTwo}
              />

              <div className="top-32 flex absolute">
                <Image
                  height={100}
                  width={100}
                  alt="product page"
                  src={toolsThree}
                />
                <Image
                  height={100}
                  width={100}
                  alt="product page"
                  src={toolsOne}
                />
              </div>
            </div>

            <h2 className="font-robo text-base sm:text-2xl leading-8 font-medium  mb-5">
              Best Reviewed
              <br />
              Products
            </h2>
          </div>
        </Grid>

        <Grid
          xxl={4}
          xl={4}
          lg={4}
          md={4}
          sm={6}
          xs={12}
          className="bg-pink shadow-md"
        >
          <div className="flex justify-center flex-col items-center text-center w-full">
            <div className="flex justify-center flex-col items-center text-center w-60 mb-2">
              <span className="font-robo text-xs sm:text-sm mt-7 mb-3 text-center ">
                Empower with Precision and Performance
              </span>
              <h2 className="font-robo leading-8 text-base sm:text-[22px] font-medium mb-1 ">
                Trusted & Assured Products of Robot Power Tools
              </h2>
            </div>
            <Image
              height={130}
              width={300}
              className="object-contain transform duration-300 sm:hover:scale-125"
              alt="product page"
              src={selltwo}
            />
          </div>
        </Grid>
      </Grid>
    </section>
  )
}
