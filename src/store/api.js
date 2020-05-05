import {
  postRequest,
  getRequest,
  postRequests,
  postRequestJson
} from "@/axios";

export function fetchPermission(params) {
  return getRequest("/v1/routers",params);
}
