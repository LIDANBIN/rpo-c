import Vue from 'vue'
import VueMessageBox from './message-box'
import tool from "&/scripts/tools";

let MessageBoxConstructor = Vue.extend(VueMessageBox)

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
	if (instance) {
    instance.value = false;
	}
	this.$el.addEventListener('transitionend', removeDom);
	return this;
}

let defaultOptions = {
	title: '',
	message: '',
	className: '',
	showConfirmButton: true,
	showCancelButton: false,
	confirmButtonText: '',
	cancelButtonText: '',
	overlay: true,
	closeOnClickOverlay: false
}

/**
 * @param {Object} options - Acceptable options
 * @param {String} title - Title
 * @param {String} message - Text content
 * @param {String} className - Custom class name
 * @param {Boolean} showConfirmButton - Whether to show confirmation button
 * @param {Boolean} showCancelButton - Whether to show cancel button
 * @param {String} confirmButtonText - Confirm button text
 * @param {String} cancelButtonText - Cancel button text
 * @param {Boolean} overlay - Whether to display mask
 * @param {Boolean} closeOnClickOverlay - Whether to close the popup when clicking on the mask
 */

let MessageBox = (options = {}) => {
	let instance = getInstanceMessageBox()
	document.body.appendChild(instance.$el)
	return new Promise((resolve, reject) => {
		Object.assign(instance, {
			resolve,
			reject,
			...options
		})
	})
}

MessageBox.alert = options => MessageBox({
	...defaultOptions,
	...options
})

MessageBox.confirm = options => MessageBox({
	...defaultOptions,
	showCancelButton: true,
	...options
})

export default MessageBox;