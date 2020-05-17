<style lang="less" scoped>
@import './404.less';
</style>

<template>
    <div class="error404">
        <div class="error404-body-con">
            =
            <div class="error404-body-con-title">
                4
                0
                4
            </div>
            <p
                class="error404-body-con-message"
            >页&nbsp;&nbsp;面&nbsp;&nbsp;走&nbsp;&nbsp;丢&nbsp;&nbsp;了</p>
            <div class="error404-btn-con">
                <van-button @click="backToHome" size="small" type="primary">返回首页</van-button>
                <van-button
                    @click="backPage"
                    size="small"
                    style="margin-left: 40px;"
                    type="info"
                >返回上页</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page404',
    data() {
        return {}
    },
    methods: {
        backToHome() {
            this.$store.commit('SET_ACTIVE', 0)
            this.$router.push('/home')
        },
        backPage() {
            window.history.back()
        }
    },
    computed: {
        message() {
            return ''
        }
    }
}
</script>
