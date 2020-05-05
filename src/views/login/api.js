import { postRequest, getRequest, postRequests } from '@/axios/index'

export const loginApi = (params) => {
  return postRequests('/v1/login', params)
}