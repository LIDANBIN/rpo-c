<template>
  <div class="recommend-detail-wrapper">
    <top-bar :backgroundColor="'#FFDB01'">
    <div slot="left" class="icon-fanhui center" @touchend="handleEnd"></div>
    <div class="center-title">职位详情</div>
    <my-menus slot="right"></my-menus>
    </top-bar>
    <div class="job-wrapper">
        <div class="job-name">
            <span class="name"><router-link to="/job/detail">{{'web前端开发工程师'}}</router-link></span>
            <span class="time">{{24}}小时内反馈</span>
            <span class="salary">{{10}}k-{{15}}k</span>
        </div>
        <div class="info">
            {{'深圳'}}<span class="line">|</span>{{3}}到{{5}}年<span class="line">|</span>{{'本科'}}
        </div>
        <div class="company"><router-link to="/company/detail">{{'广州唯品会电子商务有限公司'}}</router-link><span class="icon-enter"></span></div>
        <div class="position"><span class="icon-didian"></span>{{'深圳市生态科技园9栋B3座'}}<span class="icon-enter"></span></div>
    </div>
    <h3 class="job-title center">职位描述</h3>
    <div class="job-describle">
    
    工作职责：
    1、对汽车后市场需求进行深度调研，探索车后市场的变现
    模式；
    2、负责业务商业变现产品的模式设计、执行；
    3、负责相关系统设计；
    4、协调相关各部门资源，推进产品需求落地。

    岗位要求：
    1、对商业模式有热情，有良好的商业感觉，能够把握用户
    和合作伙伴的核心诉求；
    2、产品设计能力，将需求转化为线上产品，并推动产品上
    线，做到快速试点、推广；
    3、以目标为导向，优秀的沟通协作能力；
    4、1年以上工作经验，有商业产品工作经验优。
    
    </div>
  </div>
</template>

<script>
import myMenus from "@/my-menus/my-menus"
import topBar from "@/top-bar/top-bar";
export default {
  name: "observer-list",
  data() {
    return {
      online: true,
      checkJobArr: []
    };
  },
  methods: {
    handleEnd() {
      this.$router.go(-1);
    }
  },
  components: {
    myMenus,
    topBar
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';
.recommend-detail-wrapper
    padding 44px 0 15px
    min-height 100vh
    .icon-fanhui
        l-font(42px)
        font-weight bold
        color #000
        width 50px
    .center-title
        l-font(40px)
    .job-wrapper
        margin-top 13px
        background $color-background-d
        width 100%
        padding 13px 15px 0 15px
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
                padding 0 3px
                line-height 16px
            .salary
                flex-grow 1
                l-font(28px)
                color #ff3e3e
                text-align right 
        .info
            line-height 50px
            color $color-text-d
            .line
                color #DCDCDC
                margin 0 3px
        .company
            l-border(1px solid #f0f0f0)
            border-left none
            border-right none
        .company, .position
            line-height 42px
            l-font(26px)
            no-wrap()
            color $color-text-d
            position relative
            a
                margin-left 20px
                color $color-text-d
            .icon-didian
                color #FFD946
                l-font(26px)
                margin-right 9px
            .icon-enter
                l-font(36px)
                color $color-text-d
                position absolute
                right 0
                top 50%
                transform translateY(-50%)
    .job-title
        line-height 44px
        l-font(28px)
        color $color-text-d
    .job-describle
        padding 15px
        l-font(28px)
        color $color-text-d
        background $color-background-d
        line-height 26px
</style>
