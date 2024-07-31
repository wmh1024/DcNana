import request, { baseURL } from '@/utils/request.js'

export const getPublicMusic = (page) => {
    return request.get(baseURL + `/Dance/api/MusicData/GetMyPublishMusic?page=${page}&pagesize=15`);
}

export const getMakerInfo = () => {
    return request.get(baseURL + '/Dance/api/User/GetMakerInfo?getProfit=true');
}

export const gainMusicByCode = (code) => {
    return request.post(baseURL + `/Dance/api/MusicData/GainMusicByCode?code=${code}`);
}

