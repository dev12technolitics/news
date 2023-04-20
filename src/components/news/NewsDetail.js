import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
// import moment from "moment";
import Pic from "../../assets/svg/business.jpg";
import PicOne from "../../assets/svg/Screenshot.png";
import { NewsDetail } from "../../data/NewsDetail";
import { FadeIn } from "../animate";
import { AppCarousel } from "../basics";

function Detail() {
  return (
    <>
      <Grid container className="mt-16">
        <Grid item lg={12} sm={12}>
          <div className="bg-[#F9F9F9] flex justify-center py-16 items-center text-center">
            <h1
              className="text-4xl mt-0 mb-0 leading-6 tracking-normal text-slate-700 md:leading-10
             lg:w-[900px] md:w-[700px]"
            >
              Why Some People Almost Always Make/Save Money With World
            </h1>
          </div>
        </Grid>
      </Grid>

      <div className="mx-auto my-10 container">
        <div class="grid lg:grid-cols-7 md:grid-cols-1 sm:grid-cols-1">
          <div
            className="lg:col-span-5 md:col-span-4"
            item
            lg={9}
            md={9}
            sm={12}
          >
            <div className="absolute z-10 mt-5 flex flex-col items-center bg-gray-200 px-4 py-2">
              <div className="">
                <span className="text-lg font-semibold text-theme-primary-main">
                  Oct
                </span>
                <br />
                <span className="text-base font-medium text-slate-800">
                  {" "}
                  14
                </span>
              </div>
            </div>

            <div className="relative h-auto w-full animate-opacityAnimation">
              <Image
                height={1000}
                width={1000}
                alt="alt"
                src={Pic}
                loading="lazy"
                className="w-full h-auto object-covor"
              />
            </div>

            <div className="text-xl font-medium text-[#494e51]">
              <p style={{ textAlign: "justify" }}>
                Moms are the ones who bandage our boo-boos when we’re little and
                continue to take care of us as we get older—often sacrificing
                their own needs so they can help with ours. Cruising on a bike
                to help heal our injuries is the most mom thing one can do.
                These eight shots crystallize the hard work moms put into
                keeping their kids alive, happy, and healthy. They might give
                you the inspiration you need for filling out that card—or stand
                alone for your mom’s interpretation.
              </p>
            </div>

            <Box className="flex items-center py-4">
              {/* <div
                className="text-2xl font-normal
                    leading-6 tracking-normal font-semibold opacity-70 "
              >
                Share :
              </div> */}
              <div className="">
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  // href={`https://www.facebook.com/sharer.php?u=${socialSharePath}`}
                >
                  <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 bg-[#4080FF] p-5 font-semibold text-white">
                    <FaFacebookF size={20} />
                  </button>
                </a>
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  // href={`https://api.whatsapp.com/send?text=${socialSharePath}`}
                >
                  <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 bg-[#4fce5d] p-5  font-semibold text-white">
                    <BsWhatsapp size={20} />
                  </button>
                </a>
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  // href={`https://twitter.com/intent/tweet?text=${socialSharePath}`}
                >
                  <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 bg-[#40BFF5] p-5  font-semibold text-white">
                    <BsTwitter size={20} />
                  </button>
                </a>
                <a
                  target={"_blank"}
                  className="cursor-poinetr"
                  rel="noreferrer"
                  //   href={`https://www.instagram.com/?url=${socialSharePath}`}
                >
                  <button className="cursor-poinetr inline-flex items-center space-x-2 bg-[#FF9C31] p-5  font-semibold text-white">
                    <BsInstagram size={20} />
                  </button>
                </a>
              </div>
            </Box>

            <div className="py-4">
              <div className="relative h-[250px] w-[700px] py-4 w-full animate-opacityAnimation">
                <Image
                  fill
                  alt="alt"
                  src={PicOne}
                  loading="lazy"
                  className="w-full h-full object-covor"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <OtherData />
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;

export const OtherData = () => {
  return (
    <Box
      sx={{
        padding: {
          xs: "0px",
          sm: "0px",
          md: "0 0 0 0px ",
          lg: "0 0 0 40px",
        },
      }}
    >
      <Box>
        <div className="m-auto overflow-hidden">
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
            {NewsDetail?.map((item, index) => {
              return (
                <div key={index} className="max-h-fit">
                  <FadeIn durationTime="1s">
                    <div className="relative aspect-square w-full">
                      <Image
                        fill
                        src={item?.image}
                        className="w-full animate-opacityAnimation object-cover"
                        alt={item?.title}
                      />
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </AppCarousel>
        </div>

        <div
          className="text-lg font-semibold
                    leading-6 tracking-normal
                     md:text-xl md:leading-7 capitalize mt-[15px]"
        >
          other post
        </div>
        <div className="relative mt-4 ">
          <div className="relative flex  hover:cursor-pointer hoverline">
            <div className="relative mr-2.5 h-28 w-28 shrink-0 animate-opacityAnimation overflow-hidden">
              <Image
                fill
                src={Pic}
                alt="logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="w-full">
              <div className="flex text-justify w-full text-center">
                <a className="text-lg capitalize">
                  <span className="underlinehead font-bold">
                    {" "}
                    Global research and innovation forum: towards a research
                    roadmap
                  </span>
                </a>
              </div>

              <div className="text-slate-500 mt-4">
                <h6 className="text-sm m-0 font-thin">By &nbsp; axilthemes</h6>
              </div>
            </div>
          </div>
          <div
            className="text-lg font-semibold
                    leading-6 tracking-normal
                     md:text-xl md:leading-7 capitalize mt-[15px]"
          >
            Tags
          </div>
          <div
            className="relative mr-2 mb-2 inline-block bg-slate-200 mt-[10px]
                         px-3 py-2 align-top text-sm capitalize text-gray opacity-60 border border-slate-400"
          >
            TAGS
          </div>
        </div>
      </Box>
    </Box>
  );
};
