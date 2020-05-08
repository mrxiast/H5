<template>
    <div class="container" @click="goRoad">
        <div class="title">
            时尚街区
            <br />『怎么穿』不发愁
        </div>
        <div class="content">多篇穿搭心得，教你正确运用自己衣柜的基础款</div>
        <div class="img">
            <img :src="dressData.imgUrl" alt />
        </div>
        <div class="clickTxt">点击查看</div>
    </div>
</template>

<script>
export default {
    name: 'grid',
    props: {
        dressData: {
            type: Object,
            dafault: () => {},
            require: true
        }
    },
    data() {
        return {}
    },
    methods: {
        goRoad() {
            console.log('88888')
            this.$router.push('/fashionRoad')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
