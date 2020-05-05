<template>
  <div class="container">
      <img :src="discountImg" alt="">
  </div>
</template>

<script>
export default {
  name: "grid",
  props:{
      discountImg:{
          type:String,
          dafault(){
              return ''
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
