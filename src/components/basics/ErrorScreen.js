// import React from 'react'

// if (typeof window !== 'undefined') import('@lottiefiles/lottie-player')

const ErrorScreen = () => {
  return (
    <section className="w-full">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex h-[80px] w-[130px] items-center justify-center sm:h-[140px] sm:w-[150px]">
          {/* <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets5.lottiefiles.com/private_files/lf30_fi8yfbmc.json"
              style={{ width: '320px' }}
            ></lottie-player> */}
          <h1>ERROR</h1>
        </div>
      </div>
    </section>
  )
}

export default ErrorScreen
