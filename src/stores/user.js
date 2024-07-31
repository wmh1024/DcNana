import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
    'user',
    () => {
        const user = ref({})
        const info = ref({})
        const accountInfo = ref({})
        const allList = ref({})

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

        // accountInfo methods
        const setAccountInfo = (newAccountInfo) => {
            accountInfo.value = newAccountInfo
        }

        const getAccountInfo = () => {
            return accountInfo.value
        }

        // allList methods
        const setAllList = (newAllList) => {
            allList.value = newAllList
        }

        const getAllList = () => {
            return allList.value
        }

        return {
            user,
            info,
            accountInfo,
            allList,
            setUser,
            getUser,
            setInfo,
            getInfo,
            setAccountInfo,
            getAccountInfo,
            setAllList,
            getAllList
        }
    }
)
