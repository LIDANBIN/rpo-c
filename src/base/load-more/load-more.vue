<template>
  <div class="load-more-wrapper"
              @scroll.passive="handleScroll" 
  >
        <div
            class="load-more-inner"
            ref="wrapper"
            @touchstart="handleStart"
            @touchmove="handleMove"
            @touchend="handleEnd"
        >
            <!-- 下拉刷新 页面滚动到顶部并且手指向下滑动-->
            <header v-if="requireRefresh" class="header tips center" ref="headerTip">
                <div v-show="refreshFlag">
                  <slot name="pull-refresh">
                    <div>刷新中......</div>
                  </slot>
                </div>
                <div ref="pullTip" v-show="!refreshFlag">松开刷新。</div>
            </header>
            <!-- 信息列表 -->
            <section class="contents">
                <slot>
                
                </slot>
                <!-- 上拉加载 页面滚动到底部并且手指向上滑动-->
                <footer class="footer center tips" ref="footerTip" v-show="infiniting || isDone">
                    <div v-show="isDone">暂无更多......</div>
                    <div v-show="!isDone">
                      <slot name="load-more">
                        <!-- <div class="tips">加载更多……</div>
                        <div>暂无更多。</div> -->
                        <div>加载更多......</div>
                    </slot>
                    </div>
                </footer>
            </section>
            
        </div>
  </div>
</template>

<script>
export default {
  props: {
    requireRefresh: {
      // 是否需要下拉刷新
      type: Boolean,
      default: false
    },
    onInfinite: {
      // 上拉加载回调函数
      type: Function,
      default: undefined,
      require: true
    },
    onRefresh: {
      // 下拉刷新回调
      type: Function,
      default: undefined,
      require: true
    },
    dragThreshold: {
      // 临界值
      type: Number,
      default: 100
    },
    moveCount: {
      // 位移系数
      type: Number,
      default: 0.3
    }
  },
  data() {
    return {
      rNumber: /\d+\.?\d*/,
      dragStart: null, // 开始抓取标志位
      percentage: 0, // 拖动量的百分比
      joinRefreshFlag: null, // 进入下拉刷新状态标志位 是否处于下拉状态
      infiniting: false, // false未加载 true正在加载
      scrollTop: null, // 初始滚动位置
      refreshFlag: 0, // 0 未刷新 1 正在刷新
      isDone: false
    };
  },
  methods: {
    handleStart(e) {
      clearTimeout(this.timer);
      if (!this.requireRefresh || this.refreshFlag) {
        return;
      }
      this.dragStart = e.touches[0].pageY || 0;
      this.scrollTop = this.$el.scrollTop || 0;
      this.$refs.wrapper.style.transform = '';
      this.$refs.wrapper.style.transition = '';
    },
    handleMove(e) {
      clearTimeout(this.timer);
      if (this.dragStart === null || this.refreshFlag) {
        return;
      }
      this.percentage = this.dragStart - e.touches[0].pageY
      // this.percentage = (this.dragStart - e.touches[0].pageY) / window.screen.height;
      // console.log(this.dragStart,e.touches[0].pageY, this.$el.scrollTop)
      if (this.$el.scrollTop === 0) {
        if (this.percentage < 0) {
          e.preventDefault();
          var translateX = -this.percentage - this.scrollTop;
          this.joinRefreshFlag = true;
          let pullTip = this.$refs.pullTip;
          if (Math.abs(this.percentage) > this.dragThreshold) {
            pullTip.innerText = "松开刷新";
          } else {
            pullTip.innerText = "下拉刷新更多";
          }
          // console.log(translateX, this.percentage, this.moveCount, this.$el.scrollTop)
          if (this.percentage > 0) {
            this.$refs.wrapper.style.transform = `translateY(${translateX}px)`
          } else {
            this.$refs.wrapper.style.transform = `translateY(${translateX}px)`
          }
        } else {
          if (this.joinRefreshFlag == null) {
            this.joinRefreshFlag = false;
          }
        }
      } else {
        if (this.joinRefreshFlag == null) {
          this.joinRefreshFlag = false;
        }
      }
    },
    handleEnd() {
      let self = this;
      // clearTimeout(this.timer);
      if (this.percentage === 0 || this.refreshFlag) {
        return;
      }
      if (Math.abs(this.percentage) > this.dragThreshold && this.joinRefreshFlag) {
        this.refreshFlag = 1;
        this.onRefresh(this.refreshDone);
        let height = this.$refs.headerTip.offsetHeight;
        this.$refs.wrapper.style.transition = 'transform 0.3s linear';
        this.$refs.wrapper.style.transform = `translateY(${height}px)`;
      } else {
        if (this.joinRefreshFlag) {
          this.$refs.wrapper.style.transition = 'transform 0.3s linear';
          this.$refs.wrapper.style.transform = `translateY(0)`;
        }
      }
      // 重置joinRefreshFlag
      this.joinRefreshFlag = null;
      // 重置dragStart
      this.dragStart = null;
      this.scrollTop = null;
      // 重置percentage
      this.percentage = 0;
      this.execInfinite();
    },
    refreshDone() {
      this.refreshFlag = 0;
      let pullTip = this.$refs.pullTip;
      pullTip.innerText = "刷新完毕";
      this.$refs.wrapper.style.transition = 'transform 0.3s linear';
      this.$refs.wrapper.style.transform = "translateY(0)";
      setTimeout(() => {
        this.$refs.wrapper.style.transform = '';
        this.$refs.wrapper.style.transition = '';
      }, 300)
    },
    handleScroll() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.execInfinite();
      }, 50);
    },
    execInfinite() {
      let innerHeight = this.$refs.wrapper.offsetHeight;
      if (this.infiniting || this.isDone || innerHeight < document.documentElement.clientHeight) {
        return;
      }
      let scrollY = this.$el.scrollTop;
      let clientHeight = this.$el.clientHeight;
      let scrollHeight = this.$el.scrollHeight;
      let height = this.$refs.footerTip.offsetHeight;
      if (clientHeight + scrollY >= (scrollHeight - height)) {
          this.infiniting = true;
          this.onInfinite(this.infiniteDone);
        }
    },
    infiniteDone(isDone) {
      this.isDone = isDone
      this.infiniting = false;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';
.load-more-wrapper
  height 100%
  overflow auto
  -webkit-overflow-scrolling touch
  .load-more-inner
    display inline-block
    width 100%
    .contents
      overflow hidden
    .tips
      height 50px
      width 100%
      line-height 50px
      l-font(24px)
      &.header
        margin-top -50px
</style>