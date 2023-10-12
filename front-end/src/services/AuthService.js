const AUTHORIZATION_API_BASE_URL = 'http://localhost:8080/api/guest/auth/';

export const endpoints = {
    'signin': `${AUTHORIZATION_API_BASE_URL}/signin`,
    'signup': `${AUTHORIZATION_API_BASE_URL}/signup`,
    'signout': `${AUTHORIZATION_API_BASE_URL}/signout`,
}