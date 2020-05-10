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
            console.log(this.$store.state.nowAddress, '222')
            this.$router.replace('/subOrder')
        }
    }
}
</script>
<style>
@import './index.less';
</style>