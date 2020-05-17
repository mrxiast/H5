import { postRequest, getRequest, postRequests } from '@/axios/index'

export const uploadApi = (params) => {
  return postRequests('/v1/loadImg', params)
}

export const setUserInfoApi = (params) => {
  return postRequests('/v1/user/setUserInfo', params)
}

export const getUserInfoApi = (params) => {
  return getRequest('/v1/user/getUserInfo', params)
}