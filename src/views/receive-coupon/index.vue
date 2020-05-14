<template>
    <div class="container">
        <Coupon :quan="couponInfo" @fun="fatherMethod"></Coupon>
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
                name: '1',
                title: '待使用',
                isUse: 4,
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
            }
        }
    },
    methods: {
        fatherMethod(e) {
            console.log(e, '123')
            this.$toast.success('领取成功')
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>