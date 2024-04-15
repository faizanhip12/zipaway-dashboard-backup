import { Pagination, IApiPayload } from 'src/types/api'
import { IOrder } from 'src/types/apps/order'
import { IProduct, IVariation, ProductApi } from 'src/types/apps/product'
import { IUser } from './user'

interface IComissionsFromApi {
  affiliate: ComissionsApi
}

export interface IComissions {
  orderId: string,
  payment: string,
  status: string,
  affiliate: IUser,
  order: IOrder
  product: ProductApi
  variation: IVariation
}

export interface ComissionsApi extends IComissions {
  id: string,
  createdAt: Date
  updatedAt: Date
}

export interface ComissionsForm extends Omit<IComissions, ['id', 'createdAt', 'updatedAt']> { }

export type ComissionsKeys = keyof ComissionsForm;

export interface IPayload {
  pagination: Pagination;
  entities: ComissionsApi[];
}

interface IGetAll extends IApiPayload<IPayload> { }
