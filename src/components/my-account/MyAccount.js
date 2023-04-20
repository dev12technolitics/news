import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FaAddressBook, FaHistory, FaUserAlt } from "react-icons/fa";
import { MdLocationPin, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "src/redux/slices/userSlice";
import dummyImage from "../../assets/images/dummy_pic.png";
import { FadeIn } from "../animate";
import MyAddresses from "./MyAddress";
import Myprofile from "./Myprofile";
import MyWishlist from "./MyWishlist";
// import { getLoginStatus } from "../../redux/slices/contextItems";

export default function MyAccount({ userData, userType }) {
  //other functions
  const dispatch = useDispatch();
  const { push, query } = useRouter();

  const [currentTab, setCurrentTab] = useState("my-profile");
  useEffect(() => {
    if (query?.tab !== undefined) {
      setCurrentTab(query?.tab);
    }
  }, [query]);
  const tabValues = [
    { value: "my-profile", Icon: FaUserAlt },
    { value: "address-book", Icon: FaAddressBook },
    { value: "wishlist", Icon: BsHeartFill },
    { value: "order-history", Icon: FaHistory },
    // { value: 'order-tracking', Icon: MdTrackChanges },
  ];

  //logout function
  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.setItem("userVisit", false);
    push("/");
  };
  return (
    <Box className="mx-auto md:container">
      <Box className="">
        <div
          className={`relative flex h-60 items-center bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.7))] bg-cover px-7 md:mt-7 md:rounded-lg md:px-12`}
        >
          <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
            <Image
              fill
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTby3l4tyjyAdg7tIf1dBdFv610FoxMGXqVQ&usqp=CAU"
              alt="cover photo"
              className="object-cover mix-blend-overlay"
            />
          </div>
          <div className="flex items-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-full object-contain outline outline-offset-4 outline-white md:h-32 md:w-32">
              <Image
                fill
                alt="user"
                src={dummyImage}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-5">
              <p className="pl-1 text-base font-normal capitalize tracking-wide text-white">
                {userData?.name || userData?.dist_name}
              </p>
              {userData?.city && (
                <p className="mt-2 flex items-center text-white">
                  <MdLocationPin fontSize={"20px"} color={"white"} />
                  <span className="pl-1 text-sm font-normal capitalize tracking-wide">
                    {userData?.city}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </Box>
      <Box className="md:my-16">
        {/* desktop */}
        <div className="hidden w-full md:block">
          <div className="grid w-full grid-cols-4 gap-6">
            <div className="col-span-1">
              <div className="rounded-lg shadow-shadow-primary">
                <div className="py-5">
                  {tabValues?.map((item, i) => {
                    const Icon = item?.Icon;
                    return (
                      <div
                        key={i}
                        className={`border-l-4 py-4 pl-2 text-sm capitalize tracking-wider ${
                          currentTab == item?.value
                            ? "border-theme-primary-main bg-gradient-to-r from-[#FFFDFD] to-[#EDEDED] font-custom-500 text-theme-primary-main"
                            : "border-white font-normal"
                        } flex items-center hover:cursor-pointer`}
                        onClick={() => setCurrentTab(item?.value)}
                      >
                        <Icon className="mr-3" />
                        {item?.value?.replace("-", " ")}
                      </div>
                    );
                  })}
                </div>
                <hr className="mx-auto border" width={"90%"} />

                <div className="py-5 px-4">
                  <div
                    onClick={handleLogout}
                    className="flex items-center text-base capitalize tracking-[0.7px] text-theme-primary-main hover:cursor-pointer"
                  >
                    <MdLogout className="mr-3" />
                    logout
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 rounded-lg py-2 px-6 shadow-shadow-primary">
              <div className="py-5">
                {currentTab == "my-profile" && (
                  <FadeIn durationTime={"1s"}>
                    <Myprofile userData={userData} userType={userType} />
                  </FadeIn>
                )}{" "}
                {currentTab == "address-book" && (
                  <FadeIn durationTime={"1s"}>
                    <MyAddresses userData={userData} />
                  </FadeIn>
                )}
                {currentTab == "wishlist" && (
                  <FadeIn durationTime={"1s"}>
                    <MyWishlist userData={userData} />
                  </FadeIn>
                )}
                {currentTab == "order-history" && (
                  <FadeIn durationTime={"1s"}></FadeIn>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="w-full md:hidden">
          <div>
            <div className="p-5">
              {tabValues?.map((item, i) => {
                const Icon = item?.Icon;
                return (
                  <Fragment key={i}>
                    <Link href={`/account/${item?.value}`}>
                      <div
                        className={`text-sm capitalize tracking-wider pl-2 py-5 border-b font-normal border-light-grey
                         hover:cursor-pointer flex items-center`}
                      >
                        <Icon className="mr-3" />
                        {item?.value?.replace("-", " ")}
                      </div>
                    </Link>
                  </Fragment>
                );
              })}
              <div className="py-5 pl-2">
                <div
                  onClick={handleLogout}
                  className="flex items-center text-base capitalize tracking-[0.7px] text-theme-primary-main hover:cursor-pointer"
                >
                  <MdLogout className="mr-3" />
                  logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}
