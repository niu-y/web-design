//对axios进行封装处理 让各个实例之间互相独立
import axios from "axios"
import { Toast } from "cube-ui"
class Http {
    constructor() {
        this.timeout = 3000;
        this.baseURL = process.env.NODE_ENV == "development" ? "http://localhost:8000" : '/'
        this.queue = {} //放请求队列
    }
    mergeOptions(options) {
        return {
            timeout: this.timeout,
            baseURL: this.baseURL,
            ...options
        }
    }
    setInterceptor(instance, url) {
        //请求拦截
        instance.interceptors.request.use((config) => {
            if (Object.keys(this.queue).length == 0) { //没有请求过
                this.toast = Toast.$create({
                    time: 0,
                    txt: '正在加载中'
                }).show()
            }
            config.headers.token = localStorage.getItem('token') || ""
            this.queue[url] = url
            return config
        },err=>{
            return Promise.reject(err.data)
        })
        //响应拦截
        instance.interceptors.response.use((res) => {
                delete this.queue[url]
                if (Object.keys(this.queue).length == 0){
                    this.toast.hide()
                }
                if(res.data.code == 0){
                    return res.data.data
                }else{
                   return  Promise.reject(res.data)
                }
        },err=>{
            return Promise.reject(err.data)
        })
    }
    request(options) {
        const opts = this.mergeOptions(options);
        const axiosInstance = axios.create();//axios()
        //当调用request时会创建一个axios实例，并给这个实例传入配置项
        this.setInterceptor(axiosInstance,opts.url)
        return axiosInstance(opts)
    }
    get(url,config = {}){ // params
        return this.request({
            url,
            method:'get',
            ...config
        })
    }
    post(url,data){  // data
        // 对data进行格式化
        return this.request({
            method:'post',
            url,
            data
        })
    }
}
export default new Http()