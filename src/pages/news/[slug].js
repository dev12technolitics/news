import { Skeleton } from "@mui/material";
import Image from "next/image";
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

  if (categoriesError || isError) return <ErrorScreen />;

  return (
    <>
      {/* desktop view */}
      <div className="md:block hidden">
        <div className="flex justify-center w-full text-center">
          <div className="container mt-20 md:mx-0 mx-4 mb-20">
            <main>
              {data?.map((item, index) => {
                return (
                  <article key={index}>
                    <div className="mb-[40px] hoverline">
                      <div
                        className="relative h-full w-full overflow-hidden cursor-pointer"
                        onClick={() => push(`/news/detail/${item?._id}`)}
                      >
                        {isLoading ? (
                          <Skeleton
                            className="h-[350px] w-full"
                            variant="rectangular"
                          />
                        ) : (
                          <Image
                            loading="lazy"
                            src={item.attach_file}
                            height={1000}
                            width={1000}
                            className="w-full h-full hover:scale-110 overflow-hidden object-contain transition-all duration-500"
                            alt="Sample image"
                          />
                        )}
                      </div>

                      <div className="w-fit mt-2.5">
                        {isLoading ? (
                          <Skeleton
                            className="h-[2rem] w-24"
                            variant="rectangular"
                          />
                        ) : (
                          <div
                            className="px-4 py-[0.4rem] font-sm w-fit
                                font-semibold text-white flex text-center justify-center capitalize cursor-pointer"
                            style={{
                              backgroundColor:
                                index % 2 == 0
                                  ? index % 4 == 0
                                    ? index % 3 == 0
                                      ? "#5856d5"
                                      : "#5ac8fa"
                                    : "#4cd965"
                                  : "#ff4f00",
                            }}
                            onClick={() => push(`/news/${item?.categorySlug}`)}
                          >
                            {item.categorySlug}
                          </div>
                        )}
                      </div>

                      {isLoading ? (
                        <div className="mt-4">
                          <Skeleton
                            className="h-4 w-full my-2"
                            variant="rectangular"
                          />
                          <Skeleton
                            className="h-4 w-3/4"
                            variant="rectangular"
                          />
                        </div>
                      ) : (
                        <div
                          className="flex md:text-justify text-left w-full cursor-pointer"
                          onClick={() => push(`/news/detail/${item?._id}`)}
                        >
                          <a className="link text-2xl font-bold mt-3.5 h-[68px] overflow-hidden">
                            <span className="underlinehead">{item.title}</span>
                          </a>
                        </div>
                      )}

                      {isLoading ? (
                        <div className="my-4">
                          <Skeleton
                            className="h-4 w-full my-2"
                            variant="rectangular"
                          />
                          <Skeleton
                            className="h-4 w-full my-2"
                            variant="rectangular"
                          />
                          <Skeleton
                            className="h-4 w-2/4"
                            variant="rectangular"
                          />
                        </div>
                      ) : (
                        <h5
                          className="text-lg font-normal 
                    flex md:text-justify text-left my-3.5 leading-[1.50rem] cursor-pointer"
                          onClick={() => push(`/news/detail/${item?._id}`)}
                        >
                          {item.short_description}
                        </h5>
                      )}
                    </div>
                  </article>
                );
              })}
            </main>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="md:hidden">
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
                        <>
                          {categoriesLoading ? (
                            <div className="">
                              <Skeleton className="h-10 w-20 mx-3" />
                            </div>
                          ) : (
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
                        cardData={data}
                        newsLoading={isLoading}
                      />
                    </div>
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
