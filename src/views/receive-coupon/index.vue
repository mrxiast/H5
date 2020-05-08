<template>
    <div class="container">
        <Coupon :list="couponInfo.cards"></Coupon>
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
            couponInfo: {
                id: '333',
                name: '1',
                title: '未使用',
                cards: [
                    {
                        denomination: '100',
                        introduce: '满1000减100',
                        limit: '仅限包包、外套使用',
                        validity: '立即领券'
                    },
                    {
                        denomination: '200',
                        introduce: '满1000减200',
                        limit: '仅限包包、外套使用',
                        validity: '立即领券'
                    },
                    {
                        denomination: '300',
                        introduce: '满1000减300',
                        limit: '仅限包包、外套使用',
                        validity: '立即领券'
                    }
                ]
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>