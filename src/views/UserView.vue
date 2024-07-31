<script setup>
import { onMounted, ref } from 'vue'
import { getMakerInfo } from '@/api/music'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'
import { getAccountInfo, getAllList, getInfo } from '@/api/user'
import { closeToast, showLoadingToast } from 'vant'
import { useUserStore } from '@/stores/user'
import { useB30Store } from '@/stores/B30'

const userStore = useUserStore()

const user = ref({})
const info = ref({})
const accountInfo = ref({})
const allList = ref({})
const router = useRouter()

onMounted(async () => {
  if (JSON.stringify(userStore.getUser()) === "{}") {
    showLoadingToast({
      message: '加载中',
      forbidClick: true
    });
    // 自制谱接口
    let res = await getMakerInfo()
    user.value = res.data
    userStore.setUser(user.value)
    // 个人信息接口
    res = await getInfo(user.value?.UserID)
    info.value = res.data
    userStore.setInfo(info.value)
    // 账户接口
    res = await getAccountInfo()
    accountInfo.value = res.data
    userStore.setAccountInfo(accountInfo.value)
    // 舞龄
    res = await getAllList()
    const temp = {}
    await res.data.forEach(item => {
      temp[item.Title] = item.ContentText;
    })
    allList.value = temp
    userStore.setAllList(allList.value)
    closeToast()
  }
  user.value = userStore.getUser()
  allList.value = userStore.getAllList()
  info.value = userStore.getInfo()
  accountInfo.value = userStore.getAccountInfo()
})

const logout = () => {
  const tokenStore = useTokenStore();
  tokenStore.setToken('')
  userStore.setInfo({})
  userStore.setUser({})
  userStore.setAllList([])
  userStore.setAccountInfo([])
  const b30Store = useB30Store()
  b30Store.setInfo({})
  b30Store.setUser({})
  b30Store.setMusicPicFmt([])
  b30Store.setMusicListFmt([])
  b30Store.setMusicListFmt2([])
  b30Store.setRecentMusicList([])
  router.push("/login")
}

</script>

<template>
  <div id="App" class="container">
    <h1 class="header">💳 舞小奈の身份证</h1>
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
            </strong></li>
            <li class="list-group-item"><strong>战队：{{ info?.TeamName }}</strong></li>
          </ul>
        </div>
      </div>
    </div>
    <van-cell-group inset>
      <van-cell :value="info?.LvRatio" title="战力值"/>
      <van-cell :value="info?.RankNation" title="全国排名"/>
      <van-cell :value="info?.MusicScore" title="积分"/>
      <van-cell :value="allList['舞龄'] || ''" title="游玩时长"/>
      <van-cell :value="allList['游玩次数'] || ''" title="游玩次数"/>
      <van-cell :value="info?.QuanMinLevels?.Current?.LevelPoint" title="全明星排位分"/>
      <van-cell :value="info?.GameLevName" title="段位"/>
      <van-cell :value="accountInfo?.Gold" title="金币"/>
      <van-cell :value="accountInfo?.StarCoin" title="星劵"/>
    </van-cell-group>
    <div style="padding: 10px; margin-top: 10px;">
      <van-button block type="danger" @click="logout">
        退出登录
      </van-button>
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
}


h1 {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 20px;
}

.row {
  margin-bottom: 20px;
}

#Footer {
  padding-bottom: 100px;
}
</style>
