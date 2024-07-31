<script setup>
import { ref } from 'vue'
import { searchMachine } from '@/api/wlfbot'
import { closeToast, showLoadingToast } from 'vant'

const value = ref('');
const MACHINETYPE = ["", "一代", "二代", "舞立方秀"]
const machines = ref([])

const onSearch = async (val) => {
  showLoadingToast({
    message: '加载中',
    forbidClick: true
  });
  const res = await searchMachine(val)
  machines.value = res?.data?.Data?.List
  closeToast()
};
</script>

<template>
  <div id="App">
    <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        @search="onSearch"
    />
    <div class="container">
      <div style="padding-top: 10px;"></div>
      <van-card
          v-for="(item, idx) in machines"
          :key="idx"
          :tag="String(idx + 1)"
          :thumb="item?.Img1 || item?.Img2 || 'https://ts-asset.shenghuayule.com/images/default/headimg/0/default_headimg.jpg'"
      >
        <template #desc>
          <div>
            {{ item?.Address }}
          </div>
        </template>
        <template #title>
          <h6>
            <van-tag color="#7232dd" size="medium" style="margin-left: 3px; ">{{
                MACHINETYPE[item?.MachineType]
              }}
            </van-tag>
            <!--            <span style="margin-left: 3px; margin-right: 5px;" class="badge bg-warning text-dark">{{-->
            <!--                MACHINETYPE[item?.MachineType]-->
            <!--              }}</span>-->
            {{ item?.PlaceName }}
          </h6>
        </template>
        <template #num>
          {{ item?.ProvinceAndCity }}
        </template>
        <template #price>
          <h6 style="padding-right: 10px; display: inline">{{
              item?.GameCoins === 0 ? "免费" : `${item?.GameCoins}币/局`
            }}</h6>
          <van-tag v-if="item?.Online" size="medium" type="success">在线</van-tag>
          <van-tag v-else size="medium" type="danger">离线</van-tag>
        </template>
      </van-card>
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

h1 {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 20px;
}

</style>
