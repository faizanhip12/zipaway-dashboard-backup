import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface Props {
    icon: any
    title: string
    count: string
}

const Card: React.FC<Props> = ({ icon, title, count }) => {
  return (
    <Box
          component={'div'}
          width={'24%'}
          textAlign={'center'}
          padding={'35px 0'}
          position={'relative'}
          sx={{
            background: 'linear-gradient(142deg, #FFF 0%, #F7FFE2 100%)',
            backdropFilter: 'blur(82.83186340332031px)',
            borderRadius: '15px'
          }}
        >
          <Box
            component={'div'}
            display={'flex'}
            alignItems={'center'}
            sx={{
              background: 'linear-gradient(180deg, #5A833A 0%, #8C9A65 100%)',
              borderRadius: '100px',
              padding: '10px',
              width: 'fit-content',
              margin: 'auto',
              position: 'absolute',
              left: '50%',
              top: '-30px',
              transform: 'translateX(-50%)',
              boxShadow: '0 4px 10px 3px #8c9a65b3'
            }}
          >
            {/* <Image  src='/images/background/carOrder.png' width={34} height={32} alt=''/> */}
            {icon}
          </Box>
          <Box component={'div'}>
            <Typography variant='body1' color='#131313'>
              {title || "HELLO"}
            </Typography>
          </Box>
          <Typography variant='h4' color='#131313'>
            {count}
          </Typography>
        </Box>
  )
}

export default Card
