// import React from 'react'
import Slider from 'react-slick'

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'none', background: 'red' }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'none', background: 'yellow' }}
      onClick={onClick}
    />
  )
}

function AppCarousel({ children, ...otherProps }) {
  var settings = {
    dots: false,
    cssEase: 'linear',
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <Slider {...settings} {...otherProps}>
      {children}
    </Slider>
  )
}

export default AppCarousel
