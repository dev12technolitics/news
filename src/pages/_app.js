import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { AppSnackBar } from "src/components/basics";
import { NavbarFooterLayout } from "src/components/layouts";
import { GetStarted } from "src/components/social-login";
import useDeviceType from "src/custom-hooks/useDeviceType";
import GlobalSEO from "src/data/next-seo.data";
import store, { persistor } from "src/redux/store";
import ThemeProvider from "src/styles/ThemeProvider";
import "../styles/globals.css";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const { isMobile } = useDeviceType();
  const { pathname } = useRouter();

  const [userVisit, setUserVisit] = useState(false);

  useEffect(() => {
    const visitValue = window.localStorage.getItem("userVisit");
    if (visitValue == "true") {
      setUserVisit(true);
    } else {
      setUserVisit(false);
    }
  }, []);

  function handleChangeUserVisit() {
    window.localStorage.setItem("userVisit", true);
    setUserVisit(true);
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/robo_fav.png" />
        <meta name="theme-color" content="#c5ebff" />
        <meta name="msapplication-navbutton-color" content="#c5ebff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#c5ebff" />
      </Head>
      <DefaultSeo {...GlobalSEO["/"]} />
      <QueryClientProvider client={queryClient}>
        <Provider loading={null} store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              {isMobile ? (
                userVisit ? (
                  <NavbarFooterLayout>
                    <Component {...pageProps} />
                  </NavbarFooterLayout>
                ) : (
                  <GetStarted handleChangeUserVisit={handleChangeUserVisit} />
                )
              ) : (
                <div>
                  <NavbarFooterLayout>
                    <Component {...pageProps} />
                  </NavbarFooterLayout>
                </div>
              )}
              <AppSnackBar />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
