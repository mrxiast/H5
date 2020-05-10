<template>
    <div class="container">
        <div class="content" v-for="(item,index) in shopCarList" :key="item.id">
            <carItem :goodsInfo="item" @fatherMethod="fatherMethod"></carItem>
        </div>
        <div class="settlement">
            <div class="box">
                <van-checkbox
                    v-model="changeAllCheck"
                    shape="square"
                    checked-color="#147658"
                    @click="changAll"
                >全选</van-checkbox>
            </div>
            <van-button class="btn" @click="submit" :disabled="subData.length > 0 ? false: true">
                结算
                <span v-if="totalNum">（{{totalNum}}）</span>
            </van-button>
            <div class="price">合计 ￥{{totalPrice}}</div>
        </div>
    </div>
</template>

<script>
import carItem from '../../components/car-item/index'
export default {
    components: {
        carItem
    },
    data() {
        return {
            allTrue: false, //如果子选项全部选了，全选按钮应该选上
            changeAllCheck: false, //是否全选
            totalPrice: 0, //共多少钱
            totalNum: 0, //共多少件
            subData: [],
            shopCarList: [
                {
                    tags: '打折',
                    title: '这是一只猫',
                    id: 'item1',
                    imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    price: '198',
                    amount: 1,
                    sku: [
                        {name: '颜色', value: '黑色', id: 'black'},
                        {name: '类型', value: '圆领', id: 'yl'},
                        {name: '尺码', value: 'M165', id: '165'}
                    ]
                },
                {
                    id: 'item2',
                    tags: '优惠',
                    title: '这是一只花猫',
                    imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    price: '198',
                    amount: 1,
                    sku: [
                        {name: '颜色', value: '黄色', id: 'black'},
                        {name: '类型', value: '鸡心领', id: 'yl'},
                        {name: '尺码', value: 'M165', id: '165'}
                    ]
                },
                {
                    id: 'item3',
                    tags: '',
                    title: '这是一只很饿的猫',
                    imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                    price: '198',
                    amount: 1,
                    sku: [
                        {name: '颜色', value: '黄色', id: 'black'},
                        {name: '类型', value: '无领', id: 'yl'},
                        {name: '尺码', value: 'M165', id: '165'}
                    ]
                }
            ]
        }
    },
    mounted() {
        for (let i = 0; i < this.shopCarList.length; ++i) {
            this.$set(this.shopCarList[i], 'checked', false)
        }
    },
    methods: {
        fatherMethod(item, value, checked) {
            this.totalPrice = 0
            this.totalNum = 0
            this.allTrue = true
            this.subData = []
            for (let i = 0; i < this.shopCarList.length; ++i) {
                if (item.id === this.shopCarList[i].id) {
                    this.shopCarList[i].amount = value
                    this.shopCarList[i].checked = checked
                }
                if (this.shopCarList[i].checked) {
                    this.totalPrice += this.shopCarList[i].amount * this.shopCarList[i].price
                    this.totalNum += this.shopCarList[i].amount
                    this.subData.push(this.shopCarList[i])
                }
                if (!this.shopCarList[i].checked) {
                    this.allTrue = false
                }
            }
            if (this.allTrue) {
                this.changeAllCheck = true
            } else {
                this.changeAllCheck = false
            }
        },
        submit() {
            console.log(this.subData, '998')
            this.$store.commit('SET_SHOPCAR', this.subData)
            this.$router.push('/subOrder')
        },
        changAll() {
            this.changeAllCheck = !!this.changeAllCheck
            this.totalPrice = 0
            this.totalNum = 0
            this.subData = []
            for (let i = 0; i < this.shopCarList.length; ++i) {
                this.shopCarList[i].checked = this.changeAllCheck
                if (this.shopCarList[i].checked) {
                    this.totalPrice += this.shopCarList[i].amount * this.shopCarList[i].price
                    this.totalNum += this.shopCarList[i].amount
                    this.subData.push(this.shopCarList[i])
                } else {
                    this.subData = []
                }
            }
            console.log(this.subData, '900000098')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
