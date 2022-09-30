<template>
	<div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">

		<!-- 头部图片 -->
		<Header />
		<!-- 表单区 -->
		<div
			class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
			<h3 class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block">
				账号登录
			</h3>
			<!-- 表单 -->
			<veeForm @submit="onLoginHandler">
				<veeField
					class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
					name="username" type="text" placeholder="用户名" autocomplete="on" :rules="validateUsername"
					v-model="loginForm.username" />
				<veeErrMeg name="username" class="text-sm text-red-600 block text-left" />
				<veeField
					class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
					name="password" type="password" placeholder="密码" autocomplete="on" :rules="validatePassword"
					v-model="loginForm.password" />
				<veeErrMeg name="password" class="text-sm text-red-600 block text-left" />
				<div class="pt-1 pb-3 leading-[0px] text-right">
					<a
						class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer">
						去注册
					</a>
				</div>

				<m-button :loading="loading" class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800">
					登录
				</m-button>
			</veeForm>

			<div class="flex justify-around mt-4">
				<!-- QQ -->
				<m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
				<!-- 微信 -->
				<m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
			</div>
		</div>
		<SliderCaptcha v-if="isCaptcha" @captchaClose="close" @captchaSuccess="success" />
	</div>
</template>


<script setup>
import Header from "../components/header.vue";
import { Field as veeField, Form as veeForm, ErrorMessage as veeErrMeg } from 'vee-validate';
import { validateUsername, validatePassword } from "../validate";
import SliderCaptcha from "./slider-captcha.vue";
import { ref } from "vue";
import { LOGINUSER, LOGINWECHAT, LOGINQQ } from "../../../constants/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter()
const store = useStore()
//控制人类行为验证窗口展示
const isCaptcha = ref(false)
// 登录加载
const loading = ref(false)
/**触发登录 */
const onLoginHandler = () => {
	isCaptcha.value = true
}
// 人类行为验证成功回调
const success = () => {
	isCaptcha.value = false
	// x登录操作
	onLoginUser()
}
// 人类行为关闭成功回调
const close = () => {
	isCaptcha.value = false
}
/**
 * 用户登录行为
 */
const loginForm = ref({ username: 'LGD_Sunday', password: '123123' })
const onLoginUser = async () => {
	loading.value = true
	// 执行登录操作
	try {
		await store.dispatch('user/login', { ...loginForm.value, loginType: LOGINUSER })
	} finally {
		loading.value = false
		router.push('/')
	}

}
</script>
<style lang="scss" scoped>

</style>