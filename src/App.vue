<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import tool from "&/scripts/tools";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app {
  width: 100%;
}
</style>
