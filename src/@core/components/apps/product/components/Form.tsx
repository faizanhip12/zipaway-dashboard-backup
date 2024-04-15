'use client'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { FileUploader, InputField } from 'src/@core/components/form'
import { CircularProgress, Divider, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { DrawerFooter } from 'src/@core/components/common/DrawerFooter'
import { useEffect, useState } from 'react'
import { useProduct } from 'src/@core/hooks/apps/useProduct'
import SelectMany from 'src/@core/components/apps/product/components/SelectMany'
import MultipleInput from 'src/@core/components/common/MultipleInput'
import toast from 'react-hot-toast'
import Select from 'src/@core/components/form/Select'
import { Controller } from 'react-hook-form'

interface Props {
  serviceId: string | null
  onClose?: () => void
}

const Form: React.FC<Props> = ({ serviceId }) => {
  const {
    form: {
      control,
      handleSubmit,
      formState: { errors }
    },
    addProduct,
    updateProduct,
    variation_handler,
    store
  } = useProduct(serviceId)

  const [categories, setCategories] = useState<any[]>([])
  const [benefits, setBenefits] = useState<string[] | any>([])
  const [ingredients, setIngredients] = useState<string[] | any>([])
  const [useSteps, setUseSteps] = useState<string[]>([])

  const onSubmit = async (data: any) => {
    delete data.createdAt
    delete data.createdBy
    delete data.id
    delete data.isDeleted
    delete data.status
    delete data.updatedAt

    if (!categories.length) {
      toast.error('Please select categories, its required')
      return
    }

    if (!benefits.length) {
      toast.error('Please add benefits, its required')
      return
    }

    if (!ingredients.length) {
      toast.error('Please add ingredients, its required')
      return
    }

    if (!useSteps.length) {
      toast.error('Please add steps, its required')
      return
    }

    const categories_ids = categories.map(({ id }) => id)
    data.categories = categories_ids
    data.benifits = benefits
    data.ingredients = ingredients
    data.useSteps = useSteps
    data.price = data.price

    if (serviceId) {
      await updateProduct(serviceId, data)
    } else {
      await addProduct(data)
    }

    setBenefits([])
    setIngredients([])
    setUseSteps([])
  }

  useEffect(() => {
    if (serviceId && store?.entity?.categories) {
      setCategories(store?.entity?.categories.map(el => el.category))
      setBenefits(store?.entity?.benifits?.map((benefit: any) => benefit?.description))
      setIngredients(store?.entity?.ingredients?.map((benefit: any) => benefit?.description))
      setUseSteps(store?.entity?.useSteps?.map((benefit: any) => benefit?.description))
    } else {
      setBenefits([])
      setIngredients([])
      setUseSteps([])
    }
  }, [serviceId, store?.entity?.categories])

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
      <Box sx={{ p: 5, paddingBottom: '100px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <InputField name='title' label='Title' placeholder='Enter Title' type='text' control={control} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputField
              name='description'
              label='Description'
              placeholder='Enter Description'
              type='text-area'
              control={control}
              rows={4}
              multiline={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField name='weight' label='Product Size' placeholder='Size Number' type='number' control={control} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <InputField name='size' label='Size' placeholder='Enter Size' type='text' control={control} />*/}
            <Select label='select size' name='size' control={control}>
              <MenuItem value='Oz'>Oz</MenuItem>
              <MenuItem value='ML'>Ml</MenuItem>
              {/* <MenuItem value='8 Oz'>8 Oz</MenuItem>
              <MenuItem value='10 ML'>10 ML</MenuItem> */}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12}>
            <SelectMany
              execute={true}
              setCategories={categories => {
                setCategories(categories)
              }}
              categories={categories}
              // setCategories={e => setCategories(e.map(category => category.id))}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MultipleInput
              InputArray={benefits}
              setInputArray={benifit => setBenefits(benifit)}
              placeholder='Benefits'
              // defaultValue={serviceId ? defaultBenefits : []}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MultipleInput
              InputArray={ingredients}
              setInputArray={ingre => setIngredients(ingre)}
              placeholder='Ingredients'
              // defaultValue={serviceId ? defaultIngredients : []}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MultipleInput
              InputArray={useSteps}
              setInputArray={steps => setUseSteps(steps)}
              placeholder='How to use Steps...'
              // defaultValue={serviceId ? defaultUseSteps : []}
            />
          </Grid>

          <Grid item container xs={12} sm={12} spacing={5}>
            {variation_handler.fields.map((field, index) => (
              <>
                <Grid item xs={12}>
                  {/* <SelectField
                    name={`variations.${index}.affiliate`}
                    control={control}
                    label='Select Affiliate'
                    disabled
                  >
                    <MenuItem value='CUSTOMER'>CUSTOMER</MenuItem>
                    <MenuItem value='CUSTOMER_WHOLESALE'>CUSTOMER_WHOLESALE</MenuItem>
                    <MenuItem value='CITY_MANAGER'>CITY_MANAGER</MenuItem>
                    <MenuItem value='STATE_MANAGER'>STATE_MANAGER</MenuItem>
                    <MenuItem value='REGIONAL_MANAGER'>REGIONAL_MANAGER</MenuItem>
                    <MenuItem value='NATIONAL_MANAGER'>NATIONAL_MANAGER</MenuItem>
                  </SelectField> */}

                  <TextField label='Select Affiliate' value={field.affiliate || ''} disabled fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    key={field.id}
                    name={`variations.${index}.quantity`}
                    label='Quantity'
                    placeholder='Quantity'
                    // @ts-ignore
                    control={control}
                    type='number'
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputField
                    key={field.id}
                    name={`variations.${index}.price`}
                    label='Price'
                    placeholder='Price'
                    // @ts-ignore
                    control={control}
                    type='number'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </>
            ))}
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputField
              name='commission'
              label='Commission'
              placeholder='Enter Commission'
              type='text'
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='caption'>Shipping Info</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputField
              name='shippingWeight'
              label='Shipping weight (pounds)'
              placeholder=''
              type='number'
              control={control}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography style={{ fontWeight: '500' }}>lbm</Typography>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FileUploader
              name='featured_image'
              maxFiles={1}
              maxSize={10000000}
              control={control}
              maxWidth='100'
              label='Product Image'
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
          endIcon={store.status === 'pending' && <CircularProgress size={20} />}
        >
          Submit
        </LoadingButton>
      </DrawerFooter>
    </form>
  )
}

export default Form
