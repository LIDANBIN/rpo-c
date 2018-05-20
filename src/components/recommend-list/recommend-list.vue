<template>
  <div class="recommend-list-wrapper">
      <div class="title-wrapper">
        <h2><router-link to="/recommend/detail" class="title">广州第七城Java专场招聘会</router-link></h2>
        <span :class="[online?'online':'offline']">{{online?'线上':'线下'}}</span>
      </div>
      <div class="offer-number">
        <span class="number">{{'500+'}}</span>家企业·<span class="number">{{'5000+'}}</span>职位机会
      </div>
      <div class="position-time">
        <span class="icon icon-dizhi"></span>{{'深圳市'}}<span class="icon icon-shijian"></span>{{'4月30日'}}截止
        <router-link to="/recommend/detail" class="apply center">申请内推</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: "recommend-list",
  data() {
    return {
      online: false
    };
  },
  components: {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';
.recommend-list-wrapper {
  height: 106px;
  background: $color-background-d;
  margin: 13px 0;
  padding: 14px 14px 14px 16px;
  .title-wrapper {
    display flex
    line-height 20px
    l-font(28px)
    align-items: center;
    .title {
          color $color-text-t
    }
    span {
      color $color-line-b
      margin-left 13px
      padding 0 5px
      border-radius 2px
      height 16px
      line-height 16px
      l-font(18px)
      l-border(1px solid $color-line-b)
      &.offline {
        color $color-text-t
        border-color #dcdcdc
      }
    }
  }
  .offer-number {
    l-font(26px)
    color #2a2a2a
    line-height 38px
    .number {
      color #ff5b5a
    }
  }
  .position-time {
    l-font(24px)
    color #969696
    position relative
    .icon {
      l-font(24px)
      margin 0 3px 0 0
      &:last-of-type {
        margin-left 10px
      }
    }
    .apply {
      width 80px
      position absolute
      right 0
      top -5px
      height 25px
      color $color-text-t
      display inline-block
      background radial-gradient(#FEDA02, #FEDA02)
      line-height 25px
      border-radius 20px
    }
  }
}
</style>
