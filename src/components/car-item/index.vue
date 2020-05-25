<template>
    <div class="container">
        <div class="sel-box">
            <van-checkbox
                v-model="checked"
                shape="square"
                checked-color="#147658"
                @click="onChange"
            ></van-checkbox>
        </div>
        <div class="item-box" @click="goInfo">
            <div class="item-left">
                <img :src="goodsInfo.imgUrl" alt />
            </div>
            <div class="item-right">
                <div class="top">
                    <div class="title">
                        <span
                            class="tags"
                            v-if="goodsInfo.tags"
                        >{{goodsInfo.tags === 1 ? '优惠':'打折'}}</span>
                        {{goodsInfo.title}}
                    </div>
                    <div class="item-info">
                        <span v-for="(item,index) in goodsInfo.sku" :key="item.id">{{item.value}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="price">￥{{goodsInfo.price}}</div>
                    <div class="count">
                        <div class="jian" @click.stop="jian_num">-</div>
                        <div class="num_s">{{goodsInfo.payNum}}</div>
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
            value: 1,
            checked: true
        }
    },
    mounted() {},
    methods: {
        jian_num() {
            if (this.value <= 1) {
                this.$toast('最少一件')
                return
            } else {
                this.value--
                this.onChange()
            }
        },
        jia_num() {
            this.value += 1
            this.onChange()
        },
        onChange() {
            // this.$parent.fatherMethod(this.goodsInfo.id, value, this.checked)
            console.log('123')
            this.$emit('fatherMethod', this.goodsInfo, this.value, this.checked)
        },
        goInfo() {
            this.$emit('fatherMethodGoInfo', this.goodsInfo)
        }
    },
    watch: {
        goodsInfo: {
            handler(newValue, oldValue) {
                this.value = newValue.amount
                this.checked = newValue.checked
            },
            deep: true
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>