import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useB30Store = defineStore(
    'B30',
    () => {
        const musicListFmt = ref([])
        const musicListFmt2 = ref([])
        const recentMusicList = ref([])
        const musicPicFmt = ref([])
        const user = ref({})
        const info = ref({})

        // musicListFmt methods
        const setMusicListFmt = (newList) => {
            musicListFmt.value = newList
        }

        const getMusicListFmt = () => {
            return musicListFmt.value
        }

        // musicListFmt2 methods
        const setMusicListFmt2 = (newList) => {
            musicListFmt2.value = newList
        }

        const getMusicListFmt2 = () => {
            return musicListFmt2.value
        }

        // recentMusicList methods
        const setRecentMusicList = (newList) => {
            recentMusicList.value = newList
        }

        const getRecentMusicList = () => {
            return recentMusicList.value
        }

        // musicPicFmt methods
        const setMusicPicFmt = (newList) => {
            musicPicFmt.value = newList
        }

        const getMusicPicFmt = () => {
            return musicPicFmt.value
        }

        // user methods
        const setUser = (newUser) => {
            user.value = newUser
        }

        const getUser = () => {
            return user.value
        }

        // info methods
        const setInfo = (newInfo) => {
            info.value = newInfo
        }

        const getInfo = () => {
            return info.value
        }

        return {
            musicListFmt,
            musicListFmt2,
            recentMusicList,
            musicPicFmt,
            user,
            info,
            setMusicListFmt,
            getMusicListFmt,
            setMusicListFmt2,
            getMusicListFmt2,
            setRecentMusicList,
            getRecentMusicList,
            setMusicPicFmt,
            getMusicPicFmt,
            setUser,
            getUser,
            setInfo,
            getInfo
        }
    }
)
