import Image from "next/image";
import banner from "src/assets/svg/banner.jpg";
import Logo from "src/assets/svg/Screenshotlogo.png";

export default function DesktopTopNavbar() {
  return (
    <div className="py-8 flex justify-center w-full text-center">
      <div className="container">
        <div className="grid grid-cols-3">
          <div className="md:hidden lg:block">
            <div className="relative h-28 w-3/4">
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
              <div className="add-container h-28 w-3/4 relative">
                <Image
                  fill
                  loading="lazy"
                  src={banner}
                  className="w-full h-full object-fill"
                  alt="Sample image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="m-auto overflow-hidden">
<AppCarousel
  {...{
    slidesToShow: 1,
    fade: false,
    autoplay: true,
    infinite: NewsDetail?.length > 1 ? true : false,
    // autoplaySpped: 1000,
    autoplaySpeed: 2000,
  }}
>
  {advertisementAllData?.map((item, index) => {
    return (
      <div key={index} className="max-h-fit">
        <FadeIn durationTime="1s">
          <div className="relative aspect-square w-full">
            <Image
              fill
              src={item?.attach_banner}
              className="w-full animate-opacityAnimation object-cover"
              alt={item?.title}
            />
          </div>
        </FadeIn>
      </div>
    );
  })}
</AppCarousel>
</div> */
}
