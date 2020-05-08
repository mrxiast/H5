<template>
    <div class="container">
        <div class="item-box">
            <div class="item-left">
                <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt />
                <div class="sel-box"></div>
            </div>
            <div class="item-right">
                <div class="top">
                    <div class="title">百搭流行短袖</div>
                    <div class="item-info">黑色 圆领 M（165）</div>
                </div>
                <div class="bottom">
                    <div class="price">￥199</div>
                    <div class="count">
                        <div @click="reduce">-</div>
                        <div class="count-num">1</div>
                        <div @click="add">+</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    methods: {
        reduce() {
            console.log('-1')
        },
        add() {
            console.log('+1')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>