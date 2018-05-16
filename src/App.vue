<template>
  <div id="app">
    <!-- <avatar></avatar> -->
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import tool from "&/scripts/tools";
import Avatar from '@/avatar/avatar'
import myHeader from '@/my-header/my-header'

export default {
  name: "App",
  data() {
    return {
      url: false,
      src: ''
    };
  },
  components: {
    Avatar,
    myHeader
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app
  width: 100%;
</style>
