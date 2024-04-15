import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/types/api'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/contact`, { params: query })
  }
}

export default Services
