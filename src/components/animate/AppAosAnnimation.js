import { useEffect } from 'react'
// importing aos
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AppAosAnnimation({
  animationName,
  children,
  animationDuration = '1000',
}) {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <div data-aos={animationName} data-aos-duration={animationDuration}>
      {children}
    </div>
  )
}
