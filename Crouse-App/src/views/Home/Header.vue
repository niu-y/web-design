<template>
  <div class="headerBox">
    <img src="@/assets/images/logo.png" class="logo" />
    <slot></slot>
    <span class="iconfont icon-caidan" @click="show"></span>
    <cube-drawer
  ref="drawer"
  title="请选择"
  :data="categories"
  @select="selectHandler"
  ></cube-drawer>
  </div>
</template>
<script>
  export default {
    props:{
      category:{
        type:Array,
        default:()=>[]
      }
    },
    computed:{
          categories(){
            const defalutCategory = [{'text':'全部课程',value:-1}];
            return this.category.length>0?[[...defalutCategory,...this.category]]:[defalutCategory]
          }
      },
    methods:{
      show(){
        this.$refs.drawer.show()
      },
      selectHandler(value){
        console.log(value);
        this.$emit('selectHandler',value)
      }
    }
  }
</script>
<style lang="stylus" scoped>
.headerBox {
  height: 56px;
  line-height: 56px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background: #2a2a2a;
  color: #fff;
}

.logo {
  width: 100px;
}
</style>