<template>
    <div class="container_c">
        <div class="box" v-for="(item,index) in list" :key="index">
            <div class="left">
                <div class="left-box">
                    <div class="price-box">
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
                    <div class="txt">立即</div>
                    <div class="txt">使用</div>
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
        list: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {},
    data() {
        return {
            activeName: 'a'
        }
    },
    mounted() {
        console.log(this.list, '77777777')
    },
    methods: {}
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>