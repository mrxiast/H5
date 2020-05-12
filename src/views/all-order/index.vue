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
        <van-tabs v-model="activeName" @click="get">
            <van-tab
                :title="item.value"
                :name="item.id"
                v-for="(item,index) in navList"
                :key="index"
            >
                <div class="content">
                    <van-loading v-if="showLoading" />
                    <div v-else>
                        <div v-for="(item,index) in orderList" :key="item.id" @click="goInfo(item)">
                            <OrderTemplate :itemData="item"></OrderTemplate>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import OrderTemplate from '../../components/order-template/index'
export default {
    components: {
        OrderTemplate
    },
    data() {
        return {
            showLoading: false,
            activeName: '1',
            pageTile: '',
            navList: [
                {
                    id: '1',
                    value: '全部'
                },
                {
                    id: '2',
                    value: '已完成'
                },
                {
                    id: '3',
                    value: '待发货'
                },
                {
                    id: '4',
                    value: '待收货'
                }
            ],
            orderList: [
                {
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
                },
                {
                    id: '002',
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
            ]
        }
    },
    mounted() {
        this.pageTile = this.$router.currentRoute.meta.name
        this.activeName = this.$route.query.nav
    },
    methods: {
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
            let that = this
            this.showLoading = true
            this.orderList = []
            setTimeout(function() {
                that.showLoading = false
                that.orderList = [
                    {
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
                    },
                    {
                        id: '002',
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
                ]
            }, 1000)
        },
        goInfo(e) {
            this.$router.push({path: 'orderInfo', query: {id: e.id}})
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>