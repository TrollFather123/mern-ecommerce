import axios from "axios";
import { parseCookies } from 'nookies'

const BASE_URL = "http://localhost:8000/api/v1";

export const axiosInstance = axios.create({
    baseURL:BASE_URL
})


axiosInstance.interceptors.request.use(async(config)=>{

    const cookies = parseCookies();

    const token = cookies?.token;

    if(token !== undefined && token !== null){
        config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
},(err)=>{
    return Promise.reject(err)
})
