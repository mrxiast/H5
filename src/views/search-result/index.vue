<template>
    <div class="container">
        <van-nav-bar title="街区之家" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <template #right>
                <van-icon name="wap-home-o" size="20" />
            </template>
        </van-nav-bar>
        <div style="padding-bottom:5px;border-bottom:1px solid #ddd;">
            <form action="/">
                <van-search
                    v-model="keyWord"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="searchWord"
                    @cancel="onCancel"
                />
            </form>
        </div>
        <div>
            <Waterfall :url="url" :keyWord="keyWord"></Waterfall>
        </div>
    </div>
</template>>

<script>
import Waterfall from '../../components/my-waterfall/index'
export default {
    components: {
        Waterfall
    },
    data() {
        return {
            //瀑布流插件专用数据
            giveData: {
                titleUrl: require('../../static/sy/giveyou.jpg')
            },
            url: '123',
            keyWord: '',
            hotWords: [
                '手机',
                '电脑',
                '玩具',
                '床上三件套',
                '笔记本电脑',
                '酒鬼花生',
                '凉皮',
                '方便面',
                'gtx2080ti',
                '无淀粉火腿肠',
                '卤牛肉羊肉',
                '耐克断码清仓'
            ],
            historyWords: [],
            showWater: false
        }
    },
    created() {
        if (localStorage.getItem('historyWords')) {
            this.historyWords = JSON.parse(localStorage.getItem('historyWords'))
        }
    },
    methods: {
        onClickLeft() {
            console.log('left')
            this.$router.go(-1)
        },
        onClickRight() {
            console.log('onClickRight')
            this.$router.push('/home')
        },
        onCancel() {
            console.log('qx')
        },
        searchWord(e) {
            this.showWater = true
            this.keyWord = e
            for (let i = 0; i < this.historyWords.length; ++i) {
                if (e === this.historyWords[i]) {
                    this.historyWords.splice(i, 1)
                }
            }
            console.log(this.historyWords, 'this.historyWords')
            if (this.historyWords.length >= 10) {
                this.historyWords.pop()

                this.historyWords.unshift(e)
            } else {
                this.historyWords.unshift(e)
            }
            localStorage.setItem('historyWords', JSON.stringify(this.historyWords))
            this.historyWords = JSON.parse(localStorage.getItem('historyWords'))
        },
        showClearModal() {
            Dialog.confirm({
                message: '确认删除历史记录'
            })
                .then(() => {
                    localStorage.setItem('historyWords', '')
                    this.historyWords = []
                })
                .catch(() => {
                    // on cancel
                })
        }
    }
}
</script>>
<style lang="less">
@import './index.less';
</style>