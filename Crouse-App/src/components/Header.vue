<template>
    <div class="headerBox">
       <i class="iconfont icon-back1" @click="back"></i> 
        <slot></slot>
    </div>
</template>
<script>
    export default {
       methods:{
           back(){
              this.$router.back() 
           }
       } 
    }
</script>
<style scoped lang="stylus">
    .headerBox{
        height 56px
        line-height 56px
        background: #2a2a2a
        text-align: center
        color:#fff
        .iconfont{
            position: absolute
            left 15px
            font-size:22px
        }
    }
</style>