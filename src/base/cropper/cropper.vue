<template>
  <div ref="wrapper" id="cropper-wrapper">
  </div>
</template>

<script>
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
    value: function(callback, type, quality) {
      var binStr = atob(this.toDataURL(type, quality).split(",")[1]),
        len = binStr.length,
        arr = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      callback(new Blob([arr], { type: type || "image/png" }));
    }
  });
}
import Cropper from "cropperjs";
import tool from "&/scripts/tools";
export default {
  name: "copper",
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    ratio: {
      type: Number,
      default: 1
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
          setSrc: function(imgUrl) {
            imgNode.src = imgUrl;
          }
        };
      })();
      var proxyImage = (function() {
        var img = new Image();
        img.onload = function() {
          myImage.setSrc(this.src);
          vm.initCropper(imgNode);
        };
        return {
          setSrc: function(imgUrl) {
            myImage.setSrc("static/loading.gif");
            img.src = imgUrl;
          }
        };
      })();
      proxyImage.setSrc(this.imgUrl);
    },
    initCropper(imgNode) {
      if (this.cropper) {
        return;
      }
      this.width = this.$refs.wrapper.clientWidth;
      this.height = this.$refs.wrapper.clientHeight;
      this.cropper = new Cropper(imgNode, {
        aspectRatio: this.ratio,
        viewMode: 0,
        dragMode: "move",
        center: false,
        zoomOnWheel: true,
        movable: true,
        resizable: true,
        autoCropArea: 1,
        minContainerWidth: "100%",
        background: true,
        ready: () => {
          this.croppable = true;
        }
      });
    },
    crop() {
      let croppedCanvas;
      if (!this.croppable) {
        return;
      }
      croppedCanvas = this.cropper.getCroppedCanvas();
      croppedCanvas.toBlob(async blob => {
        console.log(blob.size, "before");
        if (blob.size > 1048000) {
          blob = await tool.compressBlob(blob, {
            width: this.width,
            height: this.height
          });
        }
        console.log(blob.size, "after");
        this.$emit("crop", blob);
      }, "image/jpg");
    }
  },
  watch: {
    imgUrl(next) {
      // 当URL发生改变时才创建image对象
      var imgNode = this.createSingleImage();
      this.cropper && this.cropper.replace(next);
      this.imageLoad(imgNode);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#cropper-wrapper {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
  }
}
</style>
