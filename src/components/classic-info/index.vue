<template>
    <div class="container">
        <div class="banner">
            <img :src="item.bannerUrl" alt />
        </div>
        <div class="content">
            <div v-for="(items,index) in item.content" :key="items.title">
                <div class="title">
                    <span class="dashed">----------</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;{{items.title}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span class="dashed">----------</span>
                </div>
                <div class="cont_box">
                    <div
                        class="item"
                        v-for="(item1,index1) in items.children"
                        :key="item1.url"
                        @click="goInfo(item1)"
                    >
                        <img :src="item1.imgUrl" alt />
                        <div class="item_title">{{item1.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>>
<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        clickItem: {
            type: Function,
            default: null
        }
    },
    data() {
        return {}
    },
    methods: {
        goInfo(e) {
            this.clickItem(e)
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>