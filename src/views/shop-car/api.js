import { postRequest, getRequest, postRequests } from '@/axios/index'

export const getListoApi = (params) => {
  return getRequest('/v1/shopCar', params)
}