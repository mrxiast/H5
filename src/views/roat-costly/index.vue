<template>
    <div class="box">
        <div>
            <van-nav-bar
                :title="pageTile"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #right>
                    <van-icon name="wap-home-o" size="20" />
                </template>
            </van-nav-bar>
        </div>
        <div class="banner">
            <div class="ban_item" :style="'background:url('+require('../../static/zp/wy.jpg')+'\)'">
                <div class="sentence">尽管最成功的不一定是最努力的那个，但是努力的人大都混的还不错。</div>
            </div>
            <div
                v-for="(item,index) in banList"
                :key="item.id"
                class="ban_item"
                :style="'background:url('+item.imgUrl+'\)'"
                @click="goBuy(item)"
            >
                <div class="item_box">
                    <div class="tags">{{item.tag}}</div>
                    <div class="title">{{item.title}}</div>
                    <div class="about">{{item.about}}</div>
                    <div class="price">￥{{item.price}}</div>
                    <div class="soon-get">立即购买</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageTile: '',
            banList: [
                {
                    imgUrl: require('../../static/zp/wt.jpg'),
                    id: '1',
                    tag: '双色入',
                    title: '街头潮牌外套',
                    about: '简约风格街头感',
                    price: '499'
                },
                {
                    imgUrl: require('../../static/zp/kz.jpg'),
                    id: '2',
                    tag: '双色入',
                    title: '通勤条纹休闲裤',
                    about: '通勤条纹休闲裤',
                    price: '399'
                },
                {
                    imgUrl: require('../../static/zp/xf.jpg'),
                    id: '3',
                    tag: '双色入',
                    title: '正式西装上衣',
                    about: '简约而不简单',
                    price: '299'
                },
                {
                    imgUrl: require('../../static/zp/yd.jpg'),
                    id: '4',
                    tag: '双色入',
                    title: '全棉修身短袖',
                    about: '夏季完美搭配',
                    price: '499'
                }
            ]
        }
    },
    mounted() {
        this.pageTile = this.$router.currentRoute.meta.name
    },
    methods: {
        onClickLeft() {
            console.log('left')
            window.history.back()
        },
        onClickRight() {
            console.log('onClickRight')
            this.$router.push('/home')
        },
        goBuy(e) {
            console.log(e, 'e')
            this.$router.push('/goodsDetail?id=' + e.id)
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
