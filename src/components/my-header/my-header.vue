<template>
  <header class="header-wrapper">
    <div class="title-wrapper" :class="[type]">
    </div>
    <div class="tab-wrapper">
      <router-link class="tab center bold" to="/observer"><span>职场观察</span></router-link>
      <router-link class="tab center bold" to="/recommend"><span>职场内推</span></router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "my-header",
  props: ["type"]
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/mixin.styl';
@import '~&/style/variable.styl';

.header-wrapper
  text-align center
  .title-wrapper
    height 180px
    background-size cover
    background-position center
    &.observer
      bg-image('observer')
    &.recommend
      bg-image('recommend')
  .tab-wrapper
    display flex
    .tab
      flex 1
      background $color-background-d
      line-height 44px
      position relative
      l-font(28px)
      color $color-text-d
      &:first-child:after
        position absolute
        content ''
        display block
        height 60%
        width: 1px; /* no */
        top 50%
        transform translateY(-50%);
        background $color-theme-l
        right 0
      &.router-link-active
        span
          border-bottom: 6px solid $color-theme; /* no */
          height 44px
          padding 0 10px
          color $color-text
          display inline-block
</style>
