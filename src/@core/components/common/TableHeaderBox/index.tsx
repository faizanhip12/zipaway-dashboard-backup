import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

export const TableHeaderBox = styled(Box)<BoxProps>(({ theme }) => ({
    padding: 5,
    paddingBottom: 3,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end'
}))