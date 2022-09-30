<template >
	<div ref="containerRef" class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40
	">
		<div>
			<!-- 搜索图表 -->
			<m-svg-icon name="search" color="#707070" class=" w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2">
			</m-svg-icon>
			<!-- 输入框 -->
			<input type="text"
				class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-900 text-sm caret-zinc-300 rounded-xl text-zinc-900 tracking-tighter font-semibold
				border border-zinc-100 dark:border-zinc-900 focus:border-red-300 duration-500 group-hover:bg-white group-hover:dark:bg-zinc-900 group-hover:border-zinc-200 group-hover:dark:border-zinc-800"
				placeholder="搜索" v-model="inputValue" @keyup.enter="onSearch" @focus="onFocusHandler" @blur="onBlurHandler">
			<!-- 删除按钮 -->
			<m-svg-icon name="input-delete" v-show="inputValue" @click="onClear"
				class="h-1.5 w-1.5 absolute duration-500 translate-y-[-50%] top-[50%] right-9 cursor-pointer">
			</m-svg-icon>
			<!-- 分割线 -->
			<div
				class=" opacity-0 group-hover:opacity-100  h-1.5 w-[1px] translate-y-[-50%] top-[50%] absolute right-[62px] duration-500 bg-zinc-200">
			</div>
			<!-- 搜索按钮 -->
			<m-button icon="search" iconColor="#fffff " @click="onSearch"
				class="absolute translate-y-[-50%] top-[50%] right-1 duration-1000 opacity-0 rounded-full group-hover:opacity-100">
			</m-button>
		</div>
		<!-- 下拉区 -->
		<transition>
			<div v-if="$slots.dropdown" v-show="isFocus" class="z-50 max-h-[368px] w-full text-base overflow-auto bg-white absolute v-20 left-0 p-2 rounded border border-zinc-200
			duration-200 hover:shadow-2xl  scrollbar-thin dark:bg-zinc-800 dark:border-zinc-800
 scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900
  scrollbar-track-transparent
			">
				<slot name="dropdown"></slot>
			</div>


		</transition>
	</div>
</template>
<script>
// 双向绑定
const EMIT_UPDATE_MODLEVALUE = 'update:inputValue'
// 搜索
const EMIT_SEARCH = 'search'
// 清空文本
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点
const EMIT_FOCUS = 'focus'
// 失去焦点
const EMIT_BLUR = 'blur'
</script>
<script setup>
import { useVModel, onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";
// // 1.输入内容 实现双向数据绑定
// 2.搜索按钮在hover时展示
// 3.一键清空文本的功能
// 4.触发搜索功能
// 5.控制下拉展示区的展示
// 6.事件处理
const props = defineProps({
	modelValue: {
		required: true,
		type: String,
	}
})
const inputValue = useVModel(props)
// 监听用户输入行为
watch(inputValue, () => {
	emits(EMIT_INPUT, inputValue.value)
})
const emits = defineEmits([EMIT_UPDATE_MODLEVALUE, EMIT_SEARCH, EMIT_CLEAR, EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR])
// 删除文本
const onClear = () => {
	inputValue.value = ''
	emits(EMIT_CLEAR, '')
}
// 搜索
const onSearch = () => {
	emits(EMIT_SEARCH, inputValue.value)
}
// input框是否获取到焦点
const isFocus = ref(false)
const onFocusHandler = () => {
	isFocus.value = true
	emits(EMIT_FOCUS)
}
// input 失去焦点
const onBlurHandler = () => {
	emits(EMIT_BLUR)
}
// 点击区域外隐藏dropdown框
const containerRef = ref(null)
onClickOutside(containerRef, () => {
	isFocus.value = false
})
</script>
<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
	translate: all 0.5s;
}

.slider-enter-from,
.slider-leave-to {
	opacity: 0;
	transform: translateY(40px);
}
</style>