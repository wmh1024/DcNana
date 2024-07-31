import request, { baseURL } from '@/utils/request'

// 这里放置你申请的 accessKey
const accessKey = ""

export const searchMachine = (keyword) => {
    return request.get(baseURL + "/DanceApi/Machine/SearchMachine", {
        params: {
            keyword,
            accessKey
        }
    })
}

export const getMusicInfo = (musicId) => {
    return request.get(baseURL + "/DanceApi/Music/MusicInfo", {
        params: {
            musicId,
            accessKey
        }
    })
}

export const randomSong = () => {
    return request.get(baseURL + "/DanceApi/Music/RandomSong", {
        params: {
            randomType: 1,
            accessKey
        }
    })
}

