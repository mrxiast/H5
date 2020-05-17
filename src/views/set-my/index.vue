<template>
    <div class="container">
        <div>
            <van-form>
                <van-field v-model="nickName" name="昵称" label="昵称" placeholder="请输入昵称" />
                <van-field name="uploader" label="修改头像">
                    <template #input>
                        <van-uploader
                            accept="jpeg/jpg/png/gif"
                            v-model="uploader"
                            multiple
                            :max-count="1"
                            :max-size="3 * 1024*1024 "
                            @oversize="onOversize"
                            :after-read="afterRead"
                        />
                    </template>
                </van-field>
                <div style="margin: 16px;">
                    <van-button round block type="info" @click="onSubmit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import {uploadApi, setUserInfoApi, getUserInfoApi} from './api'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            nickName: '',
            avaUrl: '',
            uploader: []
        }
    },
    mounted() {},
    methods: {
        onSubmit() {
            if (!this.nickName) {
                this.$toast('昵称有误')
                return
            }
            if (!this.avaUrl) {
                this.$toast('请上传头像')
                return
            }
            let data = {
                nickName: this.nickName,
                avaUrl: this.avaUrl
            }
            setUserInfoApi(data).then(res => {
                if (res.code === 200) {
                    this.$toast.success('修改成功')
                    //修改后调取接口，获取最新个人信息
                    this.getUserInfo()
                }
            })
            console.log(data, 'data')
        },
        getUserInfo() {
            getUserInfoApi().then(res => {
                if (res.code === 200) {
                    var inFifteenMinutes = new Date(new Date().getTime() + 6 * 60 * 60 * 1000 * 1000)
                    Cookies.set('userInfo', JSON.stringify(res.result), {expires: inFifteenMinutes})
                    this.$router.push('/my')
                }
            })
        },
        //获取上传图片的大小
        onOversize(file) {
            console.log(file, '8888')
            this.$toast('图片尺寸最大3M，请重新上传')
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file)
            file.status = 'uploading'
            file.message = '上传中...'
            let imgData = {
                content: file.content,
                fileName: file.file.name
            }
            uploadApi({img: imgData}).then(res => {
                if (res.code === 200) {
                    this.avaUrl = res.result.avaUrl
                    file.status = 'success'
                    file.message = '上传成功'
                } else {
                    file.status = 'failed'
                    file.message = '上传失败'
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
