<template>
    <div class="container">
        <div class="content">
            <div class="top">
                <div class="order-num">
                    订单编号
                    <span class="num-txext">{{itemData.orderNum}}</span>
                </div>
                <div class="red-text" v-if="itemData.status == 1">已完成</div>
                <div class="red-text" v-if="itemData.status == 2">待发货</div>
                <div class="red-text" v-if="itemData.status == 3">待收货</div>
                <div class="red-text" v-if="itemData.status == 4">待评价</div>
            </div>
            <div class="middle">
                <GoodTemplate :goodData="itemData"></GoodTemplate>
            </div>
            <div class="bottom">
                <div class="acount">共{{itemData.amount}}件商品</div>

                <div class="center">
                    <div class="rea-price">
                        <span>实付</span>
                    </div>
                    <div class="rea-price">
                        <span class="num">￥{{itemData.relPrice}}</span>
                    </div>
                </div>

                <div class="btn">再来一单</div>
            </div>
        </div>
    </div>
</template>
<script>
import GoodTemplate from '../../components/goods-template/index'
export default {
    props: {
        itemData: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        GoodTemplate
    },
    data() {
        return {}
    },
    mounted() {}
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>