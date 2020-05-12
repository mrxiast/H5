<template>
    <div style="height:100%;">
        <van-nav-bar title="街区之家" left-arrow @click-left="onClickLeft" @click-right="onChange(0)">
            <template #right>
                <van-icon name="wap-home-o" size="20" />
            </template>
        </van-nav-bar>
        <div>
            <router-view />
            <div style="height:60px;"></div>
        </div>

        <van-tabbar v-model="active" @change="onChange">
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
            active: this.$store.state.active
        }
    },
    mounted() {},
    methods: {
        onClickLeft() {
            window.history.back()
        },
        onClickRight() {
            this.$router.push('/home')
        },
        onChange(e) {
            if (e === 0) {
                this.active = 0
            }
            this.$store.commit('SET_ACTIVE', this.active)
            console.log(this.$store.state.active, 'this.$store.state.active')
            switch (this.$store.state.active) {
                case 0:
                    this.$router.replace('/home')
                    break
                case 1:
                    this.$router.replace('/classification')
                    break
                case 2:
                    this.$router.replace('/shopCar')
                    break
                case 3:
                    this.$router.replace('/my')
                    break
            }
        }
    }
}
</script>

<style lang="less" scoped>
.nav {
    width: 100%;
    height: 1.5rem;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    box-shadow: 2px 2px 10px #eee;
}
</style>