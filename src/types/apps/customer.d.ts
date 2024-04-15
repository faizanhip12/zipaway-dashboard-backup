import { Pagination, IApiPayload } from 'src/types/api'

interface IAffiliate {
  first_name: string
  last_name: string
}

export interface ICustomer {
  name: string
  title?: string
  order: number
  image?: string
  first_name: string
  email: string
  gender: string
  orders: any[]
  affiliate?: IAffiliate
}

export interface CustomerApi extends ICustomer {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface CustomerForm extends Omit<ICustomer, ['id', 'createdAt', 'updatedAt']> {}

export type CustomerKeys = keyof CustomerForm

export interface IPayload {
  pagination: Pagination
  entities: CustomerApi[]
}

interface IGetAll extends IApiPayload<IPayload> {}
