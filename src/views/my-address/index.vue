<template>
    <div class="container">
        <div>
            <van-nav-bar
                :title="pageTitle"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #right>
                    <!-- <van-icon name="wap-home-o" size="20" /> -->
                    新增
                </template>
            </van-nav-bar>
            <div class="content">
                <van-radio-group v-model="radio">
                    <div class="item" v-for="(item,index) in addressList" :key="item.id">
                        <AddressTemplate :addressInfo="item"></AddressTemplate>
                    </div>
                </van-radio-group>
            </div>
        </div>
    </div>
</template>
<script >
import AddressTemplate from '../../components/address-template/index'
export default {
    components: {
        AddressTemplate
    },
    data() {
        return {
            pageTitle: '',
            addressList: [
                {id: '001', name: '张三', phone: '13742744944', status: '1', address: '郑州市郑州市'},
                {id: '002', name: '李四', phone: '13742744944', status: '2', address: '郑州市郑州市'},
                {id: '003', name: '张三', phone: '13742744944', status: '2', address: '在深圳市郑州市'}
            ],
            radio: ''
        }
    },
    mounted() {
        this.pageTitle = this.$router.currentRoute.meta.name
        this.radio = this.addressList[0].id
    },
    methods: {
        onClickLeft() {
            console.log('left')
            this.$router.go(-1)
        },
        onClickRight() {
            console.log('onClickRight')
            // this.$store.commit('SET_ACTIVE', 0)
            this.$router.push('/home')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>