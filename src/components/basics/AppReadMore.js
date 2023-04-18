import { useState } from 'react'

export default function AppReadMore({
  children,
  length = 158,
  height = '142px',
}) {
  const text = children
  const [isReadMore, setIsReadMore] = useState(false)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <div
      className={`overflow-hidden leading-7 `}
      style={{
        height: isReadMore ? 'auto' : height,
        // minHeight: height,
      }}
    >
      {isReadMore ? (
        <span dangerouslySetInnerHTML={{ __html: text }} className='text-sm' />
      ) : (
        <span dangerouslySetInnerHTML={{ __html: text?.slice(0, length) }} className='text-sm' />
      )}
      {text?.length > length ? (
        <span
          onClick={toggleReadMore}
          className="text-sm capitalize text-theme-primary-main hover:cursor-pointer font-robo"
        >
          {isReadMore ? '...show less' : '...read more'}
        </span>
      ) : null}
    </div>
  )
}
