<template>
  <div class="observer-wrapper">
    <top-bar>
      <div slot="right" class="icon-more center">
        <ul class="menus-wrapper">
          <li class="menu"><router-link to="/recommend">职位内推</router-link></li>
          <li class="menu"><router-link to="/observer">职场观察</router-link></li>
          <li class="menu"><router-link to="/usercenter">个人中心</router-link></li>
        </ul>
      </div>
    </top-bar>
    <load-more :on-infinite="onInfinite" :on-refresh="onRefresh">
        <my-header :type="'observer'"></my-header>
        <observer-list v-for="(i,index) in observerLists" :key="index"></observer-list>
    </load-more>
  </div>
</template>

<script>
import myHeader from "@/my-header/my-header";
import loadMore from "base/load-more/load-more";
import observerList from "@/observer-list/observer-list";
import topBar from "@/top-bar/top-bar";

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
        this.observerLists.push(1);
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
    topBar
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';
.observer-wrapper {
  height: 100vh;

  .icon-more {
    l-font(72px)
    color: #000;
    width: 50px;
    position: relative;

    &:hover {
      .menus-wrapper {
        display: block;
      }
    }

    .menus-wrapper {
      display: none;
      position: absolute;
      l-font(38px)
      width: 200px;
      color: #aaa;
      background: rgba(255, 255, 255, 0.9);
      right: 10px;
      top: calc(100% + 10px);
      border-radius: 8px;
      box-shadow: 0 0 20px 0 #ccc;

      .menu {
        width: 100%;
        border-bottom: 1px solid #ccc; /* no */
      }
    }
  }
}
</style>
