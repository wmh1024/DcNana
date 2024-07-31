<script setup>

import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView/>
    <van-tabbar route>
      <van-tabbar-item replace to="/b30" icon="fire-o">战力</van-tabbar-item>
      <van-tabbar-item replace to="/tools" icon="apps-o">工具</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
