import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:3300/api',
})

export default service