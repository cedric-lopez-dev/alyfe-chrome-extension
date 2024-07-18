import { storageGet, storageRemove, storageSet } from "./storageService";

export const login = async (email, password) => {
    return fetch('https://api-web-staging.alyfe.fr/api/public/loginApp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            if (!response.ok) {
                return false
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export const checkToken = (token) => {
    return fetch('https://api-web-staging.alyfe.fr/api/admin/checkToken',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }
    ).then((response) => {
        if (response.status === 401)
            return refreshToken()
        return response.json();
    }).catch((error) => {
        console.log(error);
    })
};

export const refreshToken = async () => {
    const refreshToken = await storageGet('alyfe_refreshToken')
    return fetch('https://api-web-staging.alyfe.fr/api/admin/refreshToken',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
            },
        }
    ).then((response) => {
        return response.json();
    }).then((res) => {
        if (!res.ok) {
            storageRemove('alyfe_token')
            storageRemove('alyfe_refreshToken')
        }
        storageSet('alyfe_token', res.token)
        storageSet('alyfe_refreshToken', res.refreshToken)
        return res.user
    })
        .catch((error) => {
            console.log(error);
        })
};