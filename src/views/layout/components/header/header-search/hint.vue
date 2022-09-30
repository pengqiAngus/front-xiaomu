<template >
	<div>
		<div v-for="(item,index) in hintData" :key="index" class="py-1 pl-1 text-base font-bold text-zinc-500 rounded 
		 	cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900" v-html="hightLightText(item)"
			@click="onItemClick(item) ">

		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { getHint } from "../../../../../api/pexels";
import { watchDebounced } from "@vueuse/core";
const props = defineProps({
	searchText: {
		type: String,
		required: true
	}
})
const emits = defineEmits(['itemClick'])
/**
 * 处理搜索提示的数据获取
 */
const hintData = ref([])
const getHintData = async () => {
	if (!props.searchText) return
	const { result } = await getHint(props.searchText)
	hintData.value = result
}
// 监听+防抖
watchDebounced(() => props.searchText, getHintData, {
	immediate: true,
	debounce: 500
})
const onItemClick = (item) => {
	emits('itemClick', item)
}
/**
 * 处理关键字高亮
 */
const hightLightText = (text) => {
	// 高亮标签
	const hightLightStr = `<span class='text-zinc-900 dark:text-zinc-200'>${props.searchText}</span>`
	const reg = new RegExp(props.searchText, 'gi')
	return text.replace(reg, hightLightStr)
}
</script>
<style lang="scss" scoped>

</style>