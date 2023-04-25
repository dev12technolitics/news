import Image from "next/image";
import { NewsDetail } from "../../data/NewsDetail";

export default function NewsPage() {
  return (
    <>
      <div className="flex justify-center w-full text-center">
        <div className="container mt-20 md:mx-0 mx-4">
          <main>
            {NewsDetail?.map((item, index) => {
              return (
                <article key={index}>
                  <div className="mb-[40px] hoverline">
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

                    <div className="flex md:text-justify text-left w-full">
                      <a className="link text-2xl font-bold mt-3.5">
                        <span className="underlinehead">{item.title}</span>
                      </a>
                    </div>

                    <h5
                      className="text-lg font-normal 
                    flex md:text-justify text-left my-3.5 leading-[1.50rem]"
                    >
                      {item.detail}
                    </h5>
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
