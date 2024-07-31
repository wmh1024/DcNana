<script setup>
const onClickLeft = () => {
  history.back()
}
</script>

<template>
  <van-nav-bar
      title="舞小奈の小工具"
      left-text="返回"
      id="navbar"
      left-arrow
      @click-left="onClickLeft"
  />
  <router-view></router-view>
</template>

<style scoped>
#navbar {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
