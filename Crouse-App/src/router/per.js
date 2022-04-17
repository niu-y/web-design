import store from "@/store"
import * as types from "@/store/action-types"
export default {
    validateLogin :async (to,from,next)=>{
        if(!store.state.user.hasPermission){
            try{
                await store.user.dispatch(VALIDATE_USER)
                if(to.name =="login"){
                    next('/')
                }else{
                    next()
                }
            }catch(e){
               const needLogin  = to.matched.some(item=>item.meta.needLogin) 
               if(needLogin){
                   next('/login')
               }else{
                   next();
               }
            }
        }else{
            next()
        }        
    }
}