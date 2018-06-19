<template>
  <transition name="">
		<div
			v-show="visible"
		>

		</div>
  </transition>
</template>

<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';

</style>

