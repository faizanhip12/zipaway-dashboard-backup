import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { ProductForm } from 'src/types/apps/product'
import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/product`, { params: query })
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/product/${id}`)
  },
  add(body: ProductForm): Promise<AxiosResponse> {
    return requests.post('/product', body)
  },
  update(id: string, body: ProductForm): Promise<AxiosResponse> {
    return requests.put(`product/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`product/${id}`)
  }
}

export default Services
