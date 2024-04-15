import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { CustomerForm } from 'src/types/apps/customer'
import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`auth/customers`, { params: query })
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`auth/customers/${id}`)
  },
  add(body: CustomerForm): Promise<AxiosResponse> {
    return requests.post('auth/customers', body)
  },
  update(id: string, body: CustomerForm): Promise<AxiosResponse> {
    return requests.put(`auth/customers/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`auth/customers/${id}`)
  },
  // search({ query }: GetParams): Promise<AxiosResponse> {
  //   return requests.get(`category?${query}`)
  // },

}

export default Services
