<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script >
export default {
    data() {
        return {}
    },
    created() {
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
        }

        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state))
        })

        // setTimeout(() => {
        //     window.L2Dwidget.init({
        //         pluginRootPath: '../public/live2dw/',
        //         pluginJsPath: 'lib/',
        //         pluginModelPath: 'live2d-widget-model-nico/assets/',
        //         tagMode: false,
        //         debug: false,
        //         model: {
        //             // jsonPath: '../public/live2dw/live2d-widget-model-nico/assets/nico.model.json',
        //             scale: 1
        //         },

        //         display: {position: 'left', width: 150, height: 300},
        //         mobile: {show: true},
        //         log: false
        //     })
        // }, 1000)
    }
}
</script>

<style lang="less">
.router-link-active {
    text-decoration: none !important;
}
.van-tabs__line {
    background-color: #157658 !important;
}
a {
    text-decoraction: none !important;
}
body {
    height: 100%;
}
#app {
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
