<template>
  <div>
    <div v-show="loadingView" class="load_wrap">
      <div class="load">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <!--<div class="line"></div>-->
        <!--<div class="line"></div>-->
      </div>
    </div>
    <div class="no_data center" v-show="nodataView">未查询到相关数据。</div>
    <div class="no_data center" v-show="errorView"><span class="iconfont icon-yichang">&nbsp;查询失败，请稍后重试。</span></div>
  </div>
<!--  <div v-show="loadingView" class="load_wrap">
    <div class="load">
      <div class="ring"></div>
    </div>
  </div>-->
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    props: {},
    data() {
      return {}
    },
    methods: {},
    components: {},
    computed: {
      ...mapState([
        'loadingView',
        'nodataView',
        'errorView'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .no_data
    color #7e8086
    font-size 20px
    margin-top 80px
    .iconfont
      font-size 20px
      color #ef4d54
  .load_wrap
    height 100px
    margin 50px auto
    padding 20px 20px 20px
    border-radius 5px
    text-align center
    p
      padding 0 0 20px
      color #3b3b3b
      font-size 20px
    .line
      display inline-block
      width 10px
      height 10px
      border-radius 10px
      background-color #007fff
      &:nth-last-child(1)
        animation loading .6s .0s linear infinite
      &:nth-last-child(2)
        animation loading .6s .1s linear infinite
      &:nth-last-child(3)
        animation loading .6s .2s linear infinite
      &:nth-last-child(4)
        animation loading .6s .3s linear infinite
      &:nth-last-child(5)
        animation loading .6s .4s linear infinite
/*    .ring
      animation loading 1.5s .3s cubic-bezier(.17,.37,.43,.67) infinite
      width 40px
      height 40px
      margin 0 auto
      padding 10px
      border 5px dashed #007FFF
      border-radius 100%*/

  @keyframes loading
    33%
      transform translate(0, 5px)
    66%
      transform translate(0, -5px)
    100%
      transform translate(0, 0)
/*  @keyframes loading
    0%
      transform rotate(0deg)
    50%
      transform rotate(180deg)
    100%
      transform rotate(360deg)*/
</style>
