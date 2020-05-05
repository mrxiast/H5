<template>
    <vue-waterfall-easy :imgsArr="imgsArr" @scrollLoadImg="getData">
        <template slot-scope="props">
            <!-- <p>{{props.info}}</p> -->
            <div class="title">北欧简约独立台灯</div>
            <div class="tags">
                <span>ins</span>
                <span>复古流行</span>
            </div>
            <div class="price">
                <span class="now-price">￥298</span>
                <span class="pre-price">￥998</span>
            </div>
            <div class="explain">{{props.value.info}}</div>
        </template>
    </vue-waterfall-easy>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
    components: {
        vueWaterfallEasy
    },
    data() {
        return {
            imgsArr: []
        }
    },
    created() {
        this.imgsArr = this.initImgsArr(0, 10) //初始化第一次（即页面加载完毕时）要加载的图片数据
        this.fetchImgsArr = this.initImgsArr(10, 20) // 模拟每次请求的下一批新的图片的数据数据
    },
    mounted() {},
    methods: {
        initImgsArr(n, m) {
            //初始化图片数组的方法，把要加载的图片装入
            var arr = []
            for (var i = n; i < m; i++) {
                arr.push({src: 'https://img.yzcdn.cn/vant/apple-1.jpg', link: '', info: '一些图片描述文字'})
                arr.push({
                    src: 'https://img.yzcdn.cn/vant/apple-1.jpg',
                    link: '',
                    info: '一些图片描述文字一些图片描述文字一些图片描述文字'
                }) //info为自定义的图片展示信息，请根据自己的情况自行填写
            }
            return arr
        },

        getData() {
            //获取新的图片数据的方法，用于页面滚动满足条件时调用
            this.imgsArr = this.imgsArr.concat(this.fetchImgsArr) //数组拼接，把下一批要加载的图片放入所有图片的数组中
        }
    }
}
</script>
<style lang="less"  scoped>
@import './index.less';
</style>