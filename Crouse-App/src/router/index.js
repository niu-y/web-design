import Vue from 'vue'
import VueRouter from 'vue-router'
import per from "./per"
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//通过require.context实现路由模块拆分
const routes = []
const files  = require.context('./routers',false,/\.router.js$/);
files.keys().forEach(key=>{
  //文件默认导出的内容
    routes.push(...files(key).default)
}) 
const router = new VueRouter({
  routes
})
Object.values(per).forEach(hook=>{
  router.beforeEach(hook.bind(router))
})


export default router
