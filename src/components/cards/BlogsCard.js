import { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from '@mui/material'

export default function BlogsCard({ data }) {
  return (
    <div className="py-0 sm:py-5 mx-auto grid grid-cols-2 justify-center gap-5  w-11/12 sm:container  sm:grid-cols-2 md:container md:grid-cols-3 md:gap-14 lg:grid-cols-4">
      {data?.map((item) => {
        return <BlogCard key={item._id} item={item} />
      })}
    </div>
  )
}

function BlogCard({ item }) {
  const [pageLoading, setPageLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 1500)
  }, [])

  const {
    _id,
    blog_slug,
    blog_image,
    blog_title,
    blog_posteddate,
    // blog_postedby,
    // blog_description,
  } = item
  const redirectUrl = `/blogs/${blog_slug}-${_id}`
  return (
    <Link href={redirectUrl}>
      <div className="h-full rounded-lg bg-white font-robo shadow-lg md:rounded-xl">
        <div className="relative aspect-[4/3] animate-opacityAnimation rounded-tl-xl">
          {pageLoading ? (
            <Skeleton
              variant="rectangular"
              className="rounded-t-lg h-full w-full md:rounded-t-xl"
            />
          ) : (
            <Image
              loading="lazy"
              fill
              src={blog_image}
              alt={blog_title}
              className="w-full rounded-t-lg object-cover shadow md:rounded-t-xl"
            />
          )}
          <div className="absolute top-5 left-3 shadow-gray-600">
            {/* <span className="-mt-3 bg-light-grey text-theme-primary-main font-medium text-sm rounded-3xl p-1">
              {renderDate(blog_posteddate)}
            </span> */}
          </div>
        </div>
        <div className="p-2 md:p-4">
          {pageLoading ? (
            <Skeleton
              variant="rectangular"
              className="mb-3 h-4 w-full rounded-xl"
            />
          ) : (
            <div className="flex justify-start text-black">
              <span className="flex items-center text-xs font-normal capitalize text-dark-grey">
                {moment(blog_posteddate).format('ll')}
              </span>
            </div>
          )}
          {pageLoading ? (
            <Skeleton
              variant="rectangular"
              className="h-10 w-full rounded-xl md:h-12 "
            />
          ) : (
            <p className="m-0 mt-1 h-10  overflow-hidden text-sm font-medium capitalize tracking-tight text-black hover:underline md:mt-2 md:h-12 md:text-base">
              {blog_title}
            </p>
          )}
          {/* <div
            className="text-sm tracking-tight font-normal capitalize text-black hover:underline md:h-10 h-6 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: blog_description }}
          /> */}

          {/* <AppButton variant="contained" title="READ MORE" /> */}
        </div>
      </div>
    </Link>
  )
}
