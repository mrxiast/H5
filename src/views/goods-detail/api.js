import { postRequest, getRequest, postRequests } from '@/axios/index'


export const getGoodsListApi = (params) => {
  return getRequest('/v1/itemize/goodsList', params)
}

export const getGoodsIngoApi = (params) => {
  return getRequest('/v1/itemize/getGoodsInfo', params)
}

export const addCartApi = (params) => {
  return postRequests('/v1/shopCar/addCart', params)
}
