import { postRequest, getRequest, postRequests } from '@/axios/index'

export const getMyAddressApi = (params) => {
  return postRequests('/v1/address/myAddress', params)
}

export const setDefaultAddressApi = (params) => {
  return postRequests('/v1/address/setDefaultAddress', params)
}

export const setAddressApi = (params) => {
  return postRequests('/v1/address/setAddress', params)
}

export const delAddressApi = (params) => {
  return postRequests('/v1/address/delAddress', params)
}

export const addAddressApi = (params) => {
  return postRequests('/v1/address/addAddress', params)
}