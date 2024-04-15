import React, { useRef, useState } from 'react'
import { FormControl, IconButton, FormHelperText, InputBaseProps, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

interface IField extends InputBaseProps {
  name: string
  type?: 'text' | 'text-area' | 'number'
  label: string
  placeholder: string
  defaultValue?: string | number | readonly string[]
  helperText?: string
}

const InputPassword = ({ error, value, onChange, ...props }: IField) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <FormControl fullWidth>
      {/* <InputLabel htmlFor='input-secret-text' error={Boolean(error)}>
        {props.label}
      </InputLabel> */}
      {/* <InputPasswordWrapp
        fullWidth
        value={value}
        onChange={onChange}
        id='input-secret-text'
        error={Boolean(error)}
        {...props}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <IconButtonWrapp>
            <IconButton edge='end' onMouseDown={e => e.preventDefault()} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
            </IconButton>
          </IconButtonWrapp>
        }
      /> */}
      {/* @ts-ignore */}
      <TextField
        {...props}
        onChange={onChange}
        value={value}
        defaultValue={value}
        name='Pasd'
        inputRef={ref}
        label={props.label}
        placeholder={props.placeholder}
        error={Boolean(error)}
        aria-describedby={`validation-schema-${name}`}
        multiline={props.type === 'text-area' ? true : false}
        fullWidth
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <IconButton
              edge='end'
              onMouseDown={e => e.preventDefault()}
              onClick={() => {
                setShowPassword(!showPassword)
                if (ref.current) {
                  ref.current.blur()
                }
              }}
            >
              {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
            </IconButton>
          )
        }}
      />
      {/* {error && (
        <FormHelperText sx={{ color: 'error.main' }} id=''>
          {props.helperText}
        </FormHelperText>
      )} */}
    </FormControl>
  )
}

export default InputPassword
