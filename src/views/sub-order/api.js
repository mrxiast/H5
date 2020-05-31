import { postRequest, getRequest, postRequests } from '@/axios/index'

export const getDelAddApi = (params) => {//获取默认地址
  return getRequest('/v1/address/defaultAddress', params)
}

export const addOrderApi = (params) => {
  return postRequests('/v1/orders/postOrder', params)
}
