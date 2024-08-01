<div align="center">

# [舞小奈](https://github.com/wmh1024/DcNana)

<a href="https://github.com/wmh1024/DcNana">
 <img src="public/icons/icon-512.png" alt="Logo" width="128" height="128">
</a>


🚀 **基于 Vue3 和 Vant4 的舞立方助手应用**

🚀 **纯前端实现，力求保证数据和信息安全**

![](https://stats.deeptrain.net/repo/wmh1024/DcNana/?theme=light)

</div>


## 💡 项目特点

1. **纯前端实现**：所有敏感数据皆存储于用户浏览器本地，确保数据隐私和安全，不会上传至任何非官方服务器。这种架构设计不仅提高了用户数据的安全性，还减少了对外部服务器的依赖，提升了应用的响应速度和稳定性。
2. **PWA 应用支持**：应用完全支持渐进式网页应用（PWA）标准，用户可以将其安装至桌面，享受近似原生应用的使用体验。
3. **战力分析支持**：通过舞萌 DX 的 b50 评分机制，精确实现了由 b15 和 r15 组成的综合战力分析功能。此功能可以帮助用户深入了解自身的游戏表现，从而提升游戏水平。
4. **创作者支持**：创作者的批量生成兑换码功能显著提高了工作效率。创作者能够一次性生成多个兑换码，节省了大量的时间和精力。此外，还有创作者兑换码全家桶功能。




## ⚙️ 现已支持的功能

> 当前开源版本为 v1.8.3

* 用户扫码登录 (v1.0)
* 谱师批量生成兑换码 (v1.0)
* B50 查询(v1.1)
* 用户中心 (v1.1)
* 谱师生成兑换码全家桶 (v1.2)
* 自制谱批量兑换 (v1.3)
* PWA 应用 (v1.3)
* 小作文 (v1.4)
* 搜索舞立方机台 (v1.4)
* 好友 B50 查询 (v1.5)
* 战力分析 (v1.6)
* 乐曲曲绘下载、音频下载、背景视频下载 (v1.7)
* 小奈帮你选 (随机歌曲) (v1.8)
* 查看乐曲详情 (v1.8)

## 快速开始

### 1. 反代服务器的准备

因浏览器的同源策略限制（跨域问题），跨域请求可能会导致资源访问失败。

因此，需通过 Nginx 配置反向代理，以实现对后端接口的访问和数据交互。

```
location ^~ /Dance/ {
    proxy_pass https://dancedemo.shenghuayule.com;
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers '*';
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }
}

location ^~ /DanceApi/ {
    proxy_pass http://47.108.144.90:5346;
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers '*';
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }
}
```

将反代的域名填写在 src/utils/request.js 中

```js
// 这里填写后端反代域名
const baseURL = ''
```

### 2. 向 艾鲁Ellu 申请 accessKey

> 感谢夏缺缺提供 api 支持。

舞立方及艾鲁接口文档：https://dancebot.apifox.cn/

将申请到的 accessKey 放置在 src/api/wlfbot.js 中

```js
// 这里放置你申请的 accessKey
const accessKey = ""
```

### 3. 编译并部署代码

安装依赖

```sh
yarn
```

开发运行

```sh
yarn run dev
```

生产打包

```sh
yarn run build
```


## 🧰 技术栈

**前端框架**

- Vue.js
- Pinia（状态管理）
- Vue Router（路由管理）

**UI 组件库**

- Vant4（移动端组件库）

**HTTP 请求**

- Axios（HTTP 客户端）

**数据处理**

- qs（查询字符串解析）

**持久化状态**

- Pinia Plugin Persistedstate（状态持久化插件）

**开发工具**

- Vite（构建工具）
- @vitejs/plugin-vue（Vite 插件）
- Vite PWA 插件（渐进式 Web 应用）


## 😋 特别鸣谢

1. 感谢 段白诗 的设计思路和基本创想
2. 感谢 夏缺缺 提供技术和 api 支持
3. 感谢所有参与内测和提出问题的朋友

## 🏷 更新日志

> 当前开源版本为 v1.8.3

### v1.8.3

* 优化：去除了白名单机制
* 优化：页面布局
* 优化：为提高性能，去除了 JS 混淆

### v1.8.2

* 优化：对战力分析页和个人信息页添加了缓存
* 优化：修复了部分设备在战力分析页面概率卡住的 bug

### v1.8.1

* 新增：搜索歌曲谱面信息
* 优化：添加了 JS 混淆

### v1.8

* 新增：小奈帮你选 (随机歌曲)
* 新增：查看乐曲详情
* 优化：可以添加战队白名单和成员白名单

### v1.7.1

* 优化：兑换码批量兑换的界面样式

### v1.7

* 新增：乐曲曲绘下载、音频下载、背景视频下载

### v1.6

* 优化：战力分析为 b15 + r15，将旧版战力分析改为 B50 查询功能
* 优化：战力分析的样式，区分旧版难度
* 优化：对非内测战队用户做了登录限制

### v1.5.2

* 优化：战力分析分为"含自制谱"和"不含自制谱"两种模式

### v1.5.1

* 优化：修复战力分析的 Bug，且不计算 20 级及其以上的曲目

### v1.5

* 新增：查看他人战力分析
* 优化：战力分析页面布局

### v1.4

* 新增：小作文
* 新增：搜索舞立方机台
* 优化：优化了战力计算的算法

### v1.3

* 新增：支持 PWA 应用
* 新增：自制谱批量兑换
* 优化：战力分析修改为 B50，不计算 24 级以上的曲目
* 优化：一键复制的操作逻辑

### v1.2

* 新增：谱师生成兑换码全家桶
* 优化：界面布局

### v1.1

* 新增：战力分析 B30
* 优化：用户界面

### v1.0

* 新增：用户扫码登录
* 新增：谱师批量生成兑换码


## 🤤 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨🏻‍💻 贡献者

![](https://stats.deeptrain.net/contributor/wmh1024/DcNana/?column=8&theme=light)

## ⭐️ Stargazers over time

[![Stargazers over time](https://starchart.cc/wmh1024/DcNana.svg?variant=adaptive)](https://starchart.cc/wmh1024/DcNana)
