import axios from 'axios'

const apiVersion = 'v1'
const baseHost = process.env.VUE_APP_API_HOST
const apiUrl = `${baseHost}/api/${apiVersion}`
const AUTH_HEADER = 'Authorization'

export const tokenName = 'authorization360token'

const instance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenName)
    if (token) {
        config.headers[AUTH_HEADER] = token
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance