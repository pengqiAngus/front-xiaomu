<template >
	<button class=" text-sm text-center rounded duration-150 flex justify-center items-center" :class="[typeEnum[type], sizeEnum[sizeKey].button, {
		'active:sacle-105': isActive
	}]" @click.stop="onBtnClick">
		<!-- loading -->
		<m-svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1"></m-svg-icon>
		<!-- icon 按钮 -->
		<m-svg-icon v-if="icon" :name="icon" class="m-auto" :class="sizeEnum[sizeKey].icon" :color="iconColor"
			:fillClass="iconClass"></m-svg-icon>
		<!-- 文字按钮 -->
		<slot v-else></slot>
	</button>
</template>
<script>
// type 可选项 按钮风格
// size 可选项 按钮大小. 区分文字按钮和icon按钮
const typeEnum = {
	primary: 'text-white bg-zinc-600 active:bg-zinc-600  hover:bg-zinc-700  dark:bg-zinc-900  dark:hover:bg-zinc-500 dark:active:bg-zinc-400  ',
	main: 'text-white bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900  dark:hover:bg-zinc-500 dark:active:bg-zinc-400',
	info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:bg-zinc-900  dark:hover:bg-zinc-500 dark:active:bg-zinc-400'
}
const sizeEnum = {
	// 文字按钮
	default: {
		button: 'w-8 h-4 text-base',
		icon: ''
	},
	// icon按钮
	'icon-default': {
		button: 'w-4 h-4',
		icon: 'w-1.5 h-1.5'
	},
	small: {
		button: 'w-6 h-3 text-base',
		icon: ''
	},
	'icon-small': {
		button: 'w-3 h-3 text-base',
		icon: 'w-1.5 h-1.5'
	},
}
</script>
<script setup>
// 1.构建type风格可选性, size大小可选项。
// 2.通过props  让开发者控制当前按钮。
// 3.区分 icon button和text button
// 4.依据当前数据，实现视图。
// 5.处理点击事件.

import { computed } from 'vue';
import mSvgIcon from "../svg-icon/index.vue";
const props = defineProps({
	// icon图标
	icon: String,
	// icon颜色
	iconColor: String,
	// icon图标类名
	iconClass: String,
	// 按钮风格
	type: {
		type: String,
		default: 'main',
		validate(val) {
			// 1.获取风格所有的可选项
			const keys = Object.keys(typeEnum)
			// 2. 开发者指定的风格在可选项中吗
			const res = keys.includes(val)
			if (!res) {
				throw new Error(`type不是预设值-${keys.join(',')}`)
			}
		}
	},
	// 大小风格
	size: {
		type: String,
		default: 'default',
		validate(val) {
			const keys = Object.keys(sizeEnum)
			const res = keys(sizeEnum).filter(key => !key.includes('icon'))
			if (!res) {
				throw new Error(`size-${keys.join(',')}`)
			}
		}
	},
	// 按钮点击时，是否需要动画
	isActive: {
		type: Boolean,
		default: true
	},
	// 加载状态
	loading: {
		type: Boolean,
		default: false
	}
})
const sizeKey = computed(() => {
	return props.icon ? 'icon-' + props.size : props.size
})
// 点击事件处理
const emits = defineEmits(['click'])
const onBtnClick = () => {
	if (props.loading) {
		return
	}
	emits('click')
}
</script>
<style lang="scss" scoped>

</style>