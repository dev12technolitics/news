import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { AppSnackBar, LoadingScreen } from "src/components/basics";
import { NavbarFooterLayout } from "src/components/layouts";
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

  const [pageLoading, setpageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setpageLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        {/* <link rel="icon" href="/robo_fav.png" /> */}
        <meta name="theme-color" content="#c5ebff" />
        <meta name="msapplication-navbutton-color" content="#c5ebff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#c5ebff" />
      </Head>
      <DefaultSeo {...GlobalSEO["/"]} />
      <QueryClientProvider client={queryClient}>
        <Provider loading={null} store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              {pageLoading ? (
                <LoadingScreen />
              ) : (
                <div>
                  <NavbarFooterLayout
                    pageLoading={pageLoading}
                    setpageLoading={setpageLoading}
                  >
                    <Component
                      {...pageProps}
                      pageLoading={pageLoading}
                      setpageLoading={setpageLoading}
                    />
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
