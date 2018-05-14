<template>
  <div id="avatar-wrapper">
      <input type="file" name="选择图片" id="" @change="handleFile">
      <cropper ref="cropper" :imgUrl="imgUrl" @crop="crop"></cropper>
      <input type="button" value="上传头像" @click="handleCrop">
  </div>
</template>

<script>
import tool from "&/scripts/tools";
import Cropper from "base/cropper/cropper";

export default {
  name: "avatar",
  data() {
    return {
      imgUrl: "",
      avatarUrl: "",
      createSingleImage: tool.getInstance(this.createImage)
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
      var imgNode = this.createSingleImage();
      imgNode.src = tool.getObjectURL(data);
    },
    createImage() {
      var cropperWrapper = document.getElementById("cropper-wrapper");
      var imgNode = document.createElement("img");
      cropperWrapper.appendChild(imgNode);
      return imgNode;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#avatar-wrapper {
    height: 480px;
}
</style>
