<template >
	<div>
		<!-- 内容 -->
		<slot></slot>
		<div ref="loadingRef" class="h-6 py-4">
			<!-- 加载更多 -->
			<m-svg-icon v-show="loading" class="w-4 h-4 mx-auto animate-spin" name="infinite-load"></m-svg-icon>
			<!-- 没有更多数据 -->
			<p v-if="ifFinished" class="text-center text-base text-zinc-400">已经没有更多数据了...</p>
		</div>
	</div>
</template>
<script setup>
import { useVModel, useIntersectionObserver } from "@vueuse/core";
import { ref, watch } from "vue";
const props = defineProps({
	// 是否处于加载状态
	modelValue: {
		type: Boolean,
		required: true
	},
	// 数据是否全部加载完成
	ifFinished: {
		Type: Boolean,
		default: false
	}
})
const emits = defineEmits('onLoad', 'update:modelValue')
// 处理loading的状态
const loading = useVModel(props)
const loadingRef = ref(null)
const Intersecting = ref(false)
useIntersectionObserver(loadingRef, ([{ isIntersecting }]) => {
	Intersecting.value = isIntersecting
	emits('onLoad')
})
/**
 * 触发Load事件
 */
const emitLoad = () => {
	setTimeout(() => { // 当加载视图可见时,处理加载更多的逻辑
		if (Intersecting && !loading.value == true && !props.ifFinished) {
			// 修改加载数据的标记
			loading.value = true
			// 触发加载更多的行为
			emits('onLoad')
		}
	}, 100)

}
/**
 * 监听loading变化
 */
watch(loading, emitLoad())
</script>
<style lang="scss" scoped>

</style>