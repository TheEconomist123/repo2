//请求后台的方法
import request from "@/request";
//定时任务管理获取列表信息
export function getAllJobsByPage(params) {
  return request({
    url: "/jobs/getAllJobsByPage",
    method: "get",
    params: params
  });
}

//系统管理新增
export function addJob(params) {
  return request({
    url: "/jobs/addJob",
    method: "post",
    params: params
  });
}

//系统管理删除
export function delJob(params) {
  return request({
    url: "/jobs/delJob",
    method: "delete",
    params: params
  });
}

//系统管理修改
export function updateJob(params) {
  return request({
    url: "/jobs/updateJob",
    method: "put",
    params: params
  });
}

//修改状态(禁用)
export function forbidJob(params) {
  return request({
    url: "/jobs/forbidJob",
    method: "get",
    params: params
  });
}

//修改状态(启用)
export function startJob(params) {
  return request({
    url: "/jobs/startJob",
    method: "get",
    params: params
  });
}


