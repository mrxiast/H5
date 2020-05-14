<template>
    <div class="container">
        <img :src="weekTtitle" alt />

        <div class="newItems_box">
            <div
                style
                v-for="item in newList"
                :key="item.id"
                class="newItems"
                @click.stop="goItem(item)"
            >
                <img style="width:80px;height:80px;" :src="item.urlImg" alt />
                <div>
                    <span class="green-price">￥{{item.price}}</span>
                    <br />
                    <span class="good">好评率 {{item.good}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'grid',
    props: {
        weekTtitle: {
            type: String,
            dafault() {
                return ''
            }
        }
    },
    data() {
        return {
            newList: [
                {name: '111', id: '111', urlImg: 'https://img.yzcdn.cn/vant/apple-1.jpg', price: '123', good: '99.3%'},
                {name: '222', id: '222', urlImg: 'https://img.yzcdn.cn/vant/apple-1.jpg', price: '123', good: '99.3%'},
                {name: '333', id: '333', urlImg: 'https://img.yzcdn.cn/vant/apple-1.jpg', price: '123', good: '99.3%'},
                {name: '444', id: '444', urlImg: 'https://img.yzcdn.cn/vant/apple-1.jpg', price: '123', good: '99.3%'},
                {name: '555', id: '555', urlImg: 'https://img.yzcdn.cn/vant/apple-1.jpg', price: '123', good: '99.3%'},
                {name: '666', id: '666', urlImg: 'https://img.yzcdn.cn/vant/apple-1.jpg', price: '123', good: '99.3%'},
                {name: '777', id: '777', urlImg: 'https://img.yzcdn.cn/vant/apple-1.jpg', price: '123', good: '99.3%'}
            ]
        }
    },
    methods: {
        goItem(e) {
            console.log(e)
            this.$emit('goNewWeekItem', e)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
