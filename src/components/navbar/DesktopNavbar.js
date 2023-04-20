import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NAVBAR_LINKS } from "../../data/app-data-links";
import { SideMenuBar } from "../home";
import DesktopTopNavbar from "./DesktopTopNavbar";
export default function DesktopNavbar() {
  const { push, pathname } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const changeNavbarShadow = () => {
    if (window.scrollY >= 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarShadow);
  }, [scrolled]);

  return (
    <>
      <DesktopTopNavbar />
      {console.log("scrolled", scrolled)}
      <div
        className={`fixed  
          ${scrolled === true ? `top-0` : `top-40`}
          w-full py-2 scroll-smooth bg-white transition-all duration-500 flex justify-center items-center z-20`}
        style={{
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div className="w-full">
          <nav className="container mx-auto">
            <div className="flex items-center h-16 justify-center space-x-2">
              <div className="w-full">
                <div className="relative  flex w-full">
                  <Link className="cursor-pointer" href="/">
                    <div
                      className="group uppercase ml-0 lg:text-[16px] 
                                  font-[535]
                            hover:text-theme-primary-main px-3 py-2 rounded-md leading-7"
                    >
                      Home
                    </div>
                  </Link>
                  {NAVBAR_LINKS?.map((item, index) => {
                    return (
                      <div key={index}>
                        <Link className="cursor-pointer" href={item?.link}>
                          <div
                            className="group uppercase lg:text-[16px] 
                                  font-[535]
                            hover:text-theme-primary-main px-3 py-2 rounded-md leading-7"
                          >
                            {item?.name}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-2 border-red">
                {" "}
                <SideMenuBar />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
