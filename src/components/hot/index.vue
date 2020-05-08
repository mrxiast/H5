<template>
    <div class="container">
        <img :src="hotData.hotTitle" alt @click="moreHot" />
        <div class="content">
            <div class="con-left" style>
                <img :src="hotData.hotleft.imgUrl" alt />
            </div>
            <div class="con-right" style>
                <img :src="hotData.hotright1.imgUrl" alt />
            </div>
            <div class="con-right" style="margin-top:10px;">
                <img :src="hotData.hotright2.imgUrl" alt />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'grid',
    props: {
        hotData: {
            type: Object,
            dafault: () => {},
            require: true
        }
    },
    data() {
        return {}
    },
    methods: {
        moreHot() {
            this.$router.push('/moreHot')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
