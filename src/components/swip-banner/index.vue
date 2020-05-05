<template>
  <div class="container">
    <van-swipe :autoplay="3000">
  <van-swipe-item v-for="(image, index) in images" :key="index">
    <img v-lazy="image" />
  </van-swipe-item>
</van-swipe>
  </div>
</template>

<script>
export default {
  name: "swip-banner",
  props:{
      images:{
          type:Array,
          dafault(){
              return []
          }
      }
},
  data(){
    return{
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
