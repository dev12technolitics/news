import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ErrorScreen } from "src/components/basics";
import CategoriesBaseCard from "src/components/home/CategoriesBaseCard";
import {
  useGetAllCategories,
  useGetOneNewsById,
} from "src/services/categoryServices";

export default function NewsPage({ setpageLoading }) {
  const { query, push } = useRouter();
  const slug = query?.slug;
  const { data, isLoading, isError } = useGetOneNewsById(slug);

  const [scrolled, setScrolled] = useState(false);

  const {
    data: categoriesAllData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategories();

  useEffect(() => {
    if (!categoriesLoading) {
      setpageLoading(false);
    }
  }, [categoriesLoading]);

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

  const filterCardData = (slug) => {
    push(`/news/${slug}`);
  };

  const filterAllData = () => {
    push(`/`);
  };

  if (categoriesError) return <ErrorScreen />;

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
                    onClick={() => filterAllData()}
                    className="flex justify-center text-sm items-center tab_button py-2 px-4"
                  >
                    All
                  </div>
                  {categoriesAllData?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => filterCardData(item?.slug)}
                        className={`flex justify-center text-sm items-center ${
                          slug == item?.slug
                            ? "tab_button_active  py-2 px-4"
                            : "tab_button py-2 px-4"
                        }`}
                      >
                        <span className="">{item?.name}</span>
                      </div>
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
                      cardData={data}
                      setpageLoading={setpageLoading}
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
