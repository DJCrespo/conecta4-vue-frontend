import request from "./api"

export const checkConnection = () => {
    return request({
        url: '/',
        method: 'GET'
    })
}