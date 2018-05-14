var Tools = function () {
}
Tools.fn = {
    convertBase64UrlToBlob: function (urlData) {
        let arr = urlData.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], { type: mime })
    }
}
Tools.prototype = {
    constructor: Tools,
    getInstance: function (fn) {
        var result;
        return function () {
            return result || (result = fn.apply(this, arguments))
        }
    },
    getObjectURL: function (file) {
        let url = null;
        if (window.createObjectURL !== undefined) {
            // basic
            url = window.createObjectURL(file);
        } else if (window.URL !== undefined) {
            // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    },
    compressBlob: function (blob, opt) {
        return new Promise((resolve, reject) => {
            if (!(blob instanceof Blob)) {
                throw new Error('Expected blob got ', typeof blob)
            }
            let path = this.getObjectURL(blob)
            let img = new Image()
            img.src = path
            img.onload = function () {
                //  默认按比例压缩
                let w = this.width
                let h = this.height
                let scale = w / h
                w = opt.width || w
                h = opt.height || (w / scale)
                // 默认图片质量为0.7
                let quality = 1048576 / blob.size
                // 生成canvas
                let canvas = document.createElement('canvas')
                canvas.width = w
                canvas.height = h
                let ctx = canvas.getContext('2d')
                ctx.drawImage(this, 0, 0, w, h)
                //  图像质量
                if (opt.quality && opt.quality >= 1 && opt.quality < 0) {
                    quality = opt.quality
                }
                let base64 = canvas.toDataURL('image/jpeg')
                resolve(Tools.fn.convertBase64UrlToBlob(base64), quality)
            }
        })
    }
}

export default new Tools();