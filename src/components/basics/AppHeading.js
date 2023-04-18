// import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FadeIn } from '../animate'
import AppButton from './AppButton'
import Link from 'next/link'
import useDeviceType from 'src/custom-hooks/useDeviceType'

function AppHeading({ title, content, btnClick }) {
  const isMobile = useDeviceType()
  return (
    <FadeIn durationTime={'1.5s'}>
      <div className="flex justify-between">
        <span className="capitalize my-auto font-robo text-home-content text-base sm:text-lg font-medium opacity-70 sm:opacity-80">
          {content}
        </span>

        <Link href={btnClick}>
          <AppButton
            variant="contained"
            fullWidth
            endIcon={<BsArrowRight className="ml-1 sm:ml-2" />}
            title={title}
            size={isMobile ? 'medium' : 'small'}
          />
        </Link>
      </div>
    </FadeIn>
  )
}

export default AppHeading
