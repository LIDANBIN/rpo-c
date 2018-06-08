<template>
  <div class="loading-wrapper center">
    <div :class="[mode]" v-for="i in number" :key="i"></div>
  </div>
</template>
<script>
  export default {
    name: 'loading',
    props: {
      mode: {
        type: String,
        default: 'circular-lines'
      },
      number: {
        type: Number,
        default: 4
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.loading-wrapper
  position relative
  padding 13px 0
  .pinstripe
    display inline-block
    width 4px
    height 25px
    margin-right 5px
    background-color #FFDB01
    -webkit-animation pinstripe-animate 1s infinite
    animation pinstripe-animate 1s infinite
    &:last-child
      margin-right 0px
    &:nth-child(10)
      -webkit-animation-delay 0.9s
      animation-delay 0.9s
    &:nth-child(9)
      -webkit-animation-delay 0.8s
      animation-delay 0.8s
    &:nth-child(8)
      -webkit-animation-delay 0.7s
      animation-delay 0.7s
    &:nth-child(7)
      -webkit-animation-delay 0.6s
      animation-delay 0.6s
    &:nth-child(6)
      -webkit-animation-delay 0.5s
      animation-delay 0.5s
    &:nth-child(5)
      -webkit-animation-delay 0.4s
      animation-delay 0.4s
    &:nth-child(4)
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s
    &:nth-child(3)
      -webkit-animation-delay 0.2s
      animation-delay 0.2s
    &:nth-child(2)
      -webkit-animation-delay: 0.1s
      animation-delay 0.1s
	.circular-lines
    -moz-border-radius 50% 50% 50% 50%
    -webkit-border-radius 50% 50% 50% 50%
    border-radius 50% 50% 50% 50%
    border-top 2.5px solid #FFDB01
    border-bottom 2.5px solid transparent
    border-left  2.5px solid #FFDB01
    border-right 2.5px solid transparent
    position absolute
    top 0
    -webkit-animation circular-lines-animate 2s infinite
    animation circular-lines-animate 2s infinite
    &:nth-child(1)
      left calc(50% - 12.5px)
      top 15px
      width 25px
      height 25px
    &:nth-child(2)
      left calc(50% - 17.5px)
      top 10px
      width 35px
      height 35px
      -webkit-animation-delay 0.2s
      animation-delay: 0.2s
    &:nth-child(3)
      left calc(50% - 22.5px)
      top 5px
      width 45px
      height 45px
      -webkit-animation-delay 0.4s
      animation-delay 0.4s
    &:nth-child(4)
      left calc(50% - 27.5px)
      top 0px
      width 55px
      height 55px
      -webkit-animation-delay 0.6s
      animation-delay 0.6s


@-webkit-keyframes pinstripe-animate
  50%
    -ms-transform scaleY(0)
    -webkit-transform scaleY(0)
    transform scaleY(0)

@keyframes pinstripe-animate
  50%
	  -ms-transform scaleY(0)
   	-webkit-transform scaleY(0)
    transform scaleY(0)

@-webkit-keyframes circular-lines-animate
  50%
    -ms-transform rotate(360deg) scale(0.8)
   	-webkit-transform rotate(360deg) scale(0.8)
    transform rotate(360deg) scale(0.8)

@keyframes circular-lines-animate
  50%
    -ms-transform rotate(360deg) scale(0.8)
   	-webkit-transform rotate(360deg) scale(0.8)
    transform rotate(360deg) scale(0.8)

</style>
