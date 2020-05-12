<template>
    <div class="container">
        <div class="banner">
            <img src="../../static/sy/sale.jpg" alt />
        </div>
        <Swip :images="images"></Swip>
        <Nine :grids="grids"></Nine>
        <div @click="getYhq">
            <DisCount :discountImg="discountImg"></DisCount>
        </div>
        <NewWeek :weekTtitle="weekTtitle"></NewWeek>
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
                    url: '',
                    txt: '衣服',
                    icon: require('../../static/sy/yf.png')
                },
                {
                    url: '',
                    txt: '包包',
                    icon: require('../../static/sy/bb.png')
                },
                {
                    url: '',
                    txt: '鞋',
                    icon: require('../../static/sy/xz.png')
                },
                {
                    url: '',
                    txt: '饰品',
                    icon: require('../../static/sy/sp.png')
                },
                {
                    url: '',
                    txt: '家具',
                    icon: require('../../static/sy/jj.png')
                },
                {
                    url: '',
                    txt: '文具',
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
            console.log('331')
        },
        goRareInfo() {
            this.$router.push('/roatCostly')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
