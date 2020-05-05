<template>
    <div class="box">
        <GoodsInfo></GoodsInfo>
    </div>
</template>

<script>
import GoodsInfo from '../../components/goods-info/index'
export default {
    components: {
        GoodsInfo
    },
    data() {
        return {}
    },
    mounted() {
        console.log(this.$route.query.id, '321')
    },
    methods: {}
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
