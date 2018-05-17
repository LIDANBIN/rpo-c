<template>
  <transition name="enlarge">
    <div v-show="showTop" class="to_top_wrapper">
      <ul>
        <li class="iconfont icon-xiangshangjiantou" @click="toTop"></li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
function scroll(pageDis, speed) {
  let scale = document.documentElement.offsetHeight / document.documentElement.clientHeight
  // 滚动条滚动的距离
  let disTop = pageDis * scale
  // chrome
  let d = document.body
  // firefox
  let f = document.documentElement
  let timer
  timer = setInterval(function () {
    d.scrollTop -= Math.ceil(d.scrollTop * 0.1)
    f.scrollTop -= Math.ceil(f.scrollTop * 0.1)
    // console.log(disTop - 10, d.scrollTop, disTop + 10, f.scrollTop);
    if (disTop !== 0) {
      if ((disTop - 10 < d.scrollTop && d.scrollTop < disTop + 10) || (disTop - 10 < f.scrollTop && f.scrollTop < disTop + 10)) {
        clearInterval(timer)
      }
    }
    if (d.scrollTop == disTop && f.scrollTop == disTop) clearInterval(timer)
  }, speed)
}
  import {scroll} from 'common/js/scroll'

  export default {
    data() {
      return {
        showTop: false
      }
    },
    mounted() {
      // 监听页面滚动的距离
      window.addEventListener('scroll', this._menu)
    },
    methods: {
      toTop() {
        let scale = document.documentElement.offsetHeight / document.documentElement.clientHeight
        // 页面滚动的距离
        let pageDis = 0
        // 滚动的速度
        let speed = 10
        scroll(pageDis, speed)
      },
      _menu() {
        // chrome
        this.scroll = document.body.scrollTop
        // firefox
        this.f_scroll = document.documentElement.scrollTop
        if (this.scroll > 300 || this.f_scroll > 300) {
          this.showTop = true
        } else {
          this.showTop = false
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .to_top_wrapper
    width 60px
    position fixed
    right 10px
    bottom 100px
    z-index 98
    &.enlarge-enter-active
      transition all .5s cubic-bezier(0, 1.86, .08, 1.19)
    &.enlarge-enter, &.enlarge-leave-active
      transform: scale(0) translateY(100px)
    li
      font-size 30px
      height 60px
      display block
      width 100%
      line-height 60px
      color #fff
      background #85C2F1
      margin-bottom 5px
      text-align center
      cursor pointer
      &:last-child
        position relative
        margin-bottom 0

</style>
