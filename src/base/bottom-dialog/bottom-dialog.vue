<template>
  <div v-show="show" class="bottom-dialog-wrapper" @touchend="handleClose">
      <div class="content-wrapper">
          <slot></slot>
      </div>
  </div>
</template>

<script>
  export default {
		name: 'bottom-dialog',
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleClose(e) {
				if (e.target === this.$el) {
					this.$emit('closeBottom')
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';

.bottom-dialog-wrapper
	position fixed
	z-index 101
	top 0
	left 0
	right 0
	bottom 0
	background rgba(51,51,51,0.6)
	.content-wrapper
		width 100%
		position absolute
		bottom 0
		background $color-background-d
</style>
