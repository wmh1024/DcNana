import axios from 'axios'
import { useTokenStore } from '@/stores/token'

// 这里填写后端反代域名
const baseURL = ''

const request = axios.create({
    timeout: 30000
})

request.interceptors.request.use(
    (config) => {
        const tokenStore = useTokenStore()
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    (err) => Promise.reject(err)
)

request.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        return err
    }
)

export default request
export { baseURL }
