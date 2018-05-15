<template>
  <div class="header-wrapper">
    <div class="title-wrapper">
        卓聘家
    </div>
    <div class="tab-wrapper">
      <router-link class="tab" to="/observer">职场观察</router-link>
      <router-link class="tab" to="/recommend">职场内推</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "myHeader"
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.header-wrapper
  text-align center 
  .title-wrapper
    height 280px
    line-height 280px
    font-size 60px /*px*/
    border 1px dotted #5587d7 /*no*/
  .tab-wrapper
    display flex
    .tab
      flex 1
      line-height 120px
      font-size 40px /*px*/
      &.router-link-active
        border-bottom 6px solid #5587d7 /*no*/

</style>
