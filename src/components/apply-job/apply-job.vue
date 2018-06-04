<template>
  <div class="apply-job-wrapper">
		<transition name="mask-slide">
			<div class="apply-job-mask" v-show="show" @touchend.self="handleClose"></div>
		</transition>
		<div class="content-wrapper" :style="{bottom: bottom}">
				<transition name="content-slide">
					<div ref="resumeWrapper" class="resume-wrapper" v-show="show">
						<div class="logo-wrapper" :class="[resumeState ? (resumeState === 1 ? 'already-post' : 'post-success') : 'post-please']"></div>
						<label @touchstart.stop v-show="resumeState == 0">
							<div class="center tips">您还没有简历，请<span class="blue">上传</span>您的简历</div>
							<input @change="handlePost" type="file" id="file" style="display: none">
						</label>
						<div class="resume-file center" v-show="resumeState === 1">
							<span class="icon-xuanzhong"></span>
							{{'郭帅简历_产品经理.pdf'}}
							<label for="file"><span class="blue">上传</span></label>
						</div>
						<div v-show="resumeState === 2">
							<div class="center tips">简历提交成功</div>
							<div class="center tips">招聘顾问将在24小时内与您联系</div>
						</div>
					</div>
				</transition>
				<div class="btns-wrapper" v-show="resumeState !== 2">
					<div class="selected-job" v-if="!isJob">已选</div>
					<div class="job-collect" @click="handleCollect">收藏<span class="icon" :class="[isCollected ? 'icon-love-b' : 'icon-love-b1']"></span></div>
					<input v-if="isJob && !show" @click="handleJobId" type="button" class="apply-button" value="申请内推">
					<input v-show="show" :class="{disable: resumeState == 0}" :disabled="resumeState == 0" @click="handleApply" type="button" class="apply-button" value="申请内推">
				</div>
		</div>
  </div>
</template>

<script>
  export default {
		name: 'apply-job',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			bottom: {
				type: Number,
				default: 0
			},
			isJob: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isCollected: false,
				resumeState: 0 // 0 没有简历 1 有简历 2 申请提交成功 应是全局变量
			}
		},
		methods: {
			handleClose(e) {
				this.resumeState = this.resumeState ?  1 : 0
				this.$emit('cancelDialog', false)
			},
			handlePost() {
				this.resumeState = 1
			},
			handleApply() {
				this.resumeState = 2
			},
			handleCollect() {
      	this.isCollected = !this.isCollected;
			},
			handleJobId() {
				this.$emit('cancelDialog', true)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~&/style/variable.styl'; 
@import '~&/style/mixin.styl';

.apply-job-wrapper
	.apply-job-mask
		position fixed
		z-index 101
		top 0
		left 0
		right 0
		bottom 0
		background rgba(51,51,51,0.6)
		&.mask-slide-enter-active, &.mask-slide-leave-active
			transition all .8s
		&.mask-slide-enter, &.mask-slide-leave-active
			opacity 0
	.content-wrapper
		width 100%
		position fixed
		bottom 0
		z-index 102
		background $color-background-d
		.resume-wrapper
			padding-bottom 30px
			&.content-slide-enter-active, &.content-slide-leave-active
				transition opacity .8s, transform .8s
			&.content-slide-enter, &.content-slide-leave-active
				transform translateY(10%)
				opacity 0
			.logo-wrapper
				height 148px
				background-position center
				background-repeat no-repeat
				&.post-please
					bg-image('post-please')
				&.post-success
					bg-image('post-success')
				&.already-post
					height 0
			.tips
				l-font(28px)
				line-height 20px
				color $color-text-d
				.blue
					color $color-text-b
			.resume-file
				line-height 104px
				padding-top 30px
				l-font(28px)
				color $color-text-t
				.icon-xuanzhong
					color #17AE19
					l-font(28px)
					margin-right 4px
				.blue
					color $color-text-b
					margin-left 30px
		.btns-wrapper
			line-height 44px
			display flex
			color $color-text-d
			justify-content space-between
			border-top: 7px solid #f8f9fb;
			.selected-job
				padding 0 15px
			.job-collect
				padding 0 15px
				.icon
					l-font(24px)
					margin 0 3px
					&.icon-love-b
						color #D81E06
			.apply-button
				width 110px
				height 44px
				l-font(26px)
				color $color-text-t
				outline none
				border none 
				background radial-gradient(#FEDA02, #FEDB02) 
				border-radius 0
				&.disable
					background radial-gradient(#EFEFEF, #EFEFEF) 
</style>
