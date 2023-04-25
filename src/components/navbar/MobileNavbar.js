// import { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Logo from "src/assets/svg/Screenshotlogo.png";
import MobileSideBar from "./MobileSideBar";

export default function MobileNavbar({ userData, userType }) {
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
            {pathname !== "/" && (
              <div onClick={handlePageBack} className=" p-2">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 64L0 32L32 0L37.7 5.6L15.3 28H64V36H15.3L37.7 58.4L32 64Z"
                    fill="#ff5451"
                  />
                </svg>
              </div>
            )}
            {pathname == "/" && (
              <MobileSideBar userType={userType} userData={userData} />
            )}
          </div>

          <div className="flex items-start w-full mt-1">
            <div className="flex w-full justify-center hover:cursor-pointer">
              <Link href={"/"}>
                <div>
                  <Image
                    loading="lazy"
                    src={Logo}
                    alt="Picture of the author"
                    width={80}
                    height={35}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div />
        </div>
      </div>
    </>
  );
}
