// import { useState } from 'react'
import Image from "next/image";
import Router, { useRouter } from "next/router";
import Logo from "src/assets/svg/Screenshotlogo.png";
import MobileSideBar from "./MobileSideBar";

export default function MobileNavbar() {
  const { pathname } = useRouter();

  const handlePageBack = () => {
    if (window.history.length > 1) {
      Router.back();
    } else {
      Router.replace("/");
    }
  };
  //
  return (
    <>
      <div
        className="w-screen py-1 mb-[0.4rem] bg-white shadow-shadow-primary scroll-smooth"
        // className={`
        //      ${pathname !== "/" && `z-50 fixed transition-all duration-300`}
        //      w-screen py-1 mb-2 bg-white shadow-shadow-primary scroll-smooth`}
      >
        <div className=" relative mx-auto flex w-full items-center justify-between ">
          <div className="flex px-2">
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded="false"
              className="bg-[#fff]"
            >
              <MobileSideBar />
            </button>
          </div>

          <div className="flex items-end">
            <div className="hover:cursor-pointer mr-[8vh] flex justify-center top-0 left-0 w-full">
              <Image
                alt="Picture of the author"
                src={Logo}
                width={80}
                height={42}
              />
            </div>
          </div>
          <div />
        </div>
      </div>
    </>
  );
}
