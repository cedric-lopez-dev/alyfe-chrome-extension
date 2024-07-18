
import { storageGet, storageRemove, storageSet } from "./networksStorageServices";

export const Fetcher = async (baseURL) => {

    const apiUrl = 'https://api-web-staging.alyfe.fr/api';
    const websiteId = await storageGet('selectedWebsiteMarket');
    let token = await storageGet('alyfe_token');

    const createRequestUrl = (request, payload) => {
        let requestUrl = `${apiUrl}/${baseURL}${request}?websiteId=${websiteId}`;
        if (payload?.params) {
            for (const param in payload.params) {
                requestUrl = `${requestUrl}&${param}=${payload.params[param]}`;
            }
        }
        return requestUrl;
    };

    const get = async (request, payload) => {
        const requestUrl = createRequestUrl(request, payload);
        return fetch(requestUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.status === 401) {
                return refreshToken(() => get(request, payload));
            }
            return response.json();
        }).catch((error) => {
            console.error(error);
        });
    };

    const post = async (request, payload) => {
        const requestUrl = createRequestUrl(request, payload);
        return fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload?.body || {})
        }).then((response) => {
            if (response.status === 401) {
                return refreshToken(() => post(request, payload));
            }
            return response.json();
        }).catch((error) => {
            console.error(error);
        });
    };

    const put = async (request, payload) => {
        const requestUrl = createRequestUrl(request, payload);
        return fetch(requestUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload?.body || {})
        }).then((response) => {
            if (response.status === 401) {
                return refreshToken(() => put(request, payload));
            }
            return response.json();
        }).catch((error) => {
            console.error(error);
        });
    };

    const refreshToken = async (initialRequest) => {
        const refreshToken = await storageGet('alyfe_refreshToken');
        return fetch(`${apiUrl}/admin/refreshToken`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
            },
        }).then((response) => {
            return response.json();
        }).then((res) => {
            if (!res.ok) {
                storageRemove('alyfe_token');
                storageRemove('alyfe_refreshToken');
            }
            storageSet('alyfe_token', res.token);
            storageSet('alyfe_refreshToken', res.refreshToken);
            token = res.token;
            return initialRequest();
        }).catch((error) => {
            console.error(error);
        });
    };

    return { get, post, put };
};

