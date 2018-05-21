<template>
  <div class="company-detail-wrapper">
      <top-bar :backgroundColor="'#FFDB01'">
        <div slot="left" class="icon-fanhui center bold" @touchend="handleEnd"></div>
        <div class="center-title">公司简介</div>
        <my-menus slot="right"></my-menus>
      </top-bar>
      <div class="company-info">
        <h2 class="title-wrapper bold">{{'北京网聘咨询有限公司'}}</h2>
        <ul class="tags info">
            <li class="tag" v-for="(i,index) in tagArr" :key="index">{{i}}<span v-if="(index+1)<tagArr.length" class="line">/</span></li>
        </ul>
        <div class="info">{{'民营'}}</div>
        <div class="info">{{'1000人以上'}}</div>
      </div>
      <h3 class="list-title center">公司描述</h3>
      <p class="company-instruction">
        北京网聘咨询有限公司于2010-05-02正式挂牌成立以来，企业奉行“努力超越、追求卓越”的企业精神，在上级部门的支持与领导下取得了显著的成绩。
				北京网聘咨询有限公司以科学发展观为指导，深化改革，创新发展，在全体员工的共同努力下，取得了优异成绩，荣获多项荣誉称号，企业综合素质不断提升。特别是在主营业务（网络咨询）方面的发展成就有目共睹。
      </p>
      <h3 class="list-title center">在招职位</h3>
      <div class="job-lists-wrapper">
        <div class="job-list" v-for="i in 10" :key="i">
            <div class="job-name">
              <span class="name"><router-link to="/job/detail" class="bold">{{'web前端开发工程师'}}</router-link></span>
              <span class="time">{{24}}小时内反馈</span>
              <span class="salary">{{10}}k-{{15}}k</span>
            </div>
            <div class="info">
              {{'深圳'}}<span class="line">|</span>{{3}}-{{5}}年<span class="line">|</span>{{'本科'}}
              <span class="time">{{'5月16日'}}</span>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import myMenus from "@/my-menus/my-menus";
import topBar from "@/top-bar/top-bar";
export default {
  name: "company-detail",
  data() {
    return {
      online: true,
      checkJobArr: [],
      tagArr: ["人力资源", "互联网", "电子商务"]
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

.company-detail-wrapper
	padding 44px 0 15px
	min-height 100vh
	.icon-fanhui
		l-font(42px)
		color #000
		width 50px
	.center-title 
		l-font(40px)
	.company-info
		background $color-background-d
		padding 14px 14px 14px 16px
		.title-wrapper
			display flex
			line-height 20px
			l-font(32px)
			align-items center
		.info
			display flex
			l-font(26px)
			color $color-text-d
			line-height 26px
			.line
				color #dcdcdc
	.list-title
		line-height 44px
		l-font(28px)
		color $color-text-d
	.company-instruction
		padding 15px
		background $color-background-d
		l-font(28px)
		color $color-text-d
		line-height 26px
	.job-list
		margin-bottom 13px
		background $color-background-d
		width 100%
		padding 13px 15px 0 14px
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
			display flex
			l-border(1px solid #f0f0f0)
			border-top none
			border-left none
			border-right none
			.line
				color #DCDCDC
				margin 0 3px
			.time
				color #969696
				flex-grow 1
				text-align right
				margin-right 5px

</style>
