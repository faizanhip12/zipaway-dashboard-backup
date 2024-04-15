import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { ComissionsForm } from 'src/types/apps/comissions'
import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/commission`, { params: query })
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/commission/${id}`)
  },
  add(body: ComissionsForm): Promise<AxiosResponse> {
    return requests.post('/auth/affiliate', body)
  },
  update(id: string, body: ComissionsForm): Promise<AxiosResponse> {
    return requests.put(`commission/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`commission/${id}`)
  },
  // search({ query }: GetParams): Promise<AxiosResponse> {
  //   return requests.get(`commission?${query}`)
  // },

}

export default Services
