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
            <header v-if="requireRefresh" class="header tips center" :class="[refreshState === 1?'refreshing':'']" ref="headerTip">
                <div v-show="refreshState === 1">
                  <slot name="pull-refresh">
                    <div>刷新中……</div>
                  </slot>
                </div>
                <div ref="pullTip" v-show="refreshState !== 1">松开刷新。</div>
            </header>
            <!-- 信息列表 -->
            <section class="contents">
                <slot>
                
                </slot>
                <!-- 上拉加载 页面滚动到底部并且手指向上滑动-->
                <footer v-show="infiniting" class="footer center" ref="footerTip">
                    <slot name="load-more">
                        <div class="tips">加载更多……</div>
                        <!-- <div>暂无更多。</div> -->
                    </slot>
                </footer>
            </section>
            
        </div>
  </div>
</template>

<script>
export default {
  props: {
    requireRefresh: { // 是否需要下拉刷新
      type: Boolean,
      default: false
    },
    onInfinite: { // 上拉加载回调函数
      type: Function,
      default: undefined,
      require: true
    },
    onRefresh: { // 下拉刷新回调
      type: Function,
      default: undefined,
      require: true
    },
    maxPullDis: { // 下拉触发刷新回调所需的距离
      type: Number,
      default: 150,
      require: false
    }
  },
  data() {
    return {
      touchInfos: {},
      loading: false,
      infiniting: false,
      isMoving: false, // 是否处于下拉状态
      refreshState: 0 // 0 未刷新 1 正在刷新 2 刷新成功
    };
  },
  methods: {
    handleStart(e) {
      this.isMoving = false;
      if (!this.requireRefresh) {
        return;
      }
      let pullTip = this.$refs.pullTip
      pullTip.innerText = '下拉刷新更多'
      this.touchInfos.startY = e.touches[0].pageY || 0;
      this.touchInfos.startScroll = this.$el.scrollTop || 0;
    },
    handleMove(e) {
      this.touchInfos.nowY = e.targetTouches[0].pageY
      this.touchInfos.disY = this.touchInfos.nowY  - this.touchInfos.startY;
      if (this.$el.scrollTop > 0 || !this.requireRefresh || this.touchInfos.disY <= 0) {
        return;
      }
      e.preventDefault();
      this.refreshState = 0;
      // this.touchInfos.diff = this.touchInfos.disY - this.touchInfos.startScroll;

      if (this.touchInfos.disY >= 0) {
        this.isMoving = true;
        this.$refs.wrapper.style.transform = `translateY(${this.touchInfos.disY}px)`;
      }
      if (this.touchInfos.disY >= this.maxPullDis) {
        let pullTip = this.$refs.pullTip
        pullTip.innerText = '松开刷新'
      }
    },
    handleEnd() {
      if (!this.requireRefresh || !this.isMoving) {
        return;
      }
      if (this.touchInfos.disY >= this.maxPullDis) {
        this.refreshState = 1;
        this.onRefresh(this.refreshDone);
        this.$refs.wrapper.style.transform = `translateY(50px)`;
      }
      this.isMoving = false;
    },
    refreshDone() {
      this.refreshState = 2;
      let pullTip = this.$refs.pullTip
      pullTip.innerText = '刷新完毕'
      this.$refs.wrapper.style.transform = '';
    },
    handleScroll() {
      if (this.infiniting) {
        return;
      }
      clearTimeout(this.timer);
      
      this.timer = setTimeout(() => {
        let scrollY = this.$el.scrollTop;
        let clientHeight = this.$el.clientHeight;
        let scrollHeight = this.$el.scrollHeight;
        if (clientHeight + scrollY >= scrollHeight) {
          this.infiniting = true;
          this.onInfinite(this.infiniteDone);
        }
      }, 50);
    },
    infiniteDone() {
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
    transition transform 0.3s cubic-bezier(0.33, 1.12, 0.34, 1.11)
    .contents
      overflow hidden
    .tips
      height 50px
      width 100%
      line-height 50px
      l-font(24px)
      &.header
        margin-top -50px
        transition all 0.2s
        &.refreshing
          margin-top 0
</style>
