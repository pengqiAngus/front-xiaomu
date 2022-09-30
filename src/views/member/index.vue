<template>
	<div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
		<div
			class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4">
			<!-- 移动端 navbar 处理 -->
			<m-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">
				精选会员
			</m-navbar>

			<div class="py-2 px-1">
				<h2 class="text-center text-[34px] font-bold tracking-widest text-yellow-600">
					精选VIP
				</h2>
				<p class="text-center text-lg text-yellow-500">
					升级精选VIP，畅想所有内容
				</p>
				<div
					class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
					<PayMenuItem v-for="item in vipPayListData" :key="item.id" :hot="item.isHot"
						:select="item.id === currentVip.id" :data="item" @click="onChangeCurrentPay"></PayMenuItem>
				</div>
				<p class="mt-1 text-sm text-zinc-500">{{ currentVip.desc }}</p>
				<!-- 支付 -->
				<Payment />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { getVIP } from "../../api/pay";
import PayMenuItem from "./components/payMenuItem.vue";
import { isMobileTerminal } from "../../utils/flexible";
import Payment from "./components/payment/index.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()
// 所有支付数据
const vipPayListData = ref([])
// 当前支付数据
const currentVip = ref({})
// 获取支付数据方法
const getVipPayListData = async () => {
	const res = await getVIP()
	vipPayListData.value = res
	currentVip.value = vipPayListData.value[0]
}
// 会员选择事件
const onChangeCurrentPay = (item) => {
	currentVip.value = item
}
// 移动端后退
const onNavbarLeftClick = () => {
	router.back()
}
getVipPayListData()
</script>
<style lang="scss" scoped>

</style>