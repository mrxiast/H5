<template>
    <div class="container">
        <div class="item" v-for="(item,index) in dataList" :key="item.id">
            <div v-if="index%2 === 0" @click="goInfo(item)">
                <div class="item-img">
                    <img :src="item.imgUrl" alt />
                </div>
                <div class="right">
                    <div class="r-top">
                        <div class="title">{{item.title}}</div>
                        <div class="introduce">{{item.introduce}}</div>
                    </div>
                    <div class="square">
                        <van-icon name="arrow" size="40" color="#fff" />
                    </div>
                </div>
            </div>
            <div v-else @click="goInfo(item)">
                <div class="right">
                    <div class="r-top">
                        <div class="title">{{item.title}}</div>
                        <div class="introduce">{{item.introduce}}</div>
                    </div>
                    <div class="square">
                        <van-icon name="arrow" size="40" color="#fff" />
                    </div>
                </div>
                <div class="item-img">
                    <img :src="item.imgUrl" alt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: [
                {
                    title: '圆领线衫',
                    id: '1',
                    imgUrl: require('../../static/fashion/fashionitem.jpg'),
                    introduce: '该如何正确运用自己衣柜的基础款'
                },
                {
                    title: '方领线衫',
                    id: '2',
                    imgUrl: require('../../static/fashion/fashionitem.jpg'),
                    introduce: '该如何正确运用自己衣柜的基础款'
                },
                {
                    title: '鸡心领线衫',
                    id: '3',
                    imgUrl: require('../../static/fashion/fashionitem.jpg'),
                    introduce: '该如何正确运用自己衣柜的基础款'
                },
                {
                    title: '各种领线衫',
                    id: '4',
                    imgUrl: require('../../static/fashion/fashionitem.jpg'),
                    introduce: '该如何正确运用自己衣柜的基础款'
                }
            ]
        }
    },
    methods: {
        goInfo(e) {
            console.log(e.id, '770')
            this.$router.push({path: '/goodsDetail', query: {id: e.id}})
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>