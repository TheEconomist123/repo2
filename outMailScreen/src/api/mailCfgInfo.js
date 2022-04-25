
//请求后台的方法
import request from "@/request";


export function getMailCfgInfoByPage(data) {
    return request({
        url: "/mail/getMailCfgInfoByPage",
        method: "post",
        data
    });
}

export function updateMailCfgInfo(data) {
    return request({
        url: "/mail/updateMailCfgInfo",
        method: "post",
        data
    });
}

export function updateMailCfgImg(data) {
    return request({
        url: "/mail/updateMailCfgImg",
        method: "post",
        data
    });
}

export function getImgById(params) {
    return request({
        url: "/mail/getImgById",
        method: "post",
        responseType:'blob',
        params
    });
}



export function checkSendMail(data) {
    return request({
        url: "/mail/checkSendMail",
        method: "post",
        data
    });
}





export function getPreviewImgById(params) {
    return request({
        url: "/mail/getPreviewImgById",
        method: "post",
        responseType:'blob',
        params
    });
}




