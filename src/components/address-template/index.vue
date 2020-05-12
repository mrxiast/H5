<template>
    <div class="container">
        <div>
            <div class="tiao">
                <div
                    v-for="(item,index) in 12"
                    :key="item"
                    :class="index %2 === 0 ? 'oneTiao': 'twoTiao'"
                ></div>
            </div>
            <div class="info">
                <div class="top">
                    <div class="top-name-pnone">
                        <div class="top-name">{{addressInfo.name}}</div>
                        <div class="top-phone">{{addressInfo.phone}}</div>
                    </div>
                    <div class="top-address">{{addressInfo.address}}</div>
                </div>
                <div class="bottom">
                    <div class="bot-left" @click="setDefault">
                        <van-radio
                            color="red"
                            :name="addressInfo.id"
                        >{{addressInfo.status == 1 ? '默认':'设为默认' }}</van-radio>
                    </div>
                    <div class="bot-right">
                        <div class="bot-edit" @click="exitItem">
                            <div class="bot-icon">
                                <van-icon name="edit" size="20" />
                            </div>
                            <div class="bot-txt">编辑</div>
                        </div>
                        <div class="bot-edit" @click="delItem">
                            <div class="bot-icon">
                                <van-icon name="delete" size="20" />
                            </div>
                            <div class="bot-txt">删除</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tiao">
                <div
                    v-for="(item,index) in 12"
                    :key="item"
                    :class="index %2 === 0 ? 'oneTiao': 'twoTiao'"
                ></div>
            </div>
        </div>
        <van-dialog
            v-model="show"
            :title="modalTitle"
            @confirm="isOk"
            @cancel="isNo"
            show-cancel-button
        ></van-dialog>
    </div>
</template>
<script >
export default {
    props: {
        addressInfo: {
            type: Object,
            default: () => {}
        }
        // exitItem: {
        //     type: Function,
        //     default: () => {}
        // },
        // delItem: {
        //     type: Function,
        //     default: () => {}
        // }
    },
    data() {
        return {
            show: false,
            modalTitle: '',
            type: 1 //1为默认地址 2为删除
        }
    },
    mounted() {
        this.pageTitle = this.$router.currentRoute.meta.name
    },
    methods: {
        exitItem() {
            console.log('编辑')
            this.$emit('exitItem', this.addressInfo)
        },
        delItem() {
            this.type = 2
            this.modalTitle = '是否删除当前地址'
            this.show = true
            console.log('删除')
        },
        isOk() {
            if (this.type === 1) {
                console.log('设置成功')
            } else {
                this.$emit('delItem', this.addressInfo)
                console.log('删除成功')
            }
            this.show = false
        },
        isNo() {
            this.show = false
        },
        setDefault() {
            this.type = 1
            console.log('set')
            this.modalTitle = '是否把当前地址设为默认'
            this.show = true
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>