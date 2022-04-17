<template>
  <div>
    <Header>登录</Header>
    <img src="@/assets/images/login_bg.png" class="login-img" />
    <div class="login-form">
      <cube-form :model="model" @submit="submitHandler">
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-button type="submit">登录</cube-button>
        </cube-form-group>
        <cube-form-group>
          <cube-button type="reset">注册</cube-button>
        </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header"
import * as types from '@/store/action-types'
import {createNamespacedHelpers} from 'vuex'
const {mapActions}  = createNamespacedHelpers('user')
export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      fields: [
        {
          type: "input",
          modelKey: "username",
          label: "账号",
          props: {
            placeholder: "请输入账号",
          },
          rules: {
            required: true,
          },
        },
        {
          type: "input",
          modelKey: "password",
          label: "密码",
          props: {
            placeholder: "请输入密码",
          },
          rules: {
            required: true,
          },
        },
      ],
    };
  },
  components: {
    Header,
  },
  methods:{
    ...mapActions([types.SET_LOGIN]),
   async submitHandler(){
     try{
        await this[types.SET_LOGIN](this.model)
        if(this.$route.query.from){  //跳转之前的路径
          this.$router.push(this.$route.query.from)
        }else{
          this.$router.push('/profile')
        }
     }catch(e){
       console.log(e)
     }
    }
  }
  
};
</script>
<style lang="stylus" scoped>
.login {
  &-img {
    width: 80px;
    margin: 50px auto;
    display: block;
  }

  &-form {
    width: 80%;
    margin: 0 auto;
  }

  .cube-btn {
    margin-bottom: 10px;
  }
}
</style>

