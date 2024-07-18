import { Fetcher } from "./fetcher";
const fetcherInstance = Fetcher('admin/cv');

export const getAlyfeProfiles = async () => {
    const { get } = await fetcherInstance
    const profiles = await get('/website')
    return profiles

}

export const getOneAlyfeProfile = async (id) => {
    const { get } = await fetcherInstance
    const profile = await get('/network', { params: { id } })
    if (profile.length) return profile[0]
    return false
}

export const createAlyfeProfile = async (profile) => {
    const { post } = await fetcherInstance
    const createdProfile = await post('', { body: profile })
    return createdProfile
}
export const createAlyfeProfileSms = async (profile) => {
    const { post } = await fetcherInstance
    const createdProfile = await post('/send-sms', { body: profile })
    return createdProfile
}

export const newEventProfile = async (id, event) => {
    const { put } = await fetcherInstance
    const updatetedProfile = await put(`/${id}/new-event`, { params: event })
    return updatetedProfile
}

export const updateAlyfeProfile = async (id, note) => {
    const { put } = await fetcherInstance
    const updatetedProfile = await put(`/${id}`, { body: note })
    return updatetedProfile
}