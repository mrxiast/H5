<template>
    <div class="container">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
            <div class="content" v-for="(item,index) in shopCarList" :key="item.id">
                <div class="sel-box">
                    <van-checkbox
                        :name="item.id"
                        shape="square"
                        checked-color="#147658"
                        @click="onChange"
                    ></van-checkbox>
                </div>
                <carItem
                    :goodsInfo="item"
                    @fatherMethod="fatherMethod"
                    @fatherMethodGoInfo="fatherMethodGoInfo"
                ></carItem>
            </div>
        </van-checkbox-group>
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
import {getListoApi} from './api.js'
export default {
    components: {
        carItem
    },
    data() {
        return {
            result: [],
            allTrue: false, //如果子选项全部选了，全选按钮应该选上
            changeAllCheck: false, //是否全选
            totalPrice: 0, //共多少钱
            totalNum: 0, //共多少件
            subData: [],
            shopCarList: [],
            isAll: false
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            getListoApi().then(res => {
                if (res.code === 200) {
                    console.log('123')
                    this.shopCarList = res.result
                }
            })
        },
        onChange(e) {
            if (this.result.length === this.shopCarList.length) {
                this.changeAllCheck = true
                this.isAll = true
            } else {
                this.changeAllCheck = false
                this.isAll = false
            }
            this.computedPrice()
        },
        fatherMethod(item, value) {
            for (let i = 0; i < this.shopCarList.length; i++) {
                if (this.shopCarList[i].id == item.id) {
                    this.shopCarList[i].payNum = value
                }
            }
            this.computedPrice()
        },
        submit() {
            console.log(this.subData, '998')
            this.$store.commit('SET_SHOPCAR', this.subData)
            this.$router.push('/subOrder')
        },
        changAll() {
            if (!this.isAll) {
                this.$refs.checkboxGroup.toggleAll(true)
            } else {
                this.$refs.checkboxGroup.toggleAll()
            }
            this.isAll = !this.isAll

            this.computedPrice()
        },
        computedPrice() {
            this.totalPrice = 0
            this.totalNum = 0
            this.subData = []
            if (this.isAll) {
                for (let i = 0; i < this.shopCarList.length; ++i) {
                    this.totalPrice += this.shopCarList[i].payNum * this.shopCarList[i].price
                    this.totalNum += this.shopCarList[i].payNum
                    this.subData.push(this.shopCarList[i])
                }
            } else {
                for (let i = 0; i < this.shopCarList.length; i++) {
                    for (let j = 0; j < this.result.length; j++) {
                        if (this.result[j] == this.shopCarList[i].id) {
                            this.totalPrice += this.shopCarList[i].payNum * this.shopCarList[i].price
                            this.totalNum += this.shopCarList[i].payNum
                            this.subData.push(this.shopCarList[i])
                        }
                    }
                }
            }
        },
        fatherMethodGoInfo(e) {
            console.log(e, '001002')
            this.$router.push({name: 'goodsDetail', params: {id: e.parentId}})
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
