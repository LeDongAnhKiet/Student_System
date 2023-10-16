import cookie from "react-cookies";

const config = {
    headers: {
        Authorization: 'Bearer ' + cookie.load('token')
    }
}

export default config