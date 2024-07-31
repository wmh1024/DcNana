<script setup></script>

<template>
  <div id="App">
    <h1>🛠 让小奈来帮你吧</h1>
    <div style="margin-left: 15px; font-size: 14px; margin-bottom: 3px; margin-top: 13px;">资源</div>
    <van-cell-group>
      <van-cell icon="list-switching" is-link title="查询乐曲谱面信息" to="/tool/music_search"/>
      <van-cell icon="photo-o" is-link title="查询乐曲曲绘" to="/tool/music_pic"/>
      <van-cell icon="volume-o" is-link title="查询乐曲音频" to="/tool/music_audio"/>
      <van-cell icon="video-o" is-link title="查询乐曲视频" to="/tool/music_video"/>
    </van-cell-group>
    <div style="margin-left: 15px; font-size: 14px; margin-bottom: 3px; margin-top: 13px;">娱乐</div>
    <van-cell-group>
      <van-cell icon="hot-o" is-link title="小奈帮你选 (随机乐曲)" to="/tool/random"/>
      <van-cell icon="description-o" is-link title="小作文生成" to="/tool/report"/>
    </van-cell-group>
    <div style="margin-left: 15px; font-size: 14px; margin-bottom: 3px; margin-top: 13px;">查找机台</div>
    <van-cell-group>
      <van-cell icon="location-o" is-link title="查找舞立方机台" to="/tool/search"/>
    </van-cell-group>
    <div style="margin-left: 15px; font-size: 14px; margin-bottom: 3px; margin-top: 13px;">战力分析</div>
    <van-cell-group>
      <van-cell icon="medal-o" is-link title="B50 查询" to="/tool/b50"/>
      <van-cell icon="friends-o" is-link title="好友 B50 查询" to="/tool/other_b50"/>
    </van-cell-group>
    <div style="margin-left: 15px; font-size: 14px; margin-bottom: 3px; margin-top: 13px;">背包</div>
    <van-cell-group>
      <van-cell icon="gift-card-o" is-link title="自制谱批量兑换" to="/tool/code_exchange"/>
    </van-cell-group>
    <div style="margin-left: 15px; font-size: 14px; margin-bottom: 3px; margin-top: 13px;">创作者</div>
    <van-cell-group>
      <van-cell icon="gift-o" is-link title="批量生成兑换码" to="/tool/code_gen"/>
      <van-cell icon="send-gift-o" is-link title="生成自制谱全家桶" to="/tool/code_family"/>
    </van-cell-group>
  </div>
  <div id="Footer"></div>
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

#Footer {
  padding-bottom: 100px;
}
</style>
