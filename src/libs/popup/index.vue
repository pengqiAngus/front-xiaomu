<template >
	<div>
		<teleport to='body'>
			<transition name="fade">
				<!-- 蒙版 -->
				<div v-if="modelValue" class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
					@click="emits('update:modelValue', false)"></div>
			</transition>
			<transition name="popup">
				<!-- 主体 -->
				<div v-if="modelValue" v-bind="$attrs" class="w-screen bg-white z-50 fixed bottom-0 ">
					<slot></slot>
				</div>
			</transition>
		</teleport>

	</div>
</template>
<script setup>
import { useScrollLock } from "@vueuse/core";
import { watch } from "vue";
const props = defineProps({
	modelValue: {
		type: Boolean,
		require: true,
	},

})
const emits = defineEmits(['update:modelValue'])
// 锁定滚动
const isLocked = useScrollLock(document.body)
watch(() => props.modelValue, (val) => {
	isLocked.value = val
}, { immediate: true })
</script>
<style lang="scss" scoped>
fade-enter-active,
.fade-leave-active {
	transition: all 0.3s;
}


.fade-leave-to {
	opacity: 0;
}



.pop-enter-active,
.popup-leave-active {
	transition: all 0.3s;
}


.popup-leave-to {
	transform: translateY(100%);
}
</style>