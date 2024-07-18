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