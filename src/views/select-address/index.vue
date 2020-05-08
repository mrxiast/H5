<template>
    <div class="container">
        <SelectbMap @func="getMsgFormSon"></SelectbMap>
        <!-- <SelectgMap></SelectgMap> -->
    </div>
</template>
<script>
import SelectbMap from '../../components/select-bmap/index'
import SelectgMap from '../../components/select-gmap/index'

export default {
    components: {
        SelectbMap,
        SelectgMap
    },
    data() {
        return {
            address: {}
        }
    },
    methods: {
        getMsgFormSon(data) {
            this.address = data
        }
    }
}
</script>
<style>
@import './index.less';
</style>