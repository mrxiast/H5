<template>
    <div class="container">
        <van-nav-bar
            :title="pageTitle"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
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
        <div class="con_tent">
            <div class="history" v-if="historyWords.length > 0">
                <div class="title">
                    <div class="box"></div>
                    <div class="big_title">历史搜索</div>
                    <div class="icon">
                        <img @click="showClearModal" src="../../static/classic/ljt.png" alt />
                    </div>
                </div>
                <div class="search-word">
                    <div
                        class="tags"
                        v-for="(item,index) in historyWords"
                        :key="index"
                        @click="searchWord(item)"
                    >{{item}}</div>
                </div>
            </div>
            <div class="history">
                <div class="title">
                    <div class="box"></div>
                    <div class="big_title">热门搜索</div>
                </div>
                <div class="search-word">
                    <div
                        class="tags"
                        v-for="(item,index) in hotWords"
                        :key="item"
                        @click="searchWord(item)"
                    >{{item}}</div>
                </div>
            </div>
        </div>
    </div>
</template>>

<script>
export default {
    data() {
        return {
            pageTitle: '',
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
        this.pageTitle = this.$router.currentRoute.meta.name
        console.log(this.$router, '770')
    },
    methods: {
        onClickLeft() {
            console.log('left')
            this.$router.go(-1)
        },
        onClickRight() {
            console.log('onClickRight')
            this.$store.commit('SET_ACTIVE', 0)
            this.$router.push('/home')
        },
        onCancel() {
            console.log('qx')
        },
        searchWord(e) {
            this.keyWord = e
            for (let i = 0; i < this.historyWords.length; ++i) {
                if (e === this.historyWords[i]) {
                    this.historyWords.splice(i, 1)
                }
            }
            if (this.historyWords.length >= 10) {
                this.historyWords.pop()

                this.historyWords.unshift(e)
            } else {
                this.historyWords.unshift(e)
            }
            localStorage.setItem('historyWords', JSON.stringify(this.historyWords))
            this.historyWords = JSON.parse(localStorage.getItem('historyWords'))
            this.$router.replace('/searchResult?keyWord=' + this.keyWord)
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