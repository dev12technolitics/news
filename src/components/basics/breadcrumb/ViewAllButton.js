import Link from 'next/link'
// import React from 'react'

export default function ViewAllButton({ navigateTo = '/' }) {
  return (
    <Link href={navigateTo}>
      <div className=" py-1 flex items-center space-x-2 md:space-x-4 w-full hover:cursor-pointer">
        <svg
          width="108"
          height="8"
          viewBox="0 0 108 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M104.687 0.159096L107.854 3.61591C108.049 3.82804 108.049 4.17196 107.854 4.38409L104.687 7.8409C104.493 8.05303 104.177 8.05303 103.983 7.8409C103.789 7.62878 103.789 7.28485 103.983 7.07272L106.301 4.54319H0V3.45681H106.301L103.983 0.927276C103.789 0.715149 103.789 0.371223 103.983 0.159096C104.177 -0.0530318 104.493 -0.0530318 104.687 0.159096Z"
            fill="black"
            fill-opacity="0.8"
          />
        </svg>
        <div className="all_cursor">
          <button className="all_cursor text-sm flex lowercase bg-transparent p-0">
            view all
          </button>
        </div>
      </div>
    </Link>
  )
}
