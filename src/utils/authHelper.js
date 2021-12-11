import cookie from 'js-cookie';

export const createCookie = (key, value) => {
    cookie.set(key, value, {
        expires: 3
    });
}

export const removeCookie = key => {
    cookie.remove(key);
}

export const getCookie = key => {
    return cookie.get(key);
}

export const authenticate = (res, next) => {
    createCookie('token', res.data.token);
    next();
}

export const isAuth = () => {
    const token = getCookie ('token')

    if (token) {
        return true;
    }

    return false;
}

export const logout = () => {
    removeCookie('token');
}
