<script setup lang="ts">
import { getCurrentInstance } from "vue";
import DynDirective from "../src";

// 使用 Vue 的全局 API 注册自定义指令
const app = getCurrentInstance()!.appContext.app;
app.directive("dyn-directive", DynDirective);

const onMultipleClick = () => {
  alert("multiple click");
};
</script>

<template>
  <!-- <main class="dyn-directive-container" v-dyn-directive="onMultipleClick">multiple click</main> -->
  <main class="dyn-directive-container" v-dyn-directive:10="onMultipleClick">multiple click</main>
</template>

<style lang="scss" scoped>
.dyn-directive-container {
}
</style>
