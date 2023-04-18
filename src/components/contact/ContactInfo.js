import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi'
import { AppData } from 'src/data/app-data'

function ContactInfo() {
  const { shopAddress, shopContactNo, shopEmail } = AppData?.webSiteData
  return (
    <div>
      <div className="my-10">
        <h1 className=" font-robo font-medium text-lg md:text-3xl capitalize text-center">
          get in touch
        </h1>
        <p className=" font-robo text-xs md:text-sm text-center mt-2 px-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
          quaerat unde quam dolor culpa veritatis inventore, aut commodi eum
          veniam vel.
        </p>
      </div>
      <div className="sm:w-10/12 mx-auto w-11/12 grid md:grid-cols-3 grid-cols-1 gap-8 flex items-center justify-center">
        <div className="w-full bg-white shadow p-5 rounded-lg h-40 hover:shadow-xl hover:scale-105 duration-500 transition-all ">
          <div className="mx-auto w-fit">
            <FiMapPin className="text-center text-theme-secondary text-4xl" />
          </div>
          <h4 className=" font-robo text-medium md:text-basetext-sm text-center mt-4">
            {shopAddress}
          </h4>
        </div>
        <div className="w-full bg-white shadow p-5 rounded-lg h-40 hover:shadow-xl hover:scale-105 duration-500 transition-all ">
          <div className="mx-auto w-fit">
            <FiPhoneCall className="text-center text-4xl  text-theme-secondary " />
          </div>
          <div>
            <a href={`tel:${shopContactNo}`}>
              <h4 className=" font-robo text-medium md:text-sm text-custom-13  text-center mt-4">
                {shopContactNo}
              </h4>
            </a>
          </div>
        </div>
        <div className="w-full bg-white shadow p-5 rounded-lg h-40 hover:shadow-xl hover:scale-105 duration-500 transition-all ">
          <div className="mx-auto w-fit">
            <FiMail className="text-center text-4xl text-theme-secondary " />
          </div>
          <div>
            <a href={`mailto:${shopEmail}`}>
              <h4 className="text-[500] md:text-sm text-custom-13  text-center mt-4">
                {shopEmail}
              </h4>
            </a>
          </div>
          {/* <p className="text-[.8125rem] text-center mt-2">
          Lorem ipsum dolar site amet discont
        </p> */}
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
