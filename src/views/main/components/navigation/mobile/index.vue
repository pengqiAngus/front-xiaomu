<template >
	<div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
		<ul ref="ulRef" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
			<!-- 滑块 -->
			<li ref="sliderRef" :style="sliderStyle"
				class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"></li>
			<!-- 汉堡按钮 -->
			<li
				class="fixed top-0 right-0 h-4 px-1 flex items-center shadow-l-white bg-white  z-20 dark:bg-zinc-900  dark:bg-shadow-l-zinc"
				@click="showPopup">
				<m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
			</li>
			<!-- 菜单栏 -->
			<li :ref="itemsRef" v-for="(item, index) in $store.getters.categorys" :key="item.id" :class="{
				'text-zinc-100 z-20 ': $store.getters.currentCategoryIndex === index
			}" class="shrink-0 px-1.5 py-0.5 duration-200 last:mr-4" @click="onItemClick(item)">{{
			item.name
			}}</li>
		</ul>
		<m-popup v-model="isVisible">
			<Menu @onItemClick="onItemClick"></Menu>
		</m-popup>
	</div>
</template>
<script setup>
import { ref, onBeforeUpdate, watch } from 'vue';
import { useScroll } from "@vueuse/core";
import Menu from "../../menu/index.vue";
import { useStore } from 'vuex';

const store = useStore()
const sliderRef = ref(null)
const sliderStyle = ref({
	transform: 'translateX(0px)',
	width: '52px'
})
// 选中的item下标
const currentCategoryIndex = ref(0)
// 获取所有item的ref
let allItemsRef = []
const itemsRef = (el) => {
	if (el) {
		allItemsRef.push(el)
	}
}
const ulRef = ref(null)
onBeforeUpdate(() => {
	allItemsRef = []
})
const { x: ulScrollX } = useScroll(ulRef)
const onItemClick = (item) => {
	store.commit('app/changeCurrentCategory', item)
	isVisible.value = false
}
watch(() => store.getters.currentCategoryIndex, (val) => {
	const { left, width } = allItemsRef[val].getBoundingClientRect()
	sliderStyle.value = {
		// 滑块位置 = ul横向滚动位置+当前元素的left值 - 元素的padding
		transform: `translateX(${left + ulScrollX.value - 9.75}px)`,
		width: `${width}px`
	}
})
// 控制popup展示
const isVisible = ref(false)
const showPopup = () => {
	isVisible.value = true
}
</script>
<style lang="scss" scoped>
.text {
	color: white;
}
</style>