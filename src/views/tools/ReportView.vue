<script setup>
import { ref } from 'vue'
import { showFailToast, showNotify, showSuccessToast } from 'vant'
import useClipboard from 'vue-clipboard3'

const username = ref('')
const honor = ref('')
const result = ref('')

const commit = () => {
  result.value = `今天是${username.value}${honor.value}的日子，生活中的酸甜苦辣，记录着命运的轨迹，轨迹留下你的影子，${honor.value}到来之际，送给你的祝愿最诚挚，衷心祝你大吉大利，顺心如意。只有尊重自己的人，才能够更勇于缩小自己，通过退让来成全别人，非愚即智。梦自己想梦的，做自己想做的，因为生命只有一次，机会不会再来。人生苦短，咱们何必计较得失，有爱就有梦。每个人都有一番不一样的经历，每个人都是一部新鲜的故事。懂得珍惜，风雨兼程的日子，有他有我也有你。`
  showNotify({ type: 'success', message: '生成成功' });
}
const { toClipboard } = useClipboard()
const copy = async () => {
  try {
    await toClipboard(result.value)
    showSuccessToast('复制成功');
  } catch (e) {
    showFailToast('复制失败');
  }

}

</script>

<template>
  <div id="App">
    <van-notice-bar style="margin-top: 46px;" background="#ecf9ff" color="#1989fa" left-icon="info-o">
      灵感来源 & 版权声明：莱宝 bot
    </van-notice-bar>
    <div id="app" class="container">
      <h1 class="header">小作文生成</h1>
      <van-form>
        <van-cell-group inset>
          <van-field
              v-model="username"
              label="用户"
              name="用户"
              placeholder="请输入用户"
          />
          <van-field
              v-model="honor"
              label="荣誉"
              name="荣誉"
              placeholder="请输入荣誉"
          />
        </van-cell-group>

        <div class="row" style=" padding: 20px; margin-bottom: 0;">
          <div class="col col-6">
            <van-button :disabled="!username || !honor" block type="primary" @click="commit">生成
            </van-button>
          </div>
          <div class="col-6">
            <van-button :disabled="!result" block type="success" @click="copy">复制</van-button>
          </div>
        </div>
        <van-cell-group inset>
          <van-field
              v-model="result"
              autosize
              label="小作文生成结果"
              label-align="top"
              rows="8"
              type="textarea"
          />
        </van-cell-group>
      </van-form>
    </div>
  </div>
</template>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7f8fa;
}

h1 {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 30px;
}

</style>
