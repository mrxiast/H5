<template>
    <div class="container">
        <div>
            <van-nav-bar :title="pageTile" @click-right="onClickRight">
                <template #right>
                    <van-icon name="wap-home-o" size="20" />
                </template>
            </van-nav-bar>
        </div>
        <div>
            <myWaterfall :id="id" :keyWord="keyWord"></myWaterfall>
        </div>
    </div>
</template>
<script>
import myWaterfall from '../../components/my-waterfall/index'

export default {
    components: {
        myWaterfall
    },
    data() {
        return {
            showLoading: false,
            itemType: '',
            keyWord: '',
            pageTile: '',
            id: ''
        }
    },
    mounted() {
        this.pageTile = this.$route.query.name
        this.id = this.$route.query.id
        console.log(this.id, '0000')
    },
    methods: {
        onClickRight() {
            this.$store.state.active = 0
            this.$router.push('/home')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>