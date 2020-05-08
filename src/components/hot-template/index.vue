<template>
    <div class="box" @click="goInfo">
        <div class="left">
            <img :src="dataInfo.imgUrl" alt />
            <div class="hot-icon" v-if="imgUrl">
                <img :src="imgUrl" alt />
            </div>
        </div>
        <div class="right">
            <div class="title">
                <div class="big-title">{{dataInfo.title}}</div>
                <div class="count">销量 {{dataInfo.number}}</div>
            </div>
            <div class="price">
                <div class="price_num">￥{{dataInfo.price}}</div>
                <div class="get-btn">立即购买</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        reorder: {
            type: Number,
            default: 0
        },
        dataInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            imgUrl: ''
        }
    },
    mounted() {
        switch (this.reorder) {
            case 0:
                this.imgUrl = require('./imgs/jin.png')
                break
            case 1:
                this.imgUrl = require('./imgs/yin.png')
                break
            case 2:
                this.imgUrl = require('./imgs/tong.png')
                break
            default:
                this.imgUrl = ''
                break
        }
    },
    methods: {
        goInfo() {
            this.$router.push('/goodsDetail')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>