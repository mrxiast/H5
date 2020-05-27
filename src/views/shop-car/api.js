import { postRequest, getRequest, postRequests } from '@/axios/index'
//获取默认列表
export const getListoApi = (params) => {
  return getRequest('/v1/shopCar', params)
}
//删除购物车商品
export const delApi = (params) => {
  return postRequests('/v1/shopCar/delItem', params)
}