// import React from 'react'
import Head from "next/head";
import { HomePage } from "src/components/home";

export default function Home({ pageLoading, setpageLoading }) {
  return (
    <section className="relative">
      <Head>
        {/* <link rel="icon" href="/robo_fav.png" /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;600;700;800;900&display=swap"
          rel="stylesheet"
        /> */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#c5ebff" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#c5ebff" />
        {/* <!-- iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#c5ebff" />
      </Head>

      <div className="">
        <HomePage setpageLoading={setpageLoading} />
      </div>
    </section>
  );
}
