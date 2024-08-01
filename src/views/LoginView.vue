<script setup>

import { onMounted, ref } from 'vue'
import { getQRCode, getToken } from '@/api/login.js'
import { useTokenStore } from '@/stores/token.js'
import { showSuccessToast } from 'vant'
import { useRouter } from 'vue-router'
import { useQRCodeIDStore } from '@/stores/QRCodeId.js'

const QrcodeUrl = ref("")
const tokenStore = useTokenStore()
const QRCodeIDStore = useQRCodeIDStore()
const router = useRouter()

let interval

const token = async () => {
  const res = await getToken(QRCodeIDStore.QRCodeID)
  if (res?.response?.status !== 400 && res.data) {
    clearInterval(interval)
    tokenStore.setToken(res?.data?.token_type + ' ' + res?.data?.access_token)
    QRCodeIDStore.removeQRCodeID()
    showSuccessToast('登录成功');
    router.push("/b30")
  }
}

const refresh = async () => {
  clearInterval(interval)
  QRCodeIDStore.removeQRCodeID()
  const res = await getQRCode()
  QrcodeUrl.value = res.data?.QrcodeUrl
  QRCodeIDStore.setQRCodeID(res.data?.ID)
  interval = setInterval(token, 2000);
}

onMounted(async () => {
  let res
  if (QRCodeIDStore.QRCodeID) {
    interval = setInterval(token, 2000);
  } else {
    res = await getQRCode()
    QrcodeUrl.value = res.data?.QrcodeUrl
    QRCodeIDStore.setQRCodeID(res.data?.ID)
    interval = setInterval(token, 2000);
  }
})

</script>

<template>
  <div id="App" class="container">

    <h1>欢迎登录舞小奈</h1>
    <div class="alert alert-success center" role="alert">
      微信扫码登录
    </div>
    <div class="row">
      <img
          :src="QrcodeUrl"
      />
    </div>

    <van-button block style="margin-top: 30px;" type="primary"
                @click="refresh"
    >重新生成二维码
    </van-button>
  </div>
</template>

<style scoped>

#App {
  background-color: #f7f8fa;
  height: 100vh;
}


h1 {
  text-align: center;
  padding-top: 40px;
}

p, .center {
  text-align: center;
  margin-top: 30px;
}

.row {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin: 0; /* 去掉默认的 margin */
}


.row img {
  width: 30vh;
}
</style>
