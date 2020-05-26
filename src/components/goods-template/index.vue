<template>
    <div class="container">
        <div class="l-img">
            <img :src="goodData.imgUrl" alt />
        </div>
        <div class="middle">
            <div class="mid-title">{{goodData.name}}</div>
            <div class="mid-con">
                <span v-for="(item,index) in goodData.sku" :key="item.id">{{item.value}}</span>
            </div>
        </div>
        <div class="price">
            <div class="price-title">￥{{goodData.price}}</div>
            <div class="acount">x {{goodData.payNum}}</div>
        </div>
    </div>
</template>
<script >
export default {
    props: {
        goodData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {}
    },
    methods: {}
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>>