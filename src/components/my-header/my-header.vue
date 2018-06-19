<template>
  <header class="header-wrapper">
    <div class="title-wrapper" @click="handleClick" :class="[type]" ref="title">
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
  created() {
    this.$on('click', () => {
      // this.value = false
    })
  },
  methods: {
    handleClick() {
      // this.$message({
      //   iconClass: 'icon-dingbu',
      //   message: '返回顶部'
      // })
      this.$emit('click')
    }
  },
  watch: {
    scrollTop(val) {
      let titleH = this.$refs.title.offsetHeight;
      if (val >= titleH) {
        this.$refs.tab.classList.add('fix')
        this.$refs.tab.classList.add('fixed-animated')
      } else {
        this.$refs.tab.classList.remove('fix')
        this.$refs.tab.classList.remove('fixed-animated')
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
      box-shadow 0 0 5px 0 #ccc
      &.fixed-animated
        -moz-animation fixedHeader .3s linear
        -webkit-animation fixedHeader .3s linear
        animation fixedHeader .3s linear
        -moz-transform-origin center top
        -webkit-transform-origin center top
        transform-origin center top
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
@-webkit-keyframes fixedHeader 
  0%
    opacity 0
    // -webkit-transform rotateX(100deg)
  100%
    opacity 1
    // -webkit-transform rotateX(0)
@keyframes fixedHeader
  0%
    opacity 0
    // transform rotateX(100deg)
  100%
    opacity 1
    // transform rotateX(0)
</style>
