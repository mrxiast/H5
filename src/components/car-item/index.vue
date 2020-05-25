<template>
    <div class="container">
        <div class="item-box" @click="goInfo">
            <div class="item-left">
                <img :src="goodsInfo.imgUrl" alt />
            </div>
            <div class="item-right">
                <div class="top">
                    <div class="title">
                        <span
                            class="tags"
                            v-if="goodsInfo.tagType"
                        >{{goodsInfo.tagType === 1 ? '优惠':'打折'}}</span>
                        {{goodsInfo.name}}
                    </div>
                    <div class="item-info">
                        <span>{{goodsInfo.skuValues}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="price">￥{{goodsInfo.price}}</div>
                    <div class="count">
                        <div class="jian" @click.stop="jian_num">-</div>
                        <div class="num_s">{{value}}</div>
                        <div class="jia" @click.stop="jia_num">+</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        goodsInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            value: null
        }
    },
    mounted() {
        this.value = this.goodsInfo.payNum
    },
    methods: {
        jian_num() {
            console.log(this.value, 'this.value')
            if (this.value <= 1) {
                this.$toast('最少一件')
                return
            } else {
                this.value--
            }
            this.setComputed()
        },
        jia_num() {
            this.value += 1
            this.setComputed()
        },
        setComputed() {
            this.$emit('fatherMethod', this.goodsInfo, this.value)
        },
        goInfo() {
            this.$emit('fatherMethodGoInfo', this.goodsInfo)
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>