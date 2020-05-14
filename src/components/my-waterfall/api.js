import { postRequest, getRequest, postRequests } from '@/axios/index'

export const getListApi = (url, params) => {
  return getRequest(url, params)
}