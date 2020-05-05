import { postRequest, getRequest, postRequests } from '@/axios/index'

export const resetPasswordApi = (params) => {
  return postRequests('/v1/user/reset', params)
}