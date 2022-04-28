import axios from 'axios'
import 'dotenv/config'
    require('dotenv').config()

console.log(process.env.baseUrl)

const config = axios.create({
    baseURL: process.env.baseUrl,
    headers: {}
})

export default config