import qs from 'qs'
import request, { baseURL } from '@/utils/request.js'

export const getQRCode = (id) => {
    if (id) {
        return request.get(baseURL + `/Dance/api/Common/GetQrCode?id=${id}`)
    }
    return request.get(baseURL + "/Dance/api/Common/GetQrCode")
}

export const getToken = (id) => {
    return request.post(baseURL + "/Dance/token", qs.stringify({
        'client_type': 'qrcode', 'grant_type': 'client_credentials', 'client_id': id
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
