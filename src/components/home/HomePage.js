// import React from 'react'
// import { useGetAllBanners } from 'src/services/bannerServices'
// import LoadingScreen from '../basics/LoadingScreen'
import dynamic from "next/dynamic";
import { FadeIn } from "../animate";

const DynamicHomeNews = dynamic(() => import("./HomeNews"));

export default function HomePage() {
  return (
    <div className="mt-14">
      <FadeIn durationTime="1s">
        <DynamicHomeNews />
      </FadeIn>
    </div>
  );
}
