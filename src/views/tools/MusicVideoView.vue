<script setup>
import { ref } from 'vue'
import { getMusicInfo } from '@/api/wlfbot'
import { showFailToast, showSuccessToast } from 'vant'

const info = ref()
const musicId = ref()
const onSearch = async () => {
  const res = await getMusicInfo(musicId.value)
  if (!res.data.Data) {
    showFailToast(res.data.Message)
    return
  }
  info.value = res.data.Data
  showSuccessToast("查询成功")
}

const downloadCodeImg = (img) => {
  var a = document.createElement('a')
  a.download = name || 'pic'
  a.href = img;
  a.click();
}


</script>

<template>
  <div id="App">
    <van-search
        v-model="musicId"
        placeholder="请输入乐曲ID"
        shape="round"
        @search="onSearch"
    />
    <div class="container">
      <h1 v-show="info" class="header">拍视频の舞小奈</h1>
      <van-empty v-if="info && !info.IsEnable" description="此歌曲未上架"/>
      <van-empty v-if="info && info.IsEnable && !info.VideoUrl" description="此歌曲暂无视频"/>
      <div v-if="info && info.IsEnable && info.VideoUrl">
        <h4> {{ `${info?.Name} - ${info?.Singer}` }}</h4>
        <video id="video" :src="info?.VideoUrl" controls width="100%">
          <source type="video/webm"/>
        </video>
        <div style="margin-top: 10px;  padding: 20px;">
          <van-button block type="primary" @click="downloadCodeImg(info?.VideoUrl)">视频下载</van-button>
        </div>
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
  padding-top: 46px;
  min-height: 100vh;
}

.container {
  text-align: center;
}

h1 {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 30px;
}

h4 {
  padding-bottom: 20px;
}

</style>
