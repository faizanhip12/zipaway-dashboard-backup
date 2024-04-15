// ** React Imports
import { useState, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'
// import LoginImage from '/public/images/cards/LoginImage.png'
import img from '../../../assets/pro2.png'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Layout Import
import GuestLayout from 'src/@core/layouts/GuestLayout'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Grid, Stack } from '@mui/material'

// ** import form support components
import { InputField } from 'src/@core/components/form'
import InputPassword from 'src/@core/components/ControllForm/InputPassword'

const MainWrapper = styled(Grid)<BoxProps>(({ theme }) => ({
  alignItems: 'center',
  height: '75vh',
  justifyContent: 'center',
  padding: '20px',
  borderRadius: '100px'
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required')
})

const defaultValues = {
  password: '',
  email: ''
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgClasses = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    auth.login({ email, password }, error => {
      setError('password', {
        type: 'manual',
        message: error?.message || 'Invalid credentials!'
      })
      toast.error(error?.message || 'Invalid credentials!')
    })
  }

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
              <InputField name='email' label='Email' placeholder='Enter Email' control={control} />
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
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    helperText={error?.message || ''}
                    label='Password'
                    placeholder='Enter password'
                  />
                )}
              />
              <Stack alignItems='flex-end'>
                <Typography variant='caption'>
                  <Link href='/dashboard/forgot-password'>Forgot Password ?</Link>
                </Typography>
              </Stack>
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
              Login
            </LoadingButton>
            <Box display='flex' alignItems='center' justifyContent='flex-end'>
              <Typography variant='caption' textAlign='right'>
                Want to become an affiliate? <Link href='/affiliate'>Sign up for Affiliate</Link>
              </Typography>
            </Box>
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

LoginPage.getLayout = (page: ReactNode) => (
  <BlankLayout>
    <GuestLayout>{page}</GuestLayout>
  </BlankLayout>
)

LoginPage.guestGuard = true

export default LoginPage
