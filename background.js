

export const storageGet = (key) => {
    return chrome.storage.local.get([key]).then((result) => {
        return result[key];
    });
};

export const storageSet = (key, value) => {
    return chrome.storage.local.set({ [key]: value });
};
export const storageRemove = (key) => {
    return chrome.storage.local.remove(key);
};

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

// checkToken().then((res) => {

//     if (!res?.id)
//         updateBadge()

// })

function updateBadge() {

    chrome.action.setBadgeText({ text: "!" });
    chrome.action.setBadgeBackgroundColor({ color: '#F3C723' });

}
