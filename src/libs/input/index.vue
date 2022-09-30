<template >
	<div class="relative">
		<!-- 单行 -->
		<input v-if="type===TEXT" type="text" v-model=text :maxlength=max class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100
			 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm
			  focus:border-blue-400 w-full" />
		<!-- 多行 -->
		<textarea v-if="TEXTAREA" v-model="text" cols="30" rows="5" :maxlength="max" class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100
			  dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm
				 focus:border-blue-400 w-full"></textarea>
		<!-- 最大长度 -->
		<span v-if="max" class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
			:class="{ 'text-red-700': currentNumber === parseInt(max) }">{{ currentNumber }} / {{ max }}></span>
	</div>
</template>
<script>
// 单行
const TEXT = 'text'
const TEXTAREA = 'textarea'
	// 多行
</script>
<script setup>
import { useVModel } from "@vueuse/core";
import { computed } from "vue";
const props = defineProps({
	// v-model
	modelValue: {
		type: String,
		reuqired: true
	},
	// type
	type: {
		type: String,
		default: TEXT,
		validator(val) {
			const types = [TEXT, TEXTAREA]
			if (!types.includes(val)) {
				throw new Error('类型不正确')
			}

			return val
		}
	},
	// max
	max: {
		type: [String, Number]
	}
})
const emits = defineEmits(['update:modelValue'])
// 输入的字符
const text = useVModel(props)
// 输入字符数
const currentNumber = computed(() => text.value.length)
</script>
<style lang="scss" scoped>

</style>