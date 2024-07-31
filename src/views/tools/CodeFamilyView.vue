<script setup>

import { closeToast, showFailToast, showLoadingToast, showNotify, showSuccessToast } from 'vant'
import useClipboard from 'vue-clipboard3'
import { onMounted, ref, watch } from 'vue'
import { getMakerInfo, getPublicMusic } from '@/api/music'
import request, { baseURL } from '@/utils/request'

const { toClipboard } = useClipboard()

const user = ref({})
const music = ref([])

const show = ref(false)

const copy = async () => {
  try {
    await toClipboard(code_value.value)
    showSuccessToast('复制成功');
  } catch (e) {
    showFailToast('复制失败');
  }

}
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
const checked = ref([]);
const checkedId = ref([]);
const checkboxRefs = ref([]);
const checkboxGroup = ref(null);
const toggle = (index) => {
  checkboxRefs.value[index].toggle();

};
const toggleAll = () => {
  checkboxGroup.value.toggleAll();
}

watch(checked, (checked) => {
  checkedId.value = []
  checked.forEach(item => {
    checkedId.value.push(item?.MusicID)
  })
})

const gen = async () => {
  await fetchAll()
  show.value = true
}

const code = ref([])
const code_value = ref()
const loading = ref(false)

const fetchAll = async () => {
  loading.value = true
  try {
    const urls = [];
    for (let i = 0; i < checkedId.value.length; i++) {
      urls.push(baseURL + `/Dance/api/MusicData/GetMusicCode?musicId=${checkedId.value[i]}&cnt=${i}`);
    }
    const requests = urls.map(url => request.get(url));
    const responses = await Promise.all(requests);
    code.value = responses.map(response => response.data?.Code);
    showNotify({ type: 'success', message: `生成成功，本次一共生成了 ${checkedId.value.length} 个` });
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

</script>

<template>
  <div id="App" class="container">
    <h1 class="header">自制谱全家桶生成</h1>
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
    <van-checkbox-group ref="checkboxGroup" v-model="checked">
      <van-cell-group inset>
        <van-cell
            v-for="(item, index) in music"
            :key="item"
            clickable
            @click="toggle(index)"
        >
          <template #title>
            <span class="badge bg-success text" style="margin-left: 3px; margin-right: 5px;">{{
                item?.MusicID
              }}</span>
            {{ item?.Name }}

          </template>
          <template #right-icon>
            <van-checkbox
                :ref="el => checkboxRefs[index] = el"
                :name="item"
                @click.stop
            />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div v-if="music.length !== 0" class="row" style=" padding: 20px;">
      <div class="col col-6">
        <van-button block type="primary" @click="toggleAll">反选</van-button>
      </div>
      <div class="col-6">
        <van-button :disabled="checkedId.length === 0" :loading="loading" block type="success" @click="gen">一键生成
        </van-button>
      </div>
    </div>
    <van-popup
        v-model:show="show"
        :style="{ height: '60%', background: '#f7f8fa' }"
        closeable
        position="bottom"
    >
      <div style="margin-top: 30px;  padding: 20px;">
        <van-button block type="primary" @click="copy">一键复制</van-button>
      </div>
      <van-cell-group inset style="">
        <van-field
            v-model="code_value"
            autosize
            disabled
            label="兑换码"
            label-align="top"
            rows="8"
            type="textarea"
        />
      </van-cell-group>
    </van-popup>
    <van-empty v-if="music.length === 0" description="您还不是创作者"/>
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

.row {
  padding-bottom: 20px;
}

#Footer {
  padding-bottom: 100px;
}
</style>
