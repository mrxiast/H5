<template>
    <div class="box">
        <div class="content">
            <div class="title">注册</div>
            <div class="form">
                <van-row>
                    <van-col span="24" class="borderBtm">
                        <van-field v-model="username" name="用户名" label="*用户名" placeholder="请填写用户名" />
                    </van-col>
                    <van-col span="24" class="borderBtm">
                        <van-field
                            v-model="nickName"
                            name="用户昵称"
                            label="*用户昵称"
                            placeholder="请填写用户昵称"
                        />
                    </van-col>
                    <van-col span="24" class="borderBtm">
                        <van-field v-model="email" name="用户邮箱" label="*用户邮箱" placeholder="请填写用户邮箱" />
                    </van-col>
                    <van-col span="16" class="borderBtm">
                        <van-field v-model="phone" name="手机号" label="*手机号" placeholder="请填写手机号" />
                    </van-col>
                    <van-col :span="8">
                        <van-button
                            :disabled="showTime"
                            @click="getCode"
                            type="primary"
                            style="height:44px;font-size:12px;width:100px;"
                        >{{ txtVal }}</van-button>
                    </van-col>
                    <van-col span="24" class="borderBtm">
                        <van-field v-model="code" name="验证码" label="*验证码" placeholder="请填写验证码" />
                    </van-col>
                    <van-col span="24" class="borderBtm">
                        <van-field
                            type="password"
                            v-model="password"
                            name="密码"
                            label="*密码"
                            placeholder="请填写密码"
                        />
                    </van-col>
                    <van-col span="24" class="borderBtm">
                        <van-field
                            type="password"
                            v-model="password1"
                            name="确认密码"
                            label="*确认密码"
                            placeholder="请再次填写密码"
                        />
                    </van-col>
                    <van-col span="24">
                        <van-button style="margin-top:0.5rem;" type="info" @click="submit">提交注册</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
import {registerApi, getCodeApi} from './api.js'
import {encrypt} from '@/utils/cryptoAes.js'
export default {
    data() {
        return {
            username: '',
            nickName: '',
            code: '',
            password: '',
            password1: '',
            phone: '',
            email: '',
            num: 60,
            showTime: false,
            txtVal: '获取验证码'
        }
    },
    methods: {
        validator(val) {
            return /^1[3456789]\d{9}$/.test(val)
            // return /1\d{10}/.test(val);
        },
        submit() {
            if (!this.username.trim()) {
                this.$toast('用户名有误')
                return
            }
            if (!this.nickName.trim()) {
                this.$toast('用户昵称有误')
                return
            }
            if (!this.code) {
                this.$toast('验证码有误')
                return
            }
            if (!this.password) {
                this.$toast('密码不能为空')
                return
            }
            if (!this.password1) {
                this.$toast('确认密码不能为空')
                return
            }
            if (this.password !== this.password1) {
                this.$toast('两次密码不一致')
                return
            }
            let data = {
                username: this.username,
                code: this.code,
                password: this.password,
                password1: this.password1,
                phone: this.phone,
                email: this.email,
                nickName: this.nickName
            }
            registerApi(data).then(res => {
                if (res.code === 200) {
                    this.$toast.success('注册成功')
                    this.$router.push('/login')
                }
            })
        },
        getCode() {
            let that = this
            if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                this.$toast.fail('电话号有误')
                return
            }
            this.showTime = true
            let timer = setInterval(function() {
                that.num--
                that.txtVal = '再次获取' + that.num
                console.log(that.num)
                if (that.num <= 0) {
                    that.txtVal = '验证码'
                    that.num = 60
                    that.showTime = false
                    window.clearInterval(timer)
                }
            }, 1000)
            getCodeApi({phone: this.phone}).then(res => {
                if (res.code === 200) {
                    this.code = res.phoneCode
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
