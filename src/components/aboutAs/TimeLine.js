// // import React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { Stack } from '@mui/system'
import useDeviceType from 'src/custom-hooks/useDeviceType'
export default function TimeLine({ data }) {
  const { isMobile } = useDeviceType()

  return (
    <>
      <Timeline
        position="alternate"
        sx={{ mx: 'auto', maxWidth: isMobile ? '100%' : '70%' }}
      >
        {data?.map((item, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ color: 'white' }}>
                <Stack sx={{ fontSize: isMobile ? '16px' : '22px' }}>
                  {item?.year}
                </Stack>
                <Stack>{item?.title}</Stack>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </>
  )
}
