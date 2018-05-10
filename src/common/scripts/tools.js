var Tools = function () {

}
Tools.prototype = {
    constructor: Tools,
    getInstance: function (fn) {
        var result;
        return function () {
            console.log(2, result)
            return result || (result = fn.apply(this, arguments))
        }
    }
}

export default new Tools();