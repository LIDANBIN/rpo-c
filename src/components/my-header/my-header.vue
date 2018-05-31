<template>
  <header class="header-wrapper">
    <div class="title-wrapper" :class="[type]" ref="title">
    </div>
    <div class="tab-wrapper" ref="tab">
      <router-link class="tab center bold" to="/observer"><span>职场观察</span></router-link>
      <router-link class="tab center bold" to="/recommend"><span>职场内推</span></router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "my-header",
  props: ["type", "scrollTop"],
  watch: {
    scrollTop(val) {
      console.log(val)
      let titleH = this.$refs.title.offsetHeight;
      if (val >= titleH) {
        this.$refs.tab.classList.add('fix')
      } else {
        this.$refs.tab.classList.remove('fix')
      }
    }
  }
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
    background $color-background-d
    &.fix
      position fixed
      top 0
      left 0
      right 0
      z-index 109
      background rgba(255, 255, 255, .95)
      box-shadow 0 0 5px 0 #ccc
    .tab
      flex 1
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
