<template>
  <div style="height:100%;">
  <van-nav-bar 
    title="街区之家" 
    left-text="返回" 
    left-arrow 
    @click-left="onClickLeft"
    @click-right="onClickRight">
    <template #right>
      <van-icon name="wap-home-o" size="20"/>
    </template>
  </van-nav-bar>
      <router-view />
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="points">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:0
    }
  },
  methods:{
    onClickLeft(){
      console.log('left')
    },
    onClickRight(){
      console.log('onClickRight')
    }
  }
};
</script>

<style lang="less" scoped>
  .nav{
    width:100%;
    height:1.5rem;
    position:absolute;
    left:0;
    top:0;
    background-color: #fff;
    box-shadow: 2px 2px 10px #eee
  }
</style>