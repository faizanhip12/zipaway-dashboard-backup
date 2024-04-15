import { ReactNode, SyntheticEvent, useContext, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MuiLink from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/GuestLayout'
import { useSettings } from 'src/@core/hooks/useSettings'
import { AuthContext } from 'src/context/AuthContext'
import toast from 'react-hot-toast'

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const Page = () => {
  const theme = useTheme()
  const { settings } = useSettings()
  const { status, forgotPassword } = useContext(AuthContext)

  const emailRef = useRef<HTMLInputElement>(null)
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!emailRef?.current?.value) {
      toast.error('Email is required')
      return
    }
    emailRef?.current?.value && forgotPassword({ email: emailRef.current.value })
  }

  const imageSource =
    skin === 'bordered' ? 'auth-v2-forgot-password-illustration-bordered' : 'auth-v2-forgot-password-illustration'

  return (
    <Grid
      container
      alignItems={'center'}
      height='75vh'
      sx={{ justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '20px' }}
    >
      {!hidden ? (
        <Grid item md={6} xs={12} textAlign='center'>
          <Image
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            alt='loginImage'
            width={200}
            height={200}
          />
        </Grid>
      ) : null}
      <Grid item md={6} xs={12}>
        <Box>
          <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
            {themeConfig.templateName}
          </Typography>
        </Box>
        <Box sx={{ mb: 6 }}>
          <TypographyStyled variant='h5'>Forgot Password? 🔒</TypographyStyled>
          <Typography variant='body2'>
            Enter your email and we&prime;ll send you instructions to reset your password
          </Typography>
        </Box>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField autoFocus inputRef={emailRef} type='email' label='Email' sx={{ display: 'flex', mb: 4 }} />

          <LoadingButton
            fullWidth
            sx={{ mb: 5.25 }}
            loading={status === 'pending'}
            disabled={status === 'pending'}
            loadingPosition='end'
            size='large'
            variant='contained'
            type='submit'
          >
            Send reset link
          </LoadingButton>
          <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link passHref href='/dashboard/login'>
              <Typography
                component={MuiLink}
                sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', justifyContent: 'center' }}
              >
                <KeyboardArrowLeftIcon sx={{ mr: 1.5, fontSize: '2rem' }} />
                <span>Back to login</span>
              </Typography>
            </Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  )
}

Page.guestGuard = true
Page.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Page
