<template>
	<div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1">
		<div
			class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2">
			<!-- 移动端 navbar -->
			<m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">
				个人资料
			</m-navbar>
			<!-- pc 端 -->
			<div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
				个人资料
			</div>
			<div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
				<!-- 头像 -->
				<div class="py-1 xl:absolute xl:right-[16%] xl:text-center" @click="onAvatarClick">
					<span class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto">我的头像</span>
					<!-- 头像部分 -->
					<div class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]">
						<img v-lazy :src="$store.getters.userInfo.avatar" alt=""
							class="rounded-[50%] w-full h-full xl:inline-block" />
						<div class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block">
							<m-svg-icon name="change-header-image" class="w-2 h-2 m-auto mt-2"></m-svg-icon>
							<div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">
								点击更换头像
							</div>
						</div>
					</div>
					<!-- 隐藏域 -->
					<input v-show="false" ref="inputFileTarget" type="file" accept=".png, .jpeg, .jpg, .gif"
						@change="onSelectImgHandler" />
					<p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
						支持 jpg、png、jpeg 格式大小 5M 以内的图片
					</p>
				</div>
				<!-- 用户名 -->
				<div class="py-1 xl:flex xl:items-center xl:my-1">
					<span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">用户名</span>
					<m-input v-model="userInfo.nickname" class="w-full" type="text" max="20"></m-input>
				</div>
				<!-- 职位 -->
				<div class="py-1 xl:flex xl:items-center xl:my-1">
					<span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">职位</span>
					<m-input v-model="userInfo.title" class="w-full" type="text"></m-input>
				</div>
				<!-- 公司 -->
				<div class="py-1 xl:flex xl:items-center xl:my-1">
					<span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">公司</span>
					<m-input v-model="userInfo.company" class="w-full" type="text"></m-input>
				</div>
				<!-- 个人主页 -->
				<div class="py-1 xl:flex xl:items-center xl:my-1">
					<span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人主页</span>
					<m-input v-model="userInfo.homepage" class="w-full" type="text"></m-input>
				</div>
				<!-- 个人介绍 -->
				<div class="py-1 xl:flex xl:my-1">
					<span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人介绍</span>
					<m-input v-model="userInfo.introduction" class="w-full" type="textarea" max="50">
					</m-input>
				</div>
				<!-- 保存修改 -->
				<m-button :loading="loading" @click="onChangeProfile"
					class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]">
					保存修改</m-button>
				<!-- 移动端退出登录 -->
				<m-button v-if="isMobileTerminal"
					class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
					@click="onLogoutClick">
					退出登录
				</m-button>
			</div>
		</div>
		<m-dialog title="裁剪头像" v-model="isDialogVisible">
			<ChangeAvatar :blob="currentBlob" @close="isDialogVisible=false"></ChangeAvatar>
		</m-dialog>
	</div>
</template>
<script setup>
import { isMobileTerminal } from "../../utils/flexible";
import { confirm } from "../../libs/confirm";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { updateProfile } from "../../api/sys";
import { message } from "../../libs/message";
import ChangeAvatar from "./components/changeAvatar.vue";
const store = useStore()
const router = useRouter()

// 隐藏域
const inputFileTarget = ref(null)
/**
 * 更换头像点击事件
 */
const onAvatarClick = () => {
	inputFileTarget.value.click()
}
/**
 * 数据本地的双向同步
 */
const userInfo = ref(store.getters.userInfo)
// const changeStoreUserInfo = (key, val) => {
// 	store.commit('user/setUserInfo', { ...store.getters.userInfo, [key]: val })
// }
/**
 * 头像选择之后的回调
 */
const isDialogVisible = ref(false)
const currentBlob = ref('')
const onSelectImgHandler = () => {
	// 获取上传的文件
	const imgFile = inputFileTarget.value.files[0]
	// 生成blob对象
	const blob = URL.createObjectURL(imgFile)
	currentBlob.value = blob
	isDialogVisible.value = true
}

/**
 * 更新profile
 */
const loading = ref(false)
const onChangeProfile = async () => {
	loading.value = true
	await updateProfile(userInfo.value)
	// 同步vuex
	store.commit('user/setUserInfo', userInfo.value)
	message('success', '用户信息修改成功')
	loading.value = false
}

/**
 * 移动端后退处理
 */
const onNavbarLeftClick = () => {
	router.back()
}

/**
 * 移动端：退出登录
 */
const onLogoutClick = () => {
	confirm('确定要退出登录吗？').then(() => {
		store.dispatch('user/logout')
	})
}
</script>
<style lang="scss" scoped>

</style>