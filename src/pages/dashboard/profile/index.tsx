import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { InputField, RadioField } from 'src/@core/components/form'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import { Tab, Tabs, Typography } from '@mui/material'
import InputPassword from 'src/@core/components/ControllForm/InputPassword'
import { IMaskInput } from 'react-imask'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const fromSchema = yup.object().shape({
  first_name: yup.string().required('First Name is a required field').typeError('Phone is a required field'),
  last_name: yup.string().required('Last Name is a required field').typeError('Phone is a required field'),
  phone: yup.string().required('Phone is a required field').typeError('Phone is a required field'),
  email: yup.string().required('Email is a required field').typeError('Phone is a required field'),
  gender: yup.string().required('Gender is a required field').typeError('Gender is a required field')
})

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask='00000000000000000000000000'
      definitions={{
        '#': /[1-9]/
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const Page = () => {
  const [selectedTab, setSelectedTab] = useState('1')
  const auth = useAuth()
  const { user } = useAuth()

  const formMethods = useForm({
    resolver: yupResolver(fromSchema)
  })

  useEffect(() => {
    if (user) {
      formMethods.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email
      })
    }
  }, [])

  const onSubmit = (body: any) => {
    if (!user.id) return

    if (selectedTab === '1') {
      auth.profileUpdate(user.id as string, body)
    } else {
      auth.changeCredentials({ password: body.password, newPassword: body.newPassword })
    }
  }

  return (
    <>
      <Grid container alignItems={'flex-start'} sx={{ height: '80vh' }}>
        <Grid item md={10} xs={12}>
          <Typography variant='h4'>Update Profile</Typography>
          <Typography variant='caption'>Here you can update your profile</Typography>
          <Tabs
            value={selectedTab}
            onChange={(_, val) => {
              setSelectedTab(val)
            }}
            aria-label='basic tabs example'
          >
            <Tab label='Profile' value='1' />
            <Tab label='Password' value='2' />
          </Tabs>

          {selectedTab === '1' ? (
            <Box sx={{ mb: 5, mt: 8 }}>
              <form noValidate autoComplete='off' onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Grid container>
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputField
                        name='first_name'
                        label='First Name'
                        placeholder='First Name'
                        control={formMethods.control}
                        sx={{ marginRight: '10px' }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth sx={{ mb: 4, ml: 4 }}>
                      <InputField
                        name='last_name'
                        label='Last Name'
                        placeholder='Last Name'
                        control={formMethods.control}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mb: 4 }}>
                  <FormControl fullWidth>
                    <InputField
                      name='phone'
                      label='Phone'
                      placeholder='Phone'
                      control={formMethods.control}
                      InputProps={{
                        inputComponent: TextMaskCustom as any
                      }}
                    />
                    {/* <InputField name='phone' label='Phone' placeholder='Phone' control={formMethods.control} /> */}
                  </FormControl>
                </Grid>

                <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputField name='email' label='email' placeholder='Enter Email' control={formMethods.control} />
                </FormControl>

                <Grid item xs={12} sx={{ mb: 4 }}>
                  <RadioField
                    name='gender'
                    label='Gender'
                    options={[
                      { value: 'MALE', label: 'Male' },
                      { value: 'FEMALE', label: 'Female' }
                    ]}
                    defaultValue={user?.gender}
                    control={formMethods.control}
                  />
                </Grid>

                <LoadingButton
                  fullWidth
                  loading={auth.status === 'pending'}
                  disabled={auth.status === 'pending'}
                  loadingPosition='end'
                  size='large'
                  variant='contained'
                  type='submit'
                >
                  Submit
                </LoadingButton>
              </form>
            </Box>
          ) : (
            <Box sx={{ mb: 5, mt: 8 }}>
              <form noValidate autoComplete='off' onSubmit={formMethods.handleSubmit(onSubmit)}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      control={formMethods.control}
                      name='password'
                      render={({ field, fieldState: { error } }) => (
                        <InputPassword
                          name='password'
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={Boolean(error)}
                          helperText={error?.message || ''}
                          label='Old Password'
                          placeholder='Enter password'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      control={formMethods.control}
                      name='newPassword'
                      render={({ field, fieldState: { error } }) => (
                        <InputPassword
                          name='newPassword'
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={Boolean(error)}
                          helperText={error?.message || ''}
                          label='New Password'
                          placeholder='Enter password'
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <LoadingButton
                    fullWidth
                    loading={auth.status === 'pending'}
                    disabled={auth.status === 'pending'}
                    loadingPosition='end'
                    size='large'
                    variant='contained'
                    type='submit'
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </form>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'profile-page'
}

export default Page
