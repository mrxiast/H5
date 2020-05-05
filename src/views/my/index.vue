<template>
  <div class="box">
      <button @click="exit"> 退出</button>
      <van-dialog @cancel="cancel" @confirm="isOk" v-model="showExitModal" title="退出" show-cancel-button>
        确定退出此账号
      </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
        showExitModal:false
    }
  },
  methods: {
      exit(){
          this.showExitModal = true
      },
      cancel(){
          this.showExitModal = false
      },
      isOk(){
          this.$store.commit('LOGIN_OUT')
          this.$router.push('/login')
      }
  }
}
</script>
<style lang="less" scoped>
</style>
