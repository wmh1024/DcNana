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
      <h1 v-show="info" class="header">爱唱歌の舞小奈</h1>
      <van-empty v-if="info && !info.IsEnable" description="此歌曲未上架"/>
      <div v-if="info && info.IsEnable">
        <h4> {{ `${info?.Name} - ${info?.Singer}` }}</h4>
        <div v-if="info?.AudioPreviewUrl">
          <h6>预览音频</h6>
          <audio :src="info?.AudioPreviewUrl" controls>
            您的浏览器不支持 audio 标签。
          </audio>
          <div style="margin-top: 10px;  padding: 20px;">
            <van-button block icon="down" type="primary" @click="downloadCodeImg(info?.AudioUrl)">预览音频下载
            </van-button>
          </div>
        </div>
        <div v-if="info?.AudioUrl">
          <h6>完整音频</h6>
          <audio :src="info?.AudioUrl" controls>
            您的浏览器不支持 audio 标签。
          </audio>
          <div style="margin-top: 10px;  padding: 20px;">
            <van-button block icon="down" type="primary" @click="downloadCodeImg(info?.AudioUrl)">完整音频下载
            </van-button>
          </div>
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
  min-height: 100vh;
  padding-top: 46px;

}

.container {
  text-align: center;
}

h1 {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 30px;
}

h6 {
  padding: 20px 0;
}

</style>
