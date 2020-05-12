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
                show-postal
                show-set-default
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
                country: '', //区县
                areaCode: '', //地址code：ID
                addressDetail: '', //详细地址
                isDefault: false //是否选择默认
            },
            show: false,
            areaList,
            pageTitle: '',
            addressList: [
                {
                    id: '001',
                    name: '张三', //姓名
                    tel: '13842744944', //电话
                    province: '河南省', //省份
                    city: '郑州市', //城市
                    country: '上街区', //区县
                    areaCode: '', //地址code：ID
                    addressDetail: '王村镇555号', //详细地址
                    isDefault: true //是否选择默认
                },
                {
                    id: '002',
                    name: '张三', //姓名
                    tel: '13842744944', //电话
                    province: '河南省', //省份
                    city: '郑州市', //城市
                    country: '上街区', //区县
                    areaCode: '', //地址code：ID
                    addressDetail: '王村镇555号', //详细地址
                    isDefault: false //是否选择默认
                },
                {
                    id: '003',
                    name: '张三', //姓名
                    tel: '13842744944', //电话
                    province: '河南省', //省份
                    city: '郑州市', //城市
                    country: '上街区', //区县
                    areaCode: '', //地址code：ID
                    addressDetail: '王村镇555号', //详细地址
                    isDefault: false //是否选择默认
                }
            ],
            radio: '',
            type: 1 //1添加 2编辑
        }
    },
    mounted() {
        this.pageTitle = this.$router.currentRoute.meta.name
        this.radio = this.addressList[0].id
    },
    methods: {
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
                this.$toast.success('添加成功')
                this.show = false
            } else {
                this.$toast.success('编辑成功')
                this.show = false
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
            this.show = true
        },
        fatherDel(e) {
            console.log(e, 'fatherDel')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>