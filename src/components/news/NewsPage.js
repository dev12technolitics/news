import Image from "next/image";
import Link from "next/link";
import { NewsDetail } from "../../data/NewsDetail";

export default function NewsPage() {
  const redirectUrl = `/news/1`;
  return (
    <>
      <div className="flex justify-center w-full text-center mt-14">
        <div className="container mt-20">
          <main>
            {NewsDetail?.map((item, index) => {
              return (
                <article key={index}>
                  <Link href={redirectUrl}>
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

                      <div className="w-[200px] mt-[20px]">
                        <div
                          className="px-4 py-1 font-sm w-fit
                  font-semibold mb-4 text-white flex text-center justify-center"
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
                        <a className="link text-3xl font-bold my-3.5">
                          <span className="underlinehead">{item.title}</span>
                        </a>
                      </div>

                      <h5 className="text-lg font-normal flex text-justify my-3.5">
                        {item.detail}
                      </h5>
                    </div>
                  </Link>
                </article>
              );
            })}
          </main>
        </div>
      </div>
    </>
  );
}
