<template>
    <div class="container">
        <div>
            <van-nav-bar :title="pageTile" @click-right="onClickRight">
                <template #right>
                    <van-icon name="wap-home-o" size="20" />
                </template>
            </van-nav-bar>
        </div>
        <van-tabs v-model="status" @click="get">
            <van-tab
                :title="item.value"
                :name="item.id"
                v-for="(item,index) in navList"
                :key="index"
            >
                <div class="content">
                    <van-loading v-if="showLoading" />
                    <div v-else>
                        <div style="margin:10px 0;" v-if="orderList.length<1">暂无相关商品哦</div>
                        <div v-else>
                            <div v-for="(item,index) in orderList" :key="item.id">
                                <OrderTemplate :itemData="item" @fun="fatherMethod"></OrderTemplate>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import OrderTemplate from '../../components/order-template/index'
import {getListApi} from './api.js'
export default {
    components: {
        OrderTemplate
    },
    data() {
        return {
            showLoading: false,
            status: 1,
            pageTile: '',
            navList: [
                {
                    id: 1,
                    value: '全部'
                },
                {
                    id: 2,
                    value: '已完成'
                },
                {
                    id: 3,
                    value: '待发货'
                },
                {
                    id: 4,
                    value: '待收货'
                }
            ],
            orderList: []
        }
    },
    mounted() {
        this.pageTile = this.$router.currentRoute.meta.name
        this.status = this.$route.params.nav
        this.init()
    },
    methods: {
        init() {
            this.getList()
        },
        getList() {
            this.showLoading = true
            getListApi({status: this.status}).then(res => {
                if (res.code === 200) {
                    this.showLoading = false
                    console.log(res, 'res')
                    this.orderList = res.result
                }
            })
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
        get() {
            this.orderList = []
            this.init()
        },
        fatherMethod(e) {
            this.$router.push({path: 'orderInfo', query: {id: e.id}})
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>