<template >
	<div ref="containerRef" class=" relative" :style="{height:containerHight +'px'}">
		<!-- 数据渲染 -->
		<template v-if="columnWidth &&data.length">
			<div v-for="(item,index) in data" :key="nodeKey? item[nodeKey]: index"
				class="m-waterfall-item absolute duration-300" :style="{
				  width: columnWidth + 'px',
				  left: item._style?.left + 'px',
				  top: item._style?.top + 'px'
				}">
				<slot :item="item" :width="columnWidth" :index="index"></slot>
			</div>
		</template>
		<!-- 加载提示 -->
		<div v-else>加载中...</div>
	</div>
</template>
<script>
export default {
	name: 'waterfall'

}
</script>
<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { getImgElements, getAllImgs, onCompletedImgs, getMinHeightColumn, getMinHeight, getMaxHeight } from "./utils";
const props = defineProps({
	// 数据源
	data: {
		type: Array,
		required: true
	},
	// 唯一标识 key
	nodeKey: {
		type: String
	},
	// 列数
	column: {
		type: Number,
		default: 2
	},
	// 列间距
	columnSpacing: {
		type: Number,
		default: 20
	},
	// 行间距
	rowSpacing: {
		type: Number,
		default: 20
	},
	// 是否需要图片预读取
	picturePreReading: {
		type: Boolean,
		default: true
	}
})
// 容器总高度
const containerHight = ref(0)
// 记录每列高度的容器 key:所在列 val：列高
const columnHeightObj = ref({})
/**
 * 构建记录每列高度的对象
 */
const useColumnHeightObj = () => {
	columnHeightObj.value = {}
	for (let i = 0; i < props.column; i++) {
		columnHeightObj.value[i] = 0
	}
}
// 容器实例
const containerRef = ref(null)
// 容器总宽度(不包含padding,margin，border)
const containerWidth = ref(0)
// 容器左边距
const containerLeft = ref(0)
/**
 * 计算容器宽度
 */
const useContainerWidth = () => {
	const { paddingLeft, paddingRight } = getComputedStyle(containerRef.value, null)
	// 容器左边距
	containerLeft.value = parseFloat(paddingLeft)
	// 容器总宽度
	containerWidth.value = containerRef.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}
// 列宽 = (容器总宽度-所有列宽)/列数
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => (props.column - 1) * props.columnSpacing)
/**
 * 计算列宽
 */
const useColumnWidth = () => {
	// 先计算容器宽度
	useContainerWidth()
	// 计算列的宽度
	columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}
onMounted(() => {
	useColumnWidth()
})
// item高度集合
let itemHeights = []
/**
 * 监听图片加载完成(需要图片预加载)
 */
const waitImgComplete = () => {
	itemHeights = []
	// 拿到所有的元素
	let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
	// 获取元素的img标签
	const imgElements = getImgElements(itemElements)
	// 获取所有img标签的图片
	const allImgs = getAllImgs(imgElements)
	// 等待图片加载完成
	onCompletedImgs(allImgs).then(() => {
		// 图片加载完成
		itemElements.forEach(el => {
			itemHeights.push(el.offsetHeight)
		})
		// 渲染位置
		useItemLocation()
	})
}

/**
 * 不需要图片预加载
 */
const useItemHeight = () => {
	itemHeights = []
	let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
	itemElements.forEach(el => {
		itemHeights.push(el.offsetHeight)
	})
	// 渲染位置
	useItemLocation()
}
/**
 * 渲染位置
 */
const useItemLocation = () => {
	props.data.forEach((item, index) => {
		// 避免重复计算
		if (item._style) {
			return
		}
		// 生成 style属性
		item._style = {}
		item._style.left = getItemLeft()
		item._style.top = getItemTop()
		// 指定的列进行高度的自增
		increasingHeight(index)
	})
	// 指定容器的高度
	containerHight.value = getMaxHeight(columnHeightObj.value)
}

/**
 * 组件销毁时 清除所有._style
 */

onUnmounted(() => {
	props.data.forEach(s => {
		delete s._style
	})
})
/**
 * 返回下一个item 的left
 */
const getItemLeft = () => {
	// 拿到最小宽度的列
	const column = getMinHeightColumn(columnHeightObj.value)
	return column * (columnWidth.value + props.columnSpacing) + containerLeft.value
}
/**
 * 返回下一个item top
 */
const getItemTop = () => {
	return getMinHeight(columnHeightObj.value)
}
/**
 * 指定列 高度自增
 */
const increasingHeight = (index) => {
	// 最小高度所在的列
	const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
	// 该列高度自增
	columnHeightObj.value[minHeightColumn] +=
		itemHeights[index] + props.rowSpacing
}
/**
 * 触发渲染位置计算
 */
watch(() => props.data, (newVal) => {
	const resetColumnHeight = newVal.every(item => !item._style)
	if (resetColumnHeight) {
		// 构建高度记录容器
		useColumnHeightObj()
	}
	nextTick(() => {
		// 第一次获取数据时，构建高度记录容器
		if (props.picturePreReading) {
			waitImgComplete()
		} else {
			useItemHeight()
		}
	})
},
	{
		deep: true,
		immediate: true
	})
/**
 * 重新构建瀑布流
 */
const reset = () => {
	setTimeout(() => {
		// 重新计算列宽
		useColumnWidth()
		props.data.forEach(el => {
			el._style = null
		})
	}, 100)
}

/**
 * 监听列数的变化
 */
watch(() => props.column, () => {
	if (props.picturePreReading) {
		columnWidth.value = 0
		reset()
	} else {
		reset()
	}
	// 重新计算列宽
	// 重置所有定位数据

})
</script>
<style lang="scss" scoped>

</style>