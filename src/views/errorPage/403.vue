<style lang="less" scoped>
@import "./403.less";
</style>

<template>
  <div class="error404">
    <div class="error404-body-con">
        <div class="error404-body-con-title">
          4
          0
          3
        </div>
        <p class="error404-body-con-message">
          权&nbsp;&nbsp;限&nbsp;&nbsp;不&nbsp;&nbsp;足
        </p>
        <div class="error404-btn-con">
          <van-button
            @click="backToHome"
            size="small"
            type="primary"
            >返回首页</van-button
          >
          <van-button
            @click="backPage"
            size="small"
            style="margin-left: 40px;"
            type="info"
            >返回上页</van-button
          >
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page403",
  data() {
    return {};
  },
  methods: {
    backToHome() {
      this.$router.push("/home");
    },
    backPage() {
      window.history.back();
    }
  },
  computed: {
    message() {
      return "";
    }
  }
};
</script>
