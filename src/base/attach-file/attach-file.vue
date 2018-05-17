<template>
  <div class="item clearfix" style="height: auto;">
		<span class="float_left clearfix">
			<span class="name float_left left">附件</span>
			<span class="right float_left clearfix">
				<div class="file_box float_left">
					<div class="file_list" v-for="(item, index) in allArr">
						<span v-show="show" title="点击下载"><a  class="file_name" :href="domain+'upload/download/attr/'+item.attId">{{item.attName}}</a></span>
						<span v-show="!show">{{item.attName}}</span>
						<span v-show="!show" class="pointer icon icon-cuowu iconfont" @click="deleteF($event, index, item.attId)"></span>
					</div>
				</div>
				<form enctype="mutlipart/form-data" id="form" class="uploadI float_left" v-show="!show">
					<div class="add pointer text1">上传附件
						<input type="file" ref="toggleInputFile"  class="file pointer" @change="handleFileChange($event)">
					</div>
				</form>
        <div class="float_left" style="margin-left: 10px;" v-show="!show">{{allArr.length}}/10</div>
			</span>
		</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { sendFile,deleteFile } from 'api/texture-ledger'
  export default {
    props: ['show','dataArr'],
    data () {
      return {
        allArr: [], //上传成功后所有数据
      }
    },
    watch: {
      dataArr: {
        handler: function(newVal, oldVal) {
          this.allArr = newVal
        },
        deep: true
      },
      allArr () {
        if(this.allArr.length) {
          let arr = []
          this.allArr.forEach(v => {
            arr.push(v.attId)
          })
          this.$emit('transmit_file', arr)
        }
      },
    },
    methods: {
      //绑定input的change事件        完成
      handleFileChange (e) {
        if (typeof e.target === 'undefined') {
          this.file = e[0]
        } else {
          this.file = e.target.files[0]
        }
//        let reg = /(.png)$|(.jpg)$|(.gif)$|(.jpeg)$|(.svg)$|(.PNG)$|(.JPG)$|(.GIF)$|(.JPEG)$|(.SVG)$/g
//        if(reg.test(this.file.name)) {
//          this.bus.$emit('showNotice',{content:'请选择非图片文件',type:'info'})
//          return
//        }
        if(this.allArr.length>=10) {
          this.bus.$emit('showNotice',{content:'附件上传不超过10张',type:''})
          return
        }
        if(this.file.size > 1024 * 1024 * 50) {
          this.bus.$emit('showNotice', {content: '文件大小不得超过50MB！', type: ''})
        } else {
          this.bus.$emit('showNotice', {content: '文件上传中，请稍后...', type: ''})
          this.$refs.toggleInputFile.setAttribute('type', 'text')
          setTimeout(() =>{
            this.$refs.toggleInputFile.setAttribute('type', 'file')
          },300)
          this.realSend(this.file)
        }
      },
      realSend(file) {
        let formE = document.getElementById('form')
        let newFormData = new FormData(formE)
        newFormData.append("file", file)
        this.axios.post(`${this.domain}upload/uploadFile`, newFormData).then(res => {
          if(res) {
            let CODE = res.data.code
            this.bus.$emit('closeNotice')
            if(CODE.search(/^R/) > -1) {
              this.allArr.push(res.data.data)
            }else {
              this.bus.$emit('showNotice', {content: '上传失败！', type: 'info'})
            }
          }
        }).catch(err => {
          this.bus.$emit('showNotice', {content: '上传失败！', type: 'info'})
        })
      },
      //页面删除附件
      deleteF (e, index, id) {
        this.allArr.splice(index, 1)
//        let data = { 'attId': id }
//        deleteFile(this, data)
        let arr = []
        if(this.allArr.length) {
          this.allArr.forEach(v => {
            arr.push(v.attId)
          })
        }
        this.$emit('transmit_file', arr)
      },
    },
    computed: {
      ...mapState([
        'domain',
        'token',
        'hasToken',
        'filee'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .item
    min-height 50px
    line-height 49px
    width 100%
    overflow hidden
    color #3b3b3b
    font-size 14px
    border-bottom 1px solid #f4f4f4
    .text
      height 38px
      border 1px solid #ABADB3
      padding-left 6px
      margin 6px 5px 0 0
      box-shadow 0 3px 5px 0 #e0e0e0 inset
    .left
      width 136px
    .red
      color #FF3357
      line-height 60px
      font-size 24px
    .file_box
      margin 6px 0 6px 0
      .file_list
        line-height 24px
        color #5587d7
        border-radius 4px
        margin-right 30px
        img
          height 12px
      .icon
        color #aaa
        font-weight bold
        font-size 12px
        padding-left 10px
        &:hover
          color #5587d7
      .file_name
        color #5587d7
    .add
      height 38px
      line-height 36px
      border 1px solid #70A1D8
      color #fff
      font-size 14px
      background #89BAF0
      position relative
      margin-top 6px
      padding 0 12px
      overflow hidden
      &:hover
        background #7EABE1
      .file
        position absolute
        top 0
        left 0
        zoom 1
        opacity 0
        margin-left -240px
        font-size 30px
</style>
