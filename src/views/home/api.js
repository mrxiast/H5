import { postRequest, getRequest, postRequests } from '@/axios/index'


export const getBannerListApi = (params) => {
  return getRequest('/v1/img/ImgByType', params)
}