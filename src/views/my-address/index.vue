<template>
    <div class="container">
        <div>
            <van-nav-bar :title="pageTitle" @click-right="onClickRight">
                <template #right>
                    <!-- <van-icon name="wap-home-o" size="20" /> -->
                    新增
                </template>
            </van-nav-bar>
            <div class="content">
                <van-radio-group v-model="radio">
                    <div class="item" v-for="(item,index) in addressList" :key="item.id">
                        <AddressTemplate
                            :addressInfo="item"
                            @exitItem="fatherExit"
                            @delItem="fatherDel"
                            @setDefault="setDefault"
                        ></AddressTemplate>
                    </div>
                </van-radio-group>
            </div>
        </div>
        <van-dialog
            :showConfirmButton="false"
            :showCancelButton="false"
            v-model="show"
            :title="title"
            show-cancel-button
        >
            <van-address-edit
                ref="vanAddress"
                :area-list="areaList"
                :address-info="AddressInfo"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="saveAddress"
            />
            <div style="position:relative;top:-45px;left:50%;margin-left:-144px;">
                <van-button
                    style="width:288px;height:44px;border-radius:44px;"
                    type="primary"
                    block
                    @click="onExit"
                >取消</van-button>
            </div>
        </van-dialog>
    </div>
</template>
<script >
import AddressTemplate from '../../components/address-template/index'
import areaList from '../../static/area/index.js'
import {getMyAddressApi, setDefaultAddressApi, setAddressApi, delAddressApi, addAddressApi} from './api.js'
import Cookies from 'js-cookie'
export default {
    components: {
        AddressTemplate
    },
    data() {
        return {
            title: '',
            AddressInfo: {
                //收货人信息初始值
                name: '', //姓名
                tel: '', //电话
                province: '', //省份
                city: '', //城市
                county: '', //区县
                areaCode: '', //地址code：ID
                addressDetail: '', //详细地址
                isDefault: false, //是否选择默认
                userId: '',
                id: ''
            },
            show: false,
            areaList,
            pageTitle: '',
            addressList: [],
            radio: '',
            type: 1 //1添加 2编辑
        }
    },
    mounted() {
        this.pageTitle = this.$router.currentRoute.meta.name

        this.init()
    },
    methods: {
        init() {
            let userId = JSON.parse(Cookies.get('userInfo')).userId

            getMyAddressApi({userId: userId}).then(res => {
                if (res.code === 200) {
                    this.addressList = res.result
                    if (this.addressList[0].isDefault == 1) {
                        this.radio = this.addressList[0].id
                    } else {
                        this.radio = ''
                    }
                }
            })
        },
        onClickLeft() {
            console.log('leftddd')
            window.history.back()
        },
        onClickRight() {
            console.log('onClickRight')
            this.type = 1
            this.title = '新增'
            // this.$store.commit('SET_ACTIVE', 0)
            this.show = true
        },
        saveAddress(e) {
            if (this.type === 1) {
                let data = JSON.parse(JSON.stringify(e))
                data.isDefault = 2
                console.log(data, 'data')
                addAddressApi(data).then(res => {
                    if (res.code === 200) {
                        this.$toast.success(res.msg)
                        this.show = false
                        this.init()
                    }
                })
            } else {
                let data = JSON.parse(JSON.stringify(e))
                data.isDefault = 2
                setAddressApi(data).then(res => {
                    if (res.code === 200) {
                        this.$toast.success(res.msg)
                        this.show = false
                        this.init()
                    }
                })
            }
            this.AddressInfo = {
                name: '', //姓名
                tel: '', //电话
                province: '', //省份
                city: '', //城市
                county: '', //区县
                areaCode: '', //地址code：ID
                addressDetail: '', //详细地址
                isDefault: false, //是否选择默认
                userId: '',
                id: ''
            }
        },
        //退出编辑
        onExit() {
            this.show = false
            this.AddressInfo = {}
        },
        //编辑
        fatherExit(e) {
            this.type = 2
            this.title = '编辑'
            this.AddressInfo = JSON.parse(JSON.stringify(e))
            if (JSON.parse(JSON.stringify(e)).isDefault == 1) {
                this.AddressInfo.isDefault = true
            } else {
                this.AddressInfo.isDefault = false
            }
            this.show = true
        },
        fatherDel(e) {
            let data = {
                userId: e.userId,
                id: e.id
            }
            delAddressApi(data).then(res => {
                if (res.code === 200) {
                    this.$toast.success('删除成功')
                    this.init()
                }
            })
        },
        setDefault(e) {
            console.log(e)
            let data = {
                id: e.id,
                userId: e.userId
            }
            setDefaultAddressApi(data).then(res => {
                if (res.code === 200) {
                    this.$toast.success('操作成功')
                    this.init()
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>