<template >
	<div class=" relative" v-on:mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
		<div ref="targetRef">
			<!-- 具名插槽:触发弹层视图 -->
			<slot name="reference"></slot>
		</div>
		<!-- 气泡展示 -->
		<transition name="slider">
			<div ref="contentRef" v-show="isViable" class=" absolute p-1 z-20 bg-white border rounded-md"
				:style="contentStyle">
				<!-- 匿名插槽：弹出层展示内容 -->
				<slot></slot>
			</div>
		</transition>

	</div>
</template>
<script>
const DELAY_TIME = 100
const PROPS_TOP_LEFT = 'top-left'
const PROPS_BOTTOM_LEFT = 'bottom-left'
const PROPS_TOP_RIGHT = 'top-right'
const PROPS_BOTTOM_RIGHT = 'bottom-right'
const placeEnum = [PROPS_TOP_LEFT, PROPS_BOTTOM_LEFT, PROPS_TOP_RIGHT, PROPS_BOTTOM_RIGHT]
// 左上
// 右上
// 左下
// 右下
</script>
<script setup>
import { nextTick, ref, watch } from 'vue';
const props = defineProps(
	{
		// 控制气泡弹出位置
		place: {
			type: String,
			default: PROPS_BOTTOM_LEFT,
			validate(val) {
				const res = placeEnum.includes(val)
				if (!res) {
					throw new Error('类型不对 必须为' + placeEnum.join(','))
				}
				return res
			}
		}
	})
const isViable = ref(false)
let timeout
// 鼠标移入触发
const onMouseEnter = () => {
	isViable.value = true
	if (timeout) {
		clearTimeout(timeout)
	}
}
// 鼠标移除触发
const onMouseLeave = () => {
	timeout = setTimeout(() => {
		isViable.value = false
		timeout = null
	}, DELAY_TIME)
}
// 计算元素尺寸
const targetRef = ref(null)
const contentRef = ref(null)
const useElementSize = (target) => {
	if (!target) return {}
	return {
		width: target.offsetWidth,
		height: target.offsetHeight
	}
}
// 气泡样式
const contentStyle = ref({
	top: 0,
	left: 0
})

// 计算气泡展示的位置
watch(isViable, (val) => {
	if (!val) return
	nextTick(() => {
		switch (props.place) {
			// 左上
			case PROPS_TOP_LEFT:
				contentStyle.value.top = 0
				contentStyle.value.left = - useElementSize(contentRef.value).width + 'px'
				break
			// 右上
			case PROPS_TOP_RIGHT:
				contentStyle.value.top = 0
				contentStyle.value.left = useElementSize(targetRef.value).width + 'px'
				break
			// 左下
			case PROPS_BOTTOM_LEFT:
				contentStyle.value.top = useElementSize(targetRef.value).width + 'px'
				contentStyle.value.left = - useElementSize(contentRef.value).width + 'px'
				break
			// 右下
			case PROPS_BOTTOM_RIGHT:
				contentStyle.value.top = useElementSize(targetRef.value).width + 'px'
				contentStyle.value.left = useElementSize(targetRef.value).width + 'px'
				break
		}

	})
})
</script>
<style lang="scss" scoped>
.slider-enter-active,
.slider-leave-active {
	translate: opacity 0.3s, transform 0.3s;
}

.slider-enter-from,
.slider-leave-to {
	opacity: 0;
	transform: translateY(20px);
}
</style>