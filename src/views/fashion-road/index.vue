<template>
    <div class="container">
        <div class="bgcolor">
            <img :src="bgImg" alt />
        </div>
        <div style="height:100px;"></div>
        <div>
            <FashionTemplate></FashionTemplate>
        </div>
    </div>
</template>
<script>
import FashionTemplate from '../../components/fashion-template/index'
export default {
    components: {
        FashionTemplate
    },
    data() {
        return {
            bgImg: require('../../static/fashionbg.jpg')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>