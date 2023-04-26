import Image from "next/image";
import banner from "src/assets/svg/banner.jpg";
import Logo from "src/assets/svg/Screenshotlogo.png";

export default function DesktopTopNavbar() {
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
