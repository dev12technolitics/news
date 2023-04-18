import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
// import React from 'react'
import { AppButton } from '../basics'

function NoItemsInAccount({ title }) {
  const { push } = useRouter()
  return (
    <Stack direction="row" justifyContent="center" className="my-12">
      <Box className="w-fit">
        <Typography variant="subtitle1" className="mb-4 text-center uppercase">
          {title}
        </Typography>
        <Stack className="mx-auto w-fit">
          <AppButton
            variant="contained"
            size="medium"
            onClick={() => push('/p')}
            title="Go To Shop"
          />
        </Stack>
      </Box>
    </Stack>
  )
}

export default NoItemsInAccount
