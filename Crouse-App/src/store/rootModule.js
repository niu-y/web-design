import * as types from "./action-types"
import {fetchSlides,fetchCategory} from "@/api/home"
export default {
    state: {
      slides:[],
      currentLesson:-1,
      category:[]
    },
    mutations: {
      [types.SET_SLIDES](state,payload){
        state.slides = payload
      },
      [types.SET_CATEGORIES](state,payload){
        state.category = payload
      },
      [types.SET_LESSON](state,payload){
        state.currentLesson = payload
      }
    },
    actions: {
     async [types.SET_SLIDES]({commit}){
         const slides =  await fetchSlides()
         commit(types.SET_SLIDES,slides)
      },
     async [types.SET_CATEGORIES]({commit}){
        const category = await fetchCategory()
        commit(types.SET_CATEGORIES,category)

     } 
    }
  }