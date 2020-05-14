<template>
    <div class="container">
        <van-grid :column-num="3" class="border">
            <van-grid-item
                v-for="(item,index) in grids"
                :key="index"
                :icon="item.icon"
                :text="item.txt"
                @click="goClass(item)"
            />
        </van-grid>
    </div>
</template>

<script>
export default {
    name: 'grid',
    props: {
        grids: {
            type: Array,
            dafault() {
                return []
            }
        }
    },
    data() {
        return {}
    },
    methods: {
        goClass(e) {
            this.$emit('fun', e)
            this.$router.push({path: '/classify', query: {url: e.url, itemType: e.itemType, name: e.txt}})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
