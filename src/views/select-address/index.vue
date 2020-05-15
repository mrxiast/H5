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
            this.$store.commit('SET_NOWADDRESS', this.address)
            let addressData = JSON.stringify(data)
            this.$router.replace({path: '/subOrder', query: {address: addressData}})
        }
    }
}
</script>
<style>
@import './index.less';
</style>