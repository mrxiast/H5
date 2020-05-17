import { postRequest, getRequest, postRequests } from '@/axios/index'

export const loginApi = (params) => {
  return postRequests('/v1/login', params)
}

export const getUserInfoApi = (params) => {
  return getRequest('/v1/user/getUserInfo', params)
}