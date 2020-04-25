<template>
  <el-card class="elCardMargin">
    <router-view class="content"></router-view>
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "./content.less";
</style>
