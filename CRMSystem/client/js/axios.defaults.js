axios.defaults.baseURL='http://127.0.0.1:9999';
axios.defaults.withCredentials=true;
axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded';
axios.defaults.transformRequest=function(data){
    if(!data)return data;
    let result=``;
    for(let attr in data){
        if(!data.hasOwnProperty(attr)) break;
        result+=`&${attr}=${data[attr]}`;
    }
    return result.substring(1);
};
//响应拦截器
axios.interceptors.response.use(function onFulfilled(response){
    //说明能从服务器正常获取数据，但是数据不一定是我们想要的 状态码一定是 2|3开头
    return response.data;
},function onRejected(reason){
    //不能从服务器正常获取到数据(状态码：^4|5),这类错误我们是统一在响应拦截器中进行处理即可
    //console.dir(reason)=>reason={response:{status:404},message:'xxx',....}
    if(reason.response){
        //reason.response为true的话，收到服务器的反馈(最起码连接上服务器了)
        switch(String(reason.response.status)){
            case '404':
                alert('小主，当前请求地址不存在~~');
                break;
        }
    }else{
        //服务器都没有链接上(断网了)
        //alert('当前的网络中断，请来接网络后刷新页面重试！');
    }
    return Promise.reject(reason);
});
axios.defaults.validateStatus=function(status){
    return /^(2|3)\d{2}$/.test(status);
}