<template >
	<div>
		<mobileNav v-if="isMobileTerminal" />
		<pcNav v-else />
	</div>
</template>
<script setup>
import { isMobileTerminal } from "../../../../utils/flexible";
import mobileNav from "./mobile/index.vue";
import pcNav from "./pc/index.vue";
import { useStore } from "vuex";
const store = useStore()
store.dispatch('category/useCategoryData')
</script>
<style lang="scss" scoped>

</style>