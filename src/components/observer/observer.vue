<template>
  <div class="observer-wrapper">
      <!-- <pull-refresh :on-infinite="onInfinite"> -->
          <div class="observer-wrapper">
              <observer-list v-for="i in observerLists" :key="i"></observer-list>
          </div>
      <!-- </pull-refresh> -->
  </div>
</template>

<script>
import pullRefresh from 'base/pull-refresh/pull-refresh'
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
        pullRefresh,
        observerList
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
