<template>
    <div class="container">
        <div class="banner">
            <img src="../../static/sy/sale.jpg" alt />
        </div>
        <Swip :images="images"></Swip>
        <Nine :grids="grids" @fun="fatherMethod"></Nine>
        <div @click.prevent="getYhq">
            <DisCount :discountImg="discountImg"></DisCount>
        </div>
        <div @click="goNewWeek">
            <NewWeek :weekTtitle="weekTtitle" @goNewWeekItem="goNewWeekItem"></NewWeek>
        </div>

        <div class="rare" @click="goRareInfo">
            <div class="rare-title">
                <div class="rare-left">
                    <div class="rare-left-title">街区甄选。</div>
                    <div class="rare-left-content">这样的气质，才属于你</div>
                </div>
                <div class="rare-right">查看更多</div>
            </div>
        </div>
        <Hot :hotData="hotData"></Hot>
        <Dress :dressData="dressData"></Dress>
        <GiveYou :giveData="giveData"></GiveYou>
    </div>
</template>

<script>
import Swip from '../../components/swip-banner/index'
import Nine from '../../components/nine-grid/index'
import DisCount from '../../components/discount/index'
import NewWeek from '../../components/new-week/index'
import Hot from '../../components/hot/index'
import Dress from '../../components/dress/index'
import GiveYou from '../../components/give-you/index'
export default {
    components: {
        Swip,
        Nine,
        DisCount,
        NewWeek,
        Hot,
        Dress,
        GiveYou
    },
    data() {
        return {
            images: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'],
            grids: [
                {
                    url: '', //请求数据的url
                    txt: '时尚衣装',
                    itemType: '1',
                    icon: require('../../static/sy/yf.png')
                },
                {
                    url: '',
                    txt: '精美包包',
                    itemType: '2',
                    icon: require('../../static/sy/bb.png')
                },
                {
                    url: '',
                    txt: '轻松跑鞋',
                    itemType: '3',
                    icon: require('../../static/sy/xz.png')
                },
                {
                    url: '',
                    txt: '奢侈饰品',
                    itemType: '4',
                    icon: require('../../static/sy/sp.png')
                },
                {
                    url: '',
                    txt: '仿古家具',
                    itemType: '5',
                    icon: require('../../static/sy/jj.png')
                },
                {
                    url: '',
                    txt: '廉价文具',
                    itemType: '6',
                    icon: require('../../static/sy/wj.png')
                }
            ],
            discountImg: require('../../static/sy/yhq.jpg'),
            weekTtitle: require('../../static/sy/new-week-title.jpg'),
            hotData: {
                hotTitle: require('../../static/sy/hot.jpg'),
                hotleft: {
                    imgUrl: require('../../static/sy/hot-left.jpg'),
                    url: ''
                },
                hotright1: {
                    imgUrl: require('../../static/sy/hot-right1.jpg'),
                    url: ''
                },
                hotright2: {
                    imgUrl: require('../../static/sy/hot-right2.jpg'),
                    url: ''
                }
            },
            dressData: {
                imgUrl: require('../../static/sy/dressImg.jpg'),
                url: ''
            },
            //瀑布流插件专用数据
            giveData: {
                titleUrl: require('../../static/sy/giveyou.jpg')
            }
        }
    },
    mounted() {
        this.$store.commit('SET_ACTIVE', 0)
    },
    methods: {
        getYhq() {
            this.$router.push('/receiveCoupon')
            console.log('331')
        },
        goRareInfo() {
            this.$router.push('/roatCostly')
        },
        fatherMethod(e) {
            console.log(e, 'e')
        },
        goNewWeek() {
            console.log('qu')
        },
        goNewWeekItem(e) {
            console.log(e, 'eee')
            this.$router.push({path: '/goodsDetail', query: {id: e.id}})
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
