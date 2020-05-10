<template>
    <div class="container">
        <div>
            <van-nav-bar
                :title="pageTile"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #right>
                    <van-icon name="wap-home-o" size="20" />
                </template>
            </van-nav-bar>
        </div>
        <div class="select-address">
            <div class="select-box" v-if="!$store.state.nowAddress" @click="goAddress">
                <div class="box">
                    <van-icon name="location-o" size="15" color="#147658" />
                    <span>选择地址</span>
                </div>
            </div>
            <div v-else class="isAddress" @click="goAddress">
                <div class="name-phone">
                    <van-icon name="location-o" size="15" color="#147658" />
                </div>
                <div class="address-info">
                    <div class="title">瓜娃子 15233334444</div>
                    <div
                        class="content"
                    >{{$store.state.nowAddress.curAddress}} {{$store.state.nowAddress.curTit}}</div>
                </div>
                <div class="icon-small">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="tiao">
                <div
                    v-for="(item,index) in 12"
                    :key="item"
                    :class="index %2 === 0 ? 'oneTiao': 'twoTiao'"
                ></div>
            </div>
        </div>
        <div class="item-content">
            <div class="con-item" v-for="(item,index) in goodList" :key="item.id">
                <GoodTemplate :goodData="item"></GoodTemplate>
            </div>
        </div>
        <div class="radio-box">
            <div class="rad-title">
                <div class="left-title">优惠券</div>
                <div class="right-title">可用（{{quan.length}}）</div>
            </div>
            <van-radio-group v-model="radio" @change="changeRadio">
                <van-cell-group class="rad-item" v-for="(item,index) in quan" :key="item.id">
                    <van-radio
                        :name="item.id"
                        icon-size="20px"
                        checked-color="#147658"
                        :disabled="canPick"
                    >
                        <div :class="radio == item.id ? 'text color-txt' : 'text'">
                            <div class="quanTitle">{{item.introduce}}</div>
                            <div class="quan-date">{{item.validity}}</div>
                        </div>
                    </van-radio>
                </van-cell-group>
            </van-radio-group>
        </div>
        <div class="settlement">
            <div class="count-price">
                <span class="count-title">合计</span>
                <span class="count-num">￥{{countPrice}}</span>
            </div>
            <van-button class="btn">提交订单</van-button>
        </div>
    </div>
</template>

<script >
import GoodTemplate from '../../components/goods-template/index'
export default {
    components: {
        GoodTemplate
    },
    data() {
        return {
            canPick: true,
            countPrice: 0,
            address: '',
            pageTile: '',
            radio: '',
            goodList: [],
            quan: [
                {
                    id: '1',
                    denomination: '100',
                    introduce: '满1000减100',
                    limit: '仅限包包、外套使用',
                    validity: '永久使用',
                    isUse: 1 //1可使用
                },
                {
                    id: '2',
                    denomination: '200',
                    introduce: '满1000减200',
                    limit: '仅限包包、外套使用',
                    validity: '永久使用1',
                    isUse: 2 //2已使用
                },
                {
                    id: '3',
                    denomination: '300',
                    introduce: '满1000减300',
                    limit: '仅限包包、外套使用',
                    validity: '永久使用2',
                    isUse: 2 //2已使用
                }
            ]
        }
    },
    mounted() {
        this.pageTile = this.$router.currentRoute.meta.name
        this.goodList = this.$store.state.shopcar
        this.countPrice = 0
        for (let i = 0; i < this.goodList.length; ++i) {
            this.countPrice += this.goodList[i].amount * this.goodList[i].price
        }
        if (this.countPrice >= 1000) {
            this.canPick = false
        }
    },
    methods: {
        onClickLeft() {
            console.log('left')
            this.$router.go(-1)
        },
        onClickRight() {
            console.log('onClickRight')
            this.$store.state.active = 0
            this.$router.push('/home')
        },
        goAddress() {
            this.$router.push('/selectAddress')
        },
        changeRadio(e) {
            console.log(e, 'eee')
            for (let i = 0; i < this.quan.length; ++i) {
                if (this.quan[i].id == e) {
                    console.log(this.countPrice, this.quan[i].denomination, '990')
                    this.countPrice = this.countPrice - parseInt(this.quan[i].denomination)
                }
            }
        }
    }
}
</script>
<style lang="less">
@import './index.less';
</style>