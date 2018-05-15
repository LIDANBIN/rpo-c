 <template>
   <div class="refresh-wrapper"
        @touchstart="touchStart($event)"
        @touchmove="touchMove($event)"
        @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
        <section class="inner">
            <!-- 存放信息列表 -->
            <slot></slot>
            <!-- 底部提示信息 -->
            <footer class="load-more">
                <slot name="load-more">
                    <div v-if="loading">加载中……</div>
                    <!-- <vue-loading v-if="loading" type="spin" color="rgba(0,0,0,0.4)" :size="{ width: '30px', height: '30px' }"></vue-loading> -->
                    <span v-else>{{loadingText}}</span>
                </slot>
            </footer>
        </section>
    </div>
</template>
  
<script type="text/ecmascript-6">
// import vueLoading from "vue-loading-template";
export default {
  props: {
    offset: {
      type: Number,
      default: 30
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    },
    loadingText: {
      type: String
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      startY: 0,
      startScroll: 0,
      infiniteLoading: false
    };
  },
  methods: {
    // 手指触碰到屏幕
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
      this.startScroll = this.$el.scrollTop || 0;
    },
    // 手指移动
    touchMove(e) {
      if (this.$el.scrollTop > 0) {
        return;
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
      if (diff > 0) e.preventDefault();
    },
    infinite() {
      this.infiniteLoading = true;
      this.onInfinite(this.infiniteDone);
    },

    infiniteDone() {
      this.infiniteLoading = false;
    },

    onScroll() {
      if (this.infiniteLoading) {
        return;
      }
      let outerHeight = this.$el.clientHeight;
      let innerHeight = this.$el.querySelector(".inner").clientHeight;
      let scrollTop = this.$el.scrollTop;
      let infiniteHeight = this.$el.querySelector(".load-more").clientHeight;
      let bottom = innerHeight - outerHeight - scrollTop;
      // 加载更多数据
      if (bottom < infiniteHeight) this.infinite();
    }
  },
  components: {
    // vueLoading
  }
};
</script>
  
<style scoped lang="stylus" rel="stylesheet/stylus">
.refresh-wrapper
    -webkit-overflow-scrolling touch
    background-color #f4f4f4
</style>