<template >
	<div class=" w-full bg-white border-b border-b-zinc-200 px-2 py-1
							dark:bg-zinc-800 dark:border-b-zinc-700 duration-500 
	">
		<div class=" flex items-center">
			<img v-lazy src=" https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
				class="guide-home h-4 cursor-pointer mr-2" @click="onToHome">
			<HeaderSearch class="mr-1" />
			<HeaderTheme class="mr-1" />
			<HeaderMy />
		</div>
	</div>
</template>
<script setup>
import HeaderSearch from "./header-search/index.vue"
import HeaderMy from "./header-my.vue";
import HeaderTheme from "./header-theme.vue";
import { useRouter } from "vue-router";
const router = useRouter()
const onToHome = () => {
	router.push('/')
}
</script>
<style lang="scss" scoped>

</style>