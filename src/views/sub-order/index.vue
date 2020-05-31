<template>
    <div class="container">
        <div>
            <van-nav-bar :title="pageTile" @click-right="onClickRight">
                <template #right>
                    <van-icon name="wap-home-o" size="20" />
                </template>
            </van-nav-bar>
        </div>
        <div class="select-address">
            <div class="select-box" v-if="!recInfo.province" @click="goAddress">
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
                    <div class="title">{{recInfo.name}} {{recInfo.tel}}</div>
                    <div
                        class="content"
                    >{{recInfo.province}} {{recInfo.county}}{{recInfo.city}}{{recInfo.addressDetail}}</div>
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
            <van-button class="btn" @click="submitOrder">提交订单</van-button>
        </div>
    </div>
</template>

<script >
import {getDelAddApi, addOrderApi} from './api'
import GoodTemplate from '../../components/goods-template/index'
export default {
    components: {
        GoodTemplate
    },
    data() {
        return {
            storeData: {},
            canPick: true,
            countPrice: 0,
            recInfo: {
                curAddress: '',
                curTit: '',
                name: '',
                pahone: '',
                r_lng: 0,
                r_lat: 0
            },
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
        this.storeData = this.$store.state.shopCar
        this.goodList = this.storeData.shopCar
        this.countPrice = this.storeData.allPrice
        if (this.countPrice >= 1000) {
            this.canPick = false
        }
        this.getDefaultAddress()
    },
    // destroyed() {
    //     this.$store.commit('SET_SHOPCAR', '')
    // },
    methods: {
        getDefaultAddress() {
            getDelAddApi().then(res => {
                if (res.code === 200) {
                    this.recInfo = res.result
                    if (this.$route.query.address) {
                        this.recInfo.province = JSON.parse(this.$route.query.address).curAddress
                        this.recInfo.county = ''
                        this.recInfo.city = ''
                        this.recInfo.addressDetail = JSON.parse(this.$route.query.address).curTit
                    }
                }
            })
            this.recInfo.r_lng = 114.025871
            this.recInfo.r_lat = 114.025871
        },
        onClickLeft() {
            console.log('left')
            window.history.back()
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
            for (let i = 0; i < this.quan.length; ++i) {
                if (this.quan[i].id == e) {
                    this.countPrice = this.countPrice - parseInt(this.quan[i].denomination)
                }
            }
        },
        submitOrder() {
            console.log(this.recInfo, this.storeData)
            let data = {
                addressId: this.recInfo.id,
                allPrice: this.storeData.allPrice,
                orderInfo: this.storeData.shopCar
            }
            addOrderApi(data).then(res => {
                if (res.code === 200) {
                    this.$toast.success('提交成功，即将返回首页')
                }
            })
            let that = this
            setTimeout(function() {
                that.$router.replace('/home')
            }, 1500)
        }
    }
}
</script>
<style lang="less">
@import './index.less';
</style>