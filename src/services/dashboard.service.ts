import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/order/my/get`)
  },
}

export default Services
