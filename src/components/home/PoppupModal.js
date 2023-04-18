import { useState, useEffect } from 'react'
import { AppCarousel } from '../basics'
import { MdClose } from 'react-icons/md'
import Image from 'next/image'
export default function PoppupModal({ banners }) {
  const [showPopupModal, setShowPopupModal] = useState(false)
  const [popupData, setPopupData] = useState([])

  const settings = {
    slidesToShow: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    fade: true,
  }

  useEffect(() => {
    // pop show only once per session
    if (banners && banners?.length > 0) {
      const newPop = banners?.filter(
        (item) => item?.ban_type === 'Popup Banner'
      )
      if (newPop?.length > 0) {
        setPopupData(newPop)
        const pop = sessionStorage.getItem('pop')
        if (pop === null) {
          sessionStorage.setItem('pop', 'true')
          setTimeout(() => {
            setShowPopupModal(true)
          }, 5000)
          setTimeout(() => {
            setShowPopupModal(false)
          }, 4000)
        }
      }
    }
  }, [banners])

  return (
    <section className="">
      {showPopupModal && (
        <div className="" onClick={() => setShowPopupModal(false)}>
          <div
            style={{ zIndex: '18000' }}
            className="justify-center items-center flex fixed inset-0 outline-none animate-mouldUpAnimation focus:outline-none"
          >
            <div className="relative w-full h-auto">
              <div className="flex justify-end py-2 md:w-[70vh] w-[90vw] mx-auto hover:cursor-pointer">
                <MdClose
                  fontSize={'20px'}
                  color={'white'}
                  onClick={() => setShowPopupModal(false)}
                />
              </div>
              <div className="md:w-[70vh] w-[90vw] mx-auto md:h-[70vh] h-[90vw]  overflow-hidden">
                <AppCarousel {...settings}>
                  {popupData?.map((item, index) => {
                    return (
                      <div key={index} className="animate-opacityAnimation ">
                        <a
                          href={item?.pro_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Image
                            width={500}
                            height={500}
                            src={item?.ban_image}
                            className="w-full h-full object-cover rounded-2xl"
                            alt={item?.ban_title}
                          />
                        </a>
                      </div>
                    )
                  })}
                </AppCarousel>
              </div>
            </div>
          </div>
          <div
            style={{ zIndex: '15000' }}
            className="opacity-70 fixed inset-0 bg-black"
            onClick={() => setShowPopupModal(false)}
          />
        </div>
      )}
    </section>
  )
}
