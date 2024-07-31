<script setup>
import request, { baseURL } from '@/utils/request'
import { closeToast, showLoadingToast, showNotify } from 'vant'
import { onMounted, ref } from 'vue'
import { computeRa } from '@/utils/b30'
import { getMakerInfo } from '@/api/music'
import { getInfo } from '@/api/user'

const musicListFmt = ref([])
const musicListFmt2 = ref([])
const musicPicFmt = ref({})

const fetchAll = async () => {
  try {
    const urls = [];
    for (let i = 1; i < 8; i++) {
      urls.push(baseURL + `/Dance/api/User/GetMyRankNew?musicIndex=${i}&musicIDList=&machineType=0`);
    }
    const requests = urls.map(url => request.get(url));
    const responses = await Promise.all(requests);
    const musicList = responses.map(response => response.data);
    let fmt_musicList = []
    musicList.forEach(list => {
      list.forEach(music => {
        music.ItemRankList.forEach(item => {
          fmt_musicList.push(
              {
                MusicID: music.MusicID,
                Name: music.Name,
                MusicLevOld: item.MusicLevOld,
                MusicRank: item.MusicRank,
                MusicRanking: item.MusicRanking,
                RecordTime: item.RecordTime,
                PlayerMiss: item.PlayerMiss,
                PlayerPercent: item.PlayerPercent,
                OwnerType: music.OwnerType,
                Rating: item.MusicRank < 20 ? computeRa(item.MusicRank, item.PlayerPercent) : 0
              }
          )
        })
      })
    })
    fmt_musicList.sort((a, b) => b.Rating - a.Rating)
    musicListFmt.value = fmt_musicList.slice(0, 50)

    fmt_musicList = fmt_musicList.filter(item => item?.OwnerType === 1)
    musicListFmt2.value = fmt_musicList.slice(0, 50)
    showNotify({ type: 'success', message: '生成成功' });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    showNotify({ type: 'danger', message: '生成失败' });
  } finally {
  }
}

const fetchPic = async () => {
  try {
    const fmt_picList = {}
    let urls = [];
    for (let i = 0; i < musicListFmt.value.length; i++) {
      urls.push(baseURL + `/Dance/api/MusicData/GetGoodsInfo?musicId=${musicListFmt.value[i]?.MusicID}`);
    }
    let requests = urls.map(url => request.get(url));
    let responses = await Promise.all(requests);
    let picList = responses.map(response => response.data);
    picList.forEach(item => {
      fmt_picList[item?.MusicID] = item?.PicPath;
    })

    urls = [];
    for (let i = 0; i < musicListFmt2.value.length; i++) {
      urls.push(baseURL + `/Dance/api/User/GetMusicRankingNew?musicIndex=0&page=1&pagesize=15&machineRank=false&keyword=${musicListFmt2.value[i]?.MusicID}&isStrict=false`);
    }
    requests = urls.map(url => request.get(url));
    responses = await Promise.all(requests);
    picList = responses.map(response => response.data?.List);
    picList.forEach(list => {
      list.forEach(item => {
        fmt_picList[item?.MusicID] = item?.Cover
      })
    })
    musicPicFmt.value = fmt_picList
  } catch
      (error) {
    console.error('Error fetching URLs:', error);
    showNotify({ type: 'danger', message: '生成失败' });
  } finally {
  }
}

const user = ref({})
const info = ref({})

onMounted(async () => {
  showLoadingToast({
    message: '加载中',
    forbidClick: true
  });
  let res = await getMakerInfo()
  user.value = res.data
  res = await getInfo(user.value?.UserID)
  info.value = res.data
  await fetchAll()
  await fetchPic()
  closeToast()
})

const active = ref()

</script>

