<template>
    <div class="container">
        <div class="box">
            <div class="top">
                <div class="top-box">
                    <div class="ava-info">
                        <div class="ava"></div>
                        <div class="login-status">未登录</div>
                        <div class="getBtn">去授权</div>
                    </div>
                    <div class="bottom">
                        <div class="b-left" @click="goMycoupon">
                            <div>3</div>
                            <div>优惠券</div>
                        </div>
                        <div class="b-vertical"></div>
                        <div class="b-right" @click="goAboutWe">
                            <div>
                                <van-icon name="info-o" />
                            </div>
                            <div>关于我们</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="prow-box">
                <div class="shadow-box">
                    <div class="title">我的订单</div>
                    <div class="item-box">
                        <div class="item">
                            <div>
                                <van-icon color="#177859" size="30" name="coupon-o" />
                            </div>
                            <div>全部订单</div>
                        </div>
                        <div class="item">
                            <div>
                                <van-icon color="#177859" size="30" name="balance-pay" />
                            </div>
                            <div>待支付</div>
                        </div>
                        <div class="item">
                            <div>
                                <van-icon color="#177859" size="30" name="certificate" />
                            </div>
                            <div>待发货</div>
                        </div>
                        <div class="item">
                            <div>
                                <van-icon color="#177859" size="30" name="logistics" />
                            </div>
                            <div>待收货</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <van-cell
                    title="收货地址"
                    is-link
                    to="/selectAddress"
                    style="text-align:left;border-top:1px solid #ddd;"
                >
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-icon name="location-o" style="line-height: inherit;" />
                    </template>
                </van-cell>
                <van-cell title="设置" is-link style="text-align:left;border-top:1px solid #ddd;">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-icon name="setting-o" style="line-height: inherit;" />
                    </template>
                </van-cell>
                <van-cell
                    title="退出"
                    style="text-align:left;border-top:1px solid #ddd;"
                    @click="exit"
                >
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-icon name="info-o" style="line-height: inherit;" />
                    </template>
                </van-cell>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showExitModal: false
        }
    },
    methods: {
        exit() {
            this.showExitModal = true
        },
        cancel() {
            this.showExitModal = false
        },
        isOk() {
            this.$store.commit('LOGIN_OUT')
            this.$router.push('/login')
        },
        goMycoupon() {
            console.log('我的优惠券')
            this.$router.push('/myCoupon')
        },
        goAboutWe() {
            console.log('关于我们')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
