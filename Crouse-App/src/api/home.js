import axios from "@/utils/http"
import store from "@/store"
//获取轮播图
export  const fetchSlides = ()=>{
    return axios.get('/slides')
}
//获取课程列表
export const fetchLessonList  = (size,offset)=>{
    return axios.request({
        url:`/course/lessonList/${store.state.currentLesson}?size=${size}&offset=${offset}`
    })
}

//获取分类课程
export const fetchCategory = ()=>{
    return axios.request({
        url:'/course/category'
    })
}