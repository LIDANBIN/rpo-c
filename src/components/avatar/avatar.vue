<template>
  <div id="avatar-wrapper">
      <input type="file" name="选择图片" id="" @change="handleFile">
      <cropper ref="cropper" :imgUrl="imgUrl" @crop="crop"></cropper>
      <div class="btn-wrapper">
        <div class="btn cancel icon-return"></div>
        <div class="btn submit icon-right"></div>
      </div>
  </div>
</template>

<script>
import Cropper from "base/cropper";

export default {
  name: "avatar",
  data() {
    return {
      imgUrl: "",
      avatarUrl: ""
    };
  },
  components: {
    Cropper
  },
  methods: {
    handleFile(e) {
      let fileList = e.target.files;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(fileList[0]);
      fileReader.onload = () => {
        this.imgUrl = fileReader.result;
      };
    },
    handleCrop() {
      this.$refs.cropper.crop();
    },
    crop(data) {
      // avatarNode.src = this._.getObjectURL(data);
      console.log(data);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#avatar-wrapper
  height 100vh
  background rgb(200, 195, 142)
  img
    height 280px
    width 280px
    border-radius 50%
  .btn-wrapper
    display flex
    position fixed
    bottom 0
    left 0
    right 0
    height 90px
    .btn
      flex 1
      text-align center
      line-height 90px
      background #f0f0f0
      font-size 46px /* px */
      &.cancel
        color red
      &.submit
        color green
</style>
