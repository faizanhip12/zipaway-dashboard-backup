import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Third Party Imports
import { useCustomer } from 'src/@core/hooks/apps/useCustomer'

// ** import form support components
import { FileUploader, InputField, Select, SingleFileUploader } from 'src/@core/components/form'

// ** Icons Imports
import CloseIcon from '@mui/icons-material/Close';

// ** Types Imports
import { CircularProgress, Grid, MenuItem } from '@mui/material'
import { DrawerHeader } from 'src/@core/components/common/DrawerHeader'
import { DrawerFooter } from 'src/@core/components/common/DrawerFooter'

interface Props {
    serviceId: string | null;
    onClose?: () => void;
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
        addCustomer,
        updateCustomer,
        store
    } = useCustomer(serviceId)

    const onSubmit = async (data: any) => {
        data.order = parseInt(data.order)
        if (serviceId) {
            await updateCustomer(serviceId, data)
        } else {
            await addCustomer(data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{position:'relative'}}>
            <Box sx={{ p: 5, paddingBottom:'100px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <InputField name='title' label='Title' placeholder='Title' type='text' control={control} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputField name='name' label='Name' placeholder='Name' type='text' control={control} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputField name='order' label='order' placeholder='Enter order' type='number' control={control} />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ margin: '10px 0 10px 10px' }}>Image</div>
                        <FileUploader
                            name='image'
                            //@ts-ignore
                            maxFiles={1}
                            control={control}
                        />

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
                    endIcon={store.status === "pending" && <CircularProgress size={20} />}
                >
                    Submit
                </LoadingButton>
            </DrawerFooter>
        </form>
    )
}

export default Form
