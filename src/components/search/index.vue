<template>
    <form action="/">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
</template>
<script>
export default {
    data() {
        return {
            value: ''
        }
    },
    methods: {
        onSearch(val) {
            console.log(val, 'val')
        },
        onCancel() {
            console.log('取消')
        }
    }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
@import '../common.less';
</style>