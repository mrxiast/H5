<template>
    <div class="container">
        <div class="box">
            <div class="top">
                <div class="top-box">
                    <div class="ava-info">
                        <div class="ava">
                            <img v-if="userInfo.avaUrl" :src="userInfo.avaUrl" alt />
                            <img v-else src="http://service.lovetxt.xyz/upImgs/static/nztx.jpg" alt />
                        </div>
                        <div class="login-status">{{userInfo.nickName ? userInfo.nickName:'未登录'}}</div>
                        <div class="getBtn" v-if="userInfo.avaUrl">去授权</div>
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
                        <div class="item" @click="goAllOrder">
                            <div>
                                <van-icon color="#177859" size="30" name="coupon-o" />
                            </div>
                            <div>全部订单</div>
                        </div>
                        <div class="item" @click="goWaitPay">
                            <div>
                                <van-icon color="#177859" size="30" name="balance-pay" />
                            </div>
                            <div>已完成</div>
                        </div>
                        <div class="item" @click="goWaitget">
                            <div>
                                <van-icon color="#177859" size="30" name="certificate" />
                            </div>
                            <div>待发货</div>
                        </div>
                        <div class="item" @click="goWaitRec">
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
                    to="/myAddress"
                    style="text-align:left;border-top:1px solid #ddd;"
                >
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-icon name="location-o" style="line-height: inherit;" />
                    </template>
                </van-cell>
                <van-cell
                    title="设置"
                    is-link
                    style="text-align:left;border-top:1px solid #ddd;"
                    @click="setMy"
                >
                    <template #icon>
                        <van-icon name="setting-o" style="line-height: inherit;" />
                    </template>
                </van-cell>
                <van-cell
                    title="退出"
                    style="text-align:left;border-top:1px solid #ddd;border-bottom:1px solid #ddd;"
                    @click="exit"
                >
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-icon name="info-o" style="line-height: inherit;" />
                    </template>
                </van-cell>
            </div>
        </div>
        <van-dialog
            title="确定退出当前账号"
            v-model="showExitModal"
            @confirm="isOk"
            @cancel="cancel"
            show-cancel-button
        ></van-dialog>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            showExitModal: false,
            userInfo: {
                nickName: '',
                avaUrl: '',
                email: '',
                phone: ''
            }
        }
    },
    mounted() {
        const userInfo = JSON.parse(Cookies.get('userInfo'))
        this.userInfo = {
            nickName: userInfo.nickName,
            avaUrl: userInfo.avaUrl,
            email: userInfo.email,
            phone: userInfo.phone
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
        },
        goAllOrder() {
            this.$router.push({name: 'allOrder', params: {nav: '1'}})
        },
        goWaitPay() {
            this.$router.push({name: 'allOrder', params: {nav: '2'}})
        },
        goWaitget() {
            this.$router.push({name: 'allOrder', params: {nav: '3'}})
        },
        goWaitRec() {
            this.$router.push({name: 'allOrder', params: {nav: '4'}})
        },
        setMy() {
            this.$router.push('/setMy')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
