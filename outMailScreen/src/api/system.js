//请求后台的方法
import request from "@/request";
export function getUsersByPage(params) {
  return request({
    url: "/user/getUsersByPage",
    method: "get",
    params: params
  });
}

export function adduser(params) {
  return request({
    url: "/user/addUser",
    method: "post",
    params
  });
}

export function delUser(params) {
  return request({
    url: "/user/delUser",
    method: "delete",
    params: params
  });
}

export function updateUser(params) {
  return request({
    url: "/user/updateUser",
    method: "post",
    params: params
  });
}

export function getRolesByPage(params) {
  return request({
    url: "/role/getRolesByPage",
    method: "get",
    params: params
  });
}

export function addRole(params) {
  return request({
    url: "/role/addRole",
    method: "post",
    params: params
  });
}

export function updateRole(params) {
  return request({
    url: "/role/updateRole",
    method: "post",
    params: params
  });
}

export function delRole(params) {
  return request({
    url: "/role/delRole",
    method: "delete",
    params: params
  });
}

export function getMenusByPage(params) {
  return request({
    url: "/menu/getMenusExtendByPage",
    method: "get",
    params: params
  });
}

export function addMenu(params) {
  return request({
    url: "/menu/addMenu",
    method: "post",
    params: params
  });
}

export function updateMenu(params) {
  return request({
    url: "/menu/updateMenu",
    method: "post",
    params: params
  });
}

export function delMenu(params) {
  return request({
    url: "/menu/delMenu",
    method: "delete",
    params: params
  });
}

export function roleAllList() {
  return request({
    url: "/roleAllList",
    method: "get"
  });
}

export function userrole() {
  return request({
    url: "/userrole",
    method: "get"
  });
}

export function menulist() {
  return request({
    url: "/menulist",
    method: "get"
  });
}

export function allMenuList() {
  return request({
    url: "/allMenuList",
    method: "get"
  });
}

export function rolemenu() {
  return request({
    url: "/rolemenu",
    method: "get"
  });
}

//用户关联角色新增
export function addUserIdAndRoleIds(params) {
  return request({
    url: "/user/addUserIdAndRoleIds",
    method: "post",
    params: params
  });
}

//查看关联角色信息
export function getRoleByUserId(params) {
  return request({
    url: "/user/getRoleByUserId",
    method: "get",
    params: params
  });
}

//用户id 查询关联角色id
export function getRoleIdsByUserId(params) {
  return request({
    url: "/user/getRoleIdsByUserId",
    method: "get",
    params: params
  });
}

//新增角色关联菜单

export function addRoleIdAndMenuIds(params) {
  return request({
    url: "/role/addRoleIdAndMenuIds",
    method: "post",
    params: params
  });
}

export function getMenusAll(params) {
  return request({
    url: "/menu/getMenusAll",
    method: "post",
    params: params
  });
}

export function getMenuIdsByRoleId(params) {
  return request({
    url: "/role/getMenuIdsByRoleId",
    method: "post",
    params: params
  });
}

export function getMenuByRoleId(params) {
  return request({
    url: "/role/getMenuByRoleId",
    method: "post",
    params: params
  });
}

//获取登录菜单
export function getMenusByUserId(params) {
  return request({
    url: "/menu/getMenusByUserId",
    method: "post",
    params: params
  });
}

//登录
export function login(params) {
  return request({
    url: "/login/login",
    method: "post",
    params: params
  });
}

//重置密码
export function resetPasswd(params) {
  return request({
    url: "/user/resetPasswd",
    method: "post",
    params: params
  });
}

//修改密码
export function updatePasswd(params) {
  return request({
    url: "/user/updatePasswd",
    method: "post",
    params: params
  });
}
