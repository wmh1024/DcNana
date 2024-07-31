import { createRouter, createWebHashHistory } from 'vue-router'
import { showToast } from 'vant'
import { useTokenStore } from '@/stores/token'
import BaseLayout from '@/layout/BaseLayout.vue'
import B30View from '@/views/B30View.vue'
import LoginView from '@/views/LoginView.vue'
import UserView from '@/views/UserView.vue'
import ToolsView from '@/views/ToolsView.vue'
import ToolsLayout from '@/layout/ToolsLayout.vue'
import CodeGenView from '@/views/tools/CodeGenView.vue'
import CodeFamilyView from '@/views/tools/CodeFamilyView.vue'
import CodeExchangeView from '@/views/tools/CodeExchangeView.vue'
import ReportView from '@/views/tools/ReportView.vue'
import SearchView from '@/views/tools/SearchView.vue'
import OtherB50View from '@/views/tools/OtherB50View.vue'
import B50View from '@/views/tools/B50View.vue'
import MusicPicView from '@/views/tools/MusicPicView.vue'
import MusicAudioView from '@/views/tools/MusicAudioView.vue'
import MusicVideoView from '@/views/tools/MusicVideoView.vue'
import RandomMusicView from '@/views/tools/RandomMusicView.vue'
import MusicInfoLayout from '@/layout/MusicInfoLayout.vue'
import MusicInfoView from '@/views/info/MusicInfoView.vue'
import MusicSearchView from '@/views/tools/MusicSearchView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/b30',
            component: BaseLayout,
            children: [
                {
                    path: '/b30',
                    name: 'b30',
                    component: B30View
                },
                {
                    path: '/tools',
                    name: 'tools',
                    component: ToolsView
                },
                {
                    path: '/user',
                    name: 'user',
                    component: UserView
                }
            ]
        },
        {
            path: '/tool',
            name: 'tool',
            redirect: '/tool/code_gen',
            component: ToolsLayout,
            children: [
                {
                    path: '/tool/code_gen',
                    name: 'code_gen',
                    component: CodeGenView
                }, {
                    path: '/tool/code_family',
                    name: 'code_family',
                    component: CodeFamilyView
                }, {
                    path: '/tool/code_exchange',
                    name: 'code_exchange',
                    component: CodeExchangeView
                }, {
                    path: '/tool/report',
                    name: 'report',
                    component: ReportView
                }, {
                    path: '/tool/search',
                    name: 'search',
                    component: SearchView
                }, {
                    path: '/tool/other_b50',
                    name: 'other_b50',
                    component: OtherB50View
                }, {
                    path: '/tool/b50',
                    name: 'b50',
                    component: B50View
                }, {
                    path: '/tool/music_pic',
                    name: 'music_pic',
                    component: MusicPicView
                }, {
                    path: '/tool/music_audio',
                    name: 'music_audio',
                    component: MusicAudioView
                }, {
                    path: '/tool/music_video',
                    name: 'music_video',
                    component: MusicVideoView
                }, {
                    path: '/tool/random',
                    name: 'random',
                    component: RandomMusicView
                }, {
                    path: '/tool/music_search',
                    name: 'music_search',
                    component: MusicSearchView
                }
            ]
        },
        {
            path: '/info',
            name: '/info',
            component: MusicInfoLayout,
            children: [
                {
                    path: '/info/:MusicID',
                    component: MusicInfoView
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const tokenStore = useTokenStore()
    if (!tokenStore.token && to.path !== '/login') {
        showToast("请先登录")
        next({
            path: '/login'
        })
    }
    next()
})

export default router
