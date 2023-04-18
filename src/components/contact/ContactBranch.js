import Image from 'next/image'
import React, { Fragment } from 'react'
import branchImg from '../../assets/RoboPowerImages/tools.png'
import { AppButton } from '../basics'
import { AppData } from 'src/data/app-data'

function ContactBranch() {
  const { shopContactNo, shopEmail, mapLink, city } = AppData?.webSiteData
  return (
    <div>
      <div className="my-10">
        <h1 className=" font-robo font-medium text-lg md:text-4xl capitalize text-center">
          Locations
        </h1>
        <p className=" font-robo text-xs md:text-sm text-center mt-2">
          Come and visit our offices in Chattisgarh
        </p>
      </div>
      <div className=" sm:w-10/12 mx-auto w-full grid md:grid-cols-12 grid-cols-1 gap-8 flex items-center justify-center">
        <div className=" md:col-span-3">
          <h3 className=" font-robo md:text-md text-base font-medium  md:text-left text-center">
            {city}
          </h3>
        </div>
        <div className="md:col-span-2 flex items-center justify-center">
          <div className="md:w-[70%] w-[30%] sameHeight">
            <Image
              height={120}
              width={120}
              src={branchImg}
              alt="contact img"
              className="object-contain"
            />
          </div>
        </div>
        <div className="md:col-span-4">
          <p className="text-home-content md:text-base text-sm md:text-left text-center">
            <a target={'_blank'} rel="noreferrer" href={`mailto:${shopEmail}`}>
              {shopEmail}
            </a>
          </p>
          <p className="text-[#525258] md:text-base text-sm tracking-[.02em] md:text-left text-center mt-1 hover_theme_text">
            <a target={'_blank'} rel="noreferrer" href={`tel:${shopContactNo}`}>
              {shopContactNo}
            </a>
          </p>
        </div>
        <div className="md:col-span-3 flex justify-center items-center">
          <a
            target={'_blank'}
            rel="noreferrer"
            href={mapLink}
            className="w-fit"
          >
            <AppButton
              type="button"
              variant="contained"
              title=" View Location"
              fullWidth
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactBranch
