// import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from '../../assets/RoboPowerImages/logo.png'
import { BsBuilding, BsFacebook } from 'react-icons/bs'
import { IoMdCall } from 'react-icons/io'
import { MdMailOutline } from 'react-icons/md'
import { AppData } from 'src/data/app-data'
import { RiInstagramFill } from 'react-icons/ri'
import { AiOutlineTwitter } from 'react-icons/ai'

const MobileWebFooter = () => {
  const { shopAddress, shopContactNo, shopEmail } = AppData?.webSiteData

  return (
    <footer className="items-center justify-center bg-shade-blue">
      <div className="mx-auto w-11/12">
        <div className="">
          <div className="mt-8 pr-3">
            <Link href={'/'}>
              <div className="flex justify-start pt-7">
                <Image
                  alt="footer-img"
                  src={logoImage}
                  height={50}
                  width={140}
                />
              </div>
            </Link>
            <div className="mt-0 pr-5 text-justify">
              <p className="mt-2 max-w-xs text-custom-13 font-normal leading-6 text-white opacity-80">
                HERCO, living up to its 65 year old tradition and reputation has
                been developing better products through innovation and better
                process management.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="pr-2">
            <span className="text-xs font-black text-white">GET IN TOUCH</span>
            <div className="mt-4">
              <a href={`tel:${shopContactNo}`}>
                <p className="mt-1 mb-7 flex items-center text-custom-13 font-normal  hover:text-theme-primary-main">
                  <span className="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-light-shade-blue text-custom-13">
                    <IoMdCall className="text-sm text-light-blue" />
                  </span>
                  <span className=" w-80  text-white  opacity-80">
                    <span className="mb-2 block text-sm font-light">
                      Phone Number
                    </span>
                    <span className="text-[10px]">{shopContactNo}</span>
                  </span>
                </p>
              </a>
              <a href={`tel:${shopEmail}`}>
                <p className=" mb-7  flex items-start text-custom-13 font-normal">
                  <span className="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-light-shade-blue text-custom-13">
                    <MdMailOutline className="text-sm text-light-blue" />
                  </span>
                  <span className=" w-80 text-white   opacity-80">
                    <span className="mb-2 block text-sm font-light">
                      Email Address
                    </span>
                    <span className="text-[10px]">{shopEmail}</span>
                  </span>
                </p>
              </a>
              <p className=" mb-7  flex items-start text-custom-13 font-normal">
                <span className="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-light-shade-blue text-custom-13">
                  <BsBuilding className="text-sm text-light-blue" />
                </span>
                <span className=" w-72  text-white  opacity-80">
                  <span className="mb-2 block font-light text-sm">
                    Office Address
                  </span>
                  <span className="text-[10px]">{shopAddress}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <a
            target={'blank'}
            rel="noreferrer"
            href="https://instagram.com/shubham_power_tools?igshid=YmMyMTA2M2Y="
          >
            <span className="mr-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-light-shade-blue text-custom-13">
              <RiInstagramFill className="text-base text-light-blue " />
            </span>
          </a>
          <span className="mr-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-light-shade-blue text-custom-13">
            <BsFacebook className="text-base text-light-blue " />
          </span>
          <span className="mr-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-light-shade-blue text-custom-13">
            <AiOutlineTwitter className="text-base text-light-blue " />
          </span>
        </div>
        <hr className="" />
      </div>
      <div className="w-full bg-[#01002F]">
        <div className=" mx-auto flex w-w-main justify-between bg-[#01002F]">
          <p className=" capitalize text-white opacity-80">
            <span className=" font-robo   text-[8px] font-normal">
              © 2023 Herco transformers limited
            </span>
          </p>
          <p className="flex items-center justify-center font-robo text-[8px] capitalize text-white opacity-80">
            <span> Powered By&nbsp;</span>{' '}
            <span>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.technolitics.com/"
              >
                Technolitics
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default MobileWebFooter
