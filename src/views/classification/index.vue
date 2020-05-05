<template>
    <div class="box">
        <div>
            <van-search @click="goSearch" placeholder="请输入搜索关键词" readonly />
        </div>
        <div style="display:flex;">
            <van-sidebar v-model="activeKey" @change="onChange">
                <van-sidebar-item v-for="(item,index) in sideList" :key="item" :title="item" />
            </van-sidebar>
            <div style="width:290px;box-sizing:border-box;padding:10px;">
                <ClassInfo :item="item" :clickItem="clickItem"></ClassInfo>
            </div>
        </div>
    </div>
</template>

<script>
import ClassInfo from '../../components/classic-info/index'
export default {
    components: {
        ClassInfo
    },
    data() {
        return {
            activeKey: 0,
            sideList: ['服装', '包包', '鞋类', '饰品', '家具', '文具'],
            list: [
                {
                    bannerUrl: require('../../static/classic/yf.jpg'),
                    content: [
                        {
                            title: '全部分类',
                            children: [
                                {url: '1', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '连衣裙'},
                                {url: '2', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '九分裤'},
                                {url: '3', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '七分裤'},
                                {url: '4', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '五分裤'},
                                {url: '5', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '牛仔裤'},
                                {url: '6', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '迷你裙'}
                            ]
                        },
                        {
                            title: '热门品牌',
                            children: [
                                {url: '7', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '雅迪斯'},
                                {url: '8', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '恩瑞尼'},
                                {url: '9', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '爱康康'},
                                {url: '10', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '尤希子'},
                                {url: '11', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '戈蔓婷'},
                                {url: '12', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '贝茜妮'}
                            ]
                        }
                    ]
                },
                {
                    bannerUrl: require('../../static/classic/xz.jpg'),
                    content: [
                        {
                            title: '全部分类',
                            children: [
                                {url: '1', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '高跟鞋'},
                                {url: '2', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '运动鞋'},
                                {url: '3', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '帆布鞋'},
                                {url: '4', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '马丁靴'},
                                {url: '5', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '豆豆鞋'},
                                {url: '6', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '竞跑鞋'}
                            ]
                        },
                        {
                            title: '热门品牌',
                            children: [
                                {url: '7', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '香奈儿'},
                                {url: '8', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '达芙妮'},
                                {url: '9', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '红蜻蜓'},
                                {url: '10', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '阿玛尼'},
                                {url: '11', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '纪梵希'},
                                {url: '12', imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg', name: '安东尼'}
                            ]
                        }
                    ]
                }
            ],
            item: {},
            url: '456' //瀑布流专用
        }
    },
    mounted() {
        this.item = this.list[0]
    },
    methods: {
        onChange(e) {
            console.log(e, 'eee')
            this.item = this.list[e]
        },
        goSearch() {
            console.log('123')
            this.$router.push('/search')
        },
        clickItem(e) {
            console.log(e, '123')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
@import '../../components/common.less';
</style>
