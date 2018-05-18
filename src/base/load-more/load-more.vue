<template>
  <div class="load-more-wrapper"
              @scroll="handleScroll" 
  >
        <div
            class="load-more-inner"
            ref="wrapper"
            @touchstart="handleStart"
            @touchmove="handleMove"
            @touchend="handleEnd"
        >
            <!-- 下拉刷新 页面滚动到顶部并且手指向下滑动-->
            <header class="header tips center" :class="[refreshing?'refreshing':'']" ref="headerTip">
                <slot name="pull-refresh">
                    <div v-show="!refreshing">松开加载。</div>
                    <div v-show="refreshing">加载中……</div>
                </slot>
            </header>
            <!-- 信息列表 -->
            <section class="contents">
                <slot>
                
                </slot>
                <!-- 上拉加载 页面滚动到底部并且手指向上滑动-->
                <footer class="footer tips center" ref="footerTip">
                    <slot name="load-more">
                        <div>加载更多……</div>
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
    onInfinite: {
      type: Function,
      default: undefined,
      require: true
    },
    onRefresh: {
      type: Function,
      default: undefined,
      require: true
    },
    maxPullDis: {
      type: Number,
      default: 200,
      require: false
    }
  },
  data() {
    return {
      touchInfos: {},
      loading: false,
      refreshing: false,
    };
  },
  methods: {
    handleStart(e) {
      this.touchInfos.startY = e.touches[0].pageY;
      this.touchInfos.startScroll = this.$el.scrollTop || 0;
    },
    handleMove(e) {
      if (this.$el.scrollTop > 0) {
        return;
      }
      let disY = (this.touchInfos.nowY = e.targetTouches[0].pageY) - this.touchInfos.startY;
      let diff = (this.touchInfos.diff = disY - this.touchInfos.startScroll);
      if (diff > 0) e.preventDefault();
      this.$refs.wrapper.style.transform = `translateY(${diff}px)`;
    },
    handleEnd() {
      if (this.touchInfos.diff >= this.maxPullDis) {
        this.refreshing = true;
        this.onRefresh(this.refreshDone)
      }
      this.$refs.wrapper.style.transform = `translateY(0px)`;
    },
    refreshDone() {
      this.refreshing = false;
    },
    handleScroll() {
      if (this.infiniting) {
        return;
      }
      clearTimeout(this.timer)
			let scrollY = this.$el.scrollTop
      let clientHeight = this.$el.clientHeight
      let scrollHeight = this.$el.scrollHeight
			this.timer = setTimeout(() => {
				if ((clientHeight + scrollY) >= scrollHeight) {
          this.infiniting = true
          this.onInfinite(this.infiniteDone)
        }
			}, 50)
    },
    infiniteDone() {
      this.infiniting = false
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.load-more-wrapper {
    height: 100%;
    overflow: auto;

    .load-more-inner {
        -webkit-overflow-scrolling: touch;
        transition: transform .3s cubic-bezier(.33,1.12,.34,1.11);

        .contents {
            overflow: hidden;
        }

        .tips {
            height: 100px;
            width: 100%;
            line-height: 100px;
            font-size: 42px; /* px */

            &.header {
                margin-top: -100px;
                transition: all .2s;
                &.refreshing {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
