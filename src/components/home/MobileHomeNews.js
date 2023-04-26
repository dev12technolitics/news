import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoriesBaseCard from "./CategoriesBaseCard";

export default function NewsPage({
  newsAllData,
  newsLoading,
  setpageLoading,
  categories,
  categoriesLoading,
}) {
  const { push } = useRouter();
  const [openTab, setOpenTab] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [cardData, setCardData] = useState([]);

  const changeNavbarShadow = () => {
    if (window.scrollY >= 63) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavbarShadow);
  }, [scrolled]);

  useEffect(() => {
    setCardData(newsAllData);
  }, [newsAllData]);

  const filterCardData = (slug) => {
    push(`/news/${slug}`);
  };

  return (
    <>
      <div className="flex justify-center w-full text-center">
        <div className="container">
          <div className="w-full flex flex-col">
            <div
              className={`  
             ${
               scrolled === true
                 ? `top-0 sticky shadow-shadow-primary scroll-smooth`
                 : `top-40`
             }
              bg-white py-2 
              z-20`}
            >
              <div className="mx-4">
                <div
                  className="flex flex-row 
             gap-y-2 overflow-scroll"
                >
                  <div
                    className={`flex justify-center text-sm items-center font-medium
                 ${
                   openTab == "All"
                     ? "tab_button_active py-2 px-4"
                     : "tab_button py-2 px-4"
                 }`}
                  >
                    All
                  </div>

                  {categories?.map((item, index) => {
                    return (
                      <>
                        {categoriesLoading ? (
                          <div className="">
                            <Skeleton className="h-10 w-20 mx-3" />
                          </div>
                        ) : (
                          <div
                            key={index}
                            onClick={() => filterCardData(item?.slug)}
                            className={`flex justify-center text-sm items-center font-medium ${
                              openTab == item?.slug
                                ? "tab_button_active  py-2 px-4"
                                : "tab_button py-2 px-4"
                            }`}
                          >
                            <span className="">{item?.name}</span>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative flex w-full">
              <div className="flex-auto">
                <div className="justify-center">
                  <div className="flex flex-col justify-center w-full">
                    <CategoriesBaseCard
                      cardData={cardData}
                      newsLoading={newsLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
