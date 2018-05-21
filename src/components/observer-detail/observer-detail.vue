<template>
  <div class="observer-detail-wrapper">
      <top-bar :backgroundColor="'#FFDB01'">
        <div slot="left" class="icon-fanhui center" @touchend="handleEnd"></div>
        <div class="center-title">职场观察</div>
        <my-menus slot="right"></my-menus>
      </top-bar>
      <div class="article-wrapper">
        <h1 class="article-title bold">那个辞职去看世界的人，后来过得怎么样了？</h1>
        <div><span class="author-name">卓聘家·卓小家</span><span class="publish-time">{{'2018-05-19'}}</span></div>
        <img class="illustration" src="" alt="">
        <p class="article-content">
          Google 翻译是谷歌公司提供一项免费的翻译服务，可提供 80 种语言之间的即时翻译，支持任意两种语言之间的字词、句子和网页翻译。<br>可分析的人工翻译文档越多，译文的质量就会越高。
Google 翻译生成译文时，会在数百万篇文档中查找各种模式，以便决定最佳翻译。<br> 翻译通过在经过人工翻译的文档中检测各种模式，进行合理的猜测，然后得出适当的翻译。这种在大量文本中查找各种范例的过程称为“统计机器翻译”。<br>由于译文是由机器生成的，因此并不是所有的译文都是完美的。
        </p>
      </div>
  </div>
</template>

<script>
import myMenus from "@/my-menus/my-menus"
import topBar from "@/top-bar/top-bar";

export default {
  name: "observer-detail",
  data() {
    return {};
  },
  methods: {
    handleEnd() {
      this.$router.go(-1);
    }
  },
  components: {
    myMenus,
    topBar
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';
.observer-detail-wrapper
  padding 44px 15px 15px
  min-height 100vh
  background $color-background-d
  .icon-fanhui
    l-font(42px)
    font-weight bold
    color #000
    width 50px
  .center-title
    l-font(40px)
  .article-wrapper
    padding-top 9px
    l-font(24px)
    .article-title
      l-font(32px)
      multi-no-wrap(2)
      line-height 20px
      color $color-text-t
      margin 9px 0
    .author-name
      color $color-text-b
      margin-right 15px
    .publish-time
      color #969696
    .illustration
      height 200px
      display block
      width 100%
      margin 18px 0 25px 0
      border 1px dotted #5587d7
    .article-content
      l-font(28px)
      color #2a2a2a
      line-height 28px
</style>
