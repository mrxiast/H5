<template>
  <div class="box">
    <div class="content">
      <div class="title">重置密码</div>
      <div class="form">
        <van-row>
          <van-col span="24" class="borderBtm">
            <van-field v-model="username" name="用户名" label="*用户名" placeholder="请填写用户名" />
          </van-col>
          <van-col span="16" class="borderBtm">
            <van-field v-model="phone" name="手机号" label="*手机号" placeholder="请填写手机号" />
          </van-col>
          <van-col :span="8">
            <van-button
              :disabled="showTime"
              @click="getCode"
              type="primary"
              style="height:44px;font-size:12px;width:100px;"
            >{{ txtVal }}</van-button>
          </van-col>
          <van-col span="24" class="borderBtm">
            <van-field v-model="code" name="验证码" label="*验证码" placeholder="请填写验证码" />
          </van-col>
          <van-col span="24" class="borderBtm">
            <van-field
              type="password"
              v-model="newpassword1"
              name="新密码"
              label="*新密码"
              placeholder="请填写新密码"
            />
          </van-col>
          <van-col span="24" class="borderBtm">
            <van-field
              type="password"
              v-model="newpassword2"
              name="确认新密码"
              label="*确认新密码"
              placeholder="请再次填写新密码"
            />
          </van-col>
          <van-col span="24">
            <van-button style="margin-top:0.5rem;" type="info" @click="submit">确认修改</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      code: "",
      newpassword1: "",
      newpassword2: "",
      phone: "",
      num: 60,
      showTime: false,
      txtVal: "验证码"
    };
  },
  methods: {
    validator(val) {
      return /^1[3456789]\d{9}$/.test(val);
      // return /1\d{10}/.test(val);
    },
    submit() {
      if (!this.username.trim()) {
        this.$toast("用户名有误");
        return;
      }
      if (!this.code) {
        this.$toast("验证码有误");
        return;
      }
      if (!this.newpassword1) {
        this.$toast("新密码不能为空");
        return;
      }
      if (!this.newpassword2) {
        this.$toast("确认新密码不能为空");
        return;
      }
      if (this.newpassword1 !== this.newpassword2) {
        this.$toast("两次密码不一致");
        return;
      }
    },
    getCode() {
      let that = this;
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$toast.fail("电话号有误");
        return;
      }
      this.showTime = true;
      let timer = setInterval(function() {
        that.num--;
        that.txtVal = "再次获取" + that.num;
        console.log(that.num);
        if (that.num <= 0) {
          that.txtVal = "验证码";
          that.num = 60;
          that.showTime = false;
          window.clearInterval(timer);
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
