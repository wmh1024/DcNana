<script setup>
import { ref } from 'vue'
import { closeToast, showLoadingToast, showNotify } from 'vant'
import { gainMusicByCode } from '@/api/music'

const code_value = ref("")
const success = ref(0)

const exchange = async () => {
  showLoadingToast({
    message: '批量兑换...',
    forbidClick: true
  });
  success.value = 0
  const code = code_value.value.split("\n").map(String)
  for (const item of code) {
    const res = await gainMusicByCode(item)
    if (res?.status === 200) {
      success.value = success.value + 1
    }
  }
  closeToast()
  if (success.value > 0) {
    showNotify({ type: 'success', message: `本次成功兑换${success.value}个自制谱` });
    code_value.value = ''
  } else {
    showNotify({ type: 'danger', message: `兑换失败!请检查兑换码是否正确` });
  }
}
</script>

<template>
  <div id="App" class="container">
    <h1>自制谱兑换码批量兑换</h1>
    <van-cell-group inset style="">
      <van-field
          v-model="code_value"
          label="兑换码"
          label-align="top"
          placeholder="请输入兑换码"
          rows="13"
          type="textarea"
      />
    </van-cell-group>
    <div class="row " style=" padding: 20px;">
      <div class="col-6">
        <van-button :disabled="!code_value" block type="success" @click="exchange">一键兑换</van-button>
      </div>
      <div class="col col-6">
        <van-button block type="danger" @click="code_value = ''">清空</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7f8fa;
  min-height: 100vh;
  padding-top: 46px;

}

h1 {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 20px;
}
</style>
