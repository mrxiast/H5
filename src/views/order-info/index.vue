<template>
    <div class="container">
        <div class="isAddress">
            <div class="name-phone">
                <van-icon name="location-o" size="15" color="#147658" />
            </div>
            <div class="address-info">
                <div class="title">瓜娃子 15233334444</div>
                <div class="content">河南省珍珠港后是是拿给去</div>
            </div>
            <div class="icon-small">
                <img :src="iconUrl" alt />
            </div>
        </div>
        <div class="num_date">
            <div class="top-bot">
                <div class="txt">订单编号</div>
                <div class="num">12345789</div>
            </div>
            <div class="top-bot">
                <div class="txt">下单时间</div>
                <div class="num">2020/05/05 12:30:22</div>
            </div>
        </div>
        <div class="contents">
            <div class="con-item">
                <GoodTemplate :goodData="goodData"></GoodTemplate>
            </div>
        </div>
        <div class="amount">
            <div class="amount-txt">
                <span class="txts">实付</span>
                <span class="nums">￥199</span>
            </div>
        </div>
    </div>
</template>
<script>
import GoodTemplate from '../../components/goods-template/index'
export default {
    components: {
        GoodTemplate
    },
    data() {
        return {
            iconUrl: '',
            goodData: {
                id: '001',
                status: 1, //1已完成 2待发货 3待收货 4待评价
                orderNum: '375161945907281',
                imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg',
                title: '北欧简约立式台灯',
                amount: 2,
                price: 198,
                sku: [
                    {name: '颜色', value: '黑色', id: 'black'},
                    {name: '类型', value: '圆领', id: 'yl'},
                    {name: '尺码', value: 'M165', id: '165'}
                ],
                relPrice: 150
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            switch (this.goodData.status) {
                case 1:
                    this.iconUrl = require('../../static/orders/ywc.png')
                    break
                case 2:
                    this.iconUrl = require('../../static/orders/dfh.png')
                    break
                case 3:
                    this.iconUrl = require('../../static/orders/dsh.png')
                    break
                default:
                    this.iconUrl = require('../../static/orders/dsh.png')
                    break
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>