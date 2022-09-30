<template >
	<m-popover :place="'top-left'">
		<!-- 具名插槽:触发弹层视图 -->
		<template #reference>
			<m-svg-icon :name="showIconName"
				class=" guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
				fillClass="fill-zinc-900 dark:fill-zinc-300">
			</m-svg-icon>
		</template>
		<!-- 匿名插槽：弹出层展示内容 -->
		<div class="w-[140px] overflow-hidden">
			<div v-for="i in themeArr" :key="i.id" @click="onItemClick(i)"
				class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800">
				<m-svg-icon :name="i.icon" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:hover:fill-zinc-800">
				</m-svg-icon>
				<span class="text-zinc-900 text-sm dark:text-zinc-300">{{ i.name }}</span>
			</div>
		</div>
	</m-popover>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "../../../../constants/index";
const store = useStore()
const themeArr = [
	{
		id: 0,
		type: THEME_LIGHT,
		icon: 'theme-light',
		name: '极简白'
	},
	{
		id: 0,
		type: THEME_DARK,
		icon: 'theme-dark',
		name: '极夜黑'
	},
	{
		id: 0,
		type: THEME_SYSTEM,
		icon: 'theme-system',
		name: '跟随系统'
	}
]
const onItemClick = (themeItem) => {
	store.dispatch('theme/goChangeThemeType', themeItem.type)
}
// 展示图标
const showIconName = computed(() => {
	const foundTheme = themeArr.find(item => {
		return item.type === store.getters.themeType
	})
	return foundTheme?.icon
})
</script>
<style lang="scss" scoped>

</style>