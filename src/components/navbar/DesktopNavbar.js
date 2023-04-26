import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetAllCategories } from "src/services/categoryServices";
import { ErrorScreen } from "../basics";
import { SideMenuBar } from "../home";
import DesktopTopNavbar from "./DesktopTopNavbar";

export default function DesktopNavbar({ setpageLoading }) {
  const [scrolled, setScrolled] = useState(false);
  const { asPath } = useRouter();

  const {
    data: categoriesAllData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategories();

  const changeNavbarShadow = () => {
    if (window.scrollY >= 170) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarShadow);
  }, [scrolled]);

  useEffect(() => {
    if (!categoriesLoading) {
      setpageLoading(false);
    }
  }, [categoriesLoading]);

  if (categoriesError) return <ErrorScreen />;

  return (
    <>
      <DesktopTopNavbar setpageLoading={setpageLoading} />
      <div
        className={`  
          ${scrolled === true ? `top-0 fixed` : `top-40`}
          w-full py-2 scroll-smooth bg-white flex justify-center items-center z-20`}
        style={{
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div className="w-full">
          <nav className="container mx-auto">
            <div className="flex items-center h-16 justify-center space-x-2">
              <div className="w-full">
                <div className="relative m-0 flex w-full">
                  <div
                    className="flex 
                      gap-y-2 overflow-scroll"
                  >
                    <Link className="cursor-pointer" href="/">
                      <div
                        className="group uppercase ml-0 lg:text-[16px] 
                                  font-[535]
                            hover:text-theme-primary-main px-3 py-2 leading-7"
                        style={{
                          color: asPath === "/" ? "#ff5451" : "#212b36e3",
                          borderBottom:
                            asPath === "/" ? "3px solid #ff5451" : null,
                        }}
                      >
                        Home
                      </div>
                    </Link>
                    {categoriesAllData?.map((item, index) => {
                      return (
                        <div key={index}>
                          <Link
                            className="cursor-pointer"
                            href={`/news/` + item?.slug}
                          >
                            {categoriesLoading ? (
                              <Skeleton
                                className="h-8  w-24 mx-3 my-2 "
                                variant="rectangular"
                              />
                            ) : (
                              <div
                                className="group uppercase lg:text-[16px] 
                                  font-[535]
                            hover:text-theme-primary-main px-3 py-2 leading-7"
                                style={{
                                  color:
                                    asPath.split("/")[2] === item.slug
                                      ? "#ff5451"
                                      : "#212b36e3",
                                  borderBottom:
                                    asPath.split("/")[2] === item.slug
                                      ? "3px solid #ff5451"
                                      : null,
                                }}
                              >
                                {item?.name}
                              </div>
                            )}
                          </Link>
                        </div>
                      );
                    })}

                    <Link className="cursor-pointer" href="/contact-us">
                      <div
                        className="group uppercase ml-0 lg:text-[16px] 
                                  font-[535]
                            hover:text-theme-primary-main px-3 py-2 leading-7"
                        style={{
                          color:
                            asPath === "/contact-us" ? "#ff5451" : "#212b36e3",
                          borderBottom:
                            asPath === "/contact-us"
                              ? "3px solid #ff5451"
                              : null,
                        }}
                      >
                        Contact Us
                      </div>
                    </Link>
                  </div>
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
