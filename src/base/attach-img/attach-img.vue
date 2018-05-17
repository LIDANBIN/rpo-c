<template>
  <li class="item clearfix" style="height: auto">
		<span class="float_left clearfix block">
			<span class="name float_left left">截屏</span>
			<span class="right float_left clearfix">
				<div class="out float_left" v-for="(v,i) in allArr" :key="i">
          <a v-show="show"  class="file_name" title="点击下载" :href="domain+'upload/download/attr/'+v.attId">
					  <div class="img_box" :style="{backgroundImage:'url(' + v.visitUrl + ')'}"></div>
          </a>
          <div v-show="!show" class="img_box" :style="{backgroundImage:'url(' + v.visitUrl + ')'}"></div>
            <img v-show="!show" :src="imgUrl" class="icon pointer" @click="deleteImg(i,v.attId)">
				</div>
				<form v-show="!show" enctype="mutlipart/form-data" id="form" class="uploadI float_left">
					<div class="add pointer text1">上传截屏
						<input ref="toggleInputImg" type="file" class="file pointer" @change="handleFileChange($event)"
                   accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
					</div>
				</form>
        <div class="float_left" style="margin-left: 10px;" v-show="!show">{{allArr.length}}/10</div>
			</span>
		</span>
  </li>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import {sendFile, deleteFile} from 'api/texture-ledger'
  export default {
    props: ['show','dataArr'],
    data () {
      return {
        imgUrl: 'static/images/deleteIcon.png',
        allArr: []
      }
    },
    methods: {
      handleFileChange (e) {
        if (typeof e.target === 'undefined') {
          this.file = e[0];
        } else {
          this.file = e.target.files[0]
        }
        if(this.allArr.length>=10) {
          this.bus.$emit('showNotice', {content: '图片上传最多只能上传10张', type: ''})
          return
        }
        if(this.file.size > 1024 * 1024 * 50) {
          this.bus.$emit('showNotice', {content: '文件大小不得超过50MB！', type: ''})
        } else {
          this.bus.$emit('showNotice', {content: '文件上传中，请稍后...', type: ''})
          this.$refs.toggleInputImg.setAttribute('type', 'text')
          setTimeout(() =>{
            this.$refs.toggleInputImg.setAttribute('type', 'file')
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
          this.bus.$emit('closeNotice')
          this.bus.$emit('showNotice', {content: '上传失败！', type: 'info'})
        })
      },
      //页面删除图片
      deleteImg (index,id) {
        this.allArr.splice(index,1)
//        let data = { attId: id }
//        deleteFile(this, data)
        let arr = []
        if(this.allArr.length) {
          this.allArr.forEach(v => {
            arr.push(v.attId)
          })
        }
        this.$emit('transmit_img', arr)
      }
    },
    watch: {
      allArr () {
        if(this.allArr.length) {
          let arr = []
          this.allArr.forEach(v => {
            arr.push(v.attId)
          })
          this.$emit('transmit_img', arr)
        }
      },
      dataArr: {
        handler: function(newVal) {
          this.allArr = newVal
        },
        deep: true
      }
    },
    computed: {
      ...mapState([
        'domain',
        'token',
        'hasToken',
        'filee'
      ]),
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .item
    min-height 50px
    line-height 49px
    width 100%
    overflow hidden
    color #3b3b3b
    font-size 14px
    border-bottom 1px solid #f4f4f4
    .block
      display inline-block
      width: 100%
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
    .right
      width: 80%
    .out
      position relative
      margin 6px 16px 6px 0
      .img_box
        width 152px
        height 175px
        border 1px solid #aaa
        background-size 100% 90%
        background-repeat no-repeat
        background-position center center
        &:hover
          cursor pointer
        .upload_img
          width 100%
      .icon
        position absolute
        top -6px
        right -6px
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