<template>
  <div id="App" class="container">
    <h1 class="header">舞小奈のB50</h1>
    <h6 style="text-align: center;margin-bottom: 20px;">
      舞立方信息
    </h6>
    <div class="row">
      <div class="col ctn">
        <img :src="user?.HeadimgURL?.replace('/132/', '/0/')" alt="Logo" class="img-thumbnail">
      </div>
      <div class="col-7">
        <div class="card" style="width: 100%;">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>{{ user?.UserName }}
              <span class="badge bg-warning text-dark">{{ info?.LvRatio }}</span>
            </strong></li>
            <li class="list-group-item"><strong>ID: {{ user?.UserID }}
            </strong></li>
            <li class="list-group-item"><strong>战队：{{ info?.TeamName }}</strong></li>
          </ul>
        </div>
      </div>
    </div>
    <h6 style="text-align: center;margin-bottom: 20px;">
      成绩最好的 50 首乐曲成绩
    </h6>
    <van-tabs v-model:active="active" type="card" @click-tab="">
      <van-tab title="包含自制铺">
        <div style="margin-top: 20px;">
          <van-card
              v-for="(item, idx) in musicListFmt"
              :key="idx"
              :tag="String(idx + 1)"
              :thumb="musicPicFmt[item.MusicID] || 'https://ts-asset.shenghuayule.com/images/default/headimg/0/default_headimg.jpg'"
          >
            <template #desc>
              <div>
                歌曲排名：{{ item?.MusicRanking }}
              </div>
            </template>
            <template #title>
              <h6>
                <van-tag v-if="item?.MusicLevOld === 0" color="#62c44f" size="medium" style=" margin-right: 3px;">
                  Lv.{{ item?.MusicRank }}
                </van-tag>
                <van-tag v-else-if="item?.MusicLevOld === 1" color="#4187f2" size="medium" style=" margin-right: 3px;">
                  Lv.{{ item?.MusicRank }}
                </van-tag>
                <van-tag v-else color="#7232dd" size="medium" style=" margin-right: 3px;">
                  Lv.{{ item?.MusicRank }}
                </van-tag>
                {{ item?.Name }}
              </h6>
            </template>
            <template #num>
              {{ item?.RecordTime }}
            </template>
            <template #price>
              <h6>{{ item?.PlayerPercent / 100 }}%
                <van-tag v-if="item?.PlayerPercent === 10000" size="medium" style="margin-left: 3px;" type="warning">满分
                </van-tag>
                <van-tag v-else-if="item?.PlayerMiss === 0" size="medium" style="margin-left: 3px;" type="success">全连
                </van-tag>
              </h6>
            </template>
          </van-card>
        </div>
      </van-tab>
      <van-tab title="不包含自制铺">
        <div style="margin-top: 20px;">
          <van-card
              v-for="(item, idx) in musicListFmt2"
              :key="idx"
              :tag="String(idx + 1)"
              :thumb="musicPicFmt[item.MusicID] || 'https://ts-asset.shenghuayule.com/images/default/headimg/0/default_headimg.jpg'"
          >
            <template #desc>
              <div>
                歌曲排名：{{ item?.MusicRanking }}
              </div>
            </template>
            <template #title>
              <h6>
                <van-tag v-if="item?.MusicLevOld === 0" color="#62c44f" size="medium" style=" margin-right: 3px;">
                  Lv.{{ item?.MusicRank }}
                </van-tag>
                <van-tag v-else-if="item?.MusicLevOld === 1" color="#4187f2" size="medium" style=" margin-right: 3px;">
                  Lv.{{ item?.MusicRank }}
                </van-tag>
                <van-tag v-else color="#7232dd" size="medium" style=" margin-right: 3px;">
                  Lv.{{ item?.MusicRank }}
                </van-tag>
                {{ item?.Name }}
              </h6>
            </template>
            <template #num>
              {{ item?.RecordTime }}
            </template>
            <template #price>
              <h6>{{ item?.PlayerPercent / 100 }}%
                <van-tag v-if="item?.PlayerPercent === 10000" size="medium" style="margin-left: 3px;" type="warning">满分
                </van-tag>
                <van-tag v-else-if="item?.PlayerMiss === 0" size="medium" style="margin-left: 3px;" type="success">全连
                </van-tag>
              </h6>
            </template>
          </van-card>
        </div>
      </van-tab>
    </van-tabs>
    <div id="Footer"></div>
  </div>
</template>

<style scoped>
#App {
  padding-top: 46px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7f8fa;
  min-height: 100vh;
}

h1 {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 20px;
}

#Footer {
  padding-bottom: 100px;
}

.row {
  margin-bottom: 20px;
}
</style>
