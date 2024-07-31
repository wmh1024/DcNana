<script setup>
import { onMounted, ref, watch } from 'vue'
import { getMakerInfo, getPublicMusic } from '@/api/music.js'
import useClipboard from 'vue-clipboard3'
import { closeToast, showFailToast, showLoadingToast, showNotify, showSuccessToast } from 'vant'
import request, { baseURL } from '@/utils/request.js'

const user = ref({})
const music = ref([])
const code = ref([])
const code_value = ref()
const show = ref(false)
const loading = ref(false)
const music_id = ref()
const music_name = ref()

const cnt = ref(0)

const generate = (id, name) => {
  music_id.value = id
  music_name.value = name
  code_value.value = ''
  code.value = []
  show.value = true
  cnt.value = 1
}

const { toClipboard } = useClipboard()
const copy = async () => {
  try {
    await toClipboard(code_value.value)
    showSuccessToast('复制成功');
  } catch (e) {
    showFailToast('复制失败');
  }
}


const fetchAll = async () => {
  loading.value = true
  try {
    const urls = [];
    for (let i = 0; i < cnt.value; i++) {
      urls.push(baseURL + `/Dance/api/MusicData/GetMusicCode?musicId=${music_id.value}&cnt=${i}`);
    }
    const requests = urls.map(url => request.get(url));
    const responses = await Promise.all(requests);
    code.value = responses.map(response => response.data?.Code);
    showNotify({ type: 'success', message: `生成成功，本次一共生成了 ${cnt.value} 个` });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    showNotify({ type: 'danger', message: '生成失败' });
  } finally {
    loading.value = false
  }
}

watch(code, (newCount, oldCount) => {
  code_value.value = newCount.join("\n")
});

onMounted(async () => {
  showLoadingToast({
    message: '加载中',
    forbidClick: true
  });
  let res = await getMakerInfo()
  user.value = res.data
  res = await getPublicMusic(1);
  music.value = res?.data?.List
  closeToast()
})

</script>

<template>
  <div id="app" class="container">
    <h1 class="header">自制谱兑换码批量生成</h1>
    <div class="row">
      <div class="col ctn">
        <img :src="user?.HeadimgURL?.replace('/132/', '/0/')" alt="Logo" class="img-thumbnail">
      </div>
      <div class="col-7">
        <div class="card" style="width: 100%;">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>{{ user?.UserName }}
            </strong></li>
            <li class="list-group-item"><strong>ID: {{ user?.UserID }}
              <span class="badge bg-warning text-dark">Lv.{{ user?.MakerGrade }}</span>
            </strong></li>
            <li class="list-group-item"><strong>创作金币：{{ user?.TotalProfit }}</strong></li>
          </ul>
        </div>
      </div>
    </div>
    <van-card
        v-for="(item, idx) in music"
        :key="idx"
        :desc="item?.GoodsIntro"
        :tag="item?.MusicID"
        :thumb="item?.PicPath"
        :title="item?.Name"
        @click="generate(item?.MusicID, item?.Name)"
    >

      <template #num>
        点播次数: {{ item?.ClicksRatio }}
      </template>
      <template #price>
        {{ item?.PriceSale }} 金币/天
      </template>
      <template #tags>
        <van-space>
          <van-tag v-for="tag in item?.TagList" plain type="primary">{{ tag }}</van-tag>
        </van-space>
      </template>
    </van-card>
    <van-popup
        v-model:show="show"
        :style="{ height: '80%', background: '#f7f8fa' }"
        closeable
        position="bottom"
    >
      <h1 style="margin-top: 50px;  text-align: center;">兑换码批量生成</h1>
      <van-cell-group inset>
        <van-cell :value="music_name" title="曲目名"/>
        <van-cell :value="music_id" title="曲目 ID"/>
        <van-cell title="生成数量">
          <template #value>
            <van-stepper v-model="cnt" integer max="50" min="1"/>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="row" style=" padding: 20px; margin-bottom: 0;">
        <div class="col col-6">
          <van-button :disabled="cnt < 1" :loading="loading" block type="primary" @click="fetchAll">批量生成
          </van-button>
        </div>
        <div class="col-6">
          <van-button :disabled="!code_value" block type="success" @click="copy">一键复制</van-button>
        </div>
      </div>
      <van-cell-group inset>
        <van-field
            v-model="code_value"
            autosize
            disabled
            label="兑换码"
            label-align="top"
            rows="1"
            type="textarea"
            @click="copy"
        />
      </van-cell-group>
    </van-popup>
    <van-empty v-if="music.length === 0" description="您还不是创作者"/>
    <div id="Footer"></div>
  </div>

</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 46px;

}

h1 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

.row {
  margin-bottom: 20px;
}

#Footer {
  margin-bottom: 100px;
}
</style>
