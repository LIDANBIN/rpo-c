<template>
  <div class="observer-wrapper">
    <top-bar>
      <my-menus slot="right"></my-menus>
    </top-bar>
    <load-more :requireRefresh="true" :on-infinite="onInfinite" :on-refresh="onRefresh">
        <loading slot="pull-refresh" :mode="'circular-lines'" :number="4"></loading>
        <my-header :type="'observer'"></my-header>
        <observer-list v-for="(i,index) in observerLists" :key="index"></observer-list>
        <loading slot="load-more" :mode="'pinstripe'"></loading>
    </load-more>
  </div>
</template>

<script>
import myHeader from "@/my-header/my-header";
import loadMore from "base/load-more/load-more";
import observerList from "@/observer-list/observer-list";
import topBar from "@/top-bar/top-bar";
import myMenus from "@/my-menus/my-menus";
import Loading from "base/loading/loading"

export default {
  name: "observer",
  data() {
    return {
      observerLists: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    onInfinite(done) {
      window.setTimeout(() => {
        // 刷新数据
        // console.log(111, this)
        this.observerLists =  this.observerLists.concat([1, 2, 3, 4, 5, 6, 7, 8]);
        done();
      }, 2000);
    },
    onRefresh(done) {
      window.setTimeout(() => {
        // 刷新数据
        done();
      }, 2000);
    }
  },
  components: {
    loadMore,
    observerList,
    myHeader,
    topBar,
    myMenus,
    Loading
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';

.observer-wrapper
  height 100vh
</style>
