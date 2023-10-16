import cookie from 'react-cookies';

const Reducer = (currentState, action) => {
    switch (action.type) {
        case 'signin': return action.payload;

        case 'signout':
            cookie.remove('token');
            cookie.remove('user');
            localStorage.removeItem('user');
            return null;
    }
    return currentState;
}

export default Reducer;