<template>
  <div class="user-center-wrapper">
      <top-bar :backgroundColor="'#FFDB01'">
        <div slot="left" class="icon-fanhui center" @touchend="handleEnd"></div>
        <div class="center-title">个人中心</div>
        <my-menus slot="right"></my-menus>
      </top-bar>
      <div class="basic-information-wrapper">
			<div class="avatar file">
				<input type="file" name="">
			</div>
			<div class="basic-information">
				<p class="user-name bold">{{userInfo.name}}</p>
				<p class="user-info">{{userInfo.position}} | {{userInfo.education}} | {{userInfo.workingYears}}年工作经验</p>
				<p class="user-phone"><span class="icon icon-dianhua"></span>{{userInfo.phone}}</p>
				<p class="user-email"><span class="icon icon-xinfeng"></span>{{userInfo.email}}</p>
			</div>
          <div class="edit icon-xiugai" @touchend="handleEdit"></div>
      </div>
			<div class="user-collection-wrapper">
				<div class="collection user-resume">
					<div class="collection-top">
						<span class="icon icon-jianli"></span>
						我的简历
						<span @touchend='openResume = !openResume' :class="[openResume ? 'icon-unfold' : 'icon-enter']"></span>
					</div>
					<ul class="lists-wrapper" v-show="openResume">
						<li class="list" v-for="i in resumeArr" :key="i">
							<span class="text-left">{{'郭帅简历_产品经理'}}</span><span class="text-right blue">上传</span>
						</li>
					</ul>
				</div>
				<div class="collection user-application">
					<div class="collection-top">
						<span class="icon icon-qiuzhi"></span>
						我的求职
						<span @touchend='openApplication = !openApplication' :class="[openApplication ? 'icon-unfold' : 'icon-enter']"></span>
					</div>
					<ul class="lists-wrapper" v-show="openApplication">
						<li class="list" v-for="(i, index) in applicationArr" :key="index">
							<span class="text-left">{{i.title}}</span><span class="text-right" :class="[i.state? (i.state==1 ? 'yellow-green' : '') : 'orange']">{{i.state? (i.state==1 ? '待面试' : '已结束') : '待沟通'}}</span>
						</li>
					</ul>
				</div>
				<div class="collection user-collection">
					<div class="collection-top">
						<span class="icon icon-love-b1"></span>
						我的收藏
						<span @touchend='openCollection = !openCollection' :class="[openCollection ? 'icon-unfold' : 'icon-enter']"></span>
					</div>
					<ul class="lists-wrapper" v-show="openCollection">
						<li class="list" v-for="(i, index) in collectionArr" :key="index">
							<span class="text-left">{{i.title}}</span><span class="text-right blue">删除</span>
						</li>
					</ul>
				</div>
			</div>
			<bottom-dialog :show="showEdit" @closeBottom="closeBottom">
				<ul class="user-info-from">
					<li class="item">姓名<span class="red">*</span> <input type="text"></li>
					<li class="item">手机<span class="red">*</span> <input type="text"></li>
					<li class="item">邮箱<span class="red">*</span><input type="text"></li>
					<li class="item">学历 <input type="text"></li>
					<li class="item">经验 <input type="text"></li>
					<li class="item">城市 <input type="text"></li>
					<li class="btn-wrapper">
						<input type="button" class="cancel" value="取消">
						<input type="button" class="save" value="保存">
					</li>
				</ul>
			</bottom-dialog>
  </div>
</template>

<script>
import myMenus from "@/my-menus/my-menus";
import topBar from "@/top-bar/top-bar";
import bottomDialog from "base/bottom-dialog/bottom-dialog"
export default {
  name: "recommend-detail",
  data() {
    return {
			openResume: false,
			openApplication: false,
			openCollection: false,
			resumeArr: [1],
			userInfo: {
				position: '深圳',
				name: '郭帅',
				education: '本科',
				workingYears: 3,
				phone: '18682265051',
				email: 'maifute@qq.com'
			},
			applicationArr: [
				{title:'唯品会多岗位专场招聘会', state: 0}, 
				{title:'深圳 | 房地产行业精选内推职位', state: 1}, 
				{title:'广州 | 第七城Java专场招聘会', state: 2}
				],
			collectionArr: [
				{title:'唯品会多岗位专场招聘会'}, 
				{title:'深圳 | 房地产行业精选内推职位'}
			],
			showEdit: false
    };
  },
  methods: {
    handleEnd() {
      this.$router.go(-1);
		},
		handleEdit() {
			this.showEdit = true
		},
		closeBottom() {
			this.showEdit = false
		}
  },
  components: {
    myMenus,
		topBar,
		bottomDialog
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';
.user-center-wrapper
  padding 44px 0 15px
  min-height 100vh
  .icon-fanhui
    l-font(42px)
    font-weight bold
    color #000
    width 50px
  .center-title
    l-font(40px)
	.basic-information-wrapper
		display flex
		background $color-background-d
		padding 15px
		.avatar
			width 100px
			height 100px
			position relative
			border 1px dotted #5587d7
			border-radius 50%
			overflow hidden
			input
				opacity 0
				position absolute
				top 0
				left 0
				width 100%
				bottom 0
		.basic-information
			flex-grow 1
			line-height 24px
			padding-left 22px
			.user-name
				l-font(40px)
				padding-bottom 4px
				color $color-text-t
			.user-phone, .user-email
				l-font(26px)
				color $color-text-d
				display flex
				.icon
					color #999999
					l-font(26px)
					margin-right 8px
		.icon-xiugai
			color $color-text-b
			l-font(36px)
	.collection
		line-height 44px
		l-font(26px)
		color $color-text-d
		flex-wrap wrap
		margin-top 10px
		.collection-top
			display flex
			padding 0 10px 0 15px
			background $color-background-d
			.icon
				l-font(36px)
				margin-right 8px
				&.icon-jianli
					color #F5A623
				&.icon-qiuzhi
					color $color-text-b
				&.icon-love-b1
					color #CA1921
			.icon-enter, .icon-unfold
				flex-grow 1
				text-align right
				l-font(36px)
		.lists-wrapper
			width 100%
			padding 0 15px 0 36px
			.list
				line-height 42px
				l-border(1px solid #f0f0f0)
				border-top none 
				border-left none
				border-right none
				display flex
				l-font(26px)
				color $color-text-d
				.text-right
					text-align right
					flex-grow 1
				.blue
					color $color-text-b
					text-decoration underline
				.orange
					color #F5A623
				.yellow-green
					color #7ED321
	.user-info-from
		padding 25px 32px 46px 32px
		.item
			margin-bottom 18px
			line-height 30px
			l-font(28px)
			.red
				color #d0021b
			input 
				height 30px
				outline none
				float right
				l-border(1px solid #e4e4e4)
				border-radius 4px
				width 75%
				padding 0 10px
				background #f8f9fb
				margin-left 10px
		.btn-wrapper
			margin-top 30px
			text-align center
			input
				display inline-block
				width 80px
				height 30px
				border-radius 100px
				outline none
				l-font(28px)
				color $color-text-t
				margin 0 10px
				&.cancel
					l-border(1px solid #d2d2d2)
					background $color-background-d
				&.save
					background background radial-gradient(#FEDA02, #FEDB02)
					border none
</style>
