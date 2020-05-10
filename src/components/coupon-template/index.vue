<template>
    <div class="container_c">
        <div class="box" v-for="(item,index) in quan.cards" :key="index">
            <div :class="quan.isUse == 3 ? 'left black-color' : 'left'">
                <div class="left-box">
                    <div :class="quan.isUse == 3 ? 'price-box black-color' : 'price-box'">
                        <span class="c-price">￥{{item.denomination}}</span>
                        <span>{{item.introduce}}</span>
                    </div>
                    <div class="prict-con">
                        <span>{{item.limit}}</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="right-box">
                    <div v-if="quan.isUse == 1">
                        <div class="txt">立即</div>
                        <div class="txt">使用</div>
                    </div>
                    <div v-if="quan.isUse == 2">
                        <div class="txt">已经</div>
                        <div class="txt">使用</div>
                    </div>
                    <div v-if="quan.isUse == 3">
                        <div class="txt">已经</div>
                        <div class="txt">过期</div>
                    </div>

                    <div class="prict-con">{{item.validity}}</div>
                </div>
            </div>
            <div class="big-cir one"></div>
            <div class="big-cir two"></div>
            <div class="big-cir three"></div>
            <div style="position:absolute;left:-2.5px;">
                <div class="small-cri"></div>
                <div class="small-cri"></div>
                <div class="small-cri bottom"></div>
                <div class="small-cri"></div>
                <div class="small-cri"></div>
                <div class="small-cri"></div>
            </div>
            <div style="position:absolute;left:202.5px;">
                <div class="small-cri"></div>
                <div class="small-cri"></div>
                <div class="small-cri bottom"></div>
                <div class="small-cri"></div>
                <div class="small-cri"></div>
                <div class="small-cri"></div>
            </div>
            <div style="position:absolute;left:331px;">
                <div class="small-cri"></div>
                <div class="small-cri"></div>
                <div class="small-cri bottom"></div>
                <div class="small-cri"></div>
                <div class="small-cri"></div>
                <div class="small-cri"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        quan: {
            type: Object,
            default: () => {}
        }
    },
    components: {},
    data() {
        return {
            activeName: 'a'
        }
    },
    mounted() {
        console.log(this.quan, '77777777')
    },
    methods: {}
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>