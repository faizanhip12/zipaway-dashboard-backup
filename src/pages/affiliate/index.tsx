import { ReactNode, useEffect } from 'react'
import Image from 'next/image'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSearchParams } from 'next/navigation'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import GuestLayout from 'src/@core/layouts/GuestLayout'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Grid } from '@mui/material'
import { InputField } from 'src/@core/components/form'
import InputPassword from 'src/@core/components/ControllForm/InputPassword'
import { AffiliateService } from 'src/services'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import img from '../../assets/pro2.png'

const MainWrapper = styled(Grid)<BoxProps>(({ theme }) => ({
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center',
  padding: '20px',
  borderRadius: '100px',
  [`${theme.breakpoints.down('md')}`]: {
    fontSize: '30px'
  }
}))

const InputWraper = styled(InputField)<BoxProps>(({ theme }) => ({
  [`${theme.breakpoints.down('xl')}`]: {
    // padding: '10px 0 !important',
    // height: 'auto',
    // fontSize: '10px',
    '& label': {
      fontSize: '10px'
    },
    '& input': {
      fontSize: '10px',
      padding: '10px',
      height: 'auto'
    }
  },
  [`${theme.breakpoints.down('md')}`]: {
    // padding: '10px 0 !important',
    // height: 'auto',
    // fontSize: '10px',
    '& label': {
      fontSize: '10px'
    },
    '& input': {
      fontSize: '8px',
      padding: '8px',
      height: 'auto'
    }
  }
}))

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  phone: yup.string().required('Phone is required'),
  email: yup.string().email('Email must be a valid Email').required('Email is required'),
  password: yup.string().min(5).required('Password is required'),
  referCode: yup.string()
})

const defaultValues = {
  first_name: '',
  last_name: '',
  phone: '',
  password: '',
  email: '',
  referCode: ''
}

interface FormData {
  first_name: string
  last_name: string
  phone: string
  email: string
  password: string
  referCode: string
}

const Page = () => {
  const auth = useAuth()
  const router = useRouter()
  const { get, has } = useSearchParams()

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await AffiliateService.add({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        phone: data.phone,
        referCode: data.referCode
      })

      if (res.status === 200) {
        toast.success('Account Created Successfully, you can login now!')
        router.push('/dashboard/login')
      }
    } catch (error) {
      const err = error as never as any
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    if (has('referCode')) {
      reset({
        ...getValues(),
        referCode: get('referCode') || ''
      })
    }
  }, [get])

  return (
    <>
      <MainWrapper container>
        <Grid item sx={{ maxWidth: 'fit-content' }} md={6} xs={12} textAlign='center'>
          <Image src={img} alt='loginImage' width={280} height={330} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ mb: 10 }}></Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sx={{ mb: 4 }}>
              {/* <InputField name='first_name' label='First Name' placeholder='Enter First Name' control={control} /> */}
              <InputWraper name='first_name' label='First Name' placeholder='Enter First Name' control={control} />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <InputWraper name='last_name' label='Last Name' placeholder='Enter Last Name' control={control} />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <InputWraper name='email' label='Email' placeholder='Enter Email' control={control} />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <InputWraper name='phone' label='Phone' placeholder='Enter Phone' control={control} />
            </Grid>

            <Grid item xs={12} sx={{ mb: 4 }}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <InputPassword
                    name='password'
                    value={value}
                    className='affiliateSignUpForm'
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    label='Password'
                    placeholder='Enter password'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 4 }}>
              <InputWraper name='referCode' label='Refer Code' placeholder='Enter Refer Code' control={control} />
            </Grid>

            {/* <Box
              sx={{ mb: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              {/* <Link passHref href='/forgot-password'>
                <Typography component={MuiLink} variant='body2' sx={{ color: 'primary.main' }}>
                  Forgot Password?
                </Typography>
              </Link> */}

            <LoadingButton
              fullWidth
              sx={{ my: 1 }}
              loading={auth.status === 'pending'}
              disabled={auth.status === 'pending'}
              loadingPosition='end'
              size='large'
              variant='contained'
              type='submit'
            >
              Sign Up
            </LoadingButton>
            {/* 
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>Don't have an account?</Typography>
              <Typography>
                <Link passHref href='/dashboard/signup'>
                  <Typography component={MuiLink} sx={{ color: 'primary.main' }}>
                    Sign Up
                  </Typography>
                </Link>
              </Typography>
            </Box> */}
          </form>
        </Grid>
      </MainWrapper>
    </>
  )
}

Page.getLayout = (page: ReactNode) => (
  <BlankLayout>
    <GuestLayout>{page}</GuestLayout>
  </BlankLayout>
)

Page.guestGuard = true

export default Page
