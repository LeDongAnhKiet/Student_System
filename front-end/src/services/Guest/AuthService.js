import axios from "axios";
import cookie from "react-cookies";

export const AUTHORIZATION_API = '/api/guest/auth';
const USER_API = '/api/user';

export const endpoints = {
    'signin': `${AUTHORIZATION_API}/signin`,

    'signup': `${AUTHORIZATION_API}/signup`,

    'signout': `${AUTHORIZATION_API}/signout`,

    'user': `${USER_API}/info`
}

export const auth = () => {
    return axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: 'Bearer ' + cookie.load('token')
        }
    })
}

export default axios.create({ baseURL: "http://localhost:8080" });