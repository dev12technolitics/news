// // import React from 'react'
import { FadeIn } from '../animate'

export default function HeadingAboutUs() {
  return (
    <div className="flex justify-between w-full relative">
      <FadeIn durationTime={'1s'}>
        <div className="w-11/12 sm:w-8/12 mx-auto">
          <div className="w-full">
            <div className="w-full">
              <p className="leading-tight font-raleway text-[21px] sm:text-custom-44 font-bold my-2 text-justify sm:text-center">
                <span className=" md:inline theme-heading">Since </span>
                <span className=" md:inline theme-heading">1958 - </span>
                Over<span className=""> 65 years</span> in the Transformers
                industry.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
      <div className="sm:block hidden absolute right-0 top-0 h-full">
        <div className="my-auto h-full flex items-center">
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
      </div>
    </div>
  )
}
