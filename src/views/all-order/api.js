import { postRequest, getRequest, postRequests } from '@/axios/index'


export const getListApi = (params) => {
  return getRequest('/v1/orders/getOrderList', params)
}
