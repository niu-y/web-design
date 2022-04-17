<template>
  <div class="container">
    <div class='content'>
      <router-view></router-view> 
    </div>
     <Footer></Footer>
  </div>
</template>
<script>
    import Footer from "@/components/Footer.vue"
    export default {
      components:{
        Footer
      }
    }
</script>
<style lang="stylus">
  html,body,.container{
    width : 100% 
    height : 100%
    overflow hidden
  }
  .container{
    display: flex
    flex-direction: column
    background: #eee
  }
  .content{
    flex:1
  }
</style>

