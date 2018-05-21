<template>
  <div class="icon-more center">
      <ul class="menus-wrapper">
          <li class="menu"><router-link to="/recommend">职位内推</router-link></li>
          <li class="menu"><router-link to="/observer">职场观察</router-link></li>
          <li class="menu"><router-link to="/user/center">个人中心</router-link></li>
      </ul>
  </div>
</template>
<script>
export default {
  name: "my-menus"
};
</script>

<style lang="stylus" scoped>
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';

.icon-more
  l-font(72px)
  color #000
  width 50px
  position relative
  &:hover
    .menus-wrapper
      display block
  .menus-wrapper
    display none
    position absolute
    l-font(38px)
    width 200px
    color #aaa
    background rgba(255, 255, 255, 0.9)
    right 10px
    top calc(100% + 10px)
    border-radius 8px
    box-shadow 0 0 20px 0 #ccc
    .menu
      width 100%
      border-bottom: 1px solid #ccc; /* no */
</style>

