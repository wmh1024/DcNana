<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const value = ref()
</script>

<template>
  <div id="App">
    <van-search
        v-model="value"
        placeholder="请输入搜索乐曲 ID"
        shape="round"
        @search="router.push('/info/' + value)"
    />
  </div>
</template>

<style scoped>
#App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7f8fa;
  padding-top: 46px;
  min-height: 100vh;
}

h1 {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 20px;
}

</style>
