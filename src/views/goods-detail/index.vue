<template>
    <div class="box">
        <van-nav-bar title="街区之家" @click-right="onClickRight">
            <template #right>
                <van-icon name="wap-home-o" size="20" />
            </template>
        </van-nav-bar>
        <GoodsInfo
            :detailInfo="detailInfo"
            @fun="fatherMethod"
            @onAddCar="onAddCar"
            @select="showSku"
        ></GoodsInfo>
        <div>
            <van-sku
                v-model="show"
                :sku="sku"
                :quota="sku.quota"
                :goods="goods"
                :goodsId="sku.goodsId"
                :hide-stock="sku.hide_stock"
                :quota-used="sku.quotaUsed"
                :custom-stepper-config="customStepperConfig"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked"
                @sku-selected="code"
            />
        </div>
    </div>
</template>

<script>
import GoodsInfo from '../../components/goods-info/index'
import {Sku} from 'vant'
import {getGoodsIngoApi, addCartApi} from './api.js'
export default {
    components: {
        GoodsInfo
    },
    data() {
        return {
            show: false,

            sku: {
                goodsId: '',
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [],
                price: '', // 默认价格（单位元）
                stock_num: 0, // 商品总库存
                collection_id: '', // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                hide_stock: false, // 是否隐藏剩余库存
                quotaUsed: 0,
                quota: 0
            },
            // 默认商品 sku 缩略图
            goods: {
                picture: 'https://img.yzcdn.cn/vant/cat.jpeg'
            },
            customStepperConfig: {
                // 自定义限购文案
                quotaText: '每人限购10件',
                handleOverLimit: data => {
                    console.log(data, 'dataaa')
                    const {action, limitType, quota, quotaUsed, startSaleNum} = data

                    if (action === 'minus') {
                        this.$toast(startSaleNum > 1 ? `${startSaleNum}件起售` : '至少选择一件商品')
                    } else if (action === 'plus') {
                        const {LIMIT_TYPE} = Sku.skuConstants
                        if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
                            let msg = `单次限购${quota}件`
                            if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`
                            this.$toast(msg)
                        } else {
                            this.$toast('库存不够了')
                        }
                    }
                },
                // 步进器变化的回调
                handleStepperChange: currentValue => {
                    this.quotaUsed = currentValue
                    console.log(currentValue, 'currentValuecurrentValue')
                }
            },
            goodsId: '',
            banners: [],
            detailInfo: {},
            selectSkuKeyVal: {}
        }
    },
    mounted() {
        this.goodsId = this.$route.params.id
        this.init()
    },
    methods: {
        code(e) {
            console.log(e, 'ee')
            this.selectSkuKeyVal = e.selectedSku
        },
        init() {
            this.getInfo()
        },
        getInfo() {
            getGoodsIngoApi({id: this.goodsId}).then(res => {
                console.log(res, 'res')
                if (res.code === 200) {
                    this.detailInfo = res.result
                    this.getSku()
                }
            })
        },
        //格式话sku
        getSku() {
            this.sku.list = this.detailInfo.list
            this.sku.tree = this.detailInfo.tree
            this.sku.price = this.detailInfo.priceSection
            this.sku.none_sku = false // 是否无规格商品
            this.sku.hide_stock = false
            this.sku.stock_num = this.detailInfo.amountStock
            this.sku.quota = this.detailInfo.quota
            this.sku.quotaUsed = 0
            this.sku.collection_id = '22'
            this.sku.goodsId = this.detailInfo.id
            this.goods.picture = this.detailInfo.product_url
        },
        onBuyClicked(data) {
            let subData = this.getSubData(data)
            subData.name = this.detailInfo.name
            subData.price = data.selectedSkuComb.price / 100
            subData.imgUrl = this.goods.picture

            let totalPrice = (data.selectedSkuComb.price * data.selectedNum) / 100
            console.log(totalPrice, subData, '00000')
            let endData = {
                shopCar: [subData],
                allPrice: totalPrice
            }
            this.$store.commit('SET_SHOPCAR', endData)
            this.$router.push('/subOrder')
        },
        onAddCartClicked(data) {
            let subData = this.getSubData(data)
            addCartApi(subData).then(res => {
                if (res.code === 200) {
                    this.$toast.success('添加购物车成功')
                    this.show = false
                }
            })
        },
        getSubData(data) {
            let skuKeys = []
            for (let keys in this.selectSkuKeyVal) {
                skuKeys.push({
                    [keys]: this.selectSkuKeyVal[keys]
                })
            }
            let subData = {}
            subData.payNum = data.selectedNum
            subData.spuId = data.goodsId
            subData.skuId = data.selectedSkuComb.id
            subData.skuKeys = this.selectSkuKeyVal

            return subData
        },
        onClickRight() {
            console.log('onClickRight')
            this.$store.commit('SET_ACTIVE', 0)
            this.$router.push('/home')
        },
        //
        fatherMethod() {
            this.show = true
        },
        onAddCar() {
            this.show = true
        },
        showSku() {
            this.show = true
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
.van-sku-group-container,
.van-sku-header__goods-info {
    text-align: left !important;
}
</style>
