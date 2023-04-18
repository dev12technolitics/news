import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsInstagram, BsTwitter, BsWhatsapp } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { Grid, Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import moment from 'moment'
import Link from 'next/link'

function BlogDetailCard({ data, allBlog, allBlogLoading }) {
  const {
    blog_image,
    blog_description,
    blog_title,
    blog_posteddate,
    blog_postedby,
    seoTags,
  } = data || {}
  const [pageLoading, setPageLoading] = useState(true)

  const [socialSharePath, setSocialSharePath] = useState(null)
  useEffect(() => {
    setSocialSharePath(window.location.href)
  }, [socialSharePath])
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 1000)
  }, [])
  return (
    <div className="mx-auto my-10 w-11/12 sm:container">
      <Grid container>
        <Grid item lg={9} md={9} sm={12}>
          <div className="absolute z-10 mt-5 flex flex-col items-center rounded-r-lg bg-gray-200 px-4 py-2">
            <div className="">
              <span className="text-lg font-semibold text-theme-primary-main">
                {moment(blog_posteddate).format('MMM')}
              </span>
              <br />
              <span className="text-base font-medium text-slate-800">
                {moment(blog_posteddate).format('DD')}
              </span>
            </div>
          </div>
          <div className="relative h-auto w-full animate-opacityAnimation">
            {pageLoading ? (
              <Skeleton variant="rectangular" className="h-96 rounded-xl" />
            ) : (
              <Image
                height={500}
                width={1000}
                alt={blog_title}
                src={blog_image}
                loading="lazy"
                className="h-auto w-full rounded-lg md:rounded-xl"
              />
            )}
          </div>
          <div className="mt-2 uppercase text-base text-slate-500">
            {pageLoading ? (
              <Skeleton width={'30%'} />
            ) : (
              <span>{'By ' + blog_postedby}</span>
            )}
          </div>
          {pageLoading ? (
            <Skeleton />
          ) : (
            <h1 className="font-robo text-lg uppercase leading-6 tracking-normal text-slate-700 md:text-3xl md:leading-10 ">
              {blog_title}
            </h1>
          )}
          <div className="text-lg text-slate-500">
            {pageLoading ? (
              <Skeleton className="h-52 rounded-xl" />
            ) : (
              <p
                style={{ textAlign: 'justify' }}
                dangerouslySetInnerHTML={{
                  __html: blog_description,
                }}
              />
            )}
          </div>

          <Box
            sx={{
              margin: {
                xs: '20px 0px 30px 0px',
                sm: '20px 0px 30px 0px',
                md: '20px 0px 20 0px',
                lg: '20px 0px 0 0px',
              },
            }}
          >
            {seoTags?.length > 0 && (
              <>
                <div className="pb-4 text-lg font-normal uppercase leading-6 tracking-normal text-gray opacity-70 md:text-base md:leading-7">
                  TAGS
                </div>
                <div>
                  {seoTags?.map((item) => {
                    return (
                      <div
                        key={item}
                        // href="#"
                        className="relative mr-2 mb-2 inline-block rounded-lg bg-slate-200 px-3 py-2 align-top text-sm capitalize text-gray opacity-60"
                      >
                        {item}
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </Box>

          <Box
            sx={{
              margin: {
                xs: '20px 0px 30px 0px',
                sm: '20px 0px 30px 0px',
                md: '20px 0px 20 0px',
                lg: '20px 0px 0 0px',
              },
            }}
          >
            <div
              className="pb-4 text-lg font-normal
                    uppercase
                    leading-6 tracking-normal
                    text-gray opacity-70 md:text-base md:leading-7"
            >
              Share via :
            </div>
            <div>
              <a
                target={'_blank'}
                rel="noreferrer"
                href={`https://www.facebook.com/sharer.php?u=${socialSharePath}`}
              >
                <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#4080FF] p-3 font-semibold text-white">
                  <FaFacebookF />
                </button>
              </a>
              <a
                target={'_blank'}
                rel="noreferrer"
                href={`https://api.whatsapp.com/send?text=${socialSharePath}`}
              >
                <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#4fce5d] p-3 font-semibold text-white">
                  <BsWhatsapp />
                </button>
              </a>
              <a
                target={'_blank'}
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=${socialSharePath}`}
              >
                <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#40BFF5] p-3 font-semibold text-white">
                  <BsTwitter />
                </button>
              </a>
              <a
                target={'_blank'}
                className="cursor-poinetr"
                rel="noreferrer"
                href={`https://www.instagram.com/?url=${socialSharePath}`}
              >
                <button className="cursor-poinetr inline-flex items-center space-x-2 rounded-full bg-[#FF9C31] p-3 font-semibold text-white">
                  <BsInstagram />
                </button>
              </a>
            </div>
          </Box>
        </Grid>

        <Grid item lg={3} md={3} sm={12}>
          <BlogOtherData allBlog={allBlog} allBlogLoading={allBlogLoading} />
        </Grid>
      </Grid>
    </div>
  )
}

export default BlogDetailCard

export const BlogOtherData = ({ allBlog }) => {
  // const { faceBook, insta, twitter } = AppSocialLinks?.socialLinksData
  const [pageLoading, setPageLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 1000)
  }, [])
  return (
    <Box
      sx={{
        padding: {
          xs: '0px',
          sm: '0px',
          md: '0 0 0 20px ',
          lg: '0 0 0 20px',
        },
      }}
    >
      {/* <Box>
        <div
          className="pb-5 text-lg font-semibold
                    uppercase
                    leading-6 tracking-normal
                    text-theme-primary-main md:text-xl md:leading-7"
        >
          FOLLOW US:
        </div>

        <div className="flex">
          <a target="_blank" rel="noreferrer" href={`${faceBook}`}>
            <BsFacebook
              color="#0f2f4e"
              style={{ margin: '0px 20px 0px 0px' }}
              size={21}
            />
          </a>
          <a target="_blank" rel="noreferrer" href={`${twitter}`}>
            <FaTwitterSquare
              color="#0f2f4e"
              style={{ margin: '0px 20px 0px 0px' }}
              size={21}
            />
          </a>
          <a target="_blank" rel="noreferrer" href={`${insta}`}>
            <FaInstagram
              color="#0f2f4e"
              style={{ margin: '0px 20px 0px 0px' }}
              size={21}
            />
          </a>
        </div>
      </Box> */}

      <Box
        sx={{
          margin: {
            xs: '20px 0px 0 0px',
            sm: '20px 0px 0 0px',
            md: '40px 0px 35px 0px',
            lg: '40px 0px 35px 0px',
          },
        }}
      >
        <div
          className="text-lg font-semibold
                    uppercase
                    leading-6 tracking-normal
                    text-dark-grey md:text-xl md:leading-7 capitalize"
        >
          other post
        </div>
        {allBlog?.map((allItems, index) => {
          return (
            <div key={index} className="relative mt-4 flex items-center">
              <Link href={`/blogs/${allItems?.blog_slug}-${allItems?._id}`}>
                <div className="relative flex items-center hover:cursor-pointer">
                  <div className="relative mr-2.5 h-28 w-28 shrink-0 animate-opacityAnimation overflow-hidden rounded-[15px]">
                    {pageLoading ? (
                      <Skeleton
                        variant="rectangular"
                        className="h-full w-full"
                      />
                    ) : (
                      <Image
                        fill
                        src={allItems?.blog_image}
                        alt="logo"
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="w-full">
                    {pageLoading ? (
                      <Skeleton
                        width={'100%'}
                        className="animate-opacityAnimation rounded-lg w-full"
                      />
                    ) : (
                      <p className="m-0 h-6 overflow-hidden text-base capitalize text-slate-700">
                        {allItems?.blog_title}
                      </p>
                    )}

                    {pageLoading ? (
                      <Skeleton
                        width={'100%'}
                        className="animate-opacityAnimation rounded-lg w-full"
                      />
                    ) : (
                      <div className="text-slate-500">
                        {moment(allItems?.blog_posteddate).format(
                          'MMMM DD, YYYY'
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </Box>
    </Box>
  )
}
