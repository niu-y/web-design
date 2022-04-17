<template>
  <div class="footer">
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @change="changeHandler"
    >
    </cube-tab-bar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedLabelDefault: '/',
      tabs: [{
        label: '首页',
        value:'/',
        icon: 'iconfont icon-shouye1'
      }, {
        label: '我的课程',
        value:'/course',
        icon: 'iconfont icon-course'
      }, {
        label: '个人中心',
        value:'/profile',
        icon: 'iconfont icon-icon-emoji'
      }]
    }
  },
  methods: {
    changeHandler (value) {
        this.$router.push(value)
    }
  },
  watch:{
      $route:{
          handler(to,from){
             this.selectedLabelDefault  = to.path
          },
          immediate:true  
      }
  }

}
</script>
<style lang = "stylus" scoped>
    .footer{
        background #f2f2f2
    }
</style>