import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AppButton, AppCarousel, AppHeading } from '../basics'
import { SlCalender } from 'react-icons/sl'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { Skeleton } from '@mui/material'

export default function HomePageBlogs({ blogs }) {
  // const {
  //   data: blogs,
  //   isLoading: blogsLoading,
  //   isError: blogslsError,
  // } = useGetAllBlog()
  // if (blogslsLoading) return <LoadingScreen />
  const [pageLoading, setPageLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 5000)
  }, [])
  // if (blogslsError) return <ErrorScreen />
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    infinite: blogs?.length >= 3 ? true : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className="relative">
      <div className="sm:block hidden absolute right-0 top-20">
        <svg
          width="94"
          height="67"
          viewBox="0 0 94 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.3333 20.7349C17.3333 22.2076 18.5272 23.4015 20 23.4015C21.4728 23.4015 22.6667 22.2076 22.6667 20.7349C22.6667 19.2621 21.4728 18.0682 20 18.0682C18.5272 18.0682 17.3333 19.2621 17.3333 20.7349ZM54.2085 20.7349L54.656 20.512C54.5715 20.3422 54.3981 20.2349 54.2085 20.2349V20.7349ZM62.1775 36.7349L61.7299 36.9578C61.8145 37.1276 61.9878 37.2349 62.1775 37.2349V36.7349ZM89 37.2349C89.2761 37.2349 89.5 37.011 89.5 36.7349C89.5 36.4587 89.2761 36.2349 89 36.2349V37.2349ZM20 21.2349H54.2085V20.2349H20V21.2349ZM53.7609 20.9578L61.7299 36.9578L62.625 36.512L54.656 20.512L53.7609 20.9578ZM62.1775 37.2349H89V36.2349H62.1775V37.2349Z"
            fill="url(#paint0_linear_437_9371)"
          />
          <path
            d="M40 41.7349C40 43.944 41.7909 45.7349 44 45.7349C46.2091 45.7349 48 43.944 48 41.7349C48 39.5257 46.2091 37.7349 44 37.7349C41.7909 37.7349 40 39.5257 40 41.7349ZM73.0323 41.7349L73.4818 41.1345C73.3521 41.0374 73.1943 40.9849 73.0323 40.9849V41.7349ZM79.7097 46.7349L79.2601 47.3352C79.3899 47.4324 79.5476 47.4849 79.7097 47.4849V46.7349ZM89 47.4849C89.4142 47.4849 89.75 47.1491 89.75 46.7349C89.75 46.3206 89.4142 45.9849 89 45.9849V47.4849ZM44 42.4849H73.0323V40.9849H44V42.4849ZM72.5827 42.3352L79.2601 47.3352L80.1592 46.1345L73.4818 41.1345L72.5827 42.3352ZM79.7097 47.4849H89V45.9849H79.7097V47.4849Z"
            fill="#575FF0"
          />
          <path
            d="M49.3333 29.2349C49.3333 30.7076 50.5272 31.9015 52 31.9015C53.4728 31.9015 54.6667 30.7076 54.6667 29.2349C54.6667 27.7621 53.4728 26.5682 52 26.5682C50.5272 26.5682 49.3333 27.7621 49.3333 29.2349ZM93 29.7349C93.2761 29.7349 93.5 29.511 93.5 29.2349C93.5 28.9587 93.2761 28.7349 93 28.7349V29.7349ZM52 29.7349H93V28.7349H52V29.7349Z"
            fill="#1488CC"
          />
          <defs>
            <linearGradient
              id="paint0_linear_437_9371"
              x1="90.2673"
              y1="28.7349"
              x2="17.8173"
              y2="28.7349"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0095ED" />
              <stop offset="1" stop-color="#151ECF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <AppHeading
        title={'Blogs'}
        content={
          'Discover the latest in manufacturing trends and updates on our blog. Journey of revolutionizing the industry with new technologies and innovative processes.'
        }
      />
      <div className="w-w-main sm:w-11/12 mx-auto pt-5 sm:pt-2">
        {/* <div className="sm:block hidden w-w-main mx-auto">
          <div className="flex">
            <p className="border-b-3 border-theme-primary-main w-12 md:w-16 mx-auto rounded-lg  m-2 md:m-4" />
            <span className="my-auto text-base font-bold">
              Our Service area
            </span>
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 px-5 sm:px-14 my-5">
          <div className="">
            <p className="text-center sm:text-left  font-raleway text-lg md:text-4xl font-bold sm:my-5 my-1">
              Revolutionizing Manufacturing: Insights and Updates from Our
              <span className="theme-heading">&nbsp;Blog&nbsp;</span>
            </p>
          </div>
          <div className="h-full w-full">
            <p className="text-base leading-8 font-robo mb-6 text-dark-grey">
              Discover the latest in manufacturing trends and updates on our
              blog. Let our team of experts guide you through the journey of
              revolutionizing the industry with new technologies and innovative
              processes.
            </p>
          </div>
        </div> */}
        <AppCarousel {...settings}>
          {blogs?.map((item, index) => {
            return (
              <div key={index} className="w-full p-4">
                <Link href={`/blogs/${item?.blog_slug}-${item?._id}`}>
                  <div className="relative md:my-2 md:mx-1 aspect-square ">
                    <div className="flex justify-center w-full flex-col">
                      <div className="relative animate-opacityAnimation  w-full aspect-[4/3] text-xs sm:text-custom-15 ">
                        {pageLoading ? (
                          <Skeleton
                            variant="rectangular"
                            className="h-full w-full   rounded-xl"
                          />
                        ) : (
                          <Image
                            loading="eager"
                            src={item?.blog_image}
                            alt="Picture"
                            className="h-full w-full object-cover rounded-xl"
                            fill
                          />
                        )}
                      </div>
                      <div className="bottom-7 absolute w-full">
                        <div className="relative py-4 bg-white rounded-lg shadow-shadow-harco w-4/5 mx-auto h-[116px] overflow-hidden px-4">
                          <div className="mx-auto overflow-hidden ">
                            {pageLoading ? (
                              <Skeleton className="w-full" width="100%" />
                            ) : (
                              <span className="text-sm leading-6 text-[#c3c3c3] font-robo text-home-content leading-0 font-semibold">
                                <span>
                                  <SlCalender className="mr-3" />
                                </span>
                                {moment(item?.blog_posteddate).format(
                                  'MMMM DD YYYY'
                                )}
                              </span>
                            )}

                            <div className="bg-white absolute left-0 blogAnimation px-5 w-full">
                              {pageLoading ? (
                                <Skeleton
                                  variant="rectangular"
                                  className="h-14 w-full  rounded-xl "
                                />
                              ) : (
                                <p className="capitalize h-14 overflow-hidden  font-robo text-sm sm:text-xl leading-0 font-bold m-0">
                                  {item?.blog_title}
                                </p>
                              )}
                              <span>
                                <Link
                                  href={`/blogs/${item?.blog_slug}-${item?._id}`}
                                >
                                  <AppButton
                                    variant="text"
                                    endIcon={<FaAngleDoubleRight size={20} />}
                                    title={'READ MORE'}
                                    className="mt-2"
                                  />
                                </Link>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </AppCarousel>
      </div>
    </div>
  )
}
