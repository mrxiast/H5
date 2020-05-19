<template>
    <div class="container">
        <img :src="giveData.titleUrl" alt />
        <div class="content">
            <!-- <div class="item">
                <img style="width:170px;height:180px;" src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="">
                <div class="title">北欧简约独立台灯</div>
                <div class="tags">
                    <span>ins</span>
                    <span>复古流行</span>
                </div>
                <div class="price">
                    <span class="now-price">￥298</span> 
                    <span class="pre-price">￥998</span> 
                </div>
                <div class="explain">instagram复古台灯，就在此刻回到过去，寻找逝去的记忆！</div>
            </div>-->
            <Waterfall :id="id" :url="url"></Waterfall>
        </div>
    </div>
</template>

<script>
import Waterfall from '../my-waterfall/index'
export default {
    name: 'grid',
    components: {
        Waterfall
    },
    props: {
        giveData: {
            type: Object,
            dafault: () => {},
            require: true
        },
        url: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            id: '456'
        }
    },
    methods: {
        getData() {}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
