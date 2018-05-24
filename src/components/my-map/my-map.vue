<template>
  <div class="map-wrapper">
		<top-bar>
        <div slot="left" class="icon-fanhui center" @touchend="handleEnd"></div>
        <my-menus slot="right" :backgroundColor="'rgba(51,51,51,0.6)'" :color="'#fff'"></my-menus>
    </top-bar>
		<div id="map-content"></div>
			<!-- <div id="tip" style="display: none"></div> -->
  </div>
</template>

<script>
import topBar from "@/top-bar/top-bar";
import myMenus from "@/my-menus/my-menus";

export default {
  name: "my-map",
  data() {
    return {
      createSingleScriptNode: this._.getInstance(this.createScriptNode)
    };
  },
  created() {
    this.createSingleScriptNode();
  },
  methods: {
    handleEnd() {
      this.$router.go(-1);
    },
    createScriptNode() {
      let vm = this;
      var scriptNode = document.createElement("script");
      scriptNode.setAttribute(
        "src",
        "https://webapi.amap.com/maps?v=1.4.6&key=402ce34abadb0a5457aa6b350809ab25"
      );
      scriptNode.setAttribute("type", "text/javascript");
      document.head.appendChild(scriptNode);
      scriptNode.onload = function() {
        vm.createMap();
      };
      return scriptNode;
    },
    createMap() {
      let map = new AMap.Map("map-content", {
        //'map-location'是对应页面盒子的id
        resizeEnable: true, //自适应大小
        zoom: 10, //初始视窗
        // center: new AMap.LngLat(116.368904, 39.913423),
        mapStyle: "amap://styles/fc29bc8d6cb0971fcc547020c6d5a55d"
      });
      map.plugin(
        ["AMap.ControlBar", "AMap.Scale", "AMap.Geolocation", "AMap.ToolBar"],
        function() {
          map.addControl(
            new AMap.ControlBar({
              position: { top: "140px", right: "10px" },
              showZoomBar: true
            })
          );
          map.addControl(new AMap.Scale());
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: "RB"
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
          AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
        }
      );
      //解析定位结果
      function onComplete(data) {
        // var str = ["定位成功"];
        // str.push("经度：" + data.position.getLng());
        // str.push("纬度：" + data.position.getLat());
        // if (data.accuracy) {
        //   str.push("精度：" + data.accuracy + " 米");
        // } //如为IP精确定位结果则没有精度信息
        // str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
        // document.getElementById("tip").innerHTML = str.join("<br>");
      }
      //解析定位错误信息
      function onError(data) {
        // console.log(data)
        // document.getElementById("tip").innerHTML = "定位失败";
      }
      // new AMap.Marker({
      //   map: map,
      //   position: [116.405467, 39.907761],
      //   icon: new AMap.Icon({
      //     size: new AMap.Size(40, 50), //图标大小
      //     image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
      //     imageOffset: new AMap.Pixel(0, -60)
      //   })
      // });
    }
  },
  components: {
		topBar,
		myMenus
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~&/style/variable.styl';
@import '~&/style/mixin.styl';

.map-wrapper
	height 100vh
	width 100%
	.icon-fanhui
		l-font(42px)
		font-weight bold
		color #fff
		width 50px
		background rgba(51,51,51,0.6)
	#map-content
		height 100%
		width 100%
</style>
