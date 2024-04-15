import { useState, MouseEvent } from 'react'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import CopyIcon from '@mui/icons-material/ContentCopyOutlined'

// ** Import Custom hooks
import clipboard from 'clipboard-copy'
import { useAuth } from 'src/hooks/useAuth'
import { IProduct, ProductApi } from 'src/types/apps/product'

const CopyOption = ({ product }: { product: ProductApi }) => {
  // ** Hooks
  const { user } = useAuth()

  const getURL = ({ productId, affiliateId }: { productId: string; affiliateId: string }): string => {
    return `https://zipaway.info/product-view/${productId}?affiliate=${affiliateId}`
  }

  return (
    <>
      <IconButton size='small' onClick={() => clipboard(getURL({ productId: product.id, affiliateId: user.id }))}>
        <CopyIcon />
      </IconButton>
    </>
  )
}

export default CopyOption
