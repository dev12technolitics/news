import { useRouter } from "next/router";
// import React from 'react'
import { useGetAllBanners } from "src/services/bannerServices";
import { Footer } from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function NavbarFooterLayout({ children }) {
  const { pathname } = useRouter();
  const {
    data: banners,
    isLoading: bannersLoading,
    isError: bannersError,
  } = useGetAllBanners();

  if (bannersLoading) return <div />;

  if (bannersError) return <div>error</div>;
  return (
    <section className="">
      <div className="w-screen">
        <Navbar />
      </div>
      <div
        className="min-h-screen w-screen md:mx-auto custom-max-screen:max-w-7xl"
        // ${
        //   pathname !== "/" && "mt-20 md:mt-28"
        // }
      >
        {children}
      </div>
      <Footer />
    </section>
  );
}

export default NavbarFooterLayout;
