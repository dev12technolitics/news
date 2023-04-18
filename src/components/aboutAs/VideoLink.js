import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'

export default function VideoLink() {
  const [pageLoading, setPageLoading] = useState()
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 1000)
  }, [])
  return (
    <>
      <div className="md:block hidden">
        {pageLoading ? (
          <Skeleton
            variant="rectangular"
            className="h-full w-full rounded-2xl"
          />
        ) : (
          <div className="justify-start my-auto mx-auto">
            <iframe
              className={`rounded-2xl shadow-shadow-harco`}
              width="530"
              height="298"
              src="https://www.youtube.com/embed/VAZEZ_TgNbA?autoplay=1&loop=1&mute=1&playlist=VAZEZ_TgNbA"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        )}
      </div>
      <div className="md:hidden my-3">
        {pageLoading ? (
          <Skeleton
            variant="rectangular"
            className="h-full w-full rounded-2xl"
          />
        ) : (
          <div className="justify-start my-auto mx-auto">
            <iframe
              className={` rounded-2xl shadow-shadow-harco`}
              width="100%"
              height="188"
              src="https://www.youtube.com/embed/VAZEZ_TgNbA?autoplay=1&loop=1&mute=1&playlist=VAZEZ_TgNbA"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        )}
      </div>
    </>
  )
}
