import React, { useState } from 'react'
import { TextField, Button, Chip, Box, Grid } from '@mui/material'
import { Clear } from '@mui/icons-material'

type IMultipleInput = {
  placeholder: string
  InputArray: string[]
  setInputArray: (value: string[]) => void
  defaultValue?: string[] // Add the defaultValue property as optional
}
const MultipleInput = ({ placeholder, InputArray, setInputArray, defaultValue }: IMultipleInput) => {
  const [inputValue, setInputValue] = useState('')
  const [initialized, setInitialized] = useState(false)

  const removeInput = (index: number) => {
    const newInputArray = [...InputArray]
    newInputArray.splice(index, 1)
    setInputArray(newInputArray)
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    if (inputValue === '') return
    setInputArray([...InputArray, inputValue])
    setInputValue('')
  }
  if (!initialized && defaultValue) {
    setInputArray(defaultValue)
    setInitialized(true)
  }
  return (
    <>
      <Grid container spacing={5} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid item xs={10} sm={10}>
          <TextField
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            placeholder={placeholder}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Button variant='contained' type='button' onClick={handleSubmit} sx={{ marginTop: 0 }}>
            Add
          </Button>
        </Grid>
      </Grid>

      <Box marginTop={3}>
        {InputArray?.length
          ? InputArray.map((input, index) => (
              <Chip
                sx={{ marginBottom: 3 }}
                key={index}
                label={input}
                onDelete={() => removeInput(index)}
                deleteIcon={<Clear />}
                style={{ marginRight: '0.5rem' }}
              />
            ))
          : ''}
      </Box>
    </>
  )
}

export default MultipleInput
