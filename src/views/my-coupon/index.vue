<template>
    <div class="container">
        <van-tabs v-model="activeName" @click="get">
            <van-tab
                :title="item.title"
                :name="item.name"
                v-for="(item,index) in data"
                :key="index"
            >
                <div style="display:flex;flex-wrap:wrap;justify-content:center;">
                    <Coupon :list="item.cards"></Coupon>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Coupon from '../../components/coupon-template/index'
export default {
    components: {
        Coupon
    },
    data() {
        return {
            activeName: '1',
            data: [
                {
                    name: '1',
                    title: '未使用',
                    cards: [
                        {
                            denomination: '100',
                            introduce: '满1000减100',
                            limit: '仅限包包、外套使用',
                            validity: '永久使用'
                        },
                        {
                            denomination: '200',
                            introduce: '满1000减200',
                            limit: '仅限包包、外套使用',
                            validity: '永久使用1'
                        },
                        {
                            denomination: '300',
                            introduce: '满1000减300',
                            limit: '仅限包包、外套使用',
                            validity: '永久使用2'
                        }
                    ]
                },
                {
                    name: '2',
                    title: '已使用',
                    cards: [
                        {
                            denomination: '100',
                            introduce: '满1000减100',
                            limit: '仅限包包、外套使用',
                            validity: '永久使用'
                        },
                        {
                            denomination: '200',
                            introduce: '满1000减200',
                            limit: '仅限包包、外套使用',
                            validity: '永久使用1'
                        },
                        {
                            denomination: '300',
                            introduce: '满1000减300',
                            limit: '仅限包包、外套使用',
                            validity: '永久使用2'
                        }
                    ]
                },
                {
                    name: '3',
                    title: '已过期',
                    cards: [
                        {
                            denomination: '100',
                            introduce: '满1000减100',
                            limit: '仅限包包、外套使用',
                            validity: '过期了'
                        },
                        {
                            denomination: '200',
                            introduce: '满1000减200',
                            limit: '仅限包包、外套使用',
                            validity: '过期了'
                        },
                        {denomination: '300', introduce: '满1000减300', limit: '仅限包包、外套使用', validity: '过期了'}
                    ]
                }
            ]
        }
    },
    methods: {
        get() {
            console.log(this.activeName, '9988777')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
