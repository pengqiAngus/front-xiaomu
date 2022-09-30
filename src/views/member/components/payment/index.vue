<template>
	<div>
		<!-- PC 端支付 -->
		<PcPayment v-if="!isMobileTerminal"></PcPayment>
	</div>
</template>

<script setup>
import { isMobileTerminal } from '../../../../utils/flexible'
import PcPayment from './pcPayment/index.vue'
</script>

<style lang="scss" scoped>

</style>