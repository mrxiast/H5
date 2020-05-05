<template>
  <div class="box">
    <div class="content">
      <div class="title">街区登录</div>
      <div class="login">
        <van-form @submit="login">
          <van-field
            v-model="userName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button block type="info" native-type="submt">登录</van-button>
          </div>
        </van-form>
      </div>
      <div>
        <router-link to="/register">注册账号</router-link>&nbsp;|&nbsp;
        <router-link to="/reset-password">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { encrypt } from "../../utils/cryptoAes";
import {loginApi} from './api'
import {Notify} from "vant"
export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    login() {
      let that = this
      let data = {
        username:this.userName,
        password:encrypt(this.password),
        type:"101"
      }
      loginApi(data).then(res=>{
        if(res.code === 200){
          var inFifteenMinutes = new Date(new Date().getTime() + 6 * 60 * 60 * 1000*1000);
          Cookies.set("token",res.token,{ expires: inFifteenMinutes})
          Notify({ type: 'success', message: '登陆成功' })
          
          this.$router.push('/home')
        }
      })
      setTimeout(function(){
        // Cookies.set('token', encrypt(this.password));
        // that.$router.push('/home')
      },500)
    }
  }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
