// ** MUI Imports
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'

// ** import form support components
import { FileUploader, InputField } from 'src/@core/components/form'

// ** Icons Imports

// ** Types Imports
import { Button, CircularProgress, Grid } from '@mui/material'
import { DrawerFooter } from 'src/@core/components/common/DrawerFooter'
import { useState } from 'react'
import { useAffialtes } from 'src/@core/hooks/apps/useAffialtes'

import MultipleInput from 'src/@core/components/common/MultipleInput'
import { Controller } from 'react-hook-form'
import InputPassword from 'src/@core/components/ControllForm/InputPassword'

interface Props {
  serviceId: string | null
  onClose?: () => void
}

const Form: React.FC<Props> = ({ serviceId, onClose }) => {
  // ** Hooks
  const {
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors },
      setValue
    },
    addAffialtes,
    updateAffialtes,
    // variation_handler,
    store
  } = useAffialtes(serviceId)

  const onSubmit = async (data: any) => {
    if (serviceId) {
      await updateAffialtes(serviceId, data)
    } else {
      await addAffialtes(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
      <Box sx={{ p: 5, paddingBottom: '100px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <InputField
              name='first_name'
              label='First Name'
              placeholder='Enter first name'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='last_name'
              label='Last Name'
              placeholder='Enter last name'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputField name='email' label='Email' placeholder='Enter email' control={control} />
          </Grid>

          <Grid item xs={12}>
            <InputField name='phone' label='Phone' placeholder='Enter phone' type='text' control={control} />
          </Grid>
        </Grid>
      </Box>
      <DrawerFooter sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <LoadingButton
          sx={{ mr: 3 }}
          loading={store.status === 'pending'}
          disabled={store.status === 'pending'}
          loadingPosition='end'
          size='large'
          variant='contained'
          type='submit'
          endIcon={store.status === 'pending' && <CircularProgress size={20} />}
        >
          Submit
        </LoadingButton>
      </DrawerFooter>
    </form>
  )
}

export default Form
