import Image from "next/image";
import { useRouter } from "next/router";
import { RiShareForward2Fill } from "react-icons/ri";
import { TbBrandWhatsapp } from "react-icons/tb";

export default function CategoriesBaseCard({ cardData = [], setpageLoading }) {
  const { push } = useRouter();

  const handleOnClick = () => {
    if (navigator.share) {
      navigator
        .share({
          // title: "`${postTitle} | ${siteTitle}`,",
          // text: `Check out ${postTitle} on ${siteTitle}`,
          title: "Share via",
          text: `Nearby Share`,
          url: document.location.href,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };

  return (
    <>
      <div className="flex justify-center w-full text-center">
        <div className="container">
          <main>
            {cardData?.map((item, index) => {
              return (
                <article key={index}>
                  <div className="mb-[40px] hoverline">
                    <div
                      className="relative h-full w-full cursor-pointer"
                      onClick={() => push(`/news/detail/${item?._id}`)}
                    >
                      <Image
                        loading="lazy"
                        src={item.attach_file}
                        height={1000}
                        width={1000}
                        className="w-full h-full object-contain"
                        alt="Sample image"
                      />
                    </div>

                    <div className="px-4">
                      <div className="w-[200px] mt-2.5">
                        <div
                          className="px-4 py-1 font-sm w-fit
                                font-semibold text-md text-white flex text-center justify-center cursor-pointer"
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
                          {item.categoryName}
                        </div>
                      </div>

                      <div
                        className="flex text-left w-full"
                        onClick={() => push(`/news/detail/${item?._id}`)}
                      >
                        <a className="link text-xl font-bold mt-3.5 h-[62px] overflow-hidden cursor-pointer">
                          <span className="underlinehead">{item.title}</span>
                        </a>
                      </div>

                      <h5
                        className="text-[1.05rem] font-normal cursor-pointer
                    flex text-left mb-3.5 mt-0  leading-[1.50rem]"
                        onClick={() => push(`/news/detail/${item?._id}`)}
                      >
                        {item.short_description}
                      </h5>
                    </div>

                    <div className="flex justify-between items-center px-4">
                      <div>
                        <h5
                          className="my-0 flex text-lg items-center text-[#212b36d1]"
                          onclick={() => handleOnClick()}
                        >
                          Share
                          <RiShareForward2Fill
                            className="ml-1"
                            color="#212b36d1"
                          />
                        </h5>
                      </div>
                      <div>
                        <h3 className="my-0 flex text-lg items-center text-[#212b36d1]">
                          Join Group
                          <TbBrandWhatsapp className="ml-1" color="#212b36d1" />
                        </h3>
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
