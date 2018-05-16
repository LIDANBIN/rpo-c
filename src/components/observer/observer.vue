<template>
  <div class="observer-wrapper">
      <load-more :on-infinite="onInfinite">
            <observer-list v-for="i in observerLists" :key="i"></observer-list>
      </load-more>
  </div>
</template>

<script>
import loadMore from 'base/load-more/load-more'
import observerList from '@/observer-list/observer-list'
export default {
    data() {
        return {
            observerLists: [1, 2, 3, 4, 5]
        }
    },
    methods: {
        onInfinite() {

        }
    },
    components: {
        loadMore,
        observerList
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .observer-wrapper
        height 100vh
        padding-top 408px
</style>
