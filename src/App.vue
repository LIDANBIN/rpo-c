<template>
  <div id="app">
    <avatar></avatar>
  </div>
</template>

<script>
import tool from "&/scripts/tools";
import Avatar from '@/avatar/avatar'
export default {
  name: "App",
  data() {
    return {
      url: false,
      src: ''
    };
  },
  components: {
    Avatar
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app {
  width: 375px;
  background: pink;
  height: 50px;

  .test {
    width: 166px;
    height: 166px;
    background: black;
  }

  img {
    max-width: 100%;
  }
}
</style>
