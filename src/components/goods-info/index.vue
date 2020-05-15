<template>
    <div class="box">
        <div>
            <div class="banner">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item
                        v-for="(item,index) in banners"
                        :key="index"
                        @click="lookImg(item)"
                    >
                        <img :src="item" alt />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="title">
                <div class="title_top">
                    <div class="title_top_left">
                        <div class="goodsTitle">北欧风简约四角柜子原木深白色给你极致的生活体验</div>
                        <div class="titleAdd">简约风格的街头感 潮流搭配</div>
                    </div>
                    <div class="title_top_right">
                        <div class="shareBtn" @click="shares">
                            <div class="icons">
                                <img src="../../static/goodsInfo/share.png" alt />
                            </div>
                            <div>分享</div>
                        </div>
                    </div>
                </div>
                <div class="price">￥699</div>
            </div>
            <div class="discount">
                <div class="card">
                    <div class="yuanLeft"></div>
                    <div class="con_tents">满999减100券</div>
                    <div class="yuanRight"></div>
                </div>
                <div class="card">
                    <div class="yuanLeft"></div>
                    <div class="con_tents">满999减100券</div>
                    <div class="yuanRight"></div>
                </div>
                <div class="getMore" @click="getMoreCard">
                    立即领取
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="selectItem" @click="selectSku">
                <span>请选择：</span>
                <span class="green">颜色、尺码</span>
                <span style="margin-left:200px;font-weight:700;">···</span>
            </div>
            <div class="goodInfo">
                <div class="goodBox">
                    <div class="infoItem">
                        <div class="infoTitle">品牌：</div>
                        <div class="infoContent">YASAKO</div>
                    </div>
                    <div class="infoItem">
                        <div class="infoTitle">发货地：</div>
                        <div class="infoContent">上海</div>
                    </div>
                    <div class="infoItem">
                        <div class="infoTitle">物流：</div>
                        <div class="infoContent">顺丰、中通及圆通</div>
                    </div>
                    <div class="infoItem">
                        <div class="infoTitle">发货时间：</div>
                        <div class="infoContent">付款后48小时</div>
                    </div>
                    <div class="infoItem">
                        <div class="infoTitle">售后：</div>
                        <div class="infoContent">签收后24小时内联系克服</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="showImgs">
            <img v-for="(item,index) in banners" :key="index" :src="item" alt />
        </div>
        <van-share-sheet
            @select="onSelect"
            v-model="showShare"
            :options="options"
            title="立即分享给好友"
            description="描述信息"
        />
        <div style="height:50px;"></div>
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="goCar" />
            <van-goods-action-button type="warning" text="加入购物车" @click="onAddCar" />
            <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
        </van-goods-action>
    </div>
</template>

<script>
import {ImagePreview} from 'vant'
export default {
    components: {},
    data() {
        return {
            goodId: '',
            showShare: false,
            banners: [
                require('../../static/goodsInfo/zz.jpg'),
                require('../../static/goodsInfo/zz.jpg'),
                require('../../static/goodsInfo/zz.jpg'),
                require('../../static/goodsInfo/zz.jpg')
            ],
            options: [
                {name: '微信', icon: 'wechat'},
                {name: '微博', icon: 'weibo'},
                {name: '复制链接', icon: 'link'},
                {name: '分享海报', icon: 'poster'},
                {name: '二维码', icon: 'qrcode'}
            ]
        }
    },
    mounted() {
        this.goodId = this.$route.query.id
        // console.log(this.$route.query.id)
    },
    methods: {
        shares() {
            this.showShare = true
        },
        onSelect(option) {
            console.log(option)
            this.showShare = false
        },
        goCar() {
            this.$router.push('/shopCar')
        },
        //点击购买，调用父组件方法
        onClickButton() {
            this.$emit('fun')
        },
        //选择sku
        selectSku() {
            this.$emit('select')
        },
        //点击加入购物车，调用父组件方法
        onAddCar() {
            this.$emit('onAddCar')
        },
        lookImg(item) {
            ImagePreview([item])
        },
        getMoreCard() {
            console.log('123')
            this.$router.push({path: '/receiveCoupon', query: {id: this.goodId}})
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
