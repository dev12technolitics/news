import { Box, Grid, Skeleton } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { useGetAllAdvertisement } from "src/services/advertisementServices";
import { useGetAllNews } from "src/services/news";
import PicOne from "../../assets/svg/Screenshot.png";
import { NewsDetail } from "../../data/NewsDetail";
import { FadeIn } from "../animate";
import { AppCarousel, ErrorScreen } from "../basics";

const Details = ({ oneNewsData = {}, OneNewsIsLoading, setpageLoading }) => {
  const {
    title,
    descriptions,
    created_at,
    attach_file,
    seoTags,
    categorySlug,
  } = oneNewsData;

  const {
    data: newsAllData,
    isLoading: newsAllLoading,
    isError: newsError,
  } = useGetAllNews();

  useEffect(() => {
    if (!newsAllLoading) {
      setpageLoading(false);
    }
  }, [newsAllLoading]);

  let relatedNews = newsAllData?.filter(
    (item) => item?.categorySlug == categorySlug
  );

  const sliceRelatedNews = relatedNews?.slice(0, 5);

  if (newsError) return <ErrorScreen />;

  return (
    <>
      <Grid container>
        <Grid item lg={12} sm={12} xs={12}>
          {OneNewsIsLoading ? (
            <div className="flex justify-center items-center w-full">
              <div className="container mt-8 mx-4">
                <Skeleton className="h-20 w-full" variant="rectangular" />
              </div>
            </div>
          ) : (
            <div
              className="bg-[#F9F9F9] flex justify-center items-center text-start pt-8 pb-8
          md:mt-0 mt-[-2px] md:pt-16 md:pb-16  w-full"
            >
              <div className="container h-[42px] overflow-hidden">
                <h1
                  className="text-3xl md:text-4xl mt-0 mb-0
                        px-4 md:px-0 leading-6 tracking-normal text-slate-700 leading-[2.3rem] md:leading-10"
                >
                  {title}
                </h1>
              </div>
            </div>
          )}
        </Grid>
      </Grid>

      <div className="mx-auto my-10 container">
        <div class="grid lg:grid-cols-7 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 md:gap-8 lg:gap-8">
          <div
            className="lg:col-span-5 md:col-span-4 px-4 md:px-0"
            item
            lg={9}
            md={9}
            sm={12}
          >
            {OneNewsIsLoading ? (
              <div className="absolute z-10 mt-5 flex flex-col items-center px-4 py-2">
                <Skeleton className="h-12 w-12" variant="rectangular" />
              </div>
            ) : (
              <div className="absolute z-10 mt-5 flex flex-col items-center bg-gray-200 px-4 py-2">
                <div className="">
                  <span className="text-lg font-semibold text-theme-primary-main">
                    {moment(created_at).format("MMM")}
                  </span>
                  <br />
                  <span className="text-base font-medium text-slate-800">
                    {moment(created_at).format("DD")}
                  </span>
                </div>
              </div>
            )}

            {OneNewsIsLoading ? (
              <div className="">
                <Skeleton
                  className=" h-[350px] md:h-[500px] w-full"
                  variant="rectangular"
                />
              </div>
            ) : (
              <div className="relative h-auto w-full animate-opacityAnimation">
                <Image
                  height={1000}
                  width={1000}
                  alt="alt"
                  src={attach_file}
                  loading="lazy"
                  className="w-full h-auto object-covor"
                />
              </div>
            )}

            {descriptions?.map((item, index) => {
              return (
                <>
                  {OneNewsIsLoading ? (
                    <div className="my-6">
                      <Skeleton
                        className="h-8 w-full my-1"
                        variant="rectangular"
                      />
                      <Skeleton
                        className="h-8 w-full my-1"
                        variant="rectangular"
                      />
                      <Skeleton
                        className="h-8 w-1/2 my-1"
                        variant="rectangular"
                      />
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="text-lg md:text-xl  font-medium text-[#494e51]"
                    >
                      <p className="mb-0 text-left md:text-justify">
                        {item?.news_descriptions}
                      </p>
                    </div>
                  )}
                </>
              );
            })}

            <Box className="flex items-center py-4">
              <div className="">
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  // href={`https://www.facebook.com/sharer.php?u=${socialSharePath}`}
                >
                  <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 bg-[#4080FF] p-4 md:p-5 font-semibold text-white">
                    <FaFacebookF size={20} />
                  </button>
                </a>
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  // href={`https://api.whatsapp.com/send?text=${socialSharePath}`}
                >
                  <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 bg-[#4fce5d] p-4 md:p-5 font-semibold text-white">
                    <BsWhatsapp size={20} />
                  </button>
                </a>
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  // href={`https://twitter.com/intent/tweet?text=${socialSharePath}`}
                >
                  <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 bg-[#40BFF5] p-4 md:p-5  font-semibold text-white">
                    <BsTwitter size={20} />
                  </button>
                </a>
                <a
                  target={"_blank"}
                  className="cursor-poinetr"
                  rel="noreferrer"
                  //   href={`https://www.instagram.com/?url=${socialSharePath}`}
                >
                  <button className="cursor-poinetr inline-flex items-center space-x-2 bg-[#FF9C31] p-4 md:p-5  font-semibold text-white">
                    <BsInstagram size={20} />
                  </button>
                </a>
              </div>
            </Box>

            <div className="pt-0 md:pt-4 pb-4 ">
              <div className="h-[115px] md:h-[250px] md:w-3/4 w-full">
                <div className="relative py-4 w-full h-full border-2 border-red">
                  <Image
                    fill
                    alt="alt"
                    src={PicOne}
                    loading="lazy"
                    className="object-covor"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 md:px-0 px-4 mt-6 md:mt-0 ">
            <OtherData
              newsAllData={sliceRelatedNews}
              seoTags={seoTags}
              setpageLoading={setpageLoading}
              newsAllLoading={newsAllLoading}
              OneNewsIsLoading={OneNewsIsLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Details;

export const OtherData = ({
  newsAllData = [],
  seoTags,
  setpageLoading,
  newsAllLoading,
  OneNewsIsLoading,
}) => {
  const { push } = useRouter();
  const {
    data: advertisementAllData,
    isLoading: advertisementLoading,
    isError: advertisementError,
  } = useGetAllAdvertisement();

  let newArray = advertisementAllData?.filter(
    (item) =>
      item?.banner_type?.replaceAll?.(" ", "")?.toLowerCase() ==
        "detailbanner" && item?.attach_banner != ""
  );

  useEffect(() => {
    if (!advertisementLoading) {
      setpageLoading(false);
    }
  }, [advertisementLoading]);

  if (advertisementError) return <ErrorScreen />;

  const handlepush = (id) => {
    push(`/news/detail/${id}`);
  };
  return (
    <Box>
      <Box>
        <div className="m-auto overflow-hidden">
          {advertisementLoading ? (
            <Skeleton className="h-60 md:h-80 w-full" variant="rectangular" />
          ) : (
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
          )}
        </div>

        <div
          className="text-lg font-semibold
                    leading-6 tracking-normal
                     md:text-xl md:leading-7 capitalize mt-[15px]"
        >
          other post
        </div>

        <div className="relative mt-4 ">
          {newsAllData?.map((item, index) => {
            return (
              <div key={index} onClick={() => handlepush(item?._id)}>
                <div className="relative flex  hover:cursor-pointer hoverline md:mb-8 mb-4">
                  <div className="relative mr-2.5 md:h-28 md:w-28 h-20 w-20 shrink-0 animate-opacityAnimation overflow-hidden">
                    {newsAllLoading ? (
                      <Skeleton
                        className="h-full w-full"
                        variant="rectangular"
                      />
                    ) : (
                      <Image
                        fill
                        src={item?.attach_file}
                        alt="logo"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="w-full">
                    {newsAllLoading ? (
                      <div>
                        <Skeleton
                          className="h-4 w-full my-2"
                          variant="rectangular"
                        />
                        <Skeleton
                          className="h-4 w-full my-2"
                          variant="rectangular"
                        />
                        <Skeleton
                          className="h-4 w-3/4 my-2"
                          variant="rectangular"
                        />

                        <Skeleton
                          className="h-4 w-1/2 mt-6"
                          variant="rectangular"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex md:text-justify w-full text-left">
                          <a className="text-lg capitalize h-[88px] overflow-hidden">
                            <span className="underlinehead font-bold">
                              {item?.title}
                            </span>
                          </a>
                        </div>
                        <div className="text-slate-500 md:mt-4 mt-2">
                          <h6 className="text-sm m-0  font-thin">
                            By &nbsp; axilthemes
                          </h6>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div
            className="text-lg font-semibold
                    leading-6 tracking-normal
                     md:text-xl md:leading-7 capitalize mt-[15px]"
          >
            Tags
          </div>

          {OneNewsIsLoading ? (
            <Skeleton
              className="h-10 w-20 md:h-12 md:w-28 mt-[10px]"
              variant="rectangular"
            />
          ) : (
            <>
              {seoTags?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative mr-2 mb-2 inline-block bg-slate-200 mt-[10px]
                         px-3 py-2 align-top text-sm capitalize text-gray opacity-60 border border-slate-400"
                  >
                    {item}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </Box>
    </Box>
  );
};
