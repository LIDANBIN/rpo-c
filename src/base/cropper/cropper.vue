<template>
  <div ref="wrapper" id="cropper-wrapper">
    <div class="small" ref="preview"></div>
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
    },
    preview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      createSingleImage: this._.getInstance(this.createImage)
    };
  },
  created() {},
  methods: {
    createImage() {
      var cropperWrapper = document.getElementById("cropper-wrapper");
      var imgNode = document.createElement("img");
      cropperWrapper.insertBefore(imgNode, this.$refs.preview);
      return imgNode;
    },
    imageLoad(imgNode) {
      var vm = this;
      var img = new Image();
      img.onload = function() {
        vm.$refs.wrapper.style.height = "500px";
        imgNode.src = vm.imgUrl;
        vm.initCropper(imgNode);
      };
      imgNode.src = "static/loading.gif";
      img.src = this.imgUrl;
    },
    initCropper(imgNode) {
      if (this.cropper) {
        return;
      }
      this.width = this.$refs.wrapper.clientWidth;
      this.height = this.$refs.wrapper.clientHeight;
      this.cropper = new Cropper(imgNode, {
        aspectRatio: this.ratio,
        viewMode: 1,
        dragMode: "crop",
        center: false,
        zoomOnWheel: true,
        zoomOnTouch: true,
        movable: true,
        resizable: true,
        responsive: true,
        autoCropArea: 1,
        preview: this.preview ? ".small" : "",
        minContainerWidth: "100%",
        background: true,
        ready: () => {
          this.croppable = true;
          this.$refs.wrapper.style.height = "auto";
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
          blob = await this._.compressBlob(blob, {
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
#cropper-wrapper
  width 100%
  margin 10px 0
  .small
    height 300px
    overflow hidden
    border-radius 50%
    width 300px
    margin 30px auto
  img
    max-width 100%
</style>
