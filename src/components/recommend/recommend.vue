<template>
  <div class="recommend-wrapper">
    <load-more :scroll-callback="scrollCallback" :requireRefresh="true" :on-infinite="onInfinite" :on-refresh="onRefresh">
      <top-bar>
        <my-menus slot="right"></my-menus>
      </top-bar>
      <loading slot="pull-refresh" :mode="'circular-lines'" :number="4"></loading>
      <my-header :scrollTop="scrollTop" :type="'recommend'"></my-header>
      <recommend-list v-for="(i,index) in recommendLists" :key="index"></recommend-list>
      <loading slot="load-more" :mode="'pinstripe'"></loading>
    </load-more>
  </div>
</template>

<script>
import myHeader from "@/my-header/my-header";
import topBar from "@/top-bar/top-bar";
import myMenus from "@/my-menus/my-menus";
import Loading from "base/loading/loading"
import loadMore from "base/load-more/load-more";
import recommendList from "@/recommend-list/recommend-list";
export default {
  name: "recommend",
  data() {
    return {
      recommendLists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      scrollTop: ''
    };
  },
  methods: {
    scrollCallback(target) {
      this.scrollTop = target.scrollTop;
    },
    onInfinite(done) {
      window.setTimeout(() => {
        // 刷新数据
        // console.log(111, this)
        let isDone = this.recommendLists.length > 40;
        if (!isDone) {
          this.recommendLists =  this.recommendLists.concat([1, 2, 3, 4, 5, 6, 7, 8]);
        }
        done(isDone);
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
    recommendList,
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

.recommend-wrapper
  height 100vh

</style>
