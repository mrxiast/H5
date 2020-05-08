<template>
    <div
        class="container"
        :style="'background:url('+ require('../../static/hotbg.jpg')+ ') no-repeat top center'"
    >
        <div class="title">
            <div class="border-title">最热卖的榜单排名人气商品倾情推荐</div>
        </div>
        <div class="content">
            <div v-for="(item,index) in hotList " :key="item.id">
                <HotTemplate :reorder="index" :dataInfo="item"></HotTemplate>
            </div>
        </div>
    </div>
</template>
<script>
import HotTemplate from '../../components/hot-template/index'
export default {
    components: {
        HotTemplate
    },
    data() {
        return {
            hotList: [
                {
                    imgUrl:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588943361900&di=28359615fc75c6835feb19ee10dc64e3&imgtype=0&src=http%3A%2F%2Fimg.08087.cc%2Fuploads%2F20191231%2F11%2F1577762687-NdhofDeGaT.jpg',
                    title: '针织衫头套',
                    number: '19922',
                    price: '199',
                    id: '1'
                },
                {
                    imgUrl:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588943361900&di=28359615fc75c6835feb19ee10dc64e3&imgtype=0&src=http%3A%2F%2Fimg.08087.cc%2Fuploads%2F20191231%2F11%2F1577762687-NdhofDeGaT.jpg',
                    title: '针织衫头套',
                    number: '19922',
                    price: '599',
                    id: '2'
                },
                {
                    imgUrl:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588943361900&di=28359615fc75c6835feb19ee10dc64e3&imgtype=0&src=http%3A%2F%2Fimg.08087.cc%2Fuploads%2F20191231%2F11%2F1577762687-NdhofDeGaT.jpg',
                    title: '针织衫头套',
                    number: '19922',
                    price: '499',
                    id: '3'
                },
                {
                    imgUrl:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588943361900&di=28359615fc75c6835feb19ee10dc64e3&imgtype=0&src=http%3A%2F%2Fimg.08087.cc%2Fuploads%2F20191231%2F11%2F1577762687-NdhofDeGaT.jpg',
                    title: '针织衫头套',
                    number: '19922',
                    price: '1299',
                    id: '4'
                },
                {
                    imgUrl:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588943361900&di=28359615fc75c6835feb19ee10dc64e3&imgtype=0&src=http%3A%2F%2Fimg.08087.cc%2Fuploads%2F20191231%2F11%2F1577762687-NdhofDeGaT.jpg',
                    title: '针织衫头套',
                    number: '19922',
                    price: '399',
                    id: '5'
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>