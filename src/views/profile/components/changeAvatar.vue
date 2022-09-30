<template>
	<div class="overflow-auto flex flex-col items-center">
		<m-svg-icon v-if="isMobileTerminal" name="close" class="w-3 h-3 p-0.5 m-1 ml-auto"
			fillClass="fill-zinc-900 dark:fill-zinc-200 " @click="close"></m-svg-icon>

		<img class="" ref="imageTarget" :src="blob" />

		<m-button class="mt-4 w-[80%] xl:w-1/2" @click="onConfirmClick" :loading="loading">确定</m-button>
	</div>
</template>
<script setup>
import { isMobileTerminal } from "../../../utils/flexible";
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref, onMounted } from "vue";
const props = defineProps({
	blob: {
		type: String,
		required: true
	}
})
const imageTarget = ref(null)
/**
 * 图片裁剪
 */
// 移动端配置对象
const mobileOptions = {
	// 将裁剪框限制在画布的大小
	viewMode: 1,
	// 移动画布，裁剪框不动
	dragMode: 'move',
	// 裁剪框固定纵横比：1:1
	aspectRatio: 1,
	// 裁剪框不可移动
	cropBoxMovable: false,
	// 不可调整裁剪框大小
	cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
	// 裁剪框固定纵横比：1:1
	aspectRatio: 1
}
let cropper = null
onMounted(() => {
	cropper = new Cropper(imageTarget.value, isMobileTerminal.value ? mobileOptions : pcOptions)
})
const emits = defineEmits(['close'])
const loading = ref(false)
// 关闭弹窗
const close = () => { emits('close') }
/**
 * 确定按钮事件
 */
const onConfirmClick = () => {
	loading.value = true
	// 拿到裁剪后的图片
	cropper.getCroppedCanvas().toBlob(blob => {
		console.log(URL.createObjectURL(blob));
	})
	emits('close')
}
</script>
<style lang="scss" scoped>

</style>