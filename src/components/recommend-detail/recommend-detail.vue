<template>
  <div class="recommend-detail-wrapper">
      <top-bar :backgroundColor="'#FFDB01'">
        <div slot="left" class="icon-fanhui center" @touchend="handleEnd"></div>
        <div class="center-title">专场详情</div>
        <my-menus slot="right"></my-menus>
      </top-bar>
      <div class="recommend">
        <h2 class="title-wrapper bold">
          <router-link to="/recommend/detail" class="title">广州第七城Java专场招聘会</router-link>
          <span :class="[online?'online':'offline']">{{online?'线上':'线下'}}</span>
        </h2>
        <div class="offer-number">
          <span class="number">{{'500+'}}</span>家企业·<span class="number">{{'5000+'}}</span>职位机会
        </div>
        <div class="position-time">
          <span class="icon icon-dizhi"></span>{{'深圳市'}}<span class="icon icon-shijian"></span>{{'4月30日'}}截止
        </div>
      </div>
      <h3 class="list-title center">职位列表</h3>
      <div class="job-lists-wrapper">
        <div class="job-list" v-for="i in 10" :key="i">
          <label>
            <div class="check-box">
              <span :class="[checkJob === i ? 'icon-danxuan-xuanzhong' : 'icon-danxuan']"></span>
              <!-- <input type="checkbox" :value="i" name="" id="" v-model="checkJobArr"> -->
              <input type="radio" name="job" id="" v-model="checkJob" :value="i">
            </div>
          </label>
          <div class="job-infos">
            <div class="job-name">
              <span class="name"><router-link class="bold" to="/job/detail">{{'web前端开发工程师'}}</router-link></span>
              <span class="time">{{24}}小时内反馈</span>
              <span class="salary">{{10}}k-{{15}}k</span>
            </div>
            <div class="info">
              {{'深圳'}}<span class="line">|</span>{{3}}-{{5}}年<span class="line">|</span>{{'本科'}}
            </div>
            <div class="company"><router-link to="/company/detail">{{'广州唯品会电子商务有限公司'}}</router-link><span class="icon-enter"></span></div>
          </div>
        </div>
      </div>
      <apply-job :show="!!checkJob" @cancelDialog="cancelDialog"></apply-job>
  </div>
</template>

<script>
import myMenus from "@/my-menus/my-menus"
import topBar from "@/top-bar/top-bar";
import applyJob from "@/apply-job/apply-job"

export default {
  name: "recommend-detail",
  data() {
    return {
      online: true,
      checkJob: ''
    };
  },
  computed: {
  },
  methods: {
    handleEnd() {
      this.$router.go(-1);
    },
    cancelDialog() {
      this.checkJob = ''
    }
  },
  components: {
    myMenus,
    topBar,
    applyJob
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';
.recommend-detail-wrapper
  padding 44px 0 44px
  min-height 100vh
  .icon-fanhui
    l-font(42px)
    font-weight bold
    color #000
    width 50px
  .center-title
    l-font(40px)
  .recommend
    height: 106px;
    background: $color-background-d;
    padding: 14px 14px 14px 16px;
    .title-wrapper
      display flex
      line-height 20px
      l-font(32px)
      align-items center
      .title
        color $color-text-t       
      span
        color $color-line-b
        margin-left 13px
        padding 0 5px
        border-radius 2px
        height 16px
        line-height 16px
        l-font(18px)
        l-border(1px solid $color-line-b)
        &.offline
          color $color-text-t
          border-color #dcdcdc
    .offer-number
      l-font(26px)
      color #2a2a2a
      line-height 38px
      .number
        color #ff5b5a
    .position-time
      l-font(24px)
      color #969696
      position relative
      .icon
        l-font(24px)
        margin 0 3px 0 0
        &:last-of-type
          margin-left 10px
  .list-title
    line-height 44px
    l-font(28px)
    color $color-text-d
  .job-list
    margin-bottom 13px
    background $color-background-d
    width 100%
    height 127px
    display flex
    label 
      height 100%
    .check-box
      width 45px
      display flex
      height 100%
      justify-content center 
      align-items center
      input
        display none
      .icon-danxuan
        l-font(30px)
        color #BEBEBE
      .icon-danxuan-xuanzhong
        l-font(30px)
        color #17AE19
    .job-infos
      flex-grow 1
      padding 13px 15px 0 0
      .job-name
        l-font(32px)
        line-height 22px
        height 22px
        display flex
        color $color-text-t
        align-items center
        .name
          no-wrap()
          max-width 60%
          a
            color $color-text-t
        .time
          l-font(18px)
          color #7ed321
          l-border(1px solid #7ed321)
          border-radius 2px
          margin-left 8px
          display block
          display flex
          height 18px
          align-items center
          padding 0 3px
        .salary
          flex-grow 1
          l-font(28px)
          color #ff3e3e
          text-align right 
      .info
        line-height 50px
        color $color-text-d
        l-border(1px solid #f0f0f0)
        border-top none 
        border-left none
        border-right none
        .line
          color #DCDCDC
          margin 0 3px
      .company
        line-height 42px
        l-font(26px)
        no-wrap()
        color $color-text-d
        position relative
        a
          color $color-text-d
        .icon-enter
          l-font(36px)
          color $color-text-d
          position absolute
          right 0
          top 50%
          transform translateY(-50%)
  .bottom
    l-font(24px)
    color $color-text-d
    &.bottom-selectJob
      padding 0 15px
    &.bottom-collect
      .icon
        l-font(24px)
        margin 0 3px
        &.icon-love-b
          color #D81E06
    &.bottom-apply
      width 110px
      height 44px
      outline none
      border none
      color $color-text-t
      background radial-gradient(#FEDA02, #FEDB02) 
      border-radius 0
</style>
