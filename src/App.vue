<template>
  <div id="app" class='icon-enter'>
    <div @click="src = !src" class="test"></div>
    <cropper :src="src"></cropper>
  </div>
</template>

<script>
import Cropper from 'base/cropper/cropper'
  export default {
    name: 'App',
    data() {
      return {
        src: false
      }
    },
    components: {
      Cropper
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    width 375px
    background pink
    height 50px
    .test
      width 166px
      height 166px
      background black
    img 
      max-width 100%
</style>
