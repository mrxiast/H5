<template>
    <div class="container">
        <div>
            <carItem></carItem>
        </div>
    </div>
</template>

<script>
import carItem from '../../components/car-item/index'
export default {
    components: {
        carItem
    },
    data() {
        return {}
    },
    methods: {}
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
