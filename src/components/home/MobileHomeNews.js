import Image from "next/image";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { NewsDetail } from "../../data/NewsDetail";
import { CategoryHomeBox } from "./CategoryHomeBox";

export default function NewsPage({ categoriesAllData, newsAllData }) {
  // const redirectUrl = `/news/1`;
  return (
    <>
      <div className="flex justify-center w-full text-center">
        <div className="container mt-14">
          <div className="md:hidden w-full bg-white px-2">
            <div className="scrolll">
              <div className="w-full grid grid-rows-1 grid-flow-col  py-2">
                {NewsDetail?.map((item) => {
                  return (
                    <div
                      key={item?._id}
                      className="p-1 md:p-6 aspect-square h-[88px] w-[24vw]"
                    >
                      <CategoryHomeBox item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <main>
            {NewsDetail?.map((item, index) => {
              return (
                <article key={index}>
                  <div className="mb-[40px] hoverline">
                    {/* <Link href={redirectUrl}> */}
                    <div className="relative h-full w-full overflow-hidden ">
                      <Image
                        loading="lazy"
                        src={item.image}
                        height={1000}
                        width={1000}
                        className="w-full h-full hover:scale-110 overflow-hidden object-contain transition-all duration-500"
                        alt="Sample image"
                      />
                    </div>
                    <div className="px-4">
                      <div className="w-[200px] mt-2.5">
                        <div
                          className="px-4 py-1 font-sm w-fit
                                font-semibold text-white flex text-center justify-center"
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

                      <div className="flex text-left w-full">
                        <a className="link text-2xl font-bold mt-3.5">
                          <span className="underlinehead">{item.title}</span>
                        </a>
                      </div>

                      <h5
                        className="text-lg font-normal 
                    flex text-left my-3.5 leading-[1.50rem]"
                      >
                        {item.detail}
                      </h5>
                    </div>
                    {/* </Link> */}

                    <div className="flex justify-between items-center px-4">
                      <div>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          // href={`https://www.facebook.com/sharer.php?u=${socialSharePath}`}
                        >
                          <button className="cursor-poinetr mr-2 inline-flex items-center space-x-2 rounded-full bg-[#4080FF] p-3 font-semibold text-white">
                            <FaFacebook />
                          </button>
                        </a>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          // href={`https://api.whatsapp.com/send?text=${socialSharePath}`}
                        >
                          <button className="cursor-poinetr mr-2 inline-flex items-center space-x-2 rounded-full bg-[#4fce5d] p-3 font-semibold text-white">
                            <BsWhatsapp />
                          </button>
                        </a>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          // href={`https://twitter.com/intent/tweet?text=${socialSharePath}`}
                        >
                          <button className="cursor-poinetr mr-2 inline-flex items-center space-x-2 rounded-full bg-[#40BFF5] p-3 font-semibold text-white">
                            <BsTwitter />
                          </button>
                        </a>
                        <a
                          target={"_blank"}
                          className="cursor-poinetr"
                          rel="noreferrer"
                          // href={`https://www.instagram.com/?url=${socialSharePath}`}
                        >
                          <button className="cursor-poinetr inline-flex items-center space-x-2 rounded-full bg-[#FF9C31] p-3 font-semibold text-white">
                            <BsInstagram />
                          </button>
                        </a>
                      </div>
                      <div>
                        <h3 className="my-0">Join Group</h3>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </main>
        </div>
      </div>
    </>
  );
}
