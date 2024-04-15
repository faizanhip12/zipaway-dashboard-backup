import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { AffiliatesForm } from 'src/types/apps/affiliates'
import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/auth/affiliates`, { params: query })
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/auth/users/${id}`)
  },
  add(body: AffiliatesForm): Promise<AxiosResponse> {
    return requests.post('/auth/affiliate', body)
  },
  update(id: string, body: AffiliatesForm): Promise<AxiosResponse> {
    return requests.put(`auth/affiliates/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`auth/users/${id}`)
  },
  // search({ query }: GetParams): Promise<AxiosResponse> {
  //   return requests.get(`auth/affiliates?${query}`)
  // },

}

export default Services
