<template>
  <div class="recommend-wrapper">
    <my-header></my-header>
    <load-more :on-infinite="onInfinite" :on-refresh="onRefresh">
        <recommend-list v-for="(i,index) in recommendLists" :key="index"></recommend-list>
    </load-more>
  </div>
</template>

<script>
import myHeader from '@/my-header/my-header'

import loadMore from 'base/load-more/load-more'
import recommendList from '@/recommend-list/recommend-list'
export default {
    name: 'recommend',
    data() {
        return {
            recommendLists: [1, 2, 3, 4, 5]
        }
    },
    methods: {
        onInfinite(done) {
            window.setTimeout(() => {
                // 刷新数据
                // console.log(111, this)
                this.recommendLists.push(1)
                done();
            }, 2000)
        },
        onRefresh(done) {
            window.setTimeout(() => {
                // 刷新数据
                done();
            }, 2000)
        }
    },
    components: {
        loadMore,
        recommendList,
        myHeader
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.recommend-wrapper
        height 100vh
</style>
