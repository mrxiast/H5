import { postRequest, getRequest, postRequests } from '@/axios/index'

export const getCodeApi = (params) => {
  return getRequest('/v1/user/getCode', params)
}

export const registerApi = (params) => {
  return postRequests('/v1/user/register', params)
}