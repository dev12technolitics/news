// import React from 'react'
import { DefaultSeo, LogoJsonLd } from "next-seo";
import { FadeRight } from "src/components/animate";
import { MainAboutPage } from "../components/aboutAs";
import GlobalSEO, { SITE_LOGO, SITE_URL } from "../data/next-seo.data";

const AboutUs = () => {
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO["/about-us"]} />
      <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
      <FadeRight durationTime={"1s"}>
        <MainAboutPage />
      </FadeRight>
    </>
  );
};

export default AboutUs;
