//请求后台的方法
import request from "@/request";

export function getStaffInfoByPage(data) {
  return request({
    url: "/staff/getStaffInfoByPage",
    method: "post",
    data
  });
}

export function addStaffInfo(data) {
  return request({
    url: "/staff/addStaffInfo",
    method: "post",
    data
  });
}

export function delStaffInfo(params) {
  return request({
    url: "/staff/delStaffInfo",
    method: "delete",
    params: params
  });
}

export function updateStaffInfo(data) {
  return request({
    url: "/staff/updateStaffInfo",
    method: "post",
	data
  });
}



export function saveExcelData(data) {
  return request({
    url: "/staff/saveExcelData",
    method: "post",
    data
  });
}




export function getExcelModel(params) {
  return request({
    url: "/staff/getExcelModel",
    method: "post",
    responseType:'blob',
    params
  });
}

