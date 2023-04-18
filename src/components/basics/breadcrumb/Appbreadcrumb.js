// import React from 'react'
import Box from '@mui/material/Box'
import { FadeIn } from '../../animate'
export default function AppBreadcrumb({ title, subTitle, bgImage }) {
  return (
    <div>
      {/* desktop */}
      <div className="hidden md:block md:h-[300px] h-[130px]">
        <Box
          className="bg-no-repeat bg-contain relative overflow-hidden h-full w-full"
          style={{ background: `url("${bgImage}")`, backgroundSize: 'cover' }}
        >
          <div className="bg_layout">
            <Box
              className="bg_image_bottom"
              sx={{ paddingLeft: { xs: '6%', sm: '6%', md: '6%', lg: '6%' } }}
            >
              <FadeIn durationTime={'1.5s'}>
                <div>
                  <p
                    style={{ fontFamily: 'Kaushan Script', color: '#939090' }}
                    className="capitalize font-normal md:text-[32px] text-[18px]"
                  >
                    {subTitle}
                  </p>
                  <p className="uppercase text-theme-primary-main tracking-wider font-bold md:text-[46px] text-[23px]">
                    {title}
                  </p>
                </div>
              </FadeIn>
            </Box>
          </div>
        </Box>
      </div>
      {/* mobile */}
      <div className="md:hidden h-auto">
        <Box
          className=""
          sx={{ padding: { xs: '0 6%', sm: '0 6%', md: '0 6%', lg: '0 6%' } }}
        >
          <FadeIn durationTime={'1.5s'}>
            <div>
              <div className="capitalize font-[500] theme_text text-[20px] py-5">
                {title}
              </div>
              <hr className="mb-5" />
              {/* <p className="upprcase theme_text tracking-wider font-bold md:text-[46px] text-[23px]">
                        {title}
                      </p> */}
            </div>
          </FadeIn>
        </Box>
      </div>
    </div>
  )
}
