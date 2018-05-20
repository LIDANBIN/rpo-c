<template>
  <div class="recommend-wrapper">
    <top-bar>
      <my-menus slot="right"></my-menus>
    </top-bar>
    <my-header :type="'recommend'"></my-header>
    <load-more :requireRefresh="true" :on-infinite="onInfinite" :on-refresh="onRefresh">
        <recommend-list v-for="(i,index) in recommendLists" :key="index"></recommend-list>
    </load-more>
  </div>
</template>

<script>
import myHeader from "@/my-header/my-header";
import topBar from "@/top-bar/top-bar";
import myMenus from "@/my-menus/my-menus"

import loadMore from "base/load-more/load-more";
import recommendList from "@/recommend-list/recommend-list";
export default {
  name: "recommend",
  data() {
    return {
      recommendLists: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    onInfinite(done) {
      window.setTimeout(() => {
        // 刷新数据
        // console.log(111, this)
        this.recommendLists.push(1);
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
    recommendList,
    myHeader,
    topBar,
    myMenus
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';
.recommend-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
