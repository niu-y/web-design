import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from "./rootModule"
Vue.use(Vuex)
//统一处理子状态
const files = require.context('./modules',false,/\.js$/);
//files.keys()  ['./course.js','./user.js']拿到所有匹配的文件路径
files.keys().forEach(key=>{
   const store =  files(key).default  //获取default内容
   const moduleName = key.replace(/\.\//,'').replace(/\.js/,'');
   const module = rootModule.modules = (rootModule.modules|| {})
   module[moduleName] = store
   module[moduleName].namespaced = true //加上命名空间名称
})
export default new Vuex.Store(rootModule)
