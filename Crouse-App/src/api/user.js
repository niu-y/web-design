import axios from "@/utils/http"
//登录 
export const fetchUser = (user)=>{
    return axios.request({
        url:'/user/login',
        method:'post',
        data:user
    })
}
//验证是否登录
export const validateUser = ()=>{
    return axios.request({
        url:'/user/validate'
    })
}