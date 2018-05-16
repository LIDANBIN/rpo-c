<template>
  <div class="load-more-wrapper">
        <div
            class="load-more-inner"
            ref="wrapper"
            @touchstart="handleStart"
            @touchmove="handleMove"
            @touchend="handleEnd"
        >
            <!-- 下拉刷新 页面滚动到顶部并且手指向下滑动-->
            <header class="header tips center" :class="{loading: loading}" ref="headerTip">
                <slot name="pull-refresh">
                    <div v-show="!loading">松开加载。</div>
                    <div v-show="loading">加载中……</div>
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
      require: false
    },
    maxPullDis: {
      type: Number,
      default: 100,
      require: false
    }
  },
  data() {
    return {
      touchInfos: {},
      loading: false
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
      let disY =
        (this.touchInfos.nowY = e.targetTouches[0].pageY) -
        this.touchInfos.startY;
      let diff = (this.touchInfos.diff = disY - this.touchInfos.startScroll);
    //   console.log(diff);
      if (diff > 0) e.preventDefault();
      this.$refs.wrapper.style.transform = `translateY(${diff}px)`;
    },
    handleEnd() {
      if (this.touchInfos.diff >= this.maxPullDis) {
        this.loading = true;
      }
      this.$refs.wrapper.style.transform = `translateY(0px)`;
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
        transition: transform linear;

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

                &.loading {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
