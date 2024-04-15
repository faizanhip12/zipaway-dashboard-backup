// ** React Imports
import { useState, SyntheticEvent, Fragment, useContext } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

import clipboard from 'clipboard-copy'
import Link from 'next/link'
import { textOverflow } from 'src/@core/helper/text'
import toast from 'react-hot-toast'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

export const renderClient = (row: any) => {
  if (row?.profile_picture) {
    return (
      <Avatar
        alt='John Doe'
        // @ts-ignore
        src={row?.profile_picture}
        sx={{ width: '2.5rem', height: '2.5rem' }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row?.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row?.first_name + ' ' + row?.last_name)}
      </CustomAvatar>
    )
  }
}

const UserDropdown = (props: Props) => {
  // const first = useContext(second)

  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout, user } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {/* <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        /> */}
        {/* @ts-ignore */}
        {renderClient(user)}
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              {/* @ts-ignore */}
              {renderClient(user)}
              {/* <Avatar
                alt='John Doe'
                // @ts-ignore
                src={user?.profile_picture}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              /> */}
            </Badge>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '14px' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {textOverflow(
                    //@ts-ignore
                    user?.activeChannel ? user?.activeChannel?.channel?.name : user?.first_name + ' ' + user?.last_name,
                    15
                  )}
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                  {user?.role?.code || 'Unknown User'}
                </Typography>
              </Box>
              {user?.role?.code !== 'ADMIN' ? (
                <Typography
                  variant='body2'
                  sx={{ fontSize: '0.8rem', color: 'text.disabled' }}
                  style={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    clipboard(`https://dashboard.zipaway.info/affiliate?referCode=${user?.inviteCode}`)
                    toast.success('Refer Code copied to clipboard')
                  }}
                >
                  Code: {user?.inviteCode || 'Unknown User'}
                </Typography>
              ) : null}
            </div>
          </Box>
        </Box>

        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('/dashboard/profile')}>
          <PersonOutlineOutlinedIcon sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Profile
        </MenuItem>
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/apps/email')}>
          <Box sx={styles}>
            <EmailOutline sx={{ mr: 2 }} />
            Inbox
          </Box>
        </MenuItem> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/apps/chat')}>
          <Box sx={styles}>
            <MessageOutline sx={{ mr: 2 }} />
            Chat
          </Box>
        </MenuItem> */}
        {/* <Divider /> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/account-settings')}>
          <Box sx={styles}>
            <CogOutline sx={{ mr: 2 }} />
            Settings
          </Box>
        </MenuItem> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/pricing')}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ mr: 2 }} />
            Pricing
          </Box>
        </MenuItem> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/faq')}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ mr: 2 }} />
            FAQ
          </Box>
        </MenuItem> */}
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <ExitToAppIcon sx={{ mr: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
