
//请求后台的方法
import request from "@/request";

export function getMailSendLogInfoByPage(data) {
    return request({
        url: "/log/getMailSendLogInfoByPage",
        method: "post",
        data
    });
}



//下载图片

export function getImgById(params) {
    return request({
        url: "/log/getImgById",
        method: "post",
        responseType:'blob',
        params
    });
}