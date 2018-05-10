<template>
  <div id="cropper-wrapper">
  </div>
</template>

<script>
import tool from "&/scripts/tools";
export default {
  name: "copper",
  props: {
    src: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      createSingleImage: tool.getInstance(this.createImage)
    };
  },
  created() {},
  methods: {
    createImage() {
      var cropperWrapper = document.getElementById("cropper-wrapper");
      var imgNode = document.createElement("img");
      cropperWrapper.appendChild(imgNode);
      return imgNode;
    },
    imageLoad(imgNode) {
      var vm = this;
      var myImage = (function() {
        return {
          setSrc: function(src) {
            imgNode.src = src;
          }
        };
      })();
      var proxyImage = (function() {
        var img = new Image();
        img.onload = function() {
          console.log("图片加载成功。");
          myImage.setSrc(this.src);
          // 图片加载成功 在此执行图片剪切裁剪工作
          // vm.cropPicture(imgNode);
        };
        return {
          setSrc: function(src) {
            myImage.setSrc(
              "http://cdn.uedna.com/201402/1392662594759_1140x0.gif"
            );
            img.src = src;
          }
        };
      })();
      proxyImage.setSrc(
        "https://i0.hdslb.com/bfs/album/67acb99add41a4ef2df28ecfd229be7e7f2fe802.jpg"
      );
    },
    cropPicture(imgNode) {
      // var image = document.getElementById("image");
      var cropper = new Cropper(imgNode, {
        aspectRatio: 16 / 9,
        crop: function(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
        }
      });
    }
  },
  watch: {
    src() {
      // 当URL发生改变时才创建image对象
      console.log(this.src)
      var imgNode = this.createSingleImage();
      this.imageLoad(imgNode);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#copper-wrapper {
  width: 100%;

  img {
    width: 100%;
  }
}
</style>
