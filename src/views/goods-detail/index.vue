<template>
    <div class="box">
        <van-nav-bar title="街区之家" @click-right="onClickRight">
            <template #right>
                <van-icon name="wap-home-o" size="20" />
            </template>
        </van-nav-bar>
        <GoodsInfo @fun="fatherMethod" @onAddCar="onAddCar"></GoodsInfo>
        <div>
            <van-sku
                v-model="show"
                :sku="sku"
                :goods="goods"
                :hide-stock="sku.hide_stock"
                :quota-used="quotaUsed"
                :custom-stepper-config="customStepperConfig"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked"
            />
        </div>
    </div>
</template>

<script>
import GoodsInfo from '../../components/goods-info/index'
export default {
    components: {
        GoodsInfo
    },
    data() {
        return {
            show: false,
            quotaUsed: 0,
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [
                    {
                        k: '颜色', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '10001', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' // 用于预览显示的规格类目图片
                            },
                            {
                                id: '10002',
                                name: '蓝色',
                                imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                                previewImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
                            },
                            {
                                id: '10003',
                                name: '白色',
                                imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                                previewImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
                            },
                            {
                                id: '10004',
                                name: '黑色',
                                imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                                previewImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
                            }
                        ],
                        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    },
                    {
                        k: '尺码', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '20001', // skuValueId：规格值 id
                                name: 'M码-适合100-120斤', // skuValueName：规格值名称
                                imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg', // 规格类目图片，只有第一个规格类目可以定义图片
                                previewImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg' // 用于预览显示的规格类目图片
                            },
                            {
                                id: '20002',
                                name: 'L码-适合120-140斤',
                                imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                                previewImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
                            },
                            {
                                id: '20003',
                                name: 'XL码-适合140-160斤',
                                imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                                previewImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
                            },
                            {
                                id: '20004',
                                name: 'XXL码-适合160-180斤',
                                imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
                                previewImgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
                            }
                        ],
                        k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    }
                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [
                    {
                        id: 'goods-001', // skuId，下单时后端需要
                        price: 100 * 100, // 价格（单位分）
                        s1: '10001', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20001', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 589 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-002', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10001', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20002', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 364 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-003', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10001', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20003', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 59 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-004', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10001', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20004', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 39 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-001', // skuId，下单时后端需要
                        price: 100 * 100, // 价格（单位分）
                        s1: '10002', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20001', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 55 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-002', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10002', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20002', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 77 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-003', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10002', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20003', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 73 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-004', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10002', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20004', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 82 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-001', // skuId，下单时后端需要
                        price: 100 * 100, // 价格（单位分）
                        s1: '10003', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20001', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 98 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-002', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10003', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20002', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 187 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-003', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10003', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20003', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 196 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-004', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10003', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20004', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 17 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-001', // skuId，下单时后端需要
                        price: 100 * 100, // 价格（单位分）
                        s1: '10004', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20001', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 88 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-002', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10004', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20002', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 0 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-003', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10004', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20003', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 29 // 当前 sku 组合对应的库存
                    },
                    {
                        id: 'goods-004', // skuId，下单时后端需要
                        price: 105 * 100, // 价格（单位分）
                        s1: '10004', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '20004', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: 0 // 当前 sku 组合对应的库存
                    }
                ],
                price: '100.00~999.99', // 默认价格（单位元）
                stock_num: 227, // 商品总库存
                collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                hide_stock: false // 是否隐藏剩余库存
            },
            goods: {
                // 默认商品 sku 缩略图
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
                        // const { LIMIT_TYPE } = Sku.skuConstants;
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
                // 库存
                // stockNum: 1,
                // // 格式化库存
                // stockFormatter: stockNum => {}
            },
            skuData: {
                // 商品 id
                goodsId: '946755',
                // 留言信息
                messages: {
                    message_0: '12',
                    message_1: ''
                },
                // 另一种格式的留言，key 不同
                cartMessages: {
                    留言1: 'xxxx'
                },
                // 选择的商品数量
                selectedNum: 1,
                // 选择的 sku 组合
                selectedSkuComb: {
                    id: 2257,
                    price: 100,
                    s1: '30349',
                    s2: '1193',
                    s3: '0',
                    stock_num: 111,
                    properties: [
                        {
                            k_id: 123,
                            k: '加料',
                            is_multiple: true,
                            v: [
                                {
                                    id: 1223,
                                    name: '椰果',
                                    price: 1
                                }
                            ]
                        }
                    ],
                    property_price: 1
                }
            }
        }
    },
    mounted() {
        console.log(this.$route.query.id, '321')
        console.log(this.sku.tree, '001')
    },
    methods: {
        onBuyClicked() {
            console.log('goumai')
        },
        onAddCartClicked() {
            console.log('gouwuche')
        },
        onClickRight() {
            console.log('onClickRight')
            this.$store.commit('SET_ACTIVE', 0)
            this.$router.push('/home')
        },
        //
        fatherMethod() {
            console.log(this.skuData, '770669')
            this.show = true
        },
        onAddCar() {
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
