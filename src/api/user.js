import request, { baseURL } from '@/utils/request.js'

export const getInfo = (id) => {
    return request.get(baseURL + `/Dance/api/User/GetInfo?getNationRank=true&userId=${id}`);
}

export const getAccountInfo = (id) => {
    return request.get(baseURL + `/Dance/api/User/GetAccountInfo?userId=${id}`);
}

export const getAllList = () => {
    return request.get(baseURL + `/Dance/api/ReplyTextItem/GetAllList?machineId=0&gold=0`);
}

export const getLastPlay = () => {
    return request.get(baseURL + `/Dance/api/User/GetLastPlay`);
}

