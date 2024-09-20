import { DirectiveBinding, VNode } from 'vue';

const DynDirective = {
	// 在绑定元素的 attribute 或事件监听器被应用之前调用
	// created(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在绑定元素插入到 DOM 前调用
	// beforeMount(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在绑定元素插入到 DOM 时调用
	mounted(el: HTMLElement, binding: DirectiveBinding, _vnode: VNode, _prevVnode: VNode | null) {
		const maxClicks = Number(binding.arg || 3); // 默认3次点击
		const maxDelay = 350; // 单次点击计时默认350ms
		let clickCount = 0;
		let timer: NodeJS.Timeout | null = null;
		let lastClickTime = 0; // 上一次点击的时间戳

		// 触发连续点击的函数
		const handler = () => {
			binding.value();
		};

		el.addEventListener('click', onClick);

		function onClick() {
			// 处理第一次点击
			if (lastClickTime === 0) {
				clickCount++;
				lastClickTime = Date.now();
			} else {
				const currentTime = Date.now();
				if (currentTime - lastClickTime > maxDelay) {
					resetClick();
				}
				clickCount++;
				lastClickTime = currentTime;
				if (clickCount === maxClicks) {
					// 达到设定的点击次数时，执行绑定的功能
					handler();
					resetClick();
				}
			}
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(() => {
				resetClick();
			}, maxDelay);
		}

		function resetClick() {
			lastClickTime = 0;
			clickCount = 0;
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
		}

		// Store event handlers on the element for cleanup
		(el as any).__multipleClickHandlers = { onClick };
	},

	// 在包含组件的 VNode 更新之前调用
	// beforeUpdate(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在包含组件的 VNode 及其子 VNode 更新之后调用
	// updated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在绑定元素的父组件卸载之前调用
	// beforeUnmount(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
	// },

	// 在绑定元素的父组件卸载之后调用
	unmounted(el: HTMLElement, _binding: DirectiveBinding, _vnode: VNode, _prevVnode: VNode | null) {
		const handlers = (el as any).__multipleClickHandlers;
		el.removeEventListener('click', handlers?.onClick);
	},
}

export default DynDirective