<template >
	<div class="w-full guide-search">
		<m-search v-model="inputValue" @search="onSearchHandle">
			<template #dropdown>
				<div>
					<!-- 搜索提示 -->
					<Hint :searchText="inputValue" v-show="inputValue" @itemClick="onSearchHandle" />
				</div>
				<!-- 最近搜索 -->
				<div>
					<History v-show="!inputValue" @itemClick="onSearchHandle"></History>
				</div>
				<Theme v-show='!inputValue' />
			</template>
		</m-search>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Hint from "./hint.vue";
import History from "./history.vue";
import Theme from "./theme.vue";
const store = useStore()
const inputValue = ref('')
const onSearchHandle = (val) => {
	inputValue.value = val
	if (val) {
		store.commit('search/addHistory', val)
		// 触发searchText 的变化
		store.commit('app/changeTextSearchText', val)
	}
}
</script>
<style lang="scss" scoped>

</style>