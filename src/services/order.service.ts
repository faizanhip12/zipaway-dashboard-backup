import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { IOrderForm } from 'src/types/apps/order'

import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/order`, { params: query })
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/order/${id}`)
  },
  add(body: IOrderForm): Promise<AxiosResponse> {
    return requests.post('/order', body)
  },
  update(id: string, body: IOrderForm): Promise<AxiosResponse> {
    return requests.put(`order/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`order/${id}`)
  },
}

export default Services
