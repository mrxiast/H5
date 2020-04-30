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
import { encrypt } from "../../utils/cryptoAes";
export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    login() {
      console.log(encrypt(this.password));
    }
  }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
