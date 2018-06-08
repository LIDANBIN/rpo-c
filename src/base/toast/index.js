import Vue from 'vue'
import VueToast from './toast';
import tool from "&/scripts/tools";

const ToastConstructor = Vue.extend(VueToast)

let createToast = () => {
	return new ToastConstructor({
		el: document.createElement('div')
	})
}

let createInstanceToast = tool.getInstance(createToast)

let removeDom = (event) => {
	if (event.target.parentNode) {
		event.target.parentNode.removeChild(event.target)
	}
}

ToastConstructor.prototype.close = function () {
	this.visible = false;
	this.$el.addEventListener('transitionend', removeDom);
	this.closed = true;
	return this;
}

/**
 * @param {Object} options - Acceptable options
 * @param {Number} duration - The time the element is displayed
 * @param {String} message - Text content
 * @param {String} position - Where the element is displayed
 * @param {String} className - Custom class name
 * @param {String} iconClass - The class name of the icon
 */

let Toast = (options = {}) => {
	let duration = options.duration || 3000
	let instance = createInstanceToast()
	instance.closed = false
	clearTimeout(instance.timer);
	instance.message = typeof options === 'string' ? options : options.message;
	instance.position = options.position || 'middle';
	instance.className = options.className || '';
	instance.iconClass = options.iconClass || '';
	document.body.appendChild(instance.$el)
	Vue.nextTick(function () {
		instance.visible = true;
		instance.$el.removeEventListener('transitionend', removeDom);
		~duration && (instance.timer = setTimeout(function () {
			if (instance.closed) return;
			instance.close();
		}, duration));
	});
	return instance;
}

export default Toast;
