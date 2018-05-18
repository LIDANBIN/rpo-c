<template>
  <div class="observer-wrapper">
    <my-header></my-header>
    <load-more :on-infinite="onInfinite" :on-refresh="onRefresh">
        <observer-list v-for="(i,index) in observerLists" :key="index"></observer-list>
    </load-more>
  </div>
</template>

<script>
import myHeader from '@/my-header/my-header'
import loadMore from 'base/load-more/load-more'
import observerList from '@/observer-list/observer-list'
export default {
    name: 'observer',
    data() {
        return {
            observerLists: [1, 2, 3, 4, 5]
        }
    },
    methods: {
        onInfinite(done) {
            window.setTimeout(() => {
                // 刷新数据
                // console.log(111, this)
                this.observerLists.push(1)
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
        observerList,
        myHeader
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .observer-wrapper
        height 100vh
</style>
