<template>
  <div class="observer-list-wrapper">
      <img class="picture" src="./pic.jpeg" alt="">
      <div class="infos">
        <h3 class="info-title"><router-link class="bold" to="/observer/detail">那个辞职去看世界的人，后来过得怎么样了？</router-link></h3>
        <p class="introduction">裸辞、转行、Gap Year，你准备好了吗？</p>
      </div>
      <router-link to="/observer/detail" class="apply">猛戳报名<span class="icon-enter"></span></router-link>
  </div>
</template>

<script>
export default {
  name: "observer-list",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';

.observer-list-wrapper
  height 110px
  background $color-background-d
  margin 13px 0
  display flex
  position relative
  justify-content center
  align-items center
  .picture
    width 27%
    height 73px
  .infos
    width 60%
    height 73px
    margin-left 15px
    line-height 18px
    .info-title
      height 36px
      overflow hidden
      a
        l-font(26px)
        color $color-text-t
    .introduction
      color $color-text-d
      no-wrap()
  .apply
    color $color-text-b
    position absolute
    l-font(24px)
    right 13px
    bottom 7px
    .icon-enter 
      l-font(24px)
</style>
