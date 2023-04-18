import Image from 'next/image'
// import React from 'react'
import ImageIcon from '../../assets/RoboPowerImages/logo.png'

// if (typeof window !== 'undefined') import('@lottiefiles/lottie-player')

const LoadingScreen = () => {
  return (
    <section className="w-full h-full">
      <div className="flex h-screen w-full items-center justify-center">
        <div className=" flex h-[80px] w-[130px] items-center justify-center sm:h-[140px] sm:w-[150px]">
          <Image
            src={ImageIcon}
            alt="Picture of the author"
            width={120}
            height={70}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default LoadingScreen
