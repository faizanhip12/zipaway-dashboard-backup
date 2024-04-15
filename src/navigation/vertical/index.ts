// ** Icon imports
import AccessibilityIcon from '@mui/icons-material/Accessibility'
import CategoryIcon from '@mui/icons-material/Category'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import WebStoriesIcon from '@mui/icons-material/WebStories'
import PersonIcon from '@mui/icons-material/Person'
import StoreIcon from '@mui/icons-material/Store'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import PaidIcon from '@mui/icons-material/Paid'
import ContactPageIcon from '@mui/icons-material/ContactPage'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const navigation = (): VerticalNavItemsType => {
  // const ability = useContext(AbilityContext)

  return [
    {
      title: 'Dashboard',
      icon: CategoryIcon,
      path: '/dashboard',
      action: 'itsHaveAccess',
      subject: 'dashboard-page'
    },
    {
      title: 'Category',
      icon: CategoryIcon,
      path: '/dashboard/category',
      action: 'itsHaveAccess',
      subject: 'category-page'
    },

    {
      title: 'Our Products',
      icon: ShoppingBasketIcon,
      path: '/dashboard/product',
      action: 'itsHaveAccess',
      subject: 'product-page'
    },
    {
      title: 'Customers',
      icon: PersonIcon,
      path: '/dashboard/customer',
      action: 'itsHaveAccess',
      subject: 'customer-page'
    },

    // {
    //   title: 'Banner',
    //   icon: WebStoriesIcon,
    //   path: '/banner',
    //   action: 'itsHaveAccess',
    //   subject: 'banner-page'
    // },
    {
      title: 'Orders',
      icon: AddShoppingCartIcon,
      path: '/dashboard/order',
      action: 'itsHaveAccess',
      subject: 'order-page'
    },
    {
      title: 'Affiliates',
      icon: StoreIcon,
      path: '/dashboard/affialtes',
      action: 'itsHaveAccess',
      subject: 'affialtes-page'
    },
    {
      title: 'Commissions',
      icon: PaidIcon,
      path: '/dashboard/comissions',
      action: 'itsHaveAccess',
      subject: 'comission-page'
    },
    {
      title: 'Contact Requests',
      icon: ContactPageIcon,
      path: '/dashboard/contact',
      action: 'itsHaveAccess',
      subject: 'contact-requests'
    }

    //Page with children Example
    // {
    //   title: 'Page With Children',
    //   icon: AccessibilityIcon,
    //   action: 'itsHaveAccess',
    //   subject: 'teachers-page',
    //   children: [
    //     {
    //       title: 'Children 1',
    //       icon: AccessibilityIcon,
    //       path: '/child1',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-page'
    //     },
    //     {
    //       title: 'Children 2',
    //       icon: AccessibilityIcon,
    //       path: '/child2',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-page'
    //     },
    //     {
    //       title: 'Children 3',
    //       icon: AccessibilityIcon,
    //       path: '/child3',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-page'
    //     },
    //   ]
    // }
  ]
}

export default navigation
