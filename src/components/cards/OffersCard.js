import {useState} from 'react'
import { Box, Card, Link, Stack, Fab } from '@mui/material'
import { AppModal } from '../basics'
import Image from 'next/image'

const OffersCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false)
  const { name, cover, status, couponCode, percent } = product

  return (
    <>
      <Card
        onClick={() => setShowModal(true)}
        sx={{
          cursor: 'pointer',
          '&:hover .add-cart-btn': {
            opacity: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative', p: 1 }}>
          <Fab
            color="warning"
            size="medium"
            className="add-cart-btn"
            onClick={() => setShowModal(true)}
            sx={{
              right: 16,
              bottom: 16,
              zIndex: 9,
              opacity: 0,
              position: 'absolute',
              transition: (theme) =>
                theme.transitions.create('all', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            {percent}
          </Fab>
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image alt={name} src={cover} fill />
          </div>
        </Box>
        <Box spacing={2.5} sx={{ px: 3, py: 1 }}>
          <div className="mx-auto flex w-10/12 justify-center ">
            <Link href="/#" color="inherit" variant="subtitle2" noWrap>
              {name}
            </Link>
          </div>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <div className="my-2  flex justify-center">
              <Box
                color="warning"
                sx={{
                  px: 3,
                  py: 1,
                  display: 'flex',
                  justify: 'center',
                  borderRadius: '5px',
                }}
                className="border border-dashed border-theme-primary-main"
              >
                <span className="flex items-center justify-center text-center">
                  {couponCode}
                </span>
              </Box>
            </div>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{ typography: 'subtitle1' }}
            >
              <Box component="span">{status}</Box>
            </Stack>
          </Stack>
        </Box>
      </Card>
      <AppModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        maxWidth={'xs'}
      >
        <div className="flex items-center justify-start hover:cursor-pointer animate-opacityAnimation">
          <Image
            loading="lazy"
            alt={name}
            src={cover}
            width={30}
            height={20}
            className="object-contain"
          />
        </div>
      </AppModal>
    </>
  )
}

export default OffersCard
