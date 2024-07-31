<script setup>
import { onMounted, ref } from 'vue'
import { randomSong } from '@/api/wlfbot'
import { closeToast, showLoadingToast } from 'vant'

const info = ref({})
const CATEGORY = {
  1: "国语",
  2: "粤语",
  3: "韩文",
  4: "欧美",
  6: "其他"
}

const LEV = ["初级", "中级", "高级"]

const fetch = async () => {
  showLoadingToast({
    message: '加载中',
    forbidClick: true
  });
  const res = await randomSong()
  info.value = res.data?.Data
  info.value.MusicItemList.reverse()
  closeToast()
}


onMounted(() => {
  fetch()
})

const fmt = (n) => {
  if (n) {
    if (n % 60) {
      return `${Math.floor(n / 60)}分${n % 60}秒`
    } else {
      return `${Math.floor(n / 60)}分`
    }
  }
  return ""
}
</script>

<template>
  <div id="App" class="container">
    <h1 class="header">小奈帮你选歌</h1>
    <div style=" padding: 15px;">
      <van-button block icon="replay" plain type="success" @click="fetch">让小奈再选一个</van-button>
    </div>
    <div class="row" style=" padding: 10px;">
      <div class="col ctn">
        <img :src="info?.CoverUrl" alt="Logo" class="img-thumbnail">
      </div>
      <div class="col-7">
        <div class="card" style="width: 100%;">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>{{ info?.Name || "曲名走丢了..." }}
            </strong></li>
            <li class="list-group-item"><strong>{{ info?.Singer || "曲师走丢了..." }}
            </strong></li>
            <li class="list-group-item"><strong>ID: {{ info?.MusicID }}</strong></li>
          </ul>
        </div>
      </div>
    </div>
    <h4>乐曲信息</h4>
    <van-cell-group inset>
      <van-cell :value="CATEGORY[info?.MusicCategory]" title="乐曲分类"/>
      <van-cell :value="fmt(info?.Duration)" title="乐曲时长"/>
      <van-cell :value="info?.BPM" title="乐曲 BPM"/>
      <van-cell :value="info?.AddTime?.split(' ')[0]" title="乐曲添加时间"/>
      <van-cell :value="info?.DataUpdateTime?.split(' ')[0]" title="乐曲更新时间"/>
    </van-cell-group>
    <h4 style="margin-top: 20px;">谱面信息</h4>
    <div v-for="(item, idx) in info?.MusicItemList" :key="idx">
      <h6 style="margin-top: 10px;">{{ LEV[item?.MusicLev] || '特殊' }}谱面</h6>
      <van-cell-group inset>
        <van-cell :value="item?.MusicDataItemID" title="谱面 ID"/>
        <van-cell :value="item?.MusicLevel" title="等级"/>
        <van-cell :value="item?.MusicCombo" title="Combo"/>
        <van-cell :value="item?.LikeCount" title="获赞次数"/>
        <van-cell :value="item?.HateCount" title="被踩次数"/>
      </van-cell-group>
    </div>
    <h4 style="margin-top: 20px;">乐曲音频</h4>
    <div v-if="info?.AudioPreviewUrl" style="text-align: center;">
      <h6>预览音频</h6>
      <audio :src="info?.AudioPreviewUrl" controls>
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
    <div v-if="info?.AudioUrl" style="text-align: center;">
      <h6>完整音频</h6>
      <audio :src="info?.AudioUrl" controls>
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
    <div id="Footer"></div>
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

h6, h4 {
  text-align: center;
  padding: 10px 0;
}

#Footer {
  padding-bottom: 100px;
}
</style>
