// import React from 'react'
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import Logo from "src/assets/svg/download-removebg-preview.png";
import { AppData } from "src/data/app-data";

const DesktopFooter = () => {
  const { shopAddress, shopContactNo, facebook, instagram } =
    AppData?.webSiteData;

  return (
    <footer className="flex justify-center m-0 items-center w-full pt-4 bg-[#000]">
      <div className="container mx-auto">
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <div className="flex justify-between items-center ">
              <Link href={"/"}>
                <div className="flex justify-start">
                  <Image
                    alt="footer-img"
                    src={Logo}
                    height={150}
                    width={200}
                    // className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="flex justify-end">
                <div className="text-white text-lg font-semibold mr-6">
                  Find us here
                </div>
                <Link href={instagram} legacyBehavior>
                  <a target={"blank"}>
                    <RiInstagramFill className="mr-3 text-white text-2xl cursor-pointer" />
                  </a>
                </Link>
                <Link href={facebook} legacyBehavior>
                  <a target={"blank"}>
                    <BsFacebook className="mr-3 text-white text-2xl cursor-pointer" />
                  </a>
                </Link>
                <Link href={facebook} legacyBehavior>
                  <a target={"blank"}>
                    <AiFillTwitterCircle className=" mr-3 text-white text-2xl cursor-pointer" />
                  </a>
                </Link>
                <Link href={facebook} legacyBehavior>
                  <a target={"blank"}>
                    <IoLogoYoutube className=" text-2xl text-white cursor-pointer" />
                  </a>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className="border-b-2 border-[#494E51]" />

        <div className="footer-bottom pt-2">
          <ul
            className=""
            style={{
              fontSize: "1.4rem",
              lineHeight: "2.4rem",
              padding: "0",
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Contact Us</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Terms of Use</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Accessibility &#038; CC</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">AdChoices</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Modern Slavery Act Statement</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Advertise with us</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Papr Store</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Newsletters</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Transcripts</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">License Footage</a>
            </li>
            <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[14px]" />
            <li className="text-[#cecece] text-lg mr-1">
              <a href="#">Sitemap</a>
            </li>
            <div className="text-[#cecece] text-lg mt-1">
              Copyright &copy; 2022 News and Magazine WordPress Theme by{" "}
              <a target="_blank" href="#">
                Axilthemes
              </a>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
