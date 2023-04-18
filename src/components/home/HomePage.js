// import React from 'react'
import { useSelector } from "react-redux";
// import { useGetAllBanners } from 'src/services/bannerServices'
// import LoadingScreen from '../basics/LoadingScreen'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { FadeIn } from "../animate";
import { ErrorScreen } from "../basics";
import Newspage from "./Newspage";

// dynamic imports
// const DynamicAboutUsPage = dynamic(
//   () => import('../aboutAs').then((c) => c.AboutUsPage)
// )
const DynamicHomePageCategories = dynamic(
  () => import("./HomePageCategories")
  // {
  //   loading: () => <p>Loading...</p>,
  // }
);
const DynamicHomeProductTab = dynamic(
  () => import("./HomeProductTab")
  // {
  //   loading: () => <p>Loading...</p>,
  // }
);
const DynamicHomeProductPage = dynamic(
  () => import("./HomeProductsPage")
  // {
  //   loading: () => <p>Loading...</p>,
  // }
);
const DynamicTestimonialOne = dynamic(
  () => import("../testimonials").then((c) => c.TestimonialOne)
  // {
  //   loading: () => <p>Loading...</p>,
  // }
);
const DynamicBestSellers = dynamic(
  () => import("./BestSeller")

  // {
  //   loading: () => <p>Loading...</p>,
  // }
);

export default function HomePage({ banners }) {
  const { push } = useRouter();
  const { userType, userData } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };
  const handleOnEnter = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.which === 13) {
      e.preventDefault();
      push(`/p?search=${search}`);
    } else {
      setSearch(e.target.value);
    }
  };

  if (!banners?.status) return <ErrorScreen />;

  return (
    <div className="">
      <FadeIn durationTime="1s">
        <Newspage />
      </FadeIn>
    </div>
  );
}
