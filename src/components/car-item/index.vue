<template>
    <div class="container">
        <div class="item-box">
            <div class="item-left">
                <img :src="goodsInfo.imgUrl" alt />
                <div class="sel-box">
                    <van-checkbox
                        v-model="checked"
                        shape="square"
                        checked-color="#147658"
                        @click="onChange"
                    ></van-checkbox>
                </div>
            </div>
            <div class="item-right">
                <div class="top">
                    <div class="title">
                        <span class="tags" v-if="goodsInfo.tags">{{goodsInfo.tags}}</span>
                        {{goodsInfo.title}}
                    </div>
                    <div class="item-info">
                        <span v-for="(item,index) in goodsInfo.sku" :key="item.id">{{item.value}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="price">￥{{goodsInfo.price}}</div>
                    <div class="count">
                        <van-stepper v-model="value" disable-input @change="onChange" />
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
            value: 0,
            checked: true
        }
    },
    mounted() {},
    methods: {
        onChange(value) {
            // this.$parent.fatherMethod(this.goodsInfo.id, value, this.checked)
            this.$emit('fatherMethod', this.goodsInfo, this.value, this.checked)
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