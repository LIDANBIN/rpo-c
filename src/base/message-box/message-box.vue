<template>
  <div class="message-box-wrapper">
		<transition name="box">
			<div class="message-box center">
				<div class="message-box-title">{{'标题'}}</div>
				<div class="message-box-content">{{message}}</div>
				<div class="message-box-buttons">
					<button class="button-cancel">{{cancelButtonText}}</button>
					<button class="button-confirm">{{confirmButtonText}}</button>
				</div>
		</div>
		</transition>
		<transition name="modal">
			<div class="box-modal"></div>
		</transition>
	</div>
</template>
<script>
export default {
	name: "message-box",
	props: {
		title: String,
		message: String,
		className: String,
		showConfirmButton: {
			type: Boolean,
			default: true
		},
		showCancelButton: {
			type: Boolean,
			default: false
		},
		confirmButtonText: {
			type: String,
			default: '确认'
		},
		cancelButtonText: {
			type: String,
			default: '取消'
		},
		overlay: {
			type: Boolean,
			default: true
		},
		closeOnClickOverlay: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';

	.message-box-wrapper
		.message-box
			position fixed
			top 50%
			left 50%
			width 80%
			background rgb(255, 255, 255)
			border-radius 5px
			z-index 222
			transform translate3d(-50%,-50%,0)
			.message-box-title
				line-height 40px
				l-font(38px)
				font-weight bold
			.message-box-content
				l-font(28px)
				line-height 2
			.message-box-buttons
				padding-top 10px
				display flex
				button
					height 48px
					outline none
					border none
					l-font(30px)
					background transparent
					flex 1
					&.button-confirm
						color green
						border-radius 0 0 5px 0
						border-left: 1px solid #ddd; /*no*/
						border-top: 1px solid #ddd; /*no*/
					&.button-cancel
						border-top: 1px solid #ddd; /*no*/
						border-radius 0 0 0 5px
		.box-modal
			position fixed
			top 0
			bottom 0
			left 0
			right 0
			z-index 221
			background rgba(0, 0, 0, .7)

</style>