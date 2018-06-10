import Vue from 'vue'
import MessageBox from './message-box'
import tool from "&/scripts/tools";

let MessageBoxConstructor = Vue.extend(MessageBox)

let createMessageBox = () => {
	return new MessageBoxConstructor({
		el: document.createElement('div')
	})
}

let getInstanceMessageBox = tool.getInstance(createMessageBox)

let removeDom = (event) => {
	if (event.target.parentNode) {
		event.target.parentNode.removeChild(event.target)
	}
}

MessageBoxConstructor.prototype.close = function () {
	this.visible = false;
	this.$el.addEventListener('transitionend', removeDom);
	this.closed = true;
	return this;
}

let MessageBox = (options = {}) => {
	
}