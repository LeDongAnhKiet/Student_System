import axios from "axios";
import cookie from "react-cookies";
import USER_API_BASE_URL from "./UserService";

export const AUTHORIZATION_API = '/api/guest/auth/';

export const endpoints = {
    'signin': `${AUTHORIZATION_API}/signin`,

    'signup': `${AUTHORIZATION_API}/signup`,

    'signout': `${AUTHORIZATION_API}/signout`,

    'user': `${USER_API_BASE_URL}/info`
}

export const auth = () => {
    return axios.create({
        baseURL: 'http://localhost:8080',
        headers: { 'Authorization': cookie.load('token') }
    })
}

export default axios.create({ baseURL: "http://localhost:8080" });