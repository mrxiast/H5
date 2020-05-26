import { postRequest, getRequest, postRequests } from '@/axios/index'

export const getDelAddApi = (params) => {
  return getRequest('/v1/address/defaultAddress', params)
}
