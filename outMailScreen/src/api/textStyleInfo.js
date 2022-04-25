//请求后台的方法
import request from "@/request";


export function getTextStyleByPage(data) {
    return request({
        url: "/text/getTextStyleByPage",
        method: "post",
        data
    });
}


export function updateTextStyleInfo(data) {
    return request({
        url: "/text/updateTextStyleInfo",
        method: "post",
        data
    });
}



