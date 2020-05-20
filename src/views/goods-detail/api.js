import { postRequest, getRequest, postRequests } from '@/axios/index'


export const getGoodsListApi = (params) => {
  return getRequest('/v1/itemize/goodsList', params)
}

export const getGoodsIngoApi = (params) => {
  return getRequest('/v1/itemize/getGoodsInfo', params)
}

