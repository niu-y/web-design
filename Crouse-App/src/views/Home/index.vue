<template>
  <div>
    <Header :category = "category" @selectHandler = "selectHandler"></Header>
    <cube-slide :data="slides" />
     <div class="home-title">
        <h2>
          <i class="iconfont icon-zixun-weixuan">课程列表</i>
        </h2>
     </div>
     <div class="home-list">
    <cube-recycle-list class="list" :size="size" :on-fetch="onFetch" :offset="offset" ref="lists">
    <template slot="item" slot-scope="{ data }">
      <div :id="data.id" class="item" >
          <h2>{{data.title}}</h2>
          <img :src="data.pic">
          <p>劲爆价格:{{data.price}}</p>
      </div>
    </template>
  </cube-recycle-list>
  </div>
  </div>
</template>
<script>
import Header from "./Header.vue";
import * as types from "@/store/action-types";
import { mapState, mapActions,mapMutations } from "vuex";
import {fetchLessonList } from "@/api/home.js"
export default {
  data(){
    return {
      size: 5,
      offset: 0,
      hasMore:true
    }
  },
  mounted() {
    this[types.SET_SLIDES]();
    this[types.SET_CATEGORIES]()
  },
  computed: {
    ...mapState(["slides","category"]), //$store.state.slide
  },
  methods: {
    ...mapActions([types.SET_SLIDES,types.SET_CATEGORIES]), // $store.state.dispatch(types.SET_SLIDES)
    ...mapMutations([types.SET_LESSON]),
    async onFetch(){
      const {hasMore,result}  = await fetchLessonList(this.size,this.offset)
      this.hasMore = hasMore;
      this.offset+=result.length
      return result
    },
    selectHandler(value){
     this[types.SET_LESSON](value[0])
     this.hasMore = true;
     this.offset = 0;
     this.$refs.lists.reset()
    }
  },
  components: {
    Header,
  },
};
</script>
<style lang="stylus">
.cube-slide-item img {
  width: 100%;
}

.home-title {
  line-height: 35px;
  padding-left: 20px;
  font-weight: bold;
  font-size:20px
  padding:10px;
 
}
.home-list{
  position: fixed
  top: 200px
  left: 0
  bottom: 46px
  width: 100%
  overflow: auto
}
.item{
  border-radius: 5px;
  margin: 0 20px 20px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;

  img {
    width: 100%;
  }
}
</style>
