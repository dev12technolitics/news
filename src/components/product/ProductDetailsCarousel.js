import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles'
import { Box, Skeleton } from '@mui/material'
// utils
// components
import Image from 'next/image'
// import Lightbox from './LightBox'
import Carousel from 'react-slick'
import CarouselArrowIndex from './CarouselArrowIndex'
import { getPriceDataByUserType, getProductImages } from 'src/utils/utils-fun'

// ----------------------------------------------------------------------

const THUMB_SIZE = 84
function bgGradient(props) {
  const direction = props?.direction || 'to bottom'
  const startColor = props?.startColor
  const endColor = props?.endColor
  const imgUrl = props?.imgUrl
  const color = props?.color

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${
        endColor || color
      }), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    }
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  }
}
const StyledThumbnailsContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'length',
})(({ length, theme }) => ({
  margin: theme.spacing(0, 'auto'),
  position: 'relative',
  overflow: 'scroll',
  '& .slick-slide': {
    opacity: 0.48,
    '&.slick-current': {
      opacity: 1,
    },
    '& > div': {
      padding: theme.spacing(0, 0.75),
    },
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),
  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),
  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),
  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),
  ...(length > 2 && {
    '&:before, &:after': {
      ...bgGradient({
        direction: 'to left',
        startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
        endColor: `${theme.palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}))

// ----------------------------------------------------------------------

ProductDetailsCarousel.propTypes = {
  product: PropTypes.object,
  userType: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default function ProductDetailsCarousel({
  product,
  userType,
  isLoading,
}) {
  const theme = useTheme()

  const carousel1 = useRef(null)

  const carousel2 = useRef(null)

  const [images, setImages] = useState([])
  const [pageLoading, setPageLoading] = useState(true)

  const [nav1, setNav1] = useState()

  const [nav2, setNav2] = useState()

  const [currentIndex, setCurrentIndex] = useState(0)

  // const [selectedImage, setSelectedImage] = useState(-1)

  // const imagesLightbox = images?.map((img) => ({ src: img }))

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setPageLoading(false)
      }, 1000)
    }
  }, [isLoading])

  useEffect(() => {
    if (carousel1.current) {
      setNav1(carousel1.current)
    }
    if (carousel2.current) {
      setNav2(carousel2.current)
    }
  }, [])

  useEffect(() => {
    carousel1.current?.slickGoTo(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const priceData = getPriceDataByUserType(product, userType)
      const selectedVariant = priceData?.variantData?.filter(
        (item) =>
          item?.title?.toLowerCase() == product?.leadVariant?.toLowerCase()
      )
      const finalImage = getProductImages(
        product,
        selectedVariant[0]?.value?.toLowerCase()
      )

      setImages(
        finalImage !== undefined && finalImage?.length > 0
          ? finalImage
          : getProductImages(product, 'base')
      )
    } else {
      setImages(getProductImages(product, 'base'))
    }
  }, [product, userType])

  // const handleOpenLightbox = (imageUrl) => {
  //   const imageIndex = imagesLightbox.findIndex(
  //     (image) => image.src === imageUrl
  //   )
  //   // setSelectedImage(imageIndex)
  // }

  // const handleCloseLightbox = () => {
  //   setSelectedImage(-1)
  // }

  const carouselSettings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  }

  const carouselSettings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: images?.length > 3 ? 3 : images?.length,
  }

  const handlePrev = () => {
    carousel2.current?.slickPrev()
  }

  const handleNext = () => {
    carousel2.current?.slickNext()
  }

  const renderLargeImg = (
    <Box
      sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', position: 'relative' }}
    >
      <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}>
        {images?.map((img) => {
          return (
            <div
              key={img}
              className=" shadow-shadow-primary relative aspect-square animate-opacityAnimation overflow-hidden rounded-2xl "
            >
              {pageLoading ? (
                <Skeleton variant="rectangular" className="h-full rounded-xl" />
              ) : (
                <Image
                  loading="eager"
                  alt="product"
                  className="shadow-shadow-medium animate-fadeUpAnimation h-full w-full overflow-hidden object-cover"
                  src={img?.url}
                  fill
                  // onClick={() => handleOpenLightbox(img?.url)}
                />
              )}
            </div>
          )
        })}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={images?.length}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </Box>
  )

  const renderThumbnails = (
    <StyledThumbnailsContainer
      length={images?.length}
      sx={{ overflow: 'scroll' }}
    >
      <Carousel {...carouselSettings2} asNavFor={nav1} ref={carousel2}>
        {images?.map((img, index) => {
          return (
            <div
              key={img}
              className={`relative aspect-square h-20 animate-opacityAnimation`}
            >
              {pageLoading ? (
                <Skeleton
                  variant="rectangular"
                  className="h-full animate-opacityAnimation rounded-xl "
                />
              ) : (
                <Image
                  loading="lazy"
                  fill
                  alt="thumbnail"
                  src={img?.url}
                  className={`shadow-shadow-primary animate-fadeUpAnimation cursor-pointer object-cover h-full w-full 
              ${currentIndex === index && 'rounded-lg'}`}
                />
              )}
            </div>
          )
        })}
      </Carousel>
    </StyledThumbnailsContainer>
  )

  return (
    <>
      <Box
        sx={{
          '& .slick-slide': {
            float: theme.direction === 'rtl' ? 'right' : 'left',
          },
        }}
      >
        {renderLargeImg}

        {renderThumbnails}
      </Box>

      {/* <Lightbox
        index={selectedImage}
        slides={imagesLightbox}
        open={selectedImage >= 0}
        close={handleCloseLightbox}
        onGetCurrentIndex={(index) => setCurrentIndex(index)}
      /> */}
    </>
  )
}
