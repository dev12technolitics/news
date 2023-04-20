import { Grid } from "@mui/material";
import Image from "next/image";
import { FiShare2 } from "react-icons/fi";
import Pic from "../../assets/svg/image.jpg";
import { News } from "../../data/news";

export default function HomeNews() {
  return (
    <div className="flex justify-center w-full text-center">
      <div className="container">
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <div className="p-4 hoverline">
              <div className="relative aspect-square w-full p-4 overflow-hidden">
                <Image
                  fill
                  loading="lazy"
                  src={Pic}
                  className="w-full h-full hover:scale-110 overflow-hidden object-cover transition-all duration-500"
                  alt="Sample image"
                />
              </div>

              <div className="flex text-justify w-full text-center">
                <a className="link text-4xl font-bold my-3.5">
                  <span className="underlinehead">
                    {" "}
                    VR Is the Use of Computer Technology to Create a Simulated
                    Environment.
                  </span>
                </a>
              </div>

              <div className="flex w-full text-center">
                <div className="mr-4 flex items-center">
                  <span>By</span> <span className="fn">&nbsp;axilthemes</span>
                </div>

                <div className="mr-4 flex items-center">
                  <span className="dot">.</span>&nbsp; August 5, 2019
                </div>

                <div className="mr-4 flex items-center">
                  <span className="dot">.</span>&nbsp; 4,816 Views
                </div>

                <div className="flex items-center">
                  <FiShare2 />
                  &nbsp;Shares
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <div className="p-4">
              <div className="flex w-full justify-between items-center mt-[-40px]">
                <h4 className="text-3xl font-extrabold ">Recent News</h4>
                <div className="">
                  <h4 className="singleline text-lg font-bold">
                    ALL RECENT NEWS
                  </h4>
                </div>
              </div>

              {News?.map((item, index) => {
                return (
                  <div className="flex mb-4 w-full hoverline" key={index}>
                    <div className="w-1/4">
                      <div className="relative aspect-square w-full p-4 overflow-hidden">
                        <Image
                          fill
                          loading="lazy"
                          src={item.image}
                          className="hover:scale-110 overflow-hidden object-contain transition-all duration-500"
                          alt="Sample image"
                        />
                      </div>
                    </div>

                    <div className="relative ml-8 w-3/4">
                      <div className="w-[100px]">
                        <div
                          className="px-4 py-1 font-sm text-[#fff]
                  font-semibold mb-4"
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
                        >
                          {item.button}
                        </div>
                      </div>

                      <div className="flex text-justify w-full text-center">
                        <a className="link text-2xl font-bold">
                          <span className="underlinehead">{item.title}</span>
                        </a>
                      </div>

                      <div className="flex w-full text-center mt-2">
                        <div className="mr-4 flex items-center">
                          <span>By</span>{" "}
                          <span className="fn">&nbsp;axilthemes</span>
                        </div>

                        <div className="mr-4 flex items-center">
                          <span className="dot">.</span>&nbsp; 4,816 Views
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
