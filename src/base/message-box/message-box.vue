<template>
  <div class="message-box-wrapper">
		<div class="message-box">
			<div class="message-box-title">这是一个标题</div>
			<div class="message-box-content">内容</div>
			<div class="message-box-buttons">
				<button>取消</button>
				<button>确认</button>
			</div>
		</div>
		<div class="box-modal"></div>
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
</style>