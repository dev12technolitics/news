import Image from "next/image";
import { useEffect } from "react";
import banner from "src/assets/svg/banner.jpg";
import Logo from "src/assets/svg/Screenshotlogo.png";
import { useGetAllAdvertisement } from "src/services/advertisementServices";
import { FadeIn } from "../animate";
import { AppCarousel, ErrorScreen } from "../basics";

export default function DesktopTopNavbar({ setpageLoading }) {
  const {
    data: advertisementAllData,
    isLoading: advertisementLoading,
    isError: advertisementError,
  } = useGetAllAdvertisement();

  let newArray = advertisementAllData?.filter(
    (item) =>
      item?.banner_type?.replaceAll?.(" ", "")?.toLowerCase() ==
        "navbarbanner" && item?.attach_banner != ""
  );

  useEffect(() => {
    if (!advertisementLoading) {
      setpageLoading(false);
    }
  }, [advertisementLoading]);

  if (advertisementError) return <ErrorScreen />;

  console.log("advertisementAllData", advertisementAllData);

  return (
    <div className="py-8 flex justify-center w-full text-center">
      <div className="container">
        <div className="grid grid-cols-3">
          <div className="md:hidden lg:block">
            <div className="relative h-28 w-3/4 ml-[-8vh]">
              <Image
                fill
                loading="lazy"
                src={Logo}
                className="w-full h-full object-contain"
                alt="Sample image"
              />
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <div className="flex lg:justify-end justify-center w-full">
              <FadeIn durationTime="1s">
                <AppCarousel
                  {...{
                    slidesToShow: 1,
                    fade: false,
                    autoplay: true,
                    // infinite: NewsDetail?.length > 1 ? true : false,
                    // autoplaySpped: 1000,
                    autoplaySpeed: 2000,
                  }}
                >
                  {advertisementAllData?.map((item, index) => {
                    return (
                      <div
                        className="add-container h-28 w-3/4 relative"
                        key={index}
                      >
                        <Image
                          fill
                          loading="lazy"
                          src={banner}
                          className="w-full h-full object-fill"
                          alt="Sample image"
                        />
                      </div>
                    );
                  })}
                </AppCarousel>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
