import request from "./api"

export const createUser = (data) => {
    return request({
        url: '/user',
        method: 'POST',
        data
    })
}

export const getUsers = () => {
    return request({
        url: '/user',
        method: 'GET'
    }) 
}