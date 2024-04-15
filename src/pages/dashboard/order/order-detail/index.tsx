import { BorderAll } from '@mui/icons-material'
import { Box, Card, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useOrder } from 'src/@core/hooks/apps/useOrder'

const Page = () => {
  const router = useRouter()
  const {
    query: { id }
  } = useRouter()
  const order_id = router?.query['order_id'] as string
  const { getOrder, store } = useOrder(order_id)

  useEffect(() => {
    getOrder(order_id)
  }, [])
  return (
    <>
      <Typography variant='h3' color='#5a833a' fontSize='30px' fontWeight='bold' textAlign='center' marginBottom='20px'>
        Order Details
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          background: 'white',
          width: '50%',
          margin: '40px auto',
          boxShadow: '7px 5px 17px 11px #5a833a85',
          borderRadius: '20px',
          padding: '20px 30px'
        }}
      >
        <Grid container spacing={2} marginBottom='20px'>
          <Typography variant='h5' color='#21241e8a' fontSize='12px' fontWeight='bold' width='50%'>
            User Name:
          </Typography>
          <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light'>
            {
              // @ts-ignore
              store?.entity?.user?.first_name
            }{' '}
            {/* @ts-ignore */}
            {store?.entity?.user?.last_name}
          </Typography>
        </Grid>

        <Grid container spacing={2} marginBottom='20px'>
          <Typography variant='h5' color='#21241e8a' fontSize='12px' fontWeight='bold' width='50%'>
            Email:
          </Typography>
          <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light'>
            {
              //@ts-ignore
              store?.entity?.user?.email
            }
          </Typography>
        </Grid>

        <Grid container spacing={2} marginBottom='20px'>
          <Typography variant='h5' color='#21241e8a' fontSize='12px' fontWeight='bold' width='50%'>
            Items:
          </Typography>

          <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light'>
            {
              //@ts-ignore
              store?.entity?.items?.length
            }
          </Typography>
        </Grid>

        <Grid container xs={12} spacing={2} marginBottom='20px'>
          {
            //@ts-ignore
            store?.entity?.items?.map((pro: any, index: any) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sx={{
                    boxShadow: '6px 7px 18px 13px #5a833a63',
                    marginBottom: '20px',
                    borderRadius: '20px',
                    justifyContent: 'space-between',
                    display: 'flex'
                    // gap: '10px'
                  }}
                  md={12}
                >
                  <Grid item xs={6} sx={{ flex: '0 0 50%' }}>
                    <Image
                      src={pro?.product?.featured_image}
                      alt='product image'
                      width={200}
                      height={200}
                      style={{ borderRadius: '25px', objectFit: 'contain' }}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ flex: '0 0 50%' }}>
                    <Typography
                      variant='h5'
                      color='#21241e8a'
                      fontSize='12px'
                      fontWeight='bold'
                      width='50%'
                      marginBottom='10px'
                    >
                      Product:
                    </Typography>
                    <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light' marginBottom='10px'>
                      {pro?.product?.title}
                    </Typography>
                    <Typography
                      variant='h5'
                      color='#21241e8a'
                      fontSize='12px'
                      fontWeight='bold'
                      width='50%'
                      marginBottom='10px'
                    >
                      Price:{pro?.variation?.price}
                    </Typography>
                    <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light' marginBottom='10px'>
                      {pro?.variation?.price}
                    </Typography>
                    <Typography
                      variant='h5'
                      color='#21241e8a'
                      fontSize='12px'
                      fontWeight='bold'
                      width='50%'
                      marginBottom='10px'
                    >
                      Quantity: {pro?.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              )
            })
          }
        </Grid>
        <Grid container spacing={2} marginBottom='20px'>
          <Typography variant='h5' color='#21241e8a' fontSize='12px' fontWeight='bold' width='50%'>
            Order No:
          </Typography>
          <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light'>
            {/* @ts-ignore */}
            {store?.entity?.orderNo}
          </Typography>
        </Grid>
        <Grid container spacing={2} marginBottom='20px'>
          <Typography variant='h5' color='#21241e8a' fontSize='12px' fontWeight='bold' width='50%'>
            Price:
          </Typography>
          <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light'>
            {/* @ts-ignore */}

            {store?.entity?.invoice?.price}
          </Typography>
        </Grid>
        <Grid container spacing={2} marginBottom='20px'>
          <Typography variant='h5' color='#21241e8a' fontSize='12px' fontWeight='bold' width='50%'>
            Payment Status:
          </Typography>
          <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light'>
            {/* @ts-ignore */}
            {store?.entity?.invoice?.status}
          </Typography>
        </Grid>

        <Grid container spacing={2} marginBottom='20px'>
          <Typography variant='h5' color='#21241e8a' fontSize='12px' fontWeight='bold' width='50%'>
            Order Status:
          </Typography>
          <Typography variant='h6' color='#5a833a' fontSize='30px' fontWeight='light'>
            {/* @ts-ignore */}
            {store?.entity?.status}
          </Typography>
        </Grid>
      </Box>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'order-order-detail-page'
}

export default Page
