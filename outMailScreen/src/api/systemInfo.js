//请求后台的方法
import request from "@/request";

export function getSystemInfosByPage(data) {
  return request({
    url: "/systemInfo/getSystemInfoByPage",
    method: "post",
    data
  });
}

export function addSystemInfo(data) {
  return request({
    url: "/systemInfo/addSystemInfo",
    method: "post",
    data
  });
}

export function delSystemInfo(params) {
  return request({
    url: "/systemInfo/delSystemInfo",
    method: "delete",
    params: params
  });
}

export function updateSystemInfo(data) {
  return request({
    url: "/systemInfo/updateSystemInfo",
    method: "post",
	data
  });
}
