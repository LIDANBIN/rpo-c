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
export default {
  props: ['elem'],
  data() {
    return {
      showTop: false
    };
  },
  mounted() {
    console.log(this.elem)
    // 监听页面滚动的距离
    this.elem.addEventListener("scroll", this._menu);
  },
  methods: {
    toTop() {
      // 页面滚动的距离
      let pageDis = 0;
      // 滚动的速度
      let speed = 10;
      this.scroll(pageDis, speed);
    },
    scroll(pageDis, speed) {
      let scale = document.documentElement.offsetHeight / document.documentElement.clientHeight;
      // 滚动条滚动的距离
      let disTop = pageDis * scale;
      let timer;
      timer = setInterval(function() {
        this.elem.scrollTop -= Math.ceil(this.elem.scrollTop * 0.1);
        this.elem.scrollTop -= Math.ceil(this.elem.scrollTop * 0.1);
        if (disTop !== 0) {
          if ((disTop - 10 < this.elem.scrollTop && this.elem.scrollTop < disTop + 10) || (disTop - 10 < this.elem.scrollTop && this.elem.scrollTop < disTop + 10)) {
            clearInterval(timer);
          }
        }
        if (this.elem.scrollTop == disTop && this.elem.scrollTop == disTop)
          clearInterval(timer);
      }, speed);
    },
    _menu() {
      this.scroll = this.elem.scrollTop;
      if (this.scroll > 300) {
        this.showTop = true;
      } else {
        this.showTop = false;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.to_top_wrapper {
  width: 60px;
  position: fixed;
  right: 10px;
  bottom: 100px;
  z-index: 98;

  &.enlarge-enter-active {
    transition: all 0.5s cubic-bezier(0, 1.86, 0.08, 1.19);
  }

  &.enlarge-enter, &.enlarge-leave-active {
    transform: scale(0) translateY(100px);
  }

  li {
    font-size: 30px;
    height: 60px;
    display: block;
    width: 100%;
    line-height: 60px;
    color: #fff;
    background: #85C2F1;
    margin-bottom: 5px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      position: relative;
      margin-bottom: 0;
    }
  }
}
</style>
