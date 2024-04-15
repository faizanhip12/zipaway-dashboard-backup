import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'

// ** form handling lib
import { useController, UseControllerProps } from 'react-hook-form'
import { InputBaseProps } from '@mui/material'

interface IField extends UseControllerProps {
  name: string
  control: UseControllerProps['control'] | any
  label: string
  placeholder?: string
  disabled?: boolean
  children: React.ReactNode
}

const SelectField: React.FC<IField> = ({ control, disabled = false,  ...props }) => {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { error },
    formState: {}
  } = useController({
    ...props,
    control
  })

  return (
    <Box>
      <FormControl fullWidth error={Boolean(error)}>
        <InputLabel id='demo-simple-select-label'>{props.label}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          disabled={disabled}
          label={props.label}
          onChange={onChange}
        >
          {props.children}
        </Select>
        {error && (
          <FormHelperText sx={{ color: 'error.main' }} id={`validation-schema-${name}`}>
            {error.message}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  )
}

export default SelectField
