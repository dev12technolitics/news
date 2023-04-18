import Link from 'next/link'
import TestimonialsSlider from './TestimonialsSlider'
import { AppButton, ErrorScreen } from '../basics'
import { useGetAllTestimonials } from 'src/services/testimonialsServices'

export default function TestimonialOne() {
  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    isError: testimonialsError,
  } = useGetAllTestimonials()
  if (testimonialsLoading) return <></>

  if (testimonialsError) return <ErrorScreen />
  return (
    <div className="w-mobile-w md:container mx-auto md:my-12 my-5 md:bg-white md:p-5 p-0">
      <div className="md:w-11/12 w-full mx-auto">
        <TestimonialsSlider testimonials={testimonials} />
      </div>
      <div className="w-full mx-auto md:hidden mt-5 mb-20">
        <div className="py-1">
          <div className="bg-light-pink flex justify-center items-center flex-col">
            <div className="flex justify-center items-center w-full flex-col py-5">
              <span className="text-home-content text-base text-center capitalize">
                Apply now to join the power tools <br /> revolution and network
                !
              </span>
              <div className="mt-3">
                <Link href={'/auth/dealership-registration'}>
                  <AppButton
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'white',
                      color: (theme) => theme.palette.primary.main,
                      letterSpacing: '.07rem',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '400',
                      boxShadow: '0 4px 9px rgba(0,0,0,.1),',
                      '&:hover': {
                        background: 'white',
                        color: (theme) => theme.palette.primary.main,
                        border: 'none',
                      },
                    }}
                    title={'Become a Dealer'}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="bg-[#FFB86A] pink_box">
                    <TestimonialSliderTwo testimonialData={testimonialData} />
                  </div> */}
        </div>
      </div>
    </div>
  )
}
