import { Pagination, IApiPayload } from 'src/types/api'

interface IAffiliatesFromApi {
  affiliate: AffiliatesApi
}
interface IAffiliate {
  first_name: string
  last_name: string
}
export interface IAffiliates {
  first_name: string
  last_name: string
  phone: string
  email: string
  password: string
  affiliate?: IAffiliate
  referCode: string
}

export interface AffiliatesApi extends IAffiliates {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface AffiliatesForm extends Omit<IAffiliates, ['id', 'createdAt', 'updatedAt']> {}

export type AffiliatesKeys = keyof AffiliatesForm

export interface IPayload {
  pagination: Pagination
  entities: AffiliatesApi[]
}

interface IGetAll extends IApiPayload<IPayload> {}
