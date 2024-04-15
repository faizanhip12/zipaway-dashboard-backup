import { Pagination, IApiPayload } from 'src/types/api'

export interface IVariation {
  quantity: number
  affiliate: string
  price: number
}

interface ICategoryFromApi {
  category: CategoryApi
  id: string | any
}

export interface IProduct {
  title: string
  description: string
  first_name: string
  last_name: string
  featured_image: string
  size: string
  categories?: ICategoryFromApi[]
  benifits: string[]
  ingredients: any
  useSteps: string[]
  variations: IVariation[]
  shippingWeight: string
}

export interface ProductApi extends IProduct {
  id: string
  createdAt: Date
  updatedAt: Date
  price: number
  weight: number
}

export interface ProductForm extends Omit<IProduct, ['id', 'createdAt', 'updatedAt']> {}

export type ProductKeys = keyof ProductForm

export interface IPayload {
  pagination: Pagination
  entities: ProductApi[]
}

interface IGetAll extends IApiPayload<IPayload> {}
