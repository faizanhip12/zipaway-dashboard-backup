import React from 'react'

// ** MUI
import FormControl from '@mui/material/FormControl'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'

// ** form handling lib
import { useController, UseControllerProps } from 'react-hook-form'

interface IField extends UseControllerProps, Omit<TextFieldProps, 'variant'> {
  name: string
  type?: 'text' | 'text-area' | 'number'
  label: string
  placeholder: string
  control: any | UseControllerProps['control']
  defaultValue?: string | number | readonly string[]
}

const Field = ({ control, ...props }: IField) => {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { error }
  } = useController({
    ...props,
    control
  })

  return (
    <FormControl fullWidth>
      {/* @DANGER */}
      {/* @ts-ignore */}
      <TextField
        {...props}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        inputRef={ref}
        label={props.label}
        placeholder={props.placeholder}
        error={Boolean(error)}
        aria-describedby={`validation-schema-${name}`}
        multiline={props.type === 'text-area' ? true : false}
        InputLabelProps={{ shrink: value === '0' || value === 0 ? true : !!value }}
        fullWidth
      />
      {error && (
        <FormHelperText sx={{ color: 'error.main' }} id={`validation-schema-${name}`}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default Field
