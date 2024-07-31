import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQRCodeIDStore = defineStore(
    'QRCodeID',
    () => {
        const QRCodeID = ref('')
        const setQRCodeID = (newToken) => {
            QRCodeID.value = newToken
        }
        const removeQRCodeID = () => {
            QRCodeID.value = ''
        }

        return {
            QRCodeID,
            setQRCodeID,
            removeQRCodeID
        }
    },
    {
        // 持久化
        persist: true
    }
)
