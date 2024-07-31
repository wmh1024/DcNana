<script setup>
const onClickLeft = () => {
  history.back()
}
</script>

<template>
  <van-nav-bar
      id="navbar"
      title="乐曲详情"
      left-text="返回"
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
