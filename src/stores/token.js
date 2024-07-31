import { ref } from 'vue'
import { defineStore } from 'pinia'


// 用户模块 token setToken removeToken
export const useTokenStore = defineStore(
    'token',
    () => {
        const token = ref('')
        const setToken = (newToken) => {
            token.value = newToken
        }
        const removeToken = () => {
            token.value = ''
        }
        return {
            token,
            setToken,
            removeToken
        }
    },
    {
        // 持久化
        persist: true
    }
)
