<template >
	<m-popover class="flex items-center" :place="'bottom-left'">
		<template #reference>
			<div v-if="$store.getters.token"
				class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900">
				<!-- 头像 -->
				<img class="w-3 h-3 rounded-sm" v-lazy :src="$store.getters.userInfo.avatar" />
				<!-- 下箭头 -->
				<m-svg-icon class="h-1.5 w-1.5 ml-0.5" name="down-arrow" fillClass="fill-zinc-900 dark:fill-zinc-300">
				</m-svg-icon>
				<!-- VIP -->
				<m-svg-icon v-if="$store.getters.userInfo.vipLevel" class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
					name="vip" fillClass="fill-zinc-900">
				</m-svg-icon>
			</div>
			<div v-else>
				<m-button class="guide-my" icon="profile" iconColor="#fff" @click="onToLogin"></m-button>
			</div>
		</template>
		<!-- 气泡 -->
		<div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
			<div class=" flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
				v-for="i in menuArr" :key="i.id" @click="onItemClick(i)">
				<m-svg-icon :name="i.icon" class="h-1.5 w-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300"></m-svg-icon>
				<span class="text-zinc-800 text-sm dark:text-zinc-300">{{ i.title }}</span>
			</div>
		</div>
	</m-popover>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const menuArr = [
	{
		id: 0,
		title: '个人资料',
		icon: 'profile',
		path: '/profile'
	},
	{
		id: 1,
		title: '升级VIP',
		icon: 'vip-profile',
		path: '/member'
	},
	{
		id: 0,
		title: '退出登录',
		icon: 'logout',
	},
]
/**
 * 登录按钮点击事件
 */
const onToLogin = () => {
	router.push('/login')
}
const onItemClick = (i) => {
	if (i.id === 0) {
		router.push(i.path)
	}
	if (i.id === 1) {
		router.push(i.path)
	}


}
</script>
<style lang="scss" scoped>

</style>