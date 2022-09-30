<template >
	<div>
		<m-infinite v-model="loading" :isFinished="isFinished" @onLoad="getPexelsData">
			<m-waterfall :data="pexelsList" nodeKey="id" :column="isMobileTerminal?2:5" :picturePreReading="false">
				<template v-slot="{item,width}">
					<Item :data="item" :width="width" />
				</template>
			</m-waterfall>
		</m-infinite>

	</div>
</template>
<script setup>
import { ref, watch } from "vue";
import { getPexelsList } from "../../../../api/pexels";
import Item from "./item.vue";
import { isMobileTerminal } from "../../../../utils/flexible";
import { useStore } from "vuex";
const store = useStore()
// 数据是否加载中
const loading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)
// 数据源
const pexelsList = ref([])
let query = {
	page: 1,
	size: 20
}
/**
 * 加载数据方法
 */

const getPexelsData = async () => {
	if (isFinished.value) { return }

	// 让query.page自增
	if (pexelsList.value.length) {
		query.page += 1
	}
	const res = await getPexelsList(query)
	if (query.page == 1) {
		pexelsList.value = res.list
	} else {
		pexelsList.value.push(...res.list)
	}
	if (pexelsList.value.length === res.total) {
		isFinished.value = true
	}
	loading.value = false
}
const resetQuery = (newQuery) => {
	query = { ...query, ...newQuery }
	isFinished.value = false
	pexelsList.value = []
}
watch(
	() => store.getters.currentCategory,
	(currentCategory) => {
		// 重置请求参数
		resetQuery({
			page: 1,
			categoryId: currentCategory.id
		})
	}
),
	watch(() => store.getters.searchText, (searchText) => {
		resetQuery({
			page: 1,
			searchText,
		})
	})
// 监听searchText的变化

</script>
<style lang="scss" scoped>

</style>