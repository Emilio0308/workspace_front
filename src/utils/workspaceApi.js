import axios from "axios";

export const workspaceApi = axios.create({
    baseURL : 'http://127.0.0.1:8000/api/v1/'
})


export const getAuthorization = () => {
    const token = sessionStorage.getItem('token')
    const Headers= {
        Authorization: `Bearer ${token}`
    }
    return Headers
}