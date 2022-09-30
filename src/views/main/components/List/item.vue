<template >
	<div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1  w-[230px]">
		<div class="relative w-full rounded cursor-zoom-in group" :style="{backgroundColor:randomColor()}">
			<!-- 图片 -->
			<img ref="imgRef" v-lazy :src="data?.photo" class="w-full rounded bg-transparent" :style="{
				height:(width/data.photoWidth)*data.photoHeight +'px'
			}" />
			<!-- 遮罩层 -->
			<div
				class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block">
				<!-- 分享 -->
				<m-button class="absolute top-1.5 left-1.5">分享</m-button>
				<!-- 点赞 -->
				<m-button class="absolute top-1.5 right-1.5" type="info" icon="heart"
					iconClass="fill-zinc-900 dark:fill-zinc-200"></m-button>
				<!-- 下载 -->
				<m-button class="absolute bottom-1.5 left-1.5 bg-zinc-100/70" type="info" icon="download" size="small"
					iconClass="fill-zinc-900 dark:fill-zinc-200" @click="onDownLoad">
				</m-button>
				<!-- 全屏 -->
				<m-button @click="onImgFullScreen" class="absolute bottom-1.5 right-1.5 bg-zinc-100/70" type="info" icon="full"
					size="small" iconClass="fill-zinc-900 dark:fill-zinc-200">
				</m-button>
			</div>

		</div>
		<!-- 标题 -->
		<p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
			{{data?.title}}
		</p>
		<!-- 作者信息 -->
		<div class="flex items-center mt-1 px-1">
			<img v-lazy :src="data?.avatar" class="h-2 w-2 rounded-full">
			<span class="text-sm text-zinc-500 ml-1">{{data?.author}}</span>
		</div>
	</div>
</template>
<script setup>
import { randomColor } from "../../../../utils/color";
import { saveAs } from "file-saver";
import { message } from "../../../../libs";
import { useFullscreen } from "@vueuse/core";
import { ref } from "vue";
const props = defineProps({
	data: {
		type: Object,
		required: true
	},
	width: {
		type: Number,
	}
})
// 下载按钮点击事件
const onDownLoad = () => {
	message('success', '图片开始下载')
	/**
	 * 1.savAs接受下载图片链接作为参数
	 */
	setTimeout(() => {
		saveAs(props.data.photoDownLink)
	}, 100)
}
/**
 * 生成全屏方法
 */
const imgRef = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgRef)
</script>
<style lang="scss" scoped>

</style>