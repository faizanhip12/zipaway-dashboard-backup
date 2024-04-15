import { Pagination, IApiPayload } from 'src/types/api'

export interface IOrder {
  company_name: string
  fullname: string
  email: string
  phone: number
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  sub_total: number
  total: number
  price: number
  quantity: number
  productId: string
  orderNo: string
  status: string
  user: {
    first_name: string
    last_name: string
    email: string
    role: {
      code: string
    }
  }
  invoice: {
    price: number
    shippingPrice: number
  }
  ShippingAddress: {
    addressLine1: string
    addressLine2: string
    country: string
    city: string
    state: string
    postalCode: string
  }
  // items:{
  //     length:any
  // }
  items: any
}

export interface IOrderApi extends IOrder {
  id: string
  items: string
  createdAt: Date
  updatedAt: Date
}

export interface IOrderForm extends Omit<IOrder, ['id', 'createdAt', 'updatedAt']> {}

export type IOrderKeys = keyof IOrderForm

export interface IPayload {
  pagination: Pagination
  entities: IOrderApi[]
}

interface IGetAll extends IApiPayload<IPayload> {}
