<template>
  <div class="container">
      <img :src="weekTtitle" alt="">
      
      <div class="newItems_box">
          <div style="" v-for="item in 7" :key="item" class="newItems">
              <img style="width:80px;height:80px;" src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="">
              <div>
                  <span class="green-price">￥109</span>
                  <br/>
                  <span class="good">好评率 99.9%</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "grid",
  props:{
      weekTtitle:{
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
