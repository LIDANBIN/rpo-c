<template>
  <div class="top-bar-wrapper">
      <div class="left-item item">
          <slot name="left"></slot>
      </div>
      <div class="center-item item">
          <slot></slot>
      </div>
      <div class="right-item item">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: "top-bar"
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';

.top-bar-wrapper {
    height: 44px;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;

    .item {
        line-height: 44px;
    }
}
</style>
