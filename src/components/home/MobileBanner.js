import Image from 'next/image'
import { AppCarousel } from '../basics'

export default function MobileBanner({ settings, homeBanner }) {
  return (
    <div className="w-mobile-w mx-auto relative">
      <AppCarousel {...settings}>
        {homeBanner?.map((item, index) => {
          return (
            <div key={index} className="h-full w-full">
              <a
                className="h-full"
                href={item?.pro_link}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  effect="lazy"
                  height={200}
                  width={200}
                  src={item?.ban_image}
                  alt={item?.ban_title}
                  className={`animate-fadeUpAnimation h-full transition-all duration-500 w-full object-contain rounded-lg overflow-hidden`}
                />
              </a>
            </div>
          )
        })}
      </AppCarousel>
    </div>
  )
}
